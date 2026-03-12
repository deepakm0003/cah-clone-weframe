"use client"

import { ChevronDown, ChevronUp, ArrowRight } from "lucide-react"
import Link from "next/link"
import { useState, useRef, useEffect } from "react"
import { motion, useSpring, AnimatePresence } from "framer-motion"

// ── Shop dropdown data ────────────────────────────────────────────────────────
const shopCategories = [
  {
    label: "All Products",
    image: "https://img.cah.io/images/vc07edlh/production/5e64d25a746ed1ebc9d5025f935fc650a984a105-1400x1260.png?auto=format&q=75&w=400",
    bg: "#c084fc",
    href: "#",
  },
  {
    label: "Expansions",
    image: "https://img.cah.io/images/vc07edlh/production/20c0b3d96cc73ad923a6d8d25abf900d688fd80b-2801x2521.png?auto=format&q=75&w=400",
    bg: "#facc15",
    href: "#",
  },
  {
    label: "Twists",
    image: "https://img.cah.io/images/vc07edlh/production/5de43bd46e3aca7e0dbbe441a5f27de1bb041cda-1401x1261.png?auto=format&q=75&w=400",
    bg: "#7dd3fc",
    href: "#",
  },
]

const infoLinks = ["About", "Retailers", "Steal"]
const helpLinks = ["Support", "Careers", "Contact"]

const cards = [
  {
    id: 1,
    text: "Throwing a man by his big penis.",
    position: "absolute left-[30%] top-[-2%] w-[160px] md:w-[200px] lg:w-[230px]",
    rotation: -5,
    type: "white",
    zIdx: 20,
  },
  {
    id: 2,
    text: "Barely making $25,000 a year.",
    position: "absolute left-[50%] top-[-4%] w-[150px] md:w-[190px] lg:w-[210px]",
    rotation: 3,
    type: "white",
    zIdx: 15,
  },
  {
    id: 3,
    text: "A good sniff.",
    position: "absolute left-[14%] top-[26%] w-[150px] md:w-[180px] lg:w-[200px]",
    rotation: -12,
    type: "white",
    zIdx: 10,
  },
  {
    id: 4,
    text: "White people problems.",
    position: "absolute left-[42%] top-[16%] w-[155px] md:w-[195px] lg:w-[220px]",
    rotation: 4,
    type: "black",
    zIdx: 30,
  },
  {
    id: 5,
    text: "Swooping.",
    position: "absolute left-[24%] top-[48%] w-[145px] md:w-[180px] lg:w-[200px]",
    rotation: -8,
    type: "white",
    zIdx: 15,
  },
  {
    id: 6,
    text: "Nachos for the table.",
    position: "absolute left-[55%] top-[38%] w-[145px] md:w-[175px] lg:w-[195px]",
    rotation: 6,
    type: "white",
    zIdx: 25,
  },
  {
    id: 7,
    text: "JFK's smiling, exploding head.",
    position: "absolute right-[2%] top-[22%] w-[150px] md:w-[185px] lg:w-[205px]",
    rotation: 10,
    type: "white",
    zIdx: 20,
  },
]

