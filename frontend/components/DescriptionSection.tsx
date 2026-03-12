export default function DescriptionSection() {
  return (
    <section className="bg-[#FFFFFF] py-16 md:py-24 relative overflow-hidden" style={{ minHeight: '570px' }}>

      {/* Top left - Rocket icon */}
      <div className="absolute left-[12%] top-[12%] text-black">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2.5s4.5 2 4.5 9.5l1.5 1.5H18c0 3-1.5 5-1.5 5l-1.5-1.5s-1 1-3 1-3-1-3-1L7.5 18.5S6 16.5 6 13.5h.5l1.5-1.5C8 5 12.5 2.5 12 2.5zm0 6c-.83 0-1.5.67-1.5 1.5S11.17 11.5 12 11.5s1.5-.67 1.5-1.5S12.83 8.5 12 8.5zM8 19s.5 2.5 4 2.5 4-2.5 4-2.5" />
          <path d="M9.5 2C7 3.5 5.5 6 5 8.5L3 11l1.5 1.5L6 11c.3-2 1.2-3.8 3-5L9.5 2zM14.5 2c2.5 1.5 4 4 4.5 6.5l2 2.5-1.5 1.5L18 11c-.3-2-1.2-3.8-3-5L14.5 2z" />
          <ellipse cx="12" cy="10" rx="2" ry="2" />
          <path d="M12 2C9 3 7 6 7 10l-2 2 1.5 1.5 1-1C8 8 9.5 5 12 4c2.5 1 4 4 4.5 8.5l1 1L19 12l-2-2C17 6 15 3 12 2z" fillRule="evenodd" />
        </svg>
      </div>

      {/* Top center - Beaker/Flask icon */}
      <div className="absolute left-[55%] top-[8%] text-black">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
          <path d="M7 2v2h1v7L4 17c-.5 1-.2 2 .4 2.6.5.4 1 .4 1.6.4h12c.6 0 1.1 0 1.6-.4.6-.6.9-1.6.4-2.6L16 11V4h1V2H7zm5 9.5c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm-2.5-2c.6 0 1 .4 1 1s-.4 1-1 1-1-.4-1-1 .4-1 1-1z" />
        </svg>
      </div>

      {/* Top right - Globe icon */}
      <div className="absolute right-[6%] top-[8%] text-black">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
        </svg>
      </div>

      {/* Left side - Diamond/Gem icon */}
      <div className="absolute left-[3%] top-[28%] text-black">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
          <path d="M6 2l-6 7 12 13L24 9l-6-7H6zm-.5 2h3l-2 4H2.5l3-4zm5.5 0h2l2 4h-6l2-4zm5.5 0h3l3 4h-4l-2-4zM2 11h4.5l5.5 9-10-9zm14.5 0H21l-9 9 4.5-9zm-6.5 0h4l-2 6-2-6z" />
        </svg>
      </div>

      {/* Left side lower - Leaf/Cannabis icon */}
      <div className="absolute left-[8%] bottom-[28%] text-black">
        <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C9 5 8 8 9 11c-2-1-4-1-6 1 2 0 4 1 5 3-2 0-4 1-5 3 3-1 5 0 6 2l-1 2h2l1-2c1-2 3-3 6-2-1-2-3-3-5-3 1-2 3-3 5-3-2-2-4-2-6-1 1-3 0-6-3-9z" />
        </svg>
      </div>

      {/* Right side - Hand/Magic icon */}
      <div className="absolute right-[7%] top-[45%] text-black">
        <svg width="30" height="30" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.7 3.3c-1.6-1.6-4.1-1.6-5.7 0L4 12.3V19h6.7l9-9c1.6-1.6 1.6-4.1 0-5.7zM10.3 17H6v-4.3l6-6 4.3 4.3-6 6zm7.4-7.4l-1.8 1.8-4.3-4.3 1.8-1.8c.8-.8 2.1-.8 2.9 0l1.4 1.4c.8.8.8 2.1 0 2.9z" />
        </svg>
      </div>

      {/* Bottom center - Floppy disk icon */}
      <div className="absolute left-[30%] bottom-[5%] text-black">
        <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V7l-4-4zm-5 16c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm3-10H5V5h10v4z" />
        </svg>
      </div>

      {/* Bottom right - Brain/Cloud cluster icon */}
      <div className="absolute right-[18%] bottom-[18%] text-black">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
          <path d="M13 3c-1.3 0-2.4.8-2.8 2C9.5 5 9 5 8.5 5.2 7.6 5.6 7 6.5 7 7.5c0 .2 0 .4.1.6C6.4 8.4 6 9.1 6 10c0 1.1.9 2 2 2h.2c.1.3.2.6.4.8-.8.4-1.6 1-2.1 1.8-.5.7-.5 1.6 0 2.4.4.7 1.1 1 1.8 1H13v-5.5l-1.5-1.5L13 9.5V8h5v1.5l1.5 1.5L18 12.5V18h1.1c.7 0 1.4-.3 1.8-1 .5-.8.5-1.7 0-2.4-.5-.8-1.3-1.4-2.1-1.8.2-.2.3-.5.4-.8H19c1.1 0 2-.9 2-2 0-.9-.4-1.6-1.1-1.9.1-.2.1-.4.1-.6 0-1-.6-1.9-1.5-2.3C18 5.8 17.5 5.8 17 5.8c-.4-1.1-1.5-1.8-2.7-1.8H13z" />
        </svg>
      </div>

      {/* Bottom far right - Pepper/Chili icon */}
      <div className="absolute right-[5%] bottom-[12%] text-black">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
          <path d="M15 4c0-1.1-.9-2-2-2s-2 .9-2 2c0 .7.4 1.4 1 1.7V7c-3.9.5-7 3.8-7 7.8C5 19.3 8.1 22 12 22s7-2.7 7-7.2C19 10.8 15.9 7.5 12 7V5.7c.6-.3 1-.9 1-1.7zm-3 16c-2.8 0-5-2.1-5-5.2 0-3 2.2-5.4 5-5.7 2.8.3 5 2.7 5 5.7 0 3.1-2.2 5.2-5 5.2z" />
        </svg>
      </div>

      {/* Description Text */}
      <div className="max-w-[900px] mx-auto px-6 text-center relative z-10">
        <p className="text-[26px] md:text-[22px] lg:text-[35px] leading-[1.4] mb-6">
          <span className="font-bold">Cards Against Humanity</span> is a fill-in-the-blank party game that turns your awkward personality and lackluster social skills into hours of fun! Wow.
        </p>
        <p className="text-[18px] md:text-[22px] lg:text-[35px] leading-[1.5]">
          The game is simple. Each round, one player asks a question from a black card, and everyone else answers with their funniest white card.
        </p>
      </div>
    </section>
  )
}