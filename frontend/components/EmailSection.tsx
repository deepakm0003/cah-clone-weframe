"use client"

import { ArrowRight } from "lucide-react"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

const rotatingLines = [
  "we make a comedy A.I.,",
  "we pivot to potato chips,",
  "we buy a private island,",
  "we send a fan to Fiji,",
  "we release new stuff,",
  "we stop a border wall,",
  "we sell literal bullshit,",
  "we dig a giant hole,",
  "we start a scholarship,",
  "we sell a car for $97,",
]

export default function EmailSection() {
  const [email, setEmail] = useState("")
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % rotatingLines.length)
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="bg-white py-16 md:py-30">
      <div className="max-w-[800px] mx-auto px-8">

        <h2 className="text-[48px] md:text-[60px] font-black leading-[1.35] mb-8 tracking-tight">

          {/* Static line */}
          <span className="block">To find out first when</span>

          {/* Fixed-height rotating line — static lines never shift */}
          <span
            className="block overflow-hidden"
            style={{ height: "1.15em", position: "relative" }}
          >
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.span
                key={index}
                initial={{ y: "100%" }}
                animate={{ y: "0%" }}
                exit={{ y: "-100%" }}
                transition={{ duration: 0.45, ease: [0.32, 0.72, 0, 1] }}
                style={{ position: "absolute", top: 0, left: 0, width: "100%" }}
                className="block"
              >
                {rotatingLines[index]}
              </motion.span>
            </AnimatePresence>
          </span>

          {/* Static line */}
          <span className="block">give us your email:</span>
        </h2>

        {/* Email input — full width, black border */}
        <div className="relative border-2 border-black rounded-md flex items-center px-5 py-4 mb-3 focus-within:border-black transition-colors bg-white">
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 text-[34px] bg-transparent focus:outline-none text-zinc-900 placeholder:text-zinc-900"
          />
          <motion.button
            className="ml-3 p-1.5 rounded-full border-2 border-black hover:bg-zinc-100 transition-colors flex items-center justify-center flex-shrink-0"
            whileHover={{ scale: 1.1, x: 2 }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowRight className="w-4 h-4 stroke-[2.5]" />
          </motion.button>
        </div>

        <p className="text-[14px] text-black leading-relaxed">
          We&apos;ll only email you like twice a year and we won&apos;t share your info with anybody else.
        </p>

      </div>
    </section>
  )
}