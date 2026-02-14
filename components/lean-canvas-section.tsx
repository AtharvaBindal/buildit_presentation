"use client"

import { useRef, useEffect, useState } from "react"
import Link from "next/link"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"

gsap.registerPlugin(ScrollTrigger)

const leanCanvasSections = [
  {
    id: "problem",
    title: "Problem",
    items: [
      {
        title: "Top 3 Problems:",
        points: [
          "Students watch hours of tutorials but freeze when building independently",
          "Most learners collect courses instead of skills, mistaking progress for productivity",
          "Anyone can write 'proficient in X,' but very few can actually prove it",
        ],
      },
      {
        title: "Existing Alternatives:",
        points: [
          "Online courses (Udemy, Coursera)",
          "Tutorial videos (YouTube, freeCodeCamp)",
          "Bootcamps",
          "University degrees",
        ],
      },
    ],
  },
  {
    id: "solution",
    title: "Solution",
    items: [
      {
        title: "Top 3 Features:",
        points: [
          "Project-based learning with real-world projects",
          "Mentor-guided development and code reviews",
          "Verified portfolio generation from actual contributions",
        ],
      },
    ],
  },
  {
    id: "uvp",
    title: "Unique Value Proposition",
    items: [
      {
        title: "",
        points: [
          "Build Skills. Build Projects. Build Proof.",
          "Learn by doing, not just watching",
          "Verified skills through real project contributions",
          "Why this matters:",
          "Portfolio > Resume",
          "Code doesn't lie",
          "Emotional benefit: Confidence through proof",
        ],
      },
    ],
  },
  {
    id: "unfair-advantage",
    title: "Unfair Advantage",
    items: [
      {
        title: "",
        points: [
          "Two-sided network: Students + Mentors + Recruiters",
          "GitHub-based verification system",
          "Real project portfolio generation",
          "Direct path from learning to hiring",
        ],
      },
    ],
  },
  {
    id: "customer-segments",
    title: "Customer Segments",
    items: [
      {
        title: "Target Customers:",
        points: [
          "Computer science students",
          "Career switchers",
          "Self-taught developers",
          "Recent graduates",
        ],
      },
      {
        title: "Early Adopters:",
        points: [
          "Students at MUJ (Manipal University Jaipur)",
          "TechStar SWJ'26 participants",
          "Active GitHub users",
          "People already building side projects",
        ],
      },
    ],
  },
  {
    id: "key-metrics",
    title: "Key Metrics",
    items: [
      {
        title: "",
        points: [
          "Projects completed per student",
          "Code contributions per project",
          "Mentor review response time",
          "Student retention rate",
          "Portfolio views by recruiters",
          "Job placement rate",
        ],
      },
    ],
  },
  {
    id: "channels",
    title: "Channels",
    items: [
      {
        title: "Path to Customers:",
        points: [
          "University partnerships (starting with MUJ)",
          "TechStar program integration",
          "Word of mouth from early adopters",
          "GitHub community engagement",
          "Tech community events and hackathons",
        ],
      },
    ],
  },
  {
    id: "cost-structure",
    title: "Cost Structure",
    items: [
      {
        title: "",
        points: [
          "Platform development and maintenance",
          "Mentor compensation",
          "Payment processing fees",
          "Customer support",
          "Marketing and partnerships",
        ],
      },
    ],
  },
  {
    id: "revenue-streams",
    title: "Revenue Streams",
    items: [
      {
        title: "",
        points: [
          "Project-based commission from enrollment fees",
          "Pro subscription (AI-powered features)",
          "Paid mentorship support",
          "Micro-revenue streams (certifications, premium tools)",
          "Key Numbers:",
          "Revenue per project enrollment",
          "Gross margin per subscription",
          "Lifetime value of active learners",
        ],
      },
    ],
  },
]

import { AnimatedNoise } from "@/components/animated-noise"

// ... (existing imports)

