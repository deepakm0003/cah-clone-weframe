"use client"

import { X, Plus } from "lucide-react"
import { useState } from "react"

const faqs = [
  {
    q: "Where can I buy Cards Against Humanity?",
    a: "Our products are available all over the place, such as our webstore, Amazon, and at all of these retailers."
  },
  {
    q: "Can I still buy it even if I'm not in America?",
    a: "Yes! We ship internationally from our webstore. Some products may have limited availability depending on your region."
  },
  {
    q: "How do I play Cards Against Humanity?",
    a: "One player asks a question from a Black Card, and everyone else answers with their funniest White Card. The person who asked picks the funniest answer. That person wins the round."
  },
  {
    q: "Do you sell expansions?",
    a: "Yes, we sell tons of expansions! Check out our webstore for the full lineup of packs and expansions."
  },
  {
    q: "I bought something from you and now there's a problem.",
    a: "We're sorry about that! Please reach out to our support team and we'll make it right."
  },
  {
    q: "Can I sell Cards Against Humanity in my store?",
    a: "Yes! We have a list of approved retailers. Check our site for wholesale information."
  },
  {
    q: "Are the expansions available as free downloads like the main game?",
    a: "Nope, only the main game is available as a free download. Expansions are available for purchase."
  },
  {
    q: "Do you make a version for families and kids?",
    a: "No. Cards Against Humanity is specifically designed for adults and contains adult themes."
  },
  {
    q: "I bought Cards Against Humanity way back in like 2014 or something. Should I buy it again?",
    a: "Maybe! We've added a lot of new cards and updated the game since then. Check out what's new on our site."
  },
  {
    q: "You should make a Cards Against Humanity app.",
    a: "We have thought about it. In the meantime, there are some unofficial apps that let you play online."
  },
  {
    q: "Can I play Cards Against Humanity online anywhere?",
    a: "There are some unofficial online versions available. We haven't made an official one yet."
  },
  {
    q: "Can I sell my own Cards Against Humanity thing?",
    a: "The game is available under a Creative Commons license, so you can make your own version for free, but you can't sell it."
  },
  {
    q: "Listen, I have some great card suggestions.",
    a: "We're sure you do! Unfortunately we don't accept card submissions, but we appreciate the enthusiasm."
  },
  {
    q: "I'm offended by your game.",
    a: "We're sorry to hear that. Cards Against Humanity is designed to be irreverent and is not for everyone."
  },
  {
    q: "Can I pay you to make a custom pack for my wedding? How about my divorce?",
    a: "We don't do custom packs for individuals, but there are some fan-made tools that let you print your own cards."
  },
  {
    q: "Can you help me prank my friend by sending them glitter, poop, and/or some other item that is incredibly inconvenient to ship?",
    a: "We've done stuff like that in the past as holiday promotions, but it's not a regular service we offer."
  },
  {
    q: "Is it true that you bought an island and named it Hawaii 2?",
    a: "Yes, this is true. We bought an island off the coast of Maine and named it Hawaii 2."
  },
  {
    q: "Didn't you pivot to potato chips?",
    a: "We did sell a limited run of potato chips at some point. It was a thing that happened."
  },
  {
    q: "Are you still selling cars for like $97?",
    a: "We did a promotion where we sold a car for $97. That was a one-time thing."
  },
  {
    q: "I love you.",
    a: "We love you too. Thank you for playing our game."
  }
]

export default function FAQSection() {
  const [openIndices, setOpenIndices] = useState<Set<number>>(new Set())
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [allExpanded, setAllExpanded] = useState(false)

  const toggleIndex = (index: number) => {
    setOpenIndices(prev => {
      const next = new Set(prev)
      next.has(index) ? next.delete(index) : next.add(index)
      return next
    })
  }

  const handleExpandAll = () => {
    if (allExpanded) {
      setAllExpanded(false)
      setOpenIndices(new Set())
    } else {
      setAllExpanded(true)
      setOpenIndices(new Set(faqs.map((_, i) => i)))
    }
  }

  const visibleFaqs = faqs

  return (
    <section
      style={{
        backgroundColor: "#000000",
        color: "#ffffff",
        padding: "48px 0",
        minHeight: "100vh",
        fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
      }}
    >
      <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "0 40px" }}>
        <h2
          style={{
            fontSize: "clamp(36px, 5vw, 64px)",
            fontWeight: "900",
            marginBottom: "32px",
            letterSpacing: "-0.02em",
            lineHeight: 1.1,
          }}
        >
          Your dumb questions.
        </h2>

        <div>
          {visibleFaqs.map((faq, index) => {
            const isOpen = openIndices.has(index)
            const isHovered = hoveredIndex === index

            return (
              <div
                key={index}
                style={{
                  borderTop: "1px solid #444",
                  ...(index === visibleFaqs.length - 1 ? { borderBottom: "1px solid #444" } : {}),
                  backgroundColor: isHovered && !isOpen ? "#2a2a2a" : "transparent",
                  transition: "background-color 0.15s ease",
                }}
              >
                <button
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "21px 0",
                    textAlign: "left",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    color: "#ffffff",
                    transition: "color 0.15s ease",
                  }}
                  onClick={() => toggleIndex(index)}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  <span
                    style={{
                      fontSize: "clamp(35px, 2vw, 20px)",
                      fontWeight: "700",
                      paddingRight: "24px",
                      lineHeight: 1.3,
                    }}
                  >
                    {faq.q}
                  </span>
                  {isOpen ? (
                    <X style={{ width: "20px", height: "20px", flexShrink: 0, color: "#ffffff" }} />
                  ) : (
                    <Plus
                      style={{
                        width: "20px",
                        height: "20px",
                        flexShrink: 0,
                        color: isHovered ? "#ffffff" : "#ffffff",
                      }}
                    />
                  )}
                </button>

                {isOpen && (
                  <div
                    style={{
                      paddingBottom: "20px",
                      paddingRight: "44px",
                      color: "#cccccc",
                    }}
                  >
                    <p
                      style={{
                        fontSize: "clamp(26px, 1.5vw, 16px)",
                        lineHeight: 1.6,
                        textAlign: "left",
                      }}
                    >
                      {faq.a}
                    </p>
                  </div>
                )}
              </div>
            )
          })}
        </div>

        <div style={{ textAlign: "right", marginTop: "32px" }}>
          <button
            onClick={handleExpandAll}
            style={{
              border: "1px solid #ffffff",
              borderRadius: "9999px",
              padding: "20px 36px",
              fontSize: "35px",
              fontWeight: "600",
              color: "#000000",
              background: "#ffffff",
              cursor: "pointer",
              transition: "background-color 0.15s ease, color 0.15s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#000000ff"
              e.currentTarget.style.color = "#ffffff"
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "#ffffff"
              e.currentTarget.style.color = "#000000"
            }}
          >
            {allExpanded ? "Close All" : "Expand All"}
          </button>
        </div>
      </div>
    </section>
  )
}