"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

/* Floating decorative icon */
const DecorativeIcon = ({
  className,
  animationClass = "",
}: {
  className: string;
  animationClass?: string;
}) => {
  return (
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
};

/* Small preview thumbnail */
function ImagePreview() {
  const images = [
    "/images/product-thumb.png",
    "/images/product-main.jpg",
    "/images/shit-list.jpg",
  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute bottom-5 left-[-10px] w-[90px] h-[90px] bg-white rounded-[18px] flex items-center justify-center shadow-xl">
      <Image
        src={images[index]}
        alt="preview"
        width={70}
        height={70}
        className="object-contain"
      />
    </div>
  );
}

/* Product image */
function ProductImage({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative w-[660px] h-[660px]">
      <Image src={src} alt={alt} fill className="object-contain" priority />
    </div>
  );
}

export default function ProductHero() {
  const mainImage = "/images/product-thumb.png";

  return (
    <section className="bg-black relative overflow-hidden">

      {/* Floating icons */}
      <DecorativeIcon className="top-[16%] left-[5%]" animationClass="animate-float" />
      <DecorativeIcon className="top-[40%] left-[2%]" animationClass="animate-float-reverse" />
      <DecorativeIcon className="top-[10%] left-[45%]" animationClass="animate-float-slow" />
      <DecorativeIcon className="top-[12%] right-[4%]" animationClass="animate-float" />
      <DecorativeIcon className="top-[34%] right-[2%]" animationClass="animate-spin-slow" />
      <DecorativeIcon className="bottom-[10%] right-[6%]" animationClass="animate-float-reverse" />

      {/* Layout Container */}
      <div className="max-w-[1500px] pl-16 pr-8 pt-12 pb-20">

        <div className="flex items-start gap-12">

          {/* Product Image */}
          <div className="relative flex-shrink-0">

            <ProductImage
              src={mainImage}
              alt="More Cards Against Humanity"
            />

            <ImagePreview />

          </div>

          {/* Product Content */}
          <div className="text-white max-w-[520px] pt-4">

            <h1 className="text-[42px] font-bold leading-[1.1] mb-6">
              More Cards Against
              <br />
              Humanity
            </h1>

            <p className="text-[20px] font-bold leading-[1.4] mb-6">
              <b>More Cards Against Humanity </b>
              comes<br></br>with 600 expansion cards that instantly<br></br>double the
              replayability and girth of your<br></br>deck.
            </p>

            <ul className="space-y-5 text-[22px] font-bold leading-[1.2] mb-2">

              <li className="flex gap-2">
                <span>•</span>
                <span>
                  If you’ve never bought an expansion<br></br>and you want more Cards
                  Against<br></br>Humanity, buy More Cards Against<br></br>Humanity.
                </span>
              </li>

              <li className="flex gap-2">
                <span>•</span>
                <span>
                  It’s got all the best jokes from our old<br></br>Red Box, Blue Box,
                  and Green Box<br></br>expansions, plus 50 cards we’ve never<br></br>printed
                  before.
                </span>
              </li>

              <li className="flex gap-4">
                <span>•</span>
                <span>Shiny!</span>
              </li>

            </ul>

            {/* Add to Cart Button */}
            <button className="flex items-center justify-between w-[380px] h-[58px] px-10 rounded-full border-2 border-white text-[27px] font-bold hover:bg-white hover:text-black transition-all duration-300">
              <span><strong>Add to Cart</strong></span>
              <span>€29</span>
            </button>

          </div>

        </div>

      </div>

      {/* Bottom Divider */}
      <div className="absolute bottom-0 w-full h-[2px] bg-white/70" />
    </section>
  );
}