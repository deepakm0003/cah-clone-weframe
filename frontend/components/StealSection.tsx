"use client"

import { motion } from "framer-motion"

export default function StealSection() {
  return (
    <section className="bg-white py-16 md:py-20 relative overflow-hidden">
      <div className="max-w-[780px] mx-auto px-6 relative">

        {/* Green starburst badge */}
        <div className="absolute top-0 right-0 w-[110px] h-[110px] md:w-[90px] md:h-[130px] z-20">
          <motion.img
            src="https://www.cardsagainsthumanity.com/images/steal-badge.svg"
            alt="Free! Download now!"
            className="w-full h-full object-contain"
            animate={{
              rotate: [18, 16, 18, 15, 18, 15, 18, 15, 18, 15],
            }}
            transition={{
              repeat: Infinity,
              duration: 4,
              ease: "easeInOut",
              times: [0, 0.1, 0.2, 0.35, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
            }}
          />
        </div>

        {/* Title */}
        <h2 className="text-[42px] md:text-[60px] font-extrabold mb-8 tracking-tight text-black leading-[1.1] pr-[140px]">
          Steal the game.
        </h2>

        {/* First paragraph */}
        <p className="text-[32px] md:text-[26px] leading-[1.6] mb-6 text-black">
          Since day one, Cards Against Humanity has been <br />available as{" "}
          <span className="underline decoration-1 underline-offset-2 cursor-pointer">
            a free download on our website
          </span>
          . You<br />can download the PDFs and printing instructions<br />right here—all you need is a printer, scissors, and a<br />prehensile appendage.
        </p>

        {/* Second paragraph */}
        <p className="text-[32px] md:text-[26px] leading-[1.6] mb-12 text-black">
          Please note: there&apos;s no legal way to use these PDFs<br />to make money, so don&apos;t ask.
        </p>

        {/* Buttons row - just arrow SVG + gap + Download Files */}
        <div className="flex items-center gap-16">

          {/* Arrow SVG only - it already has "Download: Click here!" text inside */}
          <motion.img
            src="https://www.cardsagainsthumanity.com/images/steal-arrow.svg"
            alt="Download: Click here!"
            className="h-[42px] md:h-[50px] w-auto"
            animate={{
              x: [0, 8, 0, 7, 0, 6, 0],
              rotate: [0, -3, 0, 2, 0, -2, 0],
            }}
            transition={{
              repeat: Infinity,
              duration: 2,
              ease: "easeInOut",
            }}
          />

          {/* Black download button */}
          <button className="bg-black text-white rounded-full px-10 py-4 text-[16px] md:text-[18px] font-bold hover:opacity-90 transition-opacity tracking-tight shadow-md">
            Download Files
          </button>

        </div>
      </div>
    </section>
  )
}