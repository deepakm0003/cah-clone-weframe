"use client"

import { ChevronDown, ShoppingBag } from "lucide-react"
import Link from "next/link"
import { useState, useEffect, useRef } from "react"

export default function Navbar() {
  const [shopOpen, setShopOpen] = useState(false)
  const [aboutOpen, setAboutOpen] = useState(false)

  // ── HIDE ON SCROLL DOWN, SHOW ON SCROLL UP ──
  const [visible, setVisible] = useState(true)
  const lastScrollY = useRef(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY
      if (currentY <= 0) {
        setVisible(true)
      } else if (currentY > lastScrollY.current) {
        setVisible(false)
        setShopOpen(false)
        setAboutOpen(false)
      } else {
        setVisible(true)
      }
      lastScrollY.current = currentY
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      {/* Fixed navbar with slide transition */}
      <header
        className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-100"
        style={{
          transform: visible ? "translateY(0)" : "translateY(-100%)",
          transition: "transform 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        <nav className="flex items-center justify-between px-5 py-3.5 max-w-[1100px] mx-auto">
          <Link href="/" className="flex flex-col leading-[1.05]">
            <span className="text-[13px] font-bold tracking-[-0.01em]">Cards</span>
            <span className="text-[13px] font-bold tracking-[-0.01em]">Against</span>
            <span className="text-[13px] font-bold tracking-[-0.01em]">Humanity</span>
          </Link>

          <div className="flex items-center gap-5">
            {/* Shop */}
            <div
              className="relative"
              onMouseEnter={() => setShopOpen(true)}
              onMouseLeave={() => setShopOpen(false)}
            >
              <button className="flex items-center gap-0.5 text-[13px] font-medium hover:opacity-70 transition-opacity">
                Sho
                <ChevronDown className="w-3 h-3" />
              </button>
              {shopOpen && (
                <div className="absolute top-full left-0 pt-1">
                  <div className="bg-white border border-gray-200 rounded-lg shadow-lg py-1.5 min-w-[160px]">
                    <Link href="/products/more-cah" className="block px-3.5 py-1.5 text-[13px] hover:bg-gray-50">All Products</Link>
                    <Link href="/products/more-cah" className="block px-3.5 py-1.5 text-[13px] hover:bg-gray-50">Main Games</Link>
                    <Link href="/products/more-cah" className="block px-3.5 py-1.5 text-[13px] hover:bg-gray-50">Expansions</Link>
                    <Link href="/products/more-cah" className="block px-3.5 py-1.5 text-[13px] hover:bg-gray-50">Packs</Link>
                    <Link href="/products/more-cah" className="block px-3.5 py-1.5 text-[13px] hover:bg-gray-50">Other Stuff</Link>
                  </div>
                </div>
              )}
            </div>

            {/* About */}
            <div
              className="relative"
              onMouseEnter={() => setAboutOpen(true)}
              onMouseLeave={() => setAboutOpen(false)}
            >
              <button className="flex items-center gap-0.5 text-[13px] font-medium hover:opacity-70 transition-opacity">
                About
                <ChevronDown className="w-3 h-3" />
              </button>
              {aboutOpen && (
                <div className="absolute top-full right-0 pt-1">
                  <div className="bg-white border border-gray-200 rounded-lg shadow-lg py-1.5 min-w-[160px]">
                    <Link href="#" className="block px-3.5 py-1.5 text-[13px] hover:bg-gray-50">About</Link>
                    <Link href="#" className="block px-3.5 py-1.5 text-[13px] hover:bg-gray-50">Support</Link>
                    <Link href="#" className="block px-3.5 py-1.5 text-[13px] hover:bg-gray-50">Contact</Link>
                    <Link href="#" className="block px-3.5 py-1.5 text-[13px] hover:bg-gray-50">Retailers</Link>
                    <Link href="#" className="block px-3.5 py-1.5 text-[13px] hover:bg-gray-50">Hiring</Link>
                  </div>
                </div>
              )}
            </div>

            <button className="hover:opacity-70 transition-opacity">
              <ShoppingBag className="w-[18px] h-[18px]" />
            </button>
          </div>
        </nav>
      </header>

      {/* Spacer to prevent content hiding under fixed navbar */}
      <div className="h-[52px]" />
    </>
  )
}