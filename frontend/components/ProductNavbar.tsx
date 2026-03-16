// ProductNavbar.tsx
"use client";

import { ChevronDown, ChevronUp, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/context/CartContext"

const shopCategories = [
  {
    label: "All Products",
    image: "https://img.cah.io/images/vc07edlh/production/5e64d25a746ed1ebc9d5025f935fc650a984a105-1400x1260.png?auto=format&q=75&w=400",
    bg: "#c084fc",
    href: "https://www.cardsagainsthumanity.com/shop/all",
  },
  {
    label: "Expansions",
    image: "https://img.cah.io/images/vc07edlh/production/20c0b3d96cc73ad923a6d8d25abf900d688fd80b-2801x2521.png?auto=format&q=75&w=400",
    bg: "#facc15",
    href: "https://www.cardsagainsthumanity.com/shop/expansions",
  },
  {
    label: "Twists",
    image: "https://img.cah.io/images/vc07edlh/production/5de43bd46e3aca7e0dbbe441a5f27de1bb041cda-1401x1261.png?auto=format&q=75&w=400",
    bg: "#7dd3fc",
    href: "https://www.cardsagainsthumanity.com/shop/packs",
  },
];

const infoLinks = [
  { label: "About", href: "https://www.cardsagainsthumanity.com/about" },
  { label: "Retailers", href: "https://www.cardsagainsthumanity.com/retailers" },
  { label: "Steal", href: "https://www.cardsagainsthumanity.com/#downloads" },
];
const helpLinks = [
  { label: "Support", href: "https://www.cardsagainsthumanity.com/support" },
  { label: "Careers", href: "https://www.cardsagainsthumanity.com/careers" },
  { label: "Contact", href: "https://www.cardsagainsthumanity.com/contact" },
];

export default function ProductNavbar() {
  const { cartCount, setCartOpen } = useCart();
  
  const [cartHovered, setCartHovered] = useState(false);
  const [shopOpen, setShopOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);

  const toggleShop = () => {
    setShopOpen((prev) => !prev);
    setAboutOpen(false);
  };

  const toggleAbout = () => {
    setAboutOpen((prev) => !prev);
    setShopOpen(false);
  };

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
          from { opacity: 0; transform: translateY(-16px); }
          to   { opacity: 1; transform: translateY(0px); }
        }
      `}</style>

      {/* Single sticky wrapper — nav bar + white line + dropdowns all together */}
      <div className="sticky top-0 z-[100] relative bg-black">

        {/* ── NAVBAR ── */}
        <div className="w-full px-6 lg:px-10">
          <div className="flex items-center justify-between h-[78px]">

            {/* Logo */}
            <Link
              href="https://www.cardsagainsthumanity.com/"
              className="text-white text-[29px] font-bold tracking-[-0.02em] hover:opacity-70 transition"
              style={{ fontFamily: "Helvetica, Arial, sans-serif" }}
            >
              Cards Against Humanity
            </Link>

            {/* Right */}
            <div className="flex items-center gap-10">

              {/* Shop */}
              <button
                onClick={toggleShop}
                className="flex items-center text-white text-[28px] font-bold hover:opacity-70 transition"
              >
                Shop
                {shopOpen
                  ? <ChevronUp className="ml-2 w-[20px] h-[20px]" strokeWidth={2.5} />
                  : <ChevronDown className="ml-2 w-[20px] h-[20px]" strokeWidth={2.5} />
                }
              </button>

              {/* About */}
              <button
                onClick={toggleAbout}
                className="flex items-center text-white text-[28px] font-bold hover:opacity-70 transition"
              >
                About
                {aboutOpen
                  ? <ChevronUp className="ml-2 w-[20px] h-[20px]" strokeWidth={2.5} />
                  : <ChevronDown className="ml-2 w-[20px] h-[20px]" strokeWidth={2.5} />
                }
              </button>

              {/* Cart */}
              <button
                onClick={() => setCartOpen(true)}
                onMouseEnter={() => setCartHovered(true)}
                onMouseLeave={() => setCartHovered(false)}
                className="relative flex items-center justify-center cursor-pointer"
                style={{
                  width: "60px",
                  height: "34px",
                  animation: cartHovered
                    ? "cartPop 0.3s cubic-bezier(0.25,0.46,0.45,0.94) forwards"
                    : "cartUnpop 0.35s cubic-bezier(0.25,0.46,0.45,0.94) forwards",
                  transformOrigin: "bottom center",
                }}
              >
                <svg width="60" height="34" viewBox="0 0 60 34" fill="none">
                  <line x1="8" y1="2" x2="11" y2="32" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
                  <line x1="11" y1="32" x2="49" y2="32" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
                  <line x1="49" y1="32" x2="52" y2="2" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
                </svg>
                <span
                  className="absolute font-black text-white leading-none"
                  style={{
                    fontSize: "18px",
                    top: "56%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    pointerEvents: "none",
                  }}
                >
                  {cartCount}
                </span>
              </button>

            </div>
          </div>
        </div>

        {/* ── SINGLE WHITE DIVIDER — always visible ── */}
        <div style={{ height: "2px", background: "rgba(255,255,255,0.7)" }} />

        {/* ── SHOP DROPDOWN ── */}
        {shopOpen && (
          <div
            className="absolute left-0 right-0 bg-black"
            style={{
              top: "80px", // navbar 78px + 2px divider
              zIndex: 200,
              animation: "dropdownOpen 1s cubic-bezier(0.16, 1, 0.3, 1) forwards",
              borderBottom: "2px solid rgba(255,255,255,0.7)",
            }}
          >
            <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-8 flex gap-8 items-start">

              {/* Left */}
              <div className="flex flex-col min-w-[220px] gap-8 pr-4">
                <p className="text-white font-black text-[32px] leading-[1.1] tracking-tight">
                  A party game<br />for horrible<br />people.
                </p>
                <Link href="https://www.cardsagainsthumanity.com/shop/all" onClick={() => setShopOpen(false)} className="w-fit border-2 border-white text-white font-black text-[16px] px-6 py-3 rounded-full hover:bg-white hover:text-black transition-all duration-300 inline-block text-center">
                  Buy Stuff
                </Link>
              </div>

              {/* Cards */}
              <div className="flex gap-5 flex-1">
                {shopCategories.map((cat) => (
                  <Link
                    key={cat.label}
                    href={cat.href}
                    className="flex-1 rounded-2xl overflow-hidden group cursor-pointer"
                    style={{ background: cat.bg, minHeight: "220px" }}
                    onClick={() => setShopOpen(false)}
                  >
                    <img
                      src={cat.image}
                      alt={cat.label}
                      className="w-full h-[170px] object-contain p-4 transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="px-4 pb-4">
                      <span className="text-black font-black text-[22px] leading-tight">
                        {cat.label}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>

            </div>
          </div>
        )}

        {/* ── ABOUT DROPDOWN ── */}
        {aboutOpen && (
          <div
            className="absolute left-0 right-0 bg-black"
            style={{
              top: "80px", // navbar 78px + 2px divider
              zIndex: 200,
              animation: "dropdownOpen 1s cubic-bezier(0.16, 1, 0.3, 1) forwards",
              borderBottom: "2px solid rgba(255,255,255,0.7)",
            }}
          >
            <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-10 grid grid-cols-[1fr_1fr_1fr_1.2fr] gap-12 items-start">

              {/* Left */}
              <div className="flex flex-col gap-8">
                <p className="text-white font-black text-[32px] leading-[1.1] tracking-tight">
                  A party game<br />for horrible<br />people.
                </p>
                <Link href="https://www.cardsagainsthumanity.com/shop/all" onClick={() => setAboutOpen(false)} className="w-fit border-2 border-white text-white font-black text-[16px] px-6 py-3 rounded-full hover:bg-white hover:text-black transition-all duration-300 inline-block text-center">
                  Buy Stuff
                </Link>
              </div>

              {/* Info */}
              <div className="flex flex-col gap-1">
                <p className="text-white/50 font-bold text-[13px] mb-3 uppercase tracking-widest">Info</p>
                {infoLinks.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={() => setAboutOpen(false)}
                    className="text-white font-black text-[34px] leading-[1.2] hover:opacity-60 transition-opacity duration-200 relative group w-fit"
                  >
                    {item.label}
                    <span className="absolute left-0 bottom-0 w-full h-[2.5px] bg-white transition-all duration-300 group-hover:w-0" />
                  </Link>
                ))}
              </div>

              {/* Help */}
              <div className="flex flex-col gap-1">
                <p className="text-white/50 font-bold text-[13px] mb-3 uppercase tracking-widest">Help</p>
                {helpLinks.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={() => setAboutOpen(false)}
                    className="text-white font-black text-[34px] leading-[1.2] hover:opacity-60 transition-opacity duration-200 relative group w-fit"
                  >
                    {item.label}
                    <span className="absolute left-0 bottom-0 w-full h-[2.5px] bg-white transition-all duration-300 group-hover:w-0" />
                  </Link>
                ))}
              </div>

              {/* Email */}
              <div className="flex flex-col gap-4">
                <p className="text-white font-bold text-[13px] uppercase tracking-widest">Email List</p>
                <p className="text-white font-black text-[18px] leading-[1.3]">
                  Sign up and we'll let you know first when we do anything.
                </p>
                <div className="flex items-center border-2 border-white rounded-2xl px-4 py-3 bg-transparent">
                  <input
                    type="email"
                    placeholder="Email address"
                    className="flex-1 outline-none bg-transparent text-white text-[15px] placeholder-white/40 font-medium"
                  />
                  <button className="ml-2 w-8 h-8 border-2 border-white rounded-full flex items-center justify-center hover:bg-white hover:text-black transition-all duration-200 flex-shrink-0">
                    <ArrowRight className="w-4 h-4" strokeWidth={2.5} />
                  </button>
                </div>
                <div className="flex gap-3 mt-1">
                  <a href="https://www.facebook.com/CardsAgainstHumanity" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full border-2 border-white flex items-center justify-center hover:bg-white hover:text-black transition-all duration-200">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-white">
                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                    </svg>
                  </a>
                  <a href="https://instagram.com/cardsagainsthumanity" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full border-2 border-white flex items-center justify-center hover:bg-white hover:text-black transition-all duration-200">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                      <circle cx="12" cy="12" r="4" />
                      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                    </svg>
                  </a>
                </div>
              </div>

            </div>
          </div>
        )}

      </div>
    </>
  );
}