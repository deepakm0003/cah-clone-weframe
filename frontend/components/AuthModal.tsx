"use client"
import { useState } from "react"
import { X, ArrowRight } from "lucide-react"
import { useCart } from "@/context/CartContext"

type Mode = "login" | "register"

export default function AuthModal({ onClose }: { onClose: () => void }) {
  const [mode, setMode] = useState<Mode>("login")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [error, setError] = useState("")
  const { login, register, isLoading } = useCart()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    try {
      if (mode === "login") {
        await login(email, password)
      } else {
        await register(email, password, firstName, lastName)
      }
      onClose()
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.")
    }
  }

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70" onClick={onClose} />

      {/* Modal */}
      <div className="relative z-10 bg-white w-full max-w-[420px] mx-4 rounded-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-8 pt-8 pb-4">
          <h2 className="text-black font-black text-[28px] tracking-tight">
            {mode === "login" ? "Sign In" : "Create Account"}
          </h2>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full border-2 border-black flex items-center justify-center hover:bg-black hover:text-white transition-all"
          >
            <X className="w-4 h-4" strokeWidth={2.5} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="px-8 pb-8 flex flex-col gap-4">
          {mode === "register" && (
            <div className="flex gap-3">
              <input
                type="text"
                placeholder="First name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
                className="flex-1 border-2 border-black rounded-xl px-4 py-3 font-medium text-[15px] outline-none focus:border-black/60"
              />
              <input
                type="text"
                placeholder="Last name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
                className="flex-1 border-2 border-black rounded-xl px-4 py-3 font-medium text-[15px] outline-none focus:border-black/60"
              />
            </div>
          )}

          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="border-2 border-black rounded-xl px-4 py-3 font-medium text-[15px] outline-none focus:border-black/60"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="border-2 border-black rounded-xl px-4 py-3 font-medium text-[15px] outline-none focus:border-black/60"
          />

          {error && (
            <p className="text-red-600 text-[14px] font-medium">{error}</p>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-black text-white font-black text-[18px] py-4 rounded-full flex items-center justify-between px-6 hover:bg-gray-900 transition-colors disabled:opacity-50"
          >
            <span>{mode === "login" ? "Sign In" : "Create Account"}</span>
            <ArrowRight className="w-5 h-5" strokeWidth={2.5} />
          </button>

          <button
            type="button"
            onClick={() => { setMode(mode === "login" ? "register" : "login"); setError("") }}
            className="text-black/60 font-medium text-[14px] hover:text-black transition-colors text-center"
          >
            {mode === "login"
              ? "Don't have an account? Create one →"
              : "Already have an account? Sign in →"
            }
          </button>
        </form>
      </div>
    </div>
  )
}
