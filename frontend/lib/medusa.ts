// lib/medusa.ts
// Typed Medusa.js API client for the frontend (no extra SDK needed)

const MEDUSA_URL = process.env.NEXT_PUBLIC_MEDUSA_URL || 'http://localhost:9000'

// ─── Types ────────────────────────────────────────────────────────────────────

export interface MedusaVariant {
  id: string
  title: string
  prices: { amount: number; currency_code: string }[]
}

export interface MedusaProduct {
  id: string
  title: string
  handle: string
  description: string
  variants: MedusaVariant[]
  thumbnail?: string
}

export interface MedusaLineItem {
  id: string
  title: string
  quantity: number
  unit_price: number
  subtotal: number
  thumbnail?: string
  variant: MedusaVariant & { product: MedusaProduct }
}

export interface MedusaCart {
  id: string
  items: MedusaLineItem[]
  total: number
  subtotal: number
  tax_total: number
  region_id: string
  email?: string
}

export interface MedusaCustomer {
  id: string
  email: string
  first_name: string
  last_name: string
}

export interface MedusaOrder {
  id: string
  display_id: number
  status: string
  payment_status: string
  fulfillment_status: string
  total: number
  items: MedusaLineItem[]
  created_at: string
}

// ─── Cart ID persistence ──────────────────────────────────────────────────────

export function getCartId(): string | null {
  if (typeof window === 'undefined') return null
  return localStorage.getItem('medusa_cart_id')
}

export function setCartId(id: string) {
  if (typeof window !== 'undefined') localStorage.setItem('medusa_cart_id', id)
}

export function clearCartId() {
  if (typeof window !== 'undefined') localStorage.removeItem('medusa_cart_id')
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

async function medusaFetch<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const res = await fetch(`${MEDUSA_URL}/store${path}`, {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  })

  if (!res.ok) {
    const error = await res.json().catch(() => ({}))
    throw new Error(error.message || `Medusa fetch failed: ${res.status} ${path}`)
  }

  return res.json()
}

// ─── Products ─────────────────────────────────────────────────────────────────

export async function getMedusaProducts(): Promise<MedusaProduct[]> {
  const data = await medusaFetch<{ products: MedusaProduct[] }>('/products?limit=50')
  return data.products
}

export async function getMedusaProduct(handle: string): Promise<MedusaProduct | null> {
  try {
    const data = await medusaFetch<{ products: MedusaProduct[] }>(
      `/products?handle=${handle}&limit=1`
    )
    return data.products[0] || null
  } catch {
    return null
  }
}

// ─── Cart ─────────────────────────────────────────────────────────────────────

export async function createCart(): Promise<MedusaCart> {
  const data = await medusaFetch<{ cart: MedusaCart }>('/carts', { method: 'POST' })
  setCartId(data.cart.id)
  return data.cart
}

export async function getCart(cartId: string): Promise<MedusaCart | null> {
  try {
    const data = await medusaFetch<{ cart: MedusaCart }>(`/carts/${cartId}`)
    return data.cart
  } catch {
    return null
  }
}

export async function addToCart(
  cartId: string,
  variantId: string,
  quantity = 1
): Promise<MedusaCart> {
  const data = await medusaFetch<{ cart: MedusaCart }>(`/carts/${cartId}/line-items`, {
    method: 'POST',
    body: JSON.stringify({ variant_id: variantId, quantity }),
  })
  return data.cart
}

export async function updateLineItem(
  cartId: string,
  lineItemId: string,
  quantity: number
): Promise<MedusaCart> {
  const data = await medusaFetch<{ cart: MedusaCart }>(
    `/carts/${cartId}/line-items/${lineItemId}`,
    { method: 'POST', body: JSON.stringify({ quantity }) }
  )
  return data.cart
}

export async function removeLineItem(
  cartId: string,
  lineItemId: string
): Promise<MedusaCart> {
  const data = await medusaFetch<{ cart: MedusaCart }>(
    `/carts/${cartId}/line-items/${lineItemId}`,
    { method: 'DELETE' }
  )
  return data.cart
}

// ─── Auth ─────────────────────────────────────────────────────────────────────

export async function loginCustomer(email: string, password: string): Promise<MedusaCustomer> {
  const data = await medusaFetch<{ customer: MedusaCustomer }>('/auth', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  })
  return data.customer
}

export async function registerCustomer(
  email: string,
  password: string,
  firstName: string,
  lastName: string
): Promise<MedusaCustomer> {
  const data = await medusaFetch<{ customer: MedusaCustomer }>('/customers', {
    method: 'POST',
    body: JSON.stringify({ email, password, first_name: firstName, last_name: lastName }),
  })
  return data.customer
}

export async function logoutCustomer(): Promise<void> {
  await medusaFetch('/auth', { method: 'DELETE' })
}

export async function getCustomer(): Promise<MedusaCustomer | null> {
  try {
    const data = await medusaFetch<{ customer: MedusaCustomer }>('/customers/me')
    return data.customer
  } catch {
    return null
  }
}

export async function getCustomerOrders(): Promise<MedusaOrder[]> {
  try {
    const data = await medusaFetch<{ orders: MedusaOrder[] }>('/customers/me/orders')
    return data.orders
  } catch {
    return []
  }
}

// ─── Checkout ─────────────────────────────────────────────────────────────────

export async function addShippingAddress(cartId: string, address: {
  first_name: string
  last_name: string
  address_1: string
  city: string
  country_code: string
  postal_code: string
  email: string
}): Promise<MedusaCart> {
  const data = await medusaFetch<{ cart: MedusaCart }>(`/carts/${cartId}`, {
    method: 'POST',
    body: JSON.stringify({ shipping_address: address, email: address.email }),
  })
  return data.cart
}

export async function selectShippingOption(cartId: string, optionId: string): Promise<MedusaCart> {
  const data = await medusaFetch<{ cart: MedusaCart }>(`/carts/${cartId}/shipping-methods`, {
    method: 'POST',
    body: JSON.stringify({ option_id: optionId }),
  })
  return data.cart
}

export async function createPaymentSessions(cartId: string): Promise<MedusaCart> {
  const data = await medusaFetch<{ cart: MedusaCart }>(
    `/carts/${cartId}/payment-sessions`,
    { method: 'POST' }
  )
  return data.cart
}

export async function completeCart(cartId: string): Promise<MedusaOrder> {
  const data = await medusaFetch<{ type: string; data: MedusaOrder }>(
    `/carts/${cartId}/complete`,
    { method: 'POST' }
  )
  clearCartId()
  return data.data
}