function ShopDropdown({ onClose }: { onClose: () => void }) {
  return (
    <div
      className="absolute left-0 right-0 bg-black"
      style={{
        top: "100%",
        zIndex: 300,
        borderBottom: "2px solid rgba(255,255,255,0.7)",
        animation: "dropdownOpen 0.4s cubic-bezier(0.16,1,0.3,1) forwards",
      }}
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-8 flex gap-8 items-start">
        <div className="flex flex-col min-w-[220px] gap-8 pr-4">
          <p className="text-white font-black text-[28px] leading-[1.1] tracking-tight">
            A party game<br />for horrible<br />people.
          </p>
          <button className="w-fit border-2 border-white text-white font-black text-[15px] px-6 py-3 rounded-full hover:bg-white hover:text-black transition-all duration-300">
            Buy Stuff
          </button>
        </div>
        <div className="flex gap-5 flex-1">
          {shopCategories.map((cat) => (
            <Link
              key={cat.label}
              href={cat.href}
              className="flex-1 rounded-2xl overflow-hidden group cursor-pointer"
              style={{ background: cat.bg, minHeight: "200px" }}
              onClick={onClose}
            >
              <img
                src={cat.image}
                alt={cat.label}
                className="w-full h-[150px] object-contain p-4 transition-transform duration-300 group-hover:scale-105"
              />
              <div className="px-4 pb-4">
                <span className="text-black font-black text-[20px] leading-tight">{cat.label}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

function AboutDropdown({ onClose }: { onClose: () => void }) {
  return (
    <div
      className="absolute left-0 right-0 bg-black"
      style={{
        top: "100%",
        zIndex: 300,
        borderBottom: "2px solid rgba(255,255,255,0.7)",
        animation: "dropdownOpen 0.4s cubic-bezier(0.16,1,0.3,1) forwards",
      }}
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-10 grid grid-cols-[1fr_1fr_1fr_1.2fr] gap-12 items-start">
        <div className="flex flex-col gap-8">
          <p className="text-white font-black text-[28px] leading-[1.1] tracking-tight">
            A party game<br />for horrible<br />people.
          </p>
          <button className="w-fit border-2 border-white text-white font-black text-[15px] px-6 py-3 rounded-full hover:bg-white hover:text-black transition-all duration-300">
            Buy Stuff
          </button>
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-white/50 font-bold text-[12px] mb-3 uppercase tracking-widest">Info</p>
          {infoLinks.map((item) => (
            <Link
              key={item}
              href="#"
              onClick={onClose}
              className="text-white font-black text-[30px] leading-[1.2] hover:opacity-60 transition-opacity relative group w-fit"
            >
              {item}
              <span className="absolute left-0 bottom-0 w-full h-[2px] bg-white transition-all duration-300 group-hover:w-0" />
            </Link>
          ))}
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-white/50 font-bold text-[12px] mb-3 uppercase tracking-widest">Help</p>
          {helpLinks.map((item) => (
            <Link
              key={item}
              href="#"
              onClick={onClose}
              className="text-white font-black text-[30px] leading-[1.2] hover:opacity-60 transition-opacity relative group w-fit"
            >
              {item}
              <span className="absolute left-0 bottom-0 w-full h-[2px] bg-white transition-all duration-300 group-hover:w-0" />
            </Link>
          ))}
        </div>
        <div className="flex flex-col gap-4">
          <p className="text-white font-bold text-[12px] uppercase tracking-widest">Email List</p>
          <p className="text-white font-black text-[16px] leading-[1.3]">
            Sign up and we'll let you know first when we do anything.
          </p>
          <div className="flex items-center border-2 border-white rounded-2xl px-4 py-3 bg-transparent">
            <input
              type="email"
              placeholder="Email address"
              className="flex-1 outline-none bg-transparent text-white text-[14px] placeholder-white/40 font-medium"
            />
            <button className="ml-2 w-8 h-8 border-2 border-white rounded-full flex items-center justify-center hover:bg-white hover:text-black transition-all duration-200 flex-shrink-0">
              <ArrowRight className="w-4 h-4" strokeWidth={2.5} />
            </button>
          </div>
          <div className="flex gap-3 mt-1">
            <a href="#" className="w-9 h-9 rounded-full border-2 border-white flex items-center justify-center hover:bg-white hover:text-black transition-all duration-200">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" className="text-white">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
              </svg>
            </a>
            <a href="#" className="w-9 h-9 rounded-full border-2 border-white flex items-center justify-center hover:bg-white hover:text-black transition-all duration-200">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

function HeroNavDropdown({ label, children }: { label: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="relative" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
      <button className="flex items-center gap-1 text-[15px] font-bold hover:opacity-70 transition-opacity tracking-tight">
        {label}
        <ChevronDown className="w-4 h-4" strokeWidth={2.5} />
      </button>
      {open && (
        <div className="absolute top-full right-0 pt-2 z-50">{children}</div>
      )}
    </div>
  )
}

function LaurelSVG({ flip }: { flip?: boolean }) {
  return (
    <svg
      width="28" height="48" viewBox="0 0 28 48" fill="none" className="text-white"
      style={flip ? { transform: "scaleX(-1)" } : {}}
    >
      <path d="M14 4C14 4 8 10 6 18C4 26 6 36 8 42" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <path d="M10 10C6 14 4 20 5 26" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <path d="M12 16C9 19 7 24 8 30" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <ellipse cx="6" cy="14" rx="3" ry="4" fill="currentColor" transform="rotate(-20 6 14)" />
      <ellipse cx="4" cy="22" rx="3" ry="4" fill="currentColor" transform="rotate(-10 4 22)" />
      <ellipse cx="5" cy="30" rx="3" ry="4" fill="currentColor" transform="rotate(5 5 30)" />
      <ellipse cx="7" cy="38" rx="3" ry="4" fill="currentColor" transform="rotate(15 7 38)" />
    </svg>
  )
}

export default function HeroSection() {
  const [shopOpen, setShopOpen] = useState(false)
  const [aboutOpen, setAboutOpen] = useState(false)
  const [cartHovered, setCartHovered] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [highestZ, setHighestZ] = useState(50)
  const containerRef = useRef<HTMLDivElement>(null)
  const rotateX = useSpring(0, { stiffness: 160, damping: 20 })
  const lastY = useRef(0)
  const cartCount = 0

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      setScrolled(y > 60)
      const delta = y - lastY.current
      rotateX.set(Math.max(-8, Math.min(8, rotateX.get() + delta * 0.06)))
      lastY.current = y
      // Spring back to flat after scroll stops
      setTimeout(() => rotateX.set(0), 200)
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [rotateX])

  const closeAll = () => { setShopOpen(false); setAboutOpen(false) }
  const toggleShop = () => { setShopOpen(p => !p); setAboutOpen(false) }
  const toggleAbout = () => { setAboutOpen(p => !p); setShopOpen(false) }

  return (
    <>
      <style>{`
        @keyframes cartPop {
          0%   { transform: scale(1) translateY(0px); }
          40%  { transform: scale(1.18) translateY(-6px); }
          70%  { transform: scale(1.12) translateY(-4px); }
          100% { transform: scale(1.15) translateY(-5px); }
        }
        @keyframes cartUnpop {
          0%   { transform: scale(1.15) translateY(-5px); }
          100% { transform: scale(1) translateY(0px); }
        }
        @keyframes dropdownOpen {
          from { opacity: 0; transform: translateY(-14px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* ═══════════════════════════════════════════════════
          STICKY COMPACT NAVBAR — appears after scrolling 60px
          Rotates in on the X axis like a card flipping in
      ═══════════════════════════════════════════════════ */}
      <AnimatePresence>
        {scrolled && (
          <motion.div
            className="fixed top-0 left-0 right-0 z-[200] bg-black"
            style={{
              rotateX,
              transformPerspective: 1000,
              transformOrigin: "top center",
            }}
            initial={{ rotateX: -90, opacity: 0 }}
            animate={{ rotateX: 0, opacity: 1 }}
            exit={{ rotateX: -90, opacity: 0 }}
            transition={{ type: "spring", stiffness: 220, damping: 24 }}
          >
            <div className="w-full px-6 lg:px-10">
              <div className="flex items-center justify-between h-[72px]">

                {/* Logo */}
                <Link
                  href="/"
                  className="text-white text-[20px] font-bold tracking-[-0.02em] hover:opacity-70 transition"
                  style={{ fontFamily: "Helvetica, Arial, sans-serif" }}
                >
                  Cards Against Humanity
                </Link>

                {/* Right controls */}
                <div className="flex items-center gap-8">
                  <button
                    onClick={toggleShop}
                    className="flex items-center text-white text-[20px] font-bold hover:opacity-70 transition"
                  >
                    Shop
                    {shopOpen
                      ? <ChevronUp className="ml-1.5 w-[17px] h-[17px]" strokeWidth={2.5} />
                      : <ChevronDown className="ml-1.5 w-[17px] h-[17px]" strokeWidth={2.5} />}
                  </button>

                  <button
                    onClick={toggleAbout}
                    className="flex items-center text-white text-[20px] font-bold hover:opacity-70 transition"
                  >
                    About
                    {aboutOpen
                      ? <ChevronUp className="ml-1.5 w-[17px] h-[17px]" strokeWidth={2.5} />
                      : <ChevronDown className="ml-1.5 w-[17px] h-[17px]" strokeWidth={2.5} />}
                  </button>

                  {/* Cart */}
                  <button
                    onMouseEnter={() => setCartHovered(true)}
                    onMouseLeave={() => setCartHovered(false)}
                    className="relative flex items-center justify-center cursor-pointer"
                    style={{
                      width: "50px",
                      height: "28px",
                      animation: cartHovered
                        ? "cartPop 0.3s cubic-bezier(0.25,0.46,0.45,0.94) forwards"
                        : "cartUnpop 0.35s cubic-bezier(0.25,0.46,0.45,0.94) forwards",
                      transformOrigin: "bottom center",
                    }}
                  >
                    <svg width="50" height="28" viewBox="0 0 60 34" fill="none">
                      <line x1="8" y1="2" x2="11" y2="32" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
                      <line x1="11" y1="32" x2="49" y2="32" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
                      <line x1="49" y1="32" x2="52" y2="2" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
                    </svg>
                    <span
                      className="absolute font-black text-white leading-none"
                      style={{ fontSize: "15px", top: "54%", left: "50%", transform: "translate(-50%,-50%)", pointerEvents: "none" }}
                    >
                      {cartCount}
                    </span>
                  </button>
                </div>
              </div>
            </div>

            {/* White divider */}
            <div style={{ height: "2px", background: "rgba(255,255,255,0.7)" }} />

            {/* Dropdowns anchored below divider */}
            <div className="relative">
              {shopOpen && <ShopDropdown onClose={closeAll} />}
              {aboutOpen && <AboutDropdown onClose={closeAll} />}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ═══════════════════════════════════
          HERO SECTION
      ═══════════════════════════════════ */}
      <section
        className="bg-black text-white min-h-screen relative overflow-hidden"
        ref={containerRef}
      >
        {/* Hero top-right nav — fades out when sticky nav appears */}
        <nav
          className="absolute top-0 right-0 flex items-center gap-6 p-6 md:p-8 z-[100] transition-all duration-300"
          style={{ opacity: scrolled ? 0 : 1, pointerEvents: scrolled ? "none" : "auto" }}
        >
          <HeroNavDropdown label="Shop">
            <div className="bg-white text-black border border-gray-200 rounded-lg shadow-lg py-2 min-w-[160px]">
              <Link href="#" className="block px-4 py-2 text-[14px] hover:bg-gray-50 font-bold">More CAH</Link>
              <Link href="#" className="block px-4 py-2 text-[14px] hover:bg-gray-50 font-medium">All Products</Link>
              <Link href="#" className="block px-4 py-2 text-[14px] hover:bg-gray-50 font-medium">Main Games</Link>
            </div>
          </HeroNavDropdown>

          <HeroNavDropdown label="About">
            <div className="bg-white text-black border border-gray-200 rounded-lg shadow-lg py-2 min-w-[160px]">
              <Link href="#" className="block px-4 py-2 text-[14px] hover:bg-gray-50 font-medium">About</Link>
              <Link href="#" className="block px-4 py-2 text-[14px] hover:bg-gray-50 font-medium">Support</Link>
              <Link href="#" className="block px-4 py-2 text-[14px] hover:bg-gray-50 font-medium">Contact</Link>
            </div>
          </HeroNavDropdown>

          <Link
            href="#"
            className="flex items-center justify-center border border-white rounded-[4px] px-2 py-1 transform -skew-x-12 hover:opacity-70 transition-opacity"
          >
            <span className="transform skew-x-12 relative top-[1px] -left-[1px] text-[15px] font-bold tracking-tighter">
              &nbsp;<sup>0</sup>&nbsp;/
            </span>
          </Link>
        </nav>

        {/* Large logo — top left, fades when scrolled */}
        <div
          className="absolute left-6 md:left-12 top-6 md:top-8 z-40 pointer-events-none transition-all duration-300"
          style={{ opacity: scrolled ? 0 : 1 }}
        >
          <h1 className="text-[36px] md:text-[52px] lg:text-[62px] font-bold leading-[0.95] tracking-[-0.02em]">
            Cards<br />Against<br />Humanity
          </h1>
        </div>

        {/* ── Draggable cards ── */}
        <div className="relative w-full h-screen">
          {cards.map((card) => {
            const isBlack = card.type === "black"
            return (
              <motion.div
                key={card.id}
                className={`${card.position} cursor-grab active:cursor-grabbing`}
                style={{ zIndex: card.zIdx }}
                drag
                dragConstraints={containerRef}
                dragElastic={0.08}
                dragMomentum={false}
                whileDrag={{ scale: 1.06, zIndex: 999 }}
                whileHover={{ scale: 1.03 }}
                initial={{ rotate: card.rotation }}
                onMouseDown={() => setHighestZ(p => p + 1)}
              >
                <div
                  className={`rounded-[14px] p-4 md:p-5 shadow-2xl aspect-[3/4] flex flex-col justify-between border select-none
                    ${isBlack ? "bg-black text-white border-zinc-700" : "bg-white text-black border-transparent"}`}
                  onMouseDown={(e) => {
                    ; (e.currentTarget.parentElement as HTMLElement).style.zIndex = highestZ.toString()
                  }}
                >
                  <p className="text-[18px] md:text-[22px] lg:text-[28px] font-bold leading-[1.15] tracking-tight">
                    {card.text}
                  </p>
                  <div className="flex items-center gap-2 pointer-events-none">
                    <div className={`w-5 h-5 md:w-6 md:h-6 rounded flex items-center justify-center ${isBlack ? "bg-white" : "bg-black"}`}>
                      <span className={`text-[6px] md:text-[7px] font-bold ${isBlack ? "text-black" : "text-white"}`}>CAH</span>
                    </div>
                    <span className="text-[8px] md:text-[9px] font-bold tracking-tight">Cards Against Humanity</span>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Quote bottom-left */}
        <div className="absolute left-6 md:left-12 bottom-6 md:bottom-8 flex items-center gap-3 z-40 pointer-events-none">
          <LaurelSVG />
          <div className="text-center">
            <p className="text-[28px] md:text-[36px] font-bold leading-none tracking-tight">&quot;Bad.&quot;</p>
            <p className="text-[10px] md:text-[11px] tracking-[0.22em] mt-1 font-bold">NPR</p>
          </div>
          <LaurelSVG flip />
        </div>

      </section>
    </>
  )
}