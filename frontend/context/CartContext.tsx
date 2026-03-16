"use client"
import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react"
import {
  MedusaCart, MedusaCustomer,
  getCartId, createCart, getCart, addToCart,
  updateLineItem, removeLineItem,
  loginCustomer, registerCustomer, logoutCustomer, getCustomer,
} from "@/lib/medusa"

interface CartContextValue {
  cart: MedusaCart | null
  customer: MedusaCustomer | null
  isLoading: boolean
  cartCount: number
  isCartOpen: boolean
  setCartOpen: (open: boolean) => void
  addItem: (variantId: string, qty?: number) => Promise<void>
  updateItem: (lineItemId: string, qty: number) => Promise<void>
  removeItem: (lineItemId: string) => Promise<void>
  login: (email: string, password: string) => Promise<void>
  register: (email: string, password: string, firstName: string, lastName: string) => Promise<void>
  logout: () => Promise<void>
  refreshCart: () => Promise<void>
}

const CartContext = createContext<CartContextValue | null>(null)

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<MedusaCart | null>(null)
  const [customer, setCustomer] = useState<MedusaCustomer | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isCartOpen, setIsCartOpen] = useState(false)

  const ensureCart = useCallback(async (): Promise<MedusaCart> => {
    const existingId = getCartId()
    if (existingId) {
      const existing = await getCart(existingId)
      if (existing) {
        setCart(existing)
        return existing
      }
    }
    const newCart = await createCart()
    setCart(newCart)
    return newCart
  }, [])

  const refreshCart = useCallback(async () => {
    const id = getCartId()
    if (!id) return
    const updated = await getCart(id)
    setCart(updated)
  }, [])

  useEffect(() => {
    // Load cart from storage on mount
    const id = getCartId()
    if (id) {
      getCart(id).then(setCart).catch(() => {})
    }
    // Load current customer session
    getCustomer().then(setCustomer).catch(() => {})
  }, [])

  const addItem = useCallback(async (variantId: string, qty = 1) => {
    setIsLoading(true)
    try {
      const currentCart = await ensureCart()
      const updated = await addToCart(currentCart.id, variantId, qty)
      setCart(updated)
    } finally {
      setIsLoading(false)
    }
  }, [ensureCart])

  const updateItem = useCallback(async (lineItemId: string, qty: number) => {
    if (!cart) return
    setIsLoading(true)
    try {
      const updated = await updateLineItem(cart.id, lineItemId, qty)
      setCart(updated)
    } finally {
      setIsLoading(false)
    }
  }, [cart])

  const removeItem = useCallback(async (lineItemId: string) => {
    if (!cart) return
    setIsLoading(true)
    try {
      const updated = await removeLineItem(cart.id, lineItemId)
      setCart(updated)
    } finally {
      setIsLoading(false)
    }
  }, [cart])

  const login = useCallback(async (email: string, password: string) => {
    setIsLoading(true)
    try {
      const cust = await loginCustomer(email, password)
      setCustomer(cust)
    } finally {
      setIsLoading(false)
    }
  }, [])

  const register = useCallback(async (
    email: string, password: string, firstName: string, lastName: string
  ) => {
    setIsLoading(true)
    try {
      const cust = await registerCustomer(email, password, firstName, lastName)
      setCustomer(cust)
    } finally {
      setIsLoading(false)
    }
  }, [])

  const logout = useCallback(async () => {
    setIsLoading(true)
    try {
      await logoutCustomer()
      setCustomer(null)
    } finally {
      setIsLoading(false)
    }
  }, [])

  const cartCount = cart?.items?.reduce((s, i) => s + i.quantity, 0) ?? 0

  return (
    <CartContext.Provider value={{
      cart, customer, isLoading, cartCount, isCartOpen,
      addItem, updateItem, removeItem, setCartOpen: setIsCartOpen,
      login, register, logout, refreshCart,
    }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error("useCart must be used within CartProvider")
  return ctx
}