export function LeanCanvasSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)
  const [expandedSection, setExpandedSection] = useState<{
    sectionId: string
    sectionTitle: string
  } | null>(null)

  useEffect(() => {
    if (!sectionRef.current || !headerRef.current || !gridRef.current) return

    const ctx = gsap.context(() => {
      // Header fade in
      gsap.from(headerRef.current, {
        opacity: 0,
        y: -20,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: headerRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      })

      // Cards stagger in
      const cards = gridRef.current?.querySelectorAll(".lean-card")
      if (cards) {
        gsap.from(cards, {
          opacity: 0,
          y: 40,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  // Handle ESC key to close expanded section
  useEffect(() => {
    if (!expandedSection) return

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setExpandedSection(null)
      }
    }
    window.addEventListener("keydown", handleEscape)
    return () => window.removeEventListener("keydown", handleEscape)
  }, [expandedSection])

  const handleCardClick = (sectionId: string, sectionTitle: string) => {
    setExpandedSection({ sectionId, sectionTitle })
  }

  const handleCloseExpanded = () => {
    setExpandedSection(null)
  }

  const getExpandedSection = () => {
    if (!expandedSection) return null
    return leanCanvasSections.find((s) => s.id === expandedSection.sectionId)
  }

  const expandedSectionData = getExpandedSection()

  return (
    <section ref={sectionRef} className="relative min-h-screen md:h-screen overflow-y-auto md:overflow-hidden px-4 md:px-6 py-4 md:py-6 bg-background flex flex-col ml-0 md:ml-20">
      <AnimatedNoise opacity={0.05} />
      {/* Expanded Section Modal */}
      {expandedSection && expandedSectionData && (
        <div
          className="fixed inset-0 z-50 bg-background/90 backdrop-blur-md flex items-center justify-center p-4 md:p-8 ml-0 md:ml-20"
          onClick={handleCloseExpanded}
        >
          <div
            className="relative w-full max-w-4xl max-h-[90vh] overflow-auto bg-card/50 border border-white/10 rounded-xl p-6 md:p-12 shadow-2xl ring-1 ring-white/10"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={handleCloseExpanded}
              className="absolute top-4 right-4 p-2 hover:bg-white/10 rounded-full transition-colors duration-200 text-foreground"
              aria-label="Close"
            >
              <X className="w-6 h-6" />
            </button>
            <h2 className="font-[var(--font-bebas)] text-3xl md:text-5xl tracking-tight mb-6 text-foreground pr-12">
              {expandedSection.sectionTitle}
            </h2>
            <div className="space-y-4 md:space-y-6">
              {expandedSectionData.items.map((item, itemIdx) => (
                <div
                  key={itemIdx}
                  className="bg-white/5 rounded-lg p-6 md:p-8 shadow-inner border border-white/5"
                >
                  {item.title && (
                    <h3 className="font-mono text-lg md:text-xl font-semibold mb-4 text-accent">
                      {item.title}
                    </h3>
                  )}
                  <ul className="space-y-3 md:space-y-4">
                    {item.points.map((point, pIdx) => (
                      <li key={pIdx} className="font-mono text-sm md:text-base text-foreground/80 leading-relaxed">
                        {point.startsWith("Key Numbers:") || point.startsWith("Why this matters:") ? (
                          <span className="font-semibold text-foreground block mb-2">{point}</span>
                        ) : (
                          <span className="flex gap-2">
                            <span className="text-accent/70 select-none">•</span>
                            <span>{point}</span>
                          </span>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div ref={headerRef} className="mb-2 md:mb-4 text-center flex-shrink-0">
        <Link
          href="/"
          className="inline-block mb-2 font-mono text-[10px] uppercase tracking-widest text-muted-foreground hover:text-accent transition-colors duration-200"
        >
          ← Back to Home
        </Link>
        <h1 className="font-[var(--font-bebas)] text-3xl md:text-4xl tracking-tight text-white/90">
          <span className="text-accent">LEAN</span> CANVAS
        </h1>
      </div>

      {/* Lean Canvas Grid - 3x3 layout with modern glassmorphism cards */}
      <div
        ref={gridRef}
        className="flex-1 max-w-full mx-auto grid grid-cols-1 md:grid-cols-5 gap-3 md:gap-4 p-2 md:p-3 overflow-y-auto md:overflow-auto"
      >
        {/* Helper function for cards */}
        {/* Row 1: Top 5 sections */}
        <div className="lean-card flex flex-col md:row-span-2 bg-card/20 border border-white/5 rounded-lg overflow-hidden backdrop-blur-sm hover:border-accent/30 hover:bg-card/30 transition-all duration-300 group">
          <div className="p-3 border-b border-white/5 bg-white/5">
            <h3 className="font-[var(--font-bebas)] text-lg md:text-xl tracking-wide text-foreground group-hover:text-accent transition-colors">
              Problem
            </h3>
          </div>
          <div className="p-3 space-y-3 flex-1 overflow-auto">
            {leanCanvasSections[0].items.map((item, idx) => (
              <div
                key={idx}
                onClick={() => handleCardClick("problem", "Problem")}
                className="cursor-pointer group/item"
              >
                {item.title && (
                  <h4 className="font-mono text-[10px] font-bold uppercase tracking-wider mb-1.5 text-accent/80">
                    {item.title}
                  </h4>
                )}
                <ul className="space-y-1.5">
                  {item.points.map((point, pIdx) => (
                    <li key={pIdx} className="font-mono text-[10px] text-muted-foreground group-hover/item:text-foreground transition-colors leading-tight">
                      • {point}
                    </li>
                  ))}
                </ul>
                {idx < leanCanvasSections[0].items.length - 1 && <div className="h-px bg-white/5 my-3" />}
              </div>
            ))}
          </div>
        </div>

        <div className="lean-card flex flex-col bg-card/20 border border-white/5 rounded-lg overflow-hidden backdrop-blur-sm hover:border-accent/30 hover:bg-card/30 transition-all duration-300 group">
          <div className="p-3 border-b border-white/5 bg-white/5">
            <h3 className="font-[var(--font-bebas)] text-lg md:text-xl tracking-wide text-foreground group-hover:text-accent transition-colors">
              Solution
            </h3>
          </div>
          <div className="p-3 flex-1 overflow-auto">
            {leanCanvasSections[1].items.map((item, idx) => (
              <div
                key={idx}
                onClick={() => handleCardClick("solution", "Solution")}
                className="cursor-pointer group/item"
              >
                {item.title && (
                  <h4 className="font-mono text-[10px] font-bold uppercase tracking-wider mb-1.5 text-accent/80">
                    {item.title}
                  </h4>
                )}
                <ul className="space-y-1.5">
                  {item.points.map((point, pIdx) => (
                    <li key={pIdx} className="font-mono text-[10px] text-muted-foreground group-hover/item:text-foreground transition-colors leading-tight">
                      • {point}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="lean-card flex flex-col md:row-span-2 bg-card/20 border border-white/5 rounded-lg overflow-hidden backdrop-blur-sm hover:border-accent/30 hover:bg-card/30 transition-all duration-300 group">
          <div className="p-3 border-b border-white/5 bg-white/5">
            <h3 className="font-[var(--font-bebas)] text-lg md:text-xl tracking-wide text-foreground group-hover:text-accent transition-colors">
              Unique Value Prop
            </h3>
          </div>
          <div className="p-3 flex-1 overflow-auto">
            {leanCanvasSections[2].items.map((item, idx) => (
              <div
                key={idx}
                onClick={() => handleCardClick("uvp", "Unique Value Proposition")}
                className="cursor-pointer group/item h-full"
              >
                <ul className="space-y-2">
                  {item.points.map((point, pIdx) => (
                    <li key={pIdx} className="font-mono text-[10px] text-muted-foreground group-hover/item:text-foreground transition-colors leading-tight">
                      {point.startsWith("Key Numbers:") || point.startsWith("Why this matters:") ? (
                        <span className="font-bold text-accent/90 block mt-2 mb-1">{point}</span>
                      ) : (
                        `• ${point}`
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="lean-card flex flex-col bg-card/20 border border-white/5 rounded-lg overflow-hidden backdrop-blur-sm hover:border-accent/30 hover:bg-card/30 transition-all duration-300 group">
          <div className="p-3 border-b border-white/5 bg-white/5">
            <h3 className="font-[var(--font-bebas)] text-lg md:text-xl tracking-wide text-foreground group-hover:text-accent transition-colors">
              Unfair Advantage
            </h3>
          </div>
          <div className="p-3 flex-1 overflow-auto">
            {leanCanvasSections[3].items.map((item, idx) => (
              <div
                key={idx}
                onClick={() => handleCardClick("unfair-advantage", "Unfair Advantage")}
                className="cursor-pointer group/item"
              >
                <ul className="space-y-1.5">
                  {item.points.map((point, pIdx) => (
                    <li key={pIdx} className="font-mono text-[10px] text-muted-foreground group-hover/item:text-foreground transition-colors leading-tight">
                      • {point}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="lean-card flex flex-col md:row-span-2 bg-card/20 border border-white/5 rounded-lg overflow-hidden backdrop-blur-sm hover:border-accent/30 hover:bg-card/30 transition-all duration-300 group">
          <div className="p-3 border-b border-white/5 bg-white/5">
            <h3 className="font-[var(--font-bebas)] text-lg md:text-xl tracking-wide text-foreground group-hover:text-accent transition-colors">
              Customer Segments
            </h3>
          </div>
          <div className="p-3 space-y-3 flex-1 overflow-auto">
            {leanCanvasSections[4].items.map((item, idx) => (
              <div
                key={idx}
                onClick={() => handleCardClick("customer-segments", "Customer Segments")}
                className="cursor-pointer group/item"
              >
                {item.title && (
                  <h4 className="font-mono text-[10px] font-bold uppercase tracking-wider mb-1.5 text-accent/80">
                    {item.title}
                  </h4>
                )}
                <ul className="space-y-1.5">
                  {item.points.map((point, pIdx) => (
                    <li key={pIdx} className="font-mono text-[10px] text-muted-foreground group-hover/item:text-foreground transition-colors leading-tight">
                      • {point}
                    </li>
                  ))}
                </ul>
                {idx < leanCanvasSections[4].items.length - 1 && <div className="h-px bg-white/5 my-3" />}
              </div>
            ))}
          </div>
        </div>

        {/* Row 2: Key Metrics and Channels (filling the gaps under Solution and Unfair Advantage) */}

        {/* Under Solution */}
        <div className="lean-card flex flex-col bg-card/20 border border-white/5 rounded-lg overflow-hidden backdrop-blur-sm hover:border-accent/30 hover:bg-card/30 transition-all duration-300 group">
          <div className="p-3 border-b border-white/5 bg-white/5">
            <h3 className="font-[var(--font-bebas)] text-lg md:text-xl tracking-wide text-foreground group-hover:text-accent transition-colors">
              Key Metrics
            </h3>
          </div>
          <div className="p-3 flex-1 overflow-auto">
            {leanCanvasSections[5].items.map((item, idx) => (
              <div
                key={idx}
                onClick={() => handleCardClick("key-metrics", "Key Metrics")}
                className="cursor-pointer group/item"
              >
                <ul className="space-y-1.5">
                  {item.points.map((point, pIdx) => (
                    <li key={pIdx} className="font-mono text-[10px] text-muted-foreground group-hover/item:text-foreground transition-colors leading-tight">
                      • {point}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Under Unfair Advantage */}
        <div className="lean-card flex flex-col bg-card/20 border border-white/5 rounded-lg overflow-hidden backdrop-blur-sm hover:border-accent/30 hover:bg-card/30 transition-all duration-300 group">
          <div className="p-3 border-b border-white/5 bg-white/5">
            <h3 className="font-[var(--font-bebas)] text-lg md:text-xl tracking-wide text-foreground group-hover:text-accent transition-colors">
              Channels
            </h3>
          </div>
          <div className="p-3 flex-1 overflow-auto">
            {leanCanvasSections[6].items.map((item, idx) => (
              <div
                key={idx}
                onClick={() => handleCardClick("channels", "Channels")}
                className="cursor-pointer group/item"
              >
                {item.title && (
                  <h4 className="font-mono text-[10px] font-bold uppercase tracking-wider mb-1.5 text-accent/80">
                    {item.title}
                  </h4>
                )}
                <ul className="space-y-1.5">
                  {item.points.map((point, pIdx) => (
                    <li key={pIdx} className="font-mono text-[10px] text-muted-foreground group-hover/item:text-foreground transition-colors leading-tight">
                      • {point}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Row 3: Bottom Row - Cost Structure & Revenue Streams */}
        <div className="lean-card md:col-span-2 flex flex-col bg-card/20 border border-white/5 rounded-lg overflow-hidden backdrop-blur-sm hover:border-accent/30 hover:bg-card/30 transition-all duration-300 group">
          <div className="p-3 border-b border-white/5 bg-white/5">
            <h3 className="font-[var(--font-bebas)] text-lg md:text-xl tracking-wide text-foreground group-hover:text-accent transition-colors">
              Cost Structure
            </h3>
          </div>
          <div className="p-3 flex-1 overflow-auto">
            {leanCanvasSections[7].items.map((item, idx) => (
              <div
                key={idx}
                onClick={() => handleCardClick("cost-structure", "Cost Structure")}
                className="cursor-pointer group/item"
              >
                <ul className="space-y-1.5 grid grid-cols-1 md:grid-cols-2 gap-x-4">
                  {item.points.map((point, pIdx) => (
                    <li key={pIdx} className="font-mono text-[10px] text-muted-foreground group-hover/item:text-foreground transition-colors leading-tight">
                      • {point}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="lean-card md:col-span-3 flex flex-col bg-card/20 border border-white/5 rounded-lg overflow-hidden backdrop-blur-sm hover:border-accent/30 hover:bg-card/30 transition-all duration-300 group">
          <div className="p-3 border-b border-white/5 bg-white/5">
            <h3 className="font-[var(--font-bebas)] text-lg md:text-xl tracking-wide text-foreground group-hover:text-accent transition-colors">
              Revenue Streams
            </h3>
          </div>
          <div className="p-3 flex-1 overflow-auto">
            {leanCanvasSections[8].items.map((item, idx) => (
              <div
                key={idx}
                onClick={() => handleCardClick("revenue-streams", "Revenue Streams")}
                className="cursor-pointer group/item"
              >
                <ul className="space-y-1.5 grid grid-cols-1 md:grid-cols-2 gap-x-4">
                  {item.points.map((point, pIdx) => (
                    <li key={pIdx} className="font-mono text-[10px] text-muted-foreground group-hover/item:text-foreground transition-colors leading-tight">
                      {point.startsWith("Key Numbers:") ? (
                        <span className="font-bold text-accent/90 block mt-2 mb-1 col-span-full">{point}</span>
                      ) : point.startsWith("Revenue per") || point.startsWith("Gross margin") || point.startsWith("Lifetime value") ? (
                        <span className="font-mono text-[10px] text-muted-foreground group-hover/item:text-foreground transition-colors leading-tight pl-2 border-l border-white/10 block">• {point}</span>
                      ) : (
                        `• ${point}`
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
