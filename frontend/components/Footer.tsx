"use client";

import Link from "next/link";
import { ArrowRight, ChevronDown, ChevronUp } from "lucide-react";
import { useState, useRef, useEffect } from "react";

const shopLinks = [
  { label: "All Products", href: "https://www.cardsagainsthumanity.com/shop/all" },
  { label: "Main Games", href: "https://www.cardsagainsthumanity.com/shop/main-games" },
  { label: "Expansions", href: "https://www.cardsagainsthumanity.com/shop/expansions" },
  { label: "Family", href: "https://www.cardsagainsthumanity.com/shop/family" },
  { label: "Packs", href: "https://www.cardsagainsthumanity.com/shop/packs" },
  { label: "Other Stuff", href: "https://www.cardsagainsthumanity.com/shop/other-stuff" },
];
const infoLinks = [
  { label: "About", href: "https://www.cardsagainsthumanity.com/about" },
  { label: "Support", href: "https://www.cardsagainsthumanity.com/support" },
  { label: "Contact", href: "https://www.cardsagainsthumanity.com/contact" },
  { label: "Retailers", href: "https://www.cardsagainsthumanity.com/retailers" },
  { label: "Steal", href: "https://www.cardsagainsthumanity.com/#downloads" },
  { label: "Careers", href: "https://www.cardsagainsthumanity.com/careers" },
];
const socialLinks = [
  { label: "Facebook", href: "https://www.facebook.com/CardsAgainstHumanity" },
  { label: "Instagram", href: "https://instagram.com/cardsagainsthumanity" },
  { label: "TikTok", href: "https://www.tiktok.com/@cardsagainsthumanity" },
  { label: "Bluesky", href: "https://bsky.app/profile/cardsagainsthumanity.com" },
  { label: "Amazon", href: "https://www.amazon.com/stores/page/66E40BA9-1C4A-4686-BEFB-55B94789694E" },
  { label: "Target", href: "https://www.target.com/s?searchTerm=cards+against+humanity" },
];

const countries = [
  "US", "Canada", "UK", "Australia", "New Zealand",
  "Albania", "Algeria", "Andorra", "Angola", "Antigua & Barbuda",
  "Argentina", "Armenia", "Austria", "Azerbaijan", "Bahamas",
  "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium",
  "Belize", "Benin", "Bhutan", "Bolivia", "Bosnia & Herzegovina",
  "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso",
  "Burundi", "Cambodia", "Cameroon", "Cape Verde", "Chad",
  "Chile", "China", "Colombia", "Comoros", "Congo",
  "Costa Rica", "Croatia", "Cuba", "Cyprus", "Czech Republic",
  "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador",
  "Egypt", "El Salvador", "Eritrea", "Estonia", "Eswatini",
  "Ethiopia", "Fiji", "Finland", "France", "Gabon",
  "Gambia", "Georgia", "Germany", "Ghana", "Greece",
  "Grenada", "Guatemala", "Guinea", "Guyana", "Haiti",
  "Honduras", "Hungary", "Iceland", "India", "Indonesia",
  "Iran", "Iraq", "Ireland", "Israel", "Italy",
  "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya",
  "Kosovo", "Kuwait", "Kyrgyzstan", "Laos", "Latvia",
  "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein",
  "Lithuania", "Luxembourg", "Madagascar", "Malawi", "Malaysia",
  "Maldives", "Mali", "Malta", "Mauritania", "Mauritius",
  "Mexico", "Moldova", "Monaco", "Mongolia", "Montenegro",
  "Morocco", "Mozambique", "Myanmar", "Namibia", "Nepal",
  "Netherlands", "Nicaragua", "Niger", "Nigeria", "North Macedonia",
  "Norway", "Oman", "Pakistan", "Panama", "Papua New Guinea",
  "Paraguay", "Peru", "Philippines", "Poland", "Portugal",
  "Qatar", "Romania", "Russia", "Rwanda", "Saudi Arabia",
  "Senegal", "Serbia", "Sierra Leone", "Singapore", "Slovakia",
  "Slovenia", "Somalia", "South Africa", "South Korea", "Spain",
  "Sri Lanka", "Sudan", "Sweden", "Switzerland", "Syria",
  "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Togo",
  "Trinidad & Tobago", "Tunisia", "Turkey", "Turkmenistan", "Uganda",
  "Ukraine", "United Arab Emirates", "Uruguay", "Uzbekistan", "Venezuela",
  "Vietnam", "Yemen", "Zambia", "Zimbabwe",
];

