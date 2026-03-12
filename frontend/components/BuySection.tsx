"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"

const slides = [
  {
    id: 0,
    bgColor: "#A8E6F0",
    title: "It's #1 coffin.",
    buttonText: "Buy Main Game",
    hasBlackBox: true,
  },
  {
    id: 1,
    bgColor: "#F5E97A",
    title: "Play CAH with your kids.",
    buttonText: "Buy Family Edition",
    hasFamilyEdition: true,
  },
  {
    id: 2,
    bgColor: "#F5B8D4",
    title: "Moooooore cards!",
    buttonText: "Buy Expansions",
    topProduct: "Culture Wars Pack",
  },
  {
    id: 3,
    bgColor: "#B8EAB0",
    title: "For whatever you're into.",
    buttonText: "Buy $5 Packs",
    topProduct: "Ass Pack",
  },
  {
    id: 4,
    bgColor: "#A8C8F0",
    title: "New releases",
    buttonText: "Shop Now",
    topProduct: "Period Pack",
  },
  {
    id: 5,
    bgColor: "#F5C87A",
    title: "Holiday specials",
    buttonText: "Get Festive",
    topProduct: "Holiday Pack",
  },
]

export default function BuySection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const autoRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const total = slides.length

  const startAuto = useCallback(() => {
    autoRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % total)
    }, 3500)
  }, [total])

  const stopAuto = useCallback(() => {
    if (autoRef.current) clearInterval(autoRef.current)
  }, [])

  useEffect(() => {
    startAuto()
    return () => stopAuto()
  }, [startAuto, stopAuto])

  const next = () => {
    stopAuto()
    setCurrentIndex((prev) => (prev + 1) % total)
    setTimeout(startAuto, 300)
  }

  const prev = () => {
    stopAuto()
    setCurrentIndex((prev) => (prev - 1 + total) % total)
    setTimeout(startAuto, 300)
  }

  const getSlide = (offset: number) => slides[(currentIndex + offset + total) % total]

  return (
    <section className="bg-black text-white py-12 md:py-16 overflow-hidden">
      {/* Header */}
      <div className="max-w-[1400px] mx-auto px-6 flex items-center justify-between mb-8">
        <h2 className="text-[42px] md:text-[58px] font-bold italic tracking-tight">Buy the game.</h2>
        <div className="flex items-center gap-2">
          <button
            onClick={prev}
            className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 group"
            style={{ border: "1px solid rgba(255,255,255,0.3)" }}
            onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = "white"; (e.currentTarget as HTMLButtonElement).style.borderColor = "white" }}
            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = "transparent"; (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.3)" }}
            aria-label="Previous"
          >
            <ChevronLeft className="w-4 h-4 transition-colors duration-200 text-white group-hover:text-black" strokeWidth={1.5} />
          </button>
          <button
            onClick={next}
            className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 group"
            style={{ border: "1px solid rgba(255,255,255,0.3)" }}
            onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = "white"; (e.currentTarget as HTMLButtonElement).style.borderColor = "white" }}
            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = "transparent"; (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.3)" }}
            aria-label="Next"
          >
            <ChevronRight className="w-4 h-4 transition-colors duration-200 text-white group-hover:text-black" strokeWidth={1.5} />
          </button>
        </div>
      </div>

      {/* Cards: left partial | center full | right partial */}
      {/* 
        Layout: 3 cards visible at once.
        - Left card: 60% visible (overflows left edge)
        - Center card: 100% visible
        - Right card: 60% visible (overflows right edge)
        Using negative margins to clip left/right cards
      */}
      <div className="relative w-full" style={{ height: "520px" }}>
        <div
          className="absolute inset-0 flex gap-3 items-stretch"
          style={{
            left: "calc(-40vw * 0.4)",   /* shift left so left card shows 60% */
            right: "calc(-40vw * 0.4)",  /* shift right so right card shows 60% */
            padding: "0",
          }}
        >
          {/* Left partial card */}
          <div
            className="flex-shrink-0 rounded-2xl overflow-hidden transition-all duration-700"
            style={{ width: "40vw" }}
          >
            <SlideCard slide={getSlide(-1)} />
          </div>

          {/* Center full card */}
          <div
            className="flex-shrink-0 rounded-2xl overflow-hidden transition-all duration-700"
            style={{ width: "40vw" }}
          >
            <SlideCard slide={getSlide(0)} />
          </div>

          {/* Right partial card */}
          <div
            className="flex-shrink-0 rounded-2xl overflow-hidden transition-all duration-700"
            style={{ width: "40vw" }}
          >
            <SlideCard slide={getSlide(1)} />
          </div>
        </div>
      </div>
    </section>
  )
}

