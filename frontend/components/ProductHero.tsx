"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { useCart } from "@/context/CartContext";
import type { MedusaProduct } from "@/lib/medusa";

/* ─── Floating decorative icon ─────────────────────────────── */
const DecorativeIcon = ({
  className,
  animationClass = "",
}: {
  className: string;
  animationClass?: string;
}) => (
  <span className={`absolute ${className} ${animationClass}`}>
    <Image
      src="https://img.cah.io/images/vc07edlh/production/95aa6c292fc04d0b9b3619309cab0df0757ba107-20x20.svg?auto=format&q=75&w=20"
      alt="decorative icon"
      width={20}
      height={20}
      className="opacity-90"
    />
  </span>
);

/* ─── Gallery images ────────────────────────────────────────── */
const GALLERY_IMAGES = [
  { src: "/images/product-thumb.png", alt: "Cards Against Humanity" },
  { src: "/images/product-main.jpg", alt: "More Cards Against Humanity" },
  { src: "/images/shit-list.jpg", alt: "More Cards Against Humanity – detail" },
];

/* ─── Inline Gallery Popup ──────────────────────────────────── */
function InlineGalleryPopup({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [index, setIndex] = useState(0);

  const navigate = (dir: 1 | -1) =>
    setIndex((p) => (p + dir + GALLERY_IMAGES.length) % GALLERY_IMAGES.length);

  useEffect(() => {
    if (!isOpen) return;
    const fn = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") navigate(1);
      if (e.key === "ArrowLeft") navigate(-1);
    };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [isOpen, onClose]);

  return (
    <div className="absolute inset-0 z-20 flex items-end justify-start pointer-events-none">
      <div
        className="pointer-events-auto w-[420px] rounded-[20px] bg-white overflow-hidden"
        style={{
          opacity: isOpen ? 1 : 0,
          transform: isOpen ? "scale(1) translateY(0)" : "scale(0.90) translateY(40px)",
          maxHeight: isOpen ? "640px" : "0px",
          boxShadow: isOpen
            ? "0 28px 70px rgba(0,0,0,0.50), 0 6px 20px rgba(0,0,0,0.18)"
            : "none",
          pointerEvents: isOpen ? "auto" : "none",
          transition: "opacity 420ms cubic-bezier(0.34,1.18,0.64,1), transform 420ms cubic-bezier(0.34,1.18,0.64,1), max-height 420ms cubic-bezier(0.34,1.18,0.64,1), box-shadow 420ms ease",
        }}
      >
        {/* ── Top bar ── */}
        <div className="flex items-center justify-between px-5 pt-5 pb-4">
          <button
            onClick={onClose}
            className="flex items-center gap-1 border border-black/25 rounded-full px-4 py-1.5 text-[11px] font-black tracking-widest text-black hover:bg-black hover:text-white transition-all duration-200"
          >
            ↙ HIDE
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={() => navigate(-1)}
              className="w-9 h-9 rounded-full border border-black/20 flex items-center justify-center text-sm font-bold text-black hover:bg-black hover:text-white transition-all duration-200"
            >
              ←
            </button>
            <button
              onClick={() => navigate(1)}
              className="w-9 h-9 rounded-full border border-black/20 flex items-center justify-center text-sm font-bold text-black hover:bg-black hover:text-white transition-all duration-200"
            >
              →
            </button>
          </div>
        </div>

        {/* ── Single tall rectangle image ── */}
        <div className="px-5 pb-5">
          {/* aspect-ratio 2/3 = tall portrait rectangle */}
          <div
            className="relative w-full rounded-2xl overflow-hidden bg-[#efefef]"
            style={{ aspectRatio: "2 / 3" }}
          >
            {/* fade between images */}
            {GALLERY_IMAGES.map((img, i) => (
              <div
                key={img.src}
                className="absolute inset-0 transition-opacity duration-500 ease-in-out"
                style={{ opacity: i === index ? 1 : 0 }}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-contain"
                  priority={i === 0}
                />
              </div>
            ))}

            {/* counter badge */}
            <span className="absolute top-3 right-3 bg-black/55 text-white text-[10px] font-black tracking-wider px-2.5 py-1 rounded-full z-10">
              {index + 1} / {GALLERY_IMAGES.length}
            </span>
          </div>

          {/* ── Dot indicators ── */}
          <div className="flex justify-center gap-2 mt-4">
            {GALLERY_IMAGES.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                className="rounded-full transition-all duration-300"
                style={{
                  width: i === index ? "20px" : "8px",
                  height: "8px",
                  background: i === index ? "#000" : "rgba(0,0,0,0.18)",
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Small thumbnail (bottom-left) ────────────────────────── */
function ImagePreview({
  currentIndex,
  onClick,
}: {
  currentIndex: number;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      aria-label="Open image gallery"
      className="absolute bottom-5 left-[-10px] w-[90px] h-[90px] bg-white rounded-[18px] flex items-center justify-center shadow-xl cursor-pointer hover:scale-105 hover:shadow-2xl active:scale-100 transition-all duration-200 z-10"
    >
      <Image
        src={GALLERY_IMAGES[currentIndex].src}
        alt={GALLERY_IMAGES[currentIndex].alt}
        width={70}
        height={70}
        className="object-contain"
      />
    </button>
  );
}

/* ─── Main product image ────────────────────────────────────── */
function ProductImage({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative w-[660px] h-[660px]">
      <Image src={src} alt={alt} fill className="object-contain" priority />
    </div>
  );
}

export default function ProductHero({ product }: { product?: MedusaProduct }) {
  const mainImage = product?.thumbnail || "/images/product-thumb.png";

  const { addItem, isLoading, setCartOpen } = useCart();
  const [isAdding, setIsAdding] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const [thumbIndex, setThumbIndex] = useState(0);
  const [popupOpen, setPopupOpen] = useState(false);

  useEffect(() => {
    const id = setInterval(
      () => setThumbIndex((p) => (p + 1) % GALLERY_IMAGES.length),
      3000
    );
    return () => clearInterval(id);
  }, []);

  return (
    <section className="bg-black relative overflow-hidden">

      <DecorativeIcon className="top-[16%] left-[5%]" animationClass="animate-float" />
      <DecorativeIcon className="top-[40%] left-[2%]" animationClass="animate-float-reverse" />
      <DecorativeIcon className="top-[10%] left-[45%]" animationClass="animate-float-slow" />
      <DecorativeIcon className="top-[12%] right-[4%]" animationClass="animate-float" />
      <DecorativeIcon className="top-[34%] right-[2%]" animationClass="animate-spin-slow" />
      <DecorativeIcon className="bottom-[10%] right-[6%]" animationClass="animate-float-reverse" />

      <div className="max-w-[1500px] pl-16 pr-8 pt-12 pb-20">
        <div className="flex items-start gap-12">

          {/* Left: product image + inline popup */}
          <div className="relative flex-shrink-0">
            <ProductImage src={mainImage} alt="More Cards Against Humanity" />

            <InlineGalleryPopup
              isOpen={popupOpen}
              onClose={() => setPopupOpen(false)}
            />

            <ImagePreview
              currentIndex={thumbIndex}
              onClick={() => setPopupOpen((p) => !p)}
            />
          </div>

          {/* Right: content */}
          <div className="text-white max-w-[520px] pt-4">
            <h1 className="text-[42px] font-bold leading-[1.1] mb-6">
              More Cards Against
              <br />
              Humanity
            </h1>

            <p className="text-[20px] font-bold leading-[1.4] mb-6">
              <b>More Cards Against Humanity </b>
              comes<br />with 600 expansion cards that instantly<br />double the
              replayability and girth of your<br />deck.
            </p>

            <ul className="space-y-5 text-[22px] font-bold leading-[1.2] mb-2">
              <li className="flex gap-2">
                <span>•</span>
                <span>
                  If you've never bought an expansion<br />and you want more Cards
                  Against<br />Humanity, buy More Cards Against<br />Humanity.
                </span>
              </li>
              <li className="flex gap-2">
                <span>•</span>
                <span>
                  It's got all the best jokes from our old<br />Red Box, Blue Box,
                  and Green Box<br />expansions, plus 50 cards we've never<br />printed
                  before.
                </span>
              </li>
              <li className="flex gap-4">
                <span>•</span>
                <span>Shiny!</span>
              </li>
            </ul>

            <button
              onClick={async () => {
                if (!product?.variants?.[0]?.id || isAdding) return;
                setIsAdding(true);
                try {
                  await addItem(product.variants[0].id, 1);
                  setShowSuccess(true);
                  setCartOpen(true);
                  setTimeout(() => setShowSuccess(false), 2000);
                } finally {
                  setIsAdding(false);
                }
              }}
              disabled={isLoading || isAdding || !product}
              className="flex items-center justify-between w-[380px] h-[58px] px-10 rounded-full border-2 border-white text-[27px] font-bold hover:bg-white hover:text-black transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed group relative overflow-hidden"
            >
              <span className="relative z-10">
                <strong>{isAdding ? "Adding..." : showSuccess ? "Added!" : "Add to Cart"}</strong>
              </span>
              <span className="relative z-10">
                {product?.variants?.[0]?.prices?.[0]
                  ? new Intl.NumberFormat('en-IE', { style: 'currency', currency: product.variants[0].prices[0].currency_code }).format(product.variants[0].prices[0].amount / 100)
                  : "€29.00"}
              </span>
              {showSuccess && (
                <div className="absolute inset-0 bg-green-500 animate-in fade-in slide-in-from-bottom-5 duration-300" />
              )}
            </button>
          </div>

        </div>
      </div>

      <div className="absolute bottom-0 w-full h-[2px] bg-white/70" />
    </section>
  );
}