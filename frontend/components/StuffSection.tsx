export default function StuffSection() {
  return (
    <section className="bg-black text-white py-16 md:py-20">
      <style>{`
        @keyframes wobble {
          0%   { transform: rotate(10deg); }
          15%  { transform: rotate(15deg); }
          30%  { transform: rotate(17deg); }
          45%  { transform: rotate(18deg); }
          60%  { transform: rotate(15deg); }
          75%  { transform: rotate(16deg); }
          90%  { transform: rotate(17deg); }
          100% { transform: rotate(10deg); }
        }

        .more-badge {
          position: absolute;
          top: -16px;
          right: -16px;
          z-index: 20;
          width: 72px;
          height: 72px;
          animation: wobble 2s ease-in-out infinite;
        }

        .stuff-card {
          border-radius: 16px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          min-height: 520px;
          position: relative;
        }

        .card-body {
          flex: 1;
          position: relative;
          overflow: hidden;
          min-height: 240px;
        }

        .card-img-wrap {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: flex-end;
          justify-content: flex-start;
          pointer-events: none;
        }

        .card-img-wrap img {
          object-fit: contain;
          object-position: left bottom;
          display: block;
          transform: translateY(30%);
          transition: transform 0.45s cubic-bezier(0.34, 1.3, 0.64, 1);
        }

        .stuff-card-link:hover .card-img-wrap img {
          transform: translateY(10%);
        }
      `}</style>

      <div className="max-w-[1200px] mx-auto px-6">
        <h2 className="text-[40px] md:text-[64px] font-black mb-12 tracking-tight">
          Stuff we&apos;ve done.
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

          {/* ── BLACK FRIDAY CARD ── Yellow */}
          <a href="#" className="stuff-card-link block" style={{ position: "relative" }}>
            <div className="stuff-card" style={{ backgroundColor: "#FFFF00" }}>
              <div style={{ padding: "20px 20px 0 20px" }}>
                <span style={{
                  backgroundColor: "#ff3b30", color: "#fff",
                  fontSize: "10px", fontWeight: 900, letterSpacing: "0.12em",
                  padding: "6px 12px", borderRadius: "999px",
                  display: "inline-block", marginBottom: "16px"
                }}>BLACK FRIDAY 2018</span>
                <h3 style={{
                  color: "#ff3b30", border: "2px dashed #ff3b30",
                  display: "inline-block", padding: "4px 8px",
                  fontSize: "clamp(32px,3.5vw,40px)", fontWeight: 900,
                  lineHeight: 1.1, margin: 0
                }}>
                  Holy fuck we<br />had some<br />deals.
                </h3>
              </div>
              <div className="card-body">
                <div className="card-img-wrap">
                  <img src="images/5.png" alt="Black Friday deals" style={{ width: "90%" }} />
                </div>
              </div>
              <div style={{
                backgroundColor: "#FFFF00", padding: "14px 20px",
                display: "flex", alignItems: "center", gap: "8px", position: "relative", zIndex: 2
              }}>
                <span style={{ fontSize: "14px", fontWeight: 700, color: "#ff3b30" }}>Read</span>
                <div style={{
                  width: "24px", height: "24px", borderRadius: "50%",
                  border: "2px solid #ff3b30",
                  display: "flex", alignItems: "center", justifyContent: "center"
                }}>
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <path d="M2 8L8 2M8 2H3M8 2V7" stroke="#ff3b30" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>
            </div>
          </a>

          {/* ── SCIENCE SCHOLARSHIP CARD ── Lavender */}
          <a href="#" className="stuff-card-link block" style={{ position: "relative" }}>
            <div className="stuff-card" style={{ backgroundColor: "#e8e0ff" }}>
              <div style={{ padding: "20px 20px 0 20px" }}>
                <span style={{
                  backgroundColor: "#7c3aed", color: "#fff",
                  fontSize: "10px", fontWeight: 900, letterSpacing: "0.12em",
                  padding: "6px 12px", borderRadius: "999px",
                  display: "inline-block", marginBottom: "16px"
                }}>SCIENCE SCHOLARSHIP</span>
                <h3 style={{
                  color: "#7c3aed",
                  fontSize: "clamp(32px,3.5vw,40px)", fontWeight: 900,
                  lineHeight: 1.1, margin: 0
                }}>
                  A full-tuition<br />scholarship for<br />women.
                </h3>
              </div>
              <div className="card-body">
                <div className="card-img-wrap">
                  <img src="images/4.png" alt="Science scholarship" style={{ width: "70%" }} />
                </div>
              </div>
              <div style={{
                backgroundColor: "#e8e0ff", padding: "14px 20px",
                display: "flex", alignItems: "center", gap: "8px", position: "relative", zIndex: 2
              }}>
                <span style={{ fontSize: "14px", fontWeight: 700, color: "#7c3aed" }}>Read</span>
                <div style={{
                  width: "24px", height: "24px", borderRadius: "50%",
                  border: "2px solid #7c3aed",
                  display: "flex", alignItems: "center", justifyContent: "center"
                }}>
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <path d="M2 8L8 2M8 2H3M8 2V7" stroke="#7c3aed" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>
            </div>
          </a>

          {/* ── HOLIDAY HOLE CARD ── Blue */}
          <a href="#" className="stuff-card-link block" style={{ position: "relative" }}>

            {/* More to come — small, wobbling badge */}
            <img
              src="https://img.cah.io/images/vc07edlh/production/6d7d67943605f882af1c5c779e5e77f7c23bb6a4-86x86.svg?auto=format&q=75"
              alt="More to come!"
              className="more-badge"
            />

            <div className="stuff-card" style={{ backgroundColor: "#2243fe" }}>
              <div style={{ padding: "20px 20px 0 20px" }}>
                <span style={{
                  backgroundColor: "#f5a623", color: "#fff",
                  fontSize: "10px", fontWeight: 900, letterSpacing: "0.12em",
                  padding: "6px 12px", borderRadius: "999px",
                  display: "inline-block", marginBottom: "16px"
                }}>HOLIDAY HOLE</span>
                <h3 style={{
                  color: "#f5a623",
                  fontSize: "clamp(32px,3.5vw,40px)", fontWeight: 900,
                  lineHeight: 1.1, margin: 0
                }}>
                  You paid us to<br />dig a big hole<br />in the ground.
                </h3>
              </div>
              <div className="card-body">
                <div className="card-img-wrap">
                  <img src="images/3.png" alt="Excavator digging" style={{ width: "90%" }} />
                </div>
              </div>
              <div style={{
                backgroundColor: "#2243fe", padding: "14px 20px",
                display: "flex", alignItems: "center", gap: "8px", position: "relative", zIndex: 2
              }}>
                <span style={{ fontSize: "14px", fontWeight: 700, color: "#f5a623" }}>Read</span>
                <div style={{
                  width: "24px", height: "24px", borderRadius: "50%",
                  border: "2px solid #f5a623",
                  display: "flex", alignItems: "center", justifyContent: "center"
                }}>
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <path d="M2 8L8 2M8 2H3M8 2V7" stroke="#f5a623" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>
            </div>
          </a>

        </div>
      </div>
    </section>
  )
}