function SlideCard({ slide }: { slide: typeof slides[0] }) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      className="w-full h-full relative overflow-hidden cursor-pointer"
      style={{ backgroundColor: slide.bgColor }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="w-full h-full p-7 md:p-10 flex flex-col relative">

        {/* Black Box Main Game */}
        {slide.hasBlackBox && (
          <motion.div
            className="absolute top-6 right-6 md:top-8 md:right-8 origin-center"
            animate={{ rotate: [8, 13, 8], y: [0, -12, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            initial={{ rotate: 8 }}
          >
            <div className="w-[170px] md:w-[230px] h-[230px] md:h-[300px] bg-gradient-to-b from-zinc-800 to-black rounded-xl shadow-2xl flex flex-col p-5 md:p-7 border border-zinc-700">
              <div className="flex-1 flex flex-col justify-center">
                <p className="text-white text-[22px] md:text-[30px] font-bold leading-[1.1] tracking-tight">
                  Cards<br />Against<br />Humanity
                </p>
                <p className="text-white text-[9px] md:text-[12px] mt-3 opacity-80 font-medium">
                  A party game<br />for horrible people.
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Family Edition Box */}
        {slide.hasFamilyEdition && (
          <motion.div
            className="absolute top-4 right-4 md:top-6 md:right-8 origin-center"
            animate={{ rotate: [5, 0, 5], y: [0, -8, 0] }}
            transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
            initial={{ rotate: 5 }}
          >
            <div className="w-[170px] md:w-[220px] h-[230px] md:h-[300px] bg-white rounded-xl shadow-2xl relative overflow-hidden">
              <div className="absolute inset-0 flex flex-wrap items-center justify-center text-black font-black text-[40px] md:text-[54px] leading-none p-2 opacity-90 select-none">
                <span className="rotate-[-15deg]">H</span><span className="rotate-12">u</span>
                <span className="-rotate-6">m</span><span className="rotate-[20deg]">a</span>
                <span className="-rotate-12">n</span><span className="rotate-3">i</span>
                <span className="-rotate-9">t</span><span className="rotate-6">y</span>
                <span className="rotate-[-10deg]">F</span><span className="rotate-[15deg]">a</span>
                <span className="-rotate-6">m</span><span className="rotate-12">i</span>
                <span className="-rotate-3">l</span><span className="rotate-9">y</span>
              </div>
              <div className="absolute top-3 left-3 bg-yellow-400 p-2 z-10 border-2 border-black rounded-[2px] -rotate-2">
                <p className="text-[6px] md:text-[8px] font-bold leading-tight text-black tracking-tight">
                  Cards<br />Against<br />Humanity
                </p>
                <div className="mt-1 bg-yellow-300 px-1 py-0.5 border border-black">
                  <p className="text-[8px] md:text-[10px] font-bold text-black tracking-tighter uppercase">
                    Family<br />Edition
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Expansion packs */}
        {slide.topProduct && (
          <>
            <motion.div
              className="absolute top-6 right-6 md:top-8 md:right-8 origin-center"
              animate={{ rotate: [12, 17, 12], y: [0, -14, 0] }}
              transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
              initial={{ rotate: 12 }}
            >
              <div className="w-[120px] md:w-[160px] h-[155px] md:h-[205px] bg-black rounded-xl shadow-xl flex flex-col p-3 md:p-4 border border-zinc-800">
                <span className="text-white text-[12px] md:text-[17px] font-bold italic leading-tight">
                  {slide.topProduct}
                </span>
                <div className="flex-1 flex items-end justify-end">
                  <span className="text-[30px] md:text-[42px]">
                    {slide.topProduct === "Culture Wars Pack" && "💀"}
                    {slide.topProduct === "Ass Pack" && "🍑"}
                    {slide.topProduct === "Period Pack" && "🚀"}
                    {slide.topProduct === "Holiday Pack" && "🎄"}
                  </span>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="absolute bottom-28 right-10 md:bottom-36 md:right-16 origin-center"
              animate={{ rotate: [-8, -3, -8], x: [0, -8, 0] }}
              transition={{ repeat: Infinity, duration: 5.5, ease: "easeInOut" }}
              initial={{ rotate: -8 }}
            >
              <div className="w-[100px] md:w-[130px] h-[130px] md:h-[165px] bg-black rounded-xl shadow-xl flex flex-col p-3 border border-zinc-800">
                <span className="text-white text-[6px] md:text-[8px] font-bold tracking-tight">Cards Against Humanity</span>
                <div className="flex-1 flex items-center justify-center">
                  {slide.bgColor === "#F5B8D4" && (
                    <div className="w-[55px] md:w-[72px] h-[55px] md:h-[72px] rounded-full bg-gradient-to-br from-yellow-400 via-orange-500 to-red-600" />
                  )}
                  {slide.bgColor === "#B8EAB0" && <span className="text-[30px] md:text-[42px]">🌿</span>}
                  {slide.bgColor === "#A8C8F0" && <span className="text-[30px] md:text-[42px]">🚀</span>}
                  {slide.bgColor === "#F5C87A" && <span className="text-[30px] md:text-[42px]">🕎</span>}
                </div>
              </div>
            </motion.div>
          </>
        )}

        {/* Title + Button */}
        <div className="flex-1 flex flex-col justify-end relative z-10">
          <h3 className="text-[26px] md:text-[44px] font-bold leading-[1.05] text-black mb-5 max-w-[280px] md:max-w-[340px] tracking-tight">
            {slide.title}
          </h3>
          <Link href="/products/more-cah">
            <button
              className="text-[13px] md:text-[16px] font-bold px-6 py-3 md:px-8 md:py-3.5 rounded-full w-fit transition-all duration-300 tracking-tight border-2 border-black"
              style={{
                backgroundColor: hovered ? "white" : "black",
                color: hovered ? "black" : "white",
              }}
            >
              {slide.buttonText}
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}