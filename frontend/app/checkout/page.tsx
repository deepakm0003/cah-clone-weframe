"use client"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, ArrowRight, CheckCircle } from "lucide-react"
import Link from "next/link"
import {
  addShippingAddress, createPaymentSessions,
  completeCart, getCart, getCartId
} from "@/lib/medusa"
import type { MedusaCart, MedusaOrder } from "@/lib/medusa"
import { useCart } from "@/context/CartContext"

type Step = "address" | "payment" | "confirm"

export default function CheckoutPage() {
  const router = useRouter()
  const { cart, refreshCart } = useCart()
  const [step, setStep] = useState<Step>("address")
  const [order, setOrder] = useState<MedusaOrder | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const [address, setAddress] = useState({
    first_name: "", last_name: "",
    address_1: "", city: "",
    country_code: "us", postal_code: "", email: "",
  })

  useEffect(() => {
    if (!getCartId()) router.replace("/")
  }, [router])

  const handleAddressSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)
    try {
      const cartId = getCartId()!
      await addShippingAddress(cartId, address)
      await createPaymentSessions(cartId)
      await refreshCart()
      setStep("payment")
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to save address.")
    } finally {
      setIsLoading(false)
    }
  }

  const handlePlaceOrder = async () => {
    setError("")
    setIsLoading(true)
    try {
      const cartId = getCartId()!
      const placedOrder = await completeCart(cartId)
      setOrder(placedOrder)
      setStep("confirm")
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to place order.")
    } finally {
      setIsLoading(false)
    }
  }

  const subtotal = cart?.items?.reduce((s, i) => s + i.quantity * i.unit_price, 0) ?? 0
  const formattedTotal = `€${(subtotal / 100).toFixed(2)}`

  if (step === "confirm" && order) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center px-6">
        <div className="text-center max-w-[480px]">
          <CheckCircle className="w-16 h-16 text-white mx-auto mb-6" strokeWidth={1.5} />
          <h1 className="text-white font-black text-[36px] mb-3">Order Placed!</h1>
          <p className="text-white/70 text-[18px] mb-2">
            Order <span className="text-white font-bold">#{order.display_id}</span>
          </p>
          <p className="text-white/70 text-[16px] mb-8">
            Thanks for your purchase. You'll receive a confirmation email shortly.
          </p>
          <Link
            href="/"
            className="inline-block bg-white text-black font-black text-[18px] px-8 py-4 rounded-full hover:bg-gray-100 transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="border-b border-white/20 px-6 lg:px-16 py-5 flex items-center justify-between">
        <Link href="/" className="text-white font-black text-[22px]">
          Cards Against Humanity
        </Link>
        <h1 className="text-white/60 font-bold text-[16px] uppercase tracking-widest">Checkout</h1>
      </div>

      <div className="max-w-[1100px] mx-auto px-6 lg:px-16 py-12 grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-12">

        {/* Left: Steps */}
        <div>
          {/* Step Indicator */}
          <div className="flex items-center gap-4 mb-10">
            {(["address", "payment"] as Step[]).map((s, i) => (
              <div key={s} className="flex items-center gap-4">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-black text-[15px] border-2 ${step === s || (step === "payment" && s === "address") ? "bg-white text-black border-white" : "border-white/30 text-white/30"}`}>
                  {i + 1}
                </div>
                <span className={`font-bold text-[15px] capitalize ${step === s ? "text-white" : "text-white/40"}`}>{s}</span>
                {i < 1 && <div className="w-8 h-[2px] bg-white/20" />}
              </div>
            ))}
          </div>

          {step === "address" && (
            <form onSubmit={handleAddressSubmit} className="flex flex-col gap-4">
              <h2 className="text-white font-black text-[26px] mb-2">Shipping Address</h2>
              <div className="flex gap-4">
                <input placeholder="First name" required value={address.first_name}
                  onChange={e => setAddress({ ...address, first_name: e.target.value })}
                  className="flex-1 bg-transparent border-2 border-white/30 rounded-xl px-4 py-3 text-white placeholder-white/40 font-medium outline-none focus:border-white" />
                <input placeholder="Last name" required value={address.last_name}
                  onChange={e => setAddress({ ...address, last_name: e.target.value })}
                  className="flex-1 bg-transparent border-2 border-white/30 rounded-xl px-4 py-3 text-white placeholder-white/40 font-medium outline-none focus:border-white" />
              </div>
              <input placeholder="Email address" type="email" required value={address.email}
                onChange={e => setAddress({ ...address, email: e.target.value })}
                className="bg-transparent border-2 border-white/30 rounded-xl px-4 py-3 text-white placeholder-white/40 font-medium outline-none focus:border-white" />
              <input placeholder="Street address" required value={address.address_1}
                onChange={e => setAddress({ ...address, address_1: e.target.value })}
                className="bg-transparent border-2 border-white/30 rounded-xl px-4 py-3 text-white placeholder-white/40 font-medium outline-none focus:border-white" />
              <div className="flex gap-4">
                <input placeholder="City" required value={address.city}
                  onChange={e => setAddress({ ...address, city: e.target.value })}
                  className="flex-1 bg-transparent border-2 border-white/30 rounded-xl px-4 py-3 text-white placeholder-white/40 font-medium outline-none focus:border-white" />
                <input placeholder="Postal code" required value={address.postal_code}
                  onChange={e => setAddress({ ...address, postal_code: e.target.value })}
                  className="w-[140px] bg-transparent border-2 border-white/30 rounded-xl px-4 py-3 text-white placeholder-white/40 font-medium outline-none focus:border-white" />
              </div>

              {error && <p className="text-red-400 text-[14px] font-medium">{error}</p>}

              <button type="submit" disabled={isLoading}
                className="mt-2 w-full bg-white text-black font-black text-[18px] py-4 rounded-full flex items-center justify-between px-6 hover:bg-gray-100 transition-colors disabled:opacity-50">
                <span>Continue to Payment</span>
                <ArrowRight className="w-5 h-5" strokeWidth={2.5} />
              </button>
            </form>
          )}

          {step === "payment" && (
            <div className="flex flex-col gap-6">
              <h2 className="text-white font-black text-[26px] mb-2">Payment</h2>
              <div className="border-2 border-white/30 rounded-2xl p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-5 h-5 rounded-full border-2 border-white flex items-center justify-center">
                    <div className="w-2.5 h-2.5 rounded-full bg-white" />
                  </div>
                  <span className="text-white font-bold text-[18px]">Test / Manual Payment</span>
                </div>
                <p className="text-white/60 text-[14px] leading-relaxed">
                  This is a dummy payment provider for testing purposes. No real charges will be made.
                  Your order will be created in the system immediately.
                </p>
              </div>

              {error && <p className="text-red-400 text-[14px] font-medium">{error}</p>}

              <div className="flex gap-4">
                <button onClick={() => setStep("address")}
                  className="flex items-center gap-2 border-2 border-white/30 text-white font-bold text-[15px] px-6 py-3 rounded-full hover:border-white transition-colors">
                  <ArrowLeft className="w-4 h-4" strokeWidth={2.5} /> Back
                </button>
                <button onClick={handlePlaceOrder} disabled={isLoading}
                  className="flex-1 bg-white text-black font-black text-[18px] py-4 rounded-full flex items-center justify-between px-6 hover:bg-gray-100 transition-colors disabled:opacity-50">
                  <span>{isLoading ? "Placing Order..." : "Place Order"}</span>
                  <ArrowRight className="w-5 h-5" strokeWidth={2.5} />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Right: Order Summary */}
        <div className="bg-white/5 rounded-2xl p-6 h-fit border border-white/10">
          <h3 className="text-white font-black text-[20px] mb-5">Order Summary</h3>
          {cart?.items?.map((item) => (
            <div key={item.id} className="flex items-center justify-between gap-4 mb-4">
              <div>
                <p className="text-white font-bold text-[15px]">{item.title}</p>
                <p className="text-white/50 text-[13px]">Qty: {item.quantity}</p>
              </div>
              <span className="text-white font-bold">€{((item.unit_price * item.quantity) / 100).toFixed(2)}</span>
            </div>
          ))}
          <div className="border-t border-white/20 pt-4 mt-4 flex items-center justify-between">
            <span className="text-white font-black text-[18px]">Total</span>
            <span className="text-white font-black text-[18px]">{formattedTotal}</span>
          </div>
        </div>

      </div>
    </div>
  )
}