function CountrySelector() {
  const [selected, setSelected] = useState("India");
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={ref} className="relative w-[160px]">
      {/* Trigger button */}
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center justify-between w-full border-2 border-black rounded-full px-5 py-2 font-bold text-[15px] bg-transparent text-black cursor-pointer select-none"
      >
        <span>{selected}</span>
        <span className="ml-2 transition-transform duration-300" style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }}>
          <ChevronDown className="w-4 h-4" strokeWidth={2.5} />
        </span>
      </button>

      {/* Dropdown panel — opens upward */}
      <div
        className="absolute bottom-[calc(100%+8px)] left-0 w-[280px] border-2 border-black rounded-2xl bg-white overflow-hidden shadow-lg z-50"
        style={{
          maxHeight: open ? "320px" : "0px",
          opacity: open ? 1 : 0,
          transition: "max-height 0.35s cubic-bezier(0.4,0,0.2,1), opacity 0.25s ease",
          pointerEvents: open ? "auto" : "none",
        }}
      >
        {/* Selected item pinned at top */}
        <div className="bg-black text-white font-bold text-[16px] px-5 py-3 sticky top-0">
          {selected}
        </div>

        {/* Scrollable country list */}
        <div className="overflow-y-auto" style={{ maxHeight: "260px" }}>
          {countries
            .filter((c) => c !== selected)
            .map((country) => (
              <button
                key={country}
                onClick={() => { setSelected(country); setOpen(false); }}
                className="w-full text-left px-5 py-[10px] text-[15px] font-semibold text-black hover:bg-gray-100 transition-colors duration-150 border-b border-gray-100 last:border-0"
              >
                {country}
              </button>
            ))}
        </div>

        {/* Close handle pinned at bottom */}
        <div
          className="sticky bottom-0 border-t-2 border-black bg-white flex items-center justify-between px-5 py-3 cursor-pointer"
          onClick={() => setOpen(false)}
        >
          <span className="font-bold text-[15px]">{selected}</span>
          <ChevronUp className="w-4 h-4" strokeWidth={2.5} />
        </div>
      </div>
    </div>
  );
}

function FooterLink({ label, href }: { label: string; href: string }) {
  const isExternal = href.startsWith("http");
  return (
    <Link
      href={href}
      {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className="relative font-bold text-[20px] group w-fit leading-[1.2] text-black"
    >
      {label}
      <span className="absolute left-0 bottom-0 h-[2px] w-full bg-black transition-all duration-300 group-hover:w-0" />
    </Link>
  );
}

export default function Footer() {
  return (
    <footer className="bg-[#f5f5f0] text-black pt-20 pb-14 font-sans">
      <div className="max-w-[1400px] mx-auto px-14">

        {/* ── MAIN GRID ── */}
        <div className="grid grid-cols-[280px_1fr_1fr_1fr_340px] gap-x-8 items-start">

          {/* Logo */}
          <div className="pt-1">
            <h2 className="text-[38px] font-black leading-[1.05] tracking-tight text-black">
              Cards<br />Against<br />Humanity
            </h2>
          </div>

          {/* Shop */}
          <div className="flex flex-col">
            <h3 className="font-bold text-[20px] mb-5 text-black">Shop</h3>
            <div className="flex flex-col gap-[14px]">
              {shopLinks.map((link) => <FooterLink key={link.label} label={link.label} href={link.href} />)}
            </div>
          </div>

          {/* Info */}
          <div className="flex flex-col">
            <h3 className="font-bold text-[20px] mb-5 text-black">Info</h3>
            <div className="flex flex-col gap-[14px]">
              {infoLinks.map((link) => <FooterLink key={link.label} label={link.label} href={link.href} />)}
            </div>
          </div>

          {/* Find Us */}
          <div className="flex flex-col">
            <h3 className="font-bold text-[20px] mb-5 text-black">Find Us</h3>
            <div className="flex flex-col gap-[14px]">
              {socialLinks.map((link) => <FooterLink key={link.label} label={link.label} href={link.href} />)}
            </div>
          </div>

          {/* Email List */}
          <div className="flex flex-col gap-4">
            <h3 className="font-bold text-[20px] text-black">Email List</h3>
            <p className="text-[20px] font-bold leading-[1.3] text-black">
              Sign up and we&apos;ll let you know first when we do anything:
            </p>
            <div className="flex items-center border-2 border-black rounded-2xl px-5 py-3 w-full bg-white">
              <input
                type="email"
                placeholder="Email Address"
                className="flex-1 outline-none bg-transparent text-[17px] text-black placeholder-gray-400 font-medium"
              />
              <button className="ml-2 w-10 h-10 border-2 border-black rounded-full flex items-center justify-center flex-shrink-0 hover:bg-black hover:text-white transition-colors duration-200">
                <ArrowRight strokeWidth={2.5} className="w-5 h-5" />
              </button>
            </div>
          </div>

        </div>

        {/* ── DIVIDER ── */}
        <div className="border-t-2 border-black/20 mt-16 mb-6" />

        {/* ── BOTTOM BAR ── */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">

          <CountrySelector />

          {/* Legal links */}
          <div className="text-right">
            <div className="flex flex-wrap gap-5 text-[13px] font-bold mb-1 justify-end">
              {[
                { label: "Terms of Use", href: "https://www.cardsagainsthumanity.com/terms-of-use" },
                { label: "Privacy Policy", href: "https://www.cardsagainsthumanity.com/privacy-policy" },
                { label: "Submission Terms", href: "https://www.cardsagainsthumanity.com/submission-terms" },
              ].map((item) => (
                <Link key={item.label} href={item.href} target="_blank" rel="noopener noreferrer" className="relative group text-black underline underline-offset-2 hover:opacity-60 transition-opacity">
                  {item.label}
                </Link>
              ))}
            </div>
            <p className="text-[13px] text-black/60">©2026 Cards Against Humanity LLC</p>
          </div>

        </div>

      </div>
    </footer>
  );
}