"use client"
/**
 * This is the "Problems being addressed" section — the first content block after the hero.
 * Same idea as hero: a component that owns its own layout, data (the problems list),
 * and scroll/hover animations. Edit the `signals` array below to change the problem cards.
 */
import { useRef, useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

/** Your problem statements. Each object becomes one card. Change title and note to match your project. */
const signals = [
  {
    title: "Fragmented Academics",
    note: "Clunky legacy ERPs, scattered notes, and no real-time attendance tracking make academic life a shuffle.",
  },
  {
    title: "Communication Chaos",
    note: "WhatsApp spam and endless groups lead to information overload and missed critical deadlines.",
  },
  {
    title: "Unsafe Commerce",
    note: "Buying and selling on Instagram or OLX is risky, unverified, and lacks campus-specific trust.",
  },
  {
    title: "Alumni Disconnect",
    note: "No structured way to connect with seniors or alumni for mentorship, creating a guidance void.",
  },
  {
    title: "Mental Health Isolation",
    note: "Lack of anonymous support systems or easy grievance redressal leaves students feeling unheard.",
  },
  {
    title: "Event Discovery FOMO",
    note: "Fragmented event promotions mean students often miss out on club activities and workshops.",
  },
  {
    title: "Skill Gap Reality",
    note: "Students learn theory but lack the platform to build and showcase real-world projects.",
  },
  {
    title: "Bureaucratic Friction",
    note: "Manual paperwork for simple approvals, gate passes, and leaves wastes valuable time.",
  },
]

export function SignalsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)
  const cursorRef = useRef<HTMLDivElement>(null)
  const [isHovering, setIsHovering] = useState(false)

  useEffect(() => {
    if (!sectionRef.current || !cursorRef.current) return

    const section = sectionRef.current
    const cursor = cursorRef.current

    const handleMouseMove = (e: MouseEvent) => {
      const rect = section.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      gsap.to(cursor, {
        x: x,
        y: y,
        duration: 0.5,
        ease: "power3.out",
      })
    }

    const handleMouseEnter = () => setIsHovering(true)
    const handleMouseLeave = () => setIsHovering(false)

    section.addEventListener("mousemove", handleMouseMove)
    section.addEventListener("mouseenter", handleMouseEnter)
    section.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      section.removeEventListener("mousemove", handleMouseMove)
      section.removeEventListener("mouseenter", handleMouseEnter)
      section.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [])

  useEffect(() => {
    if (!sectionRef.current || !headerRef.current || !cardsRef.current) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerRef.current,
        { x: -60, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        },
      )

      const cards = cardsRef.current?.querySelectorAll("article")
      if (cards) {
        gsap.fromTo(
          cards,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: cardsRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          },
        )
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="signals" ref={sectionRef} className="relative py-32 px-6 md:px-28 min-h-screen">
      <div
        ref={cursorRef}
        className={cn(
          "pointer-events-none absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 z-50",
          "w-12 h-12 rounded-full border-2 border-accent bg-accent/20 blur-sm",
          "transition-opacity duration-300",
          isHovering ? "opacity-100" : "opacity-0",
        )}
      />

      <div ref={headerRef} className="mb-16">
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent">01 / SIGNAL DETECTION</span>
        <h2 className="mt-4 font-[var(--font-bebas)] text-5xl md:text-7xl tracking-tight">
          THE PROBLEM OF <span className="text-accent">FRAGMENTATION</span>
        </h2>
      </div>

      <div ref={cardsRef} className="space-y-12 overflow-hidden w-full">
        {/* Row 1: Left to Right (Reverse Marquee) */}
        <div className="relative w-full overflow-hidden">
          <div className="flex w-max animate-marquee-right hover:[animation-play-state:paused]">
            {[...signals.slice(0, 4), ...signals.slice(0, 4)].map((signal, index) => (
              <div key={`row1-${index}`} className="mx-4">
                <SignalCard signal={signal} index={index % 4} />
              </div>
            ))}
          </div>
        </div>

        {/* Row 2: Right to Left (Standard Marquee) - Slower */}
        <div className="relative w-full overflow-hidden">
          <div
            className="flex w-max animate-marquee-left hover:[animation-play-state:paused]"
            style={{ animationDuration: "60s" }}
          >
            {[...signals.slice(4), ...signals.slice(4)].map((signal, index) => (
              <div key={`row2-${index}`} className="mx-4">
                <SignalCard signal={signal} index={4 + (index % 4)} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/** Small sub-component for one problem card. Keeps the main component shorter and lets us reuse the card layout. */
function SignalCard({
  signal,
  index,
}: {
  signal: { title: string; note: string }
  index: number
}) {
  return (
    <article
      className={cn(
        "group relative flex-shrink-0 w-80 h-[400px]",
        "transition-transform duration-500 ease-out",
        "hover:-translate-y-2",
      )}
    >
      {/* Card with paper texture effect */}
      <div className="relative h-full flex flex-col bg-card border border-border/50 md:border-t md:border-l md:border-r-0 md:border-b-0 p-8">
        {/* Top torn edge effect */}
        <div className="absolute -top-px left-0 right-0 h-px bg-gradient-to-r from-transparent via-border/40 to-transparent" />

        {/* Issue number - editorial style */}
        <div className="flex items-baseline justify-between mb-8">
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
            No. {String(index + 1).padStart(2, "0")}
          </span>
        </div>

        {/* Title */}
        <h3 className="font-[var(--font-bebas)] text-4xl tracking-tight mb-4 group-hover:text-accent transition-colors duration-300">
          {signal.title}
        </h3>

        {/* Divider line */}
        <div className="w-12 h-px bg-accent/60 mb-6 group-hover:w-full transition-all duration-500" />

        {/* Description */}
        <p className="font-mono text-xs text-muted-foreground leading-relaxed flex-1">{signal.note}</p>

        {/* Bottom right corner fold effect */}
        <div className="absolute bottom-0 right-0 w-6 h-6 overflow-hidden">
          <div className="absolute bottom-0 right-0 w-8 h-8 bg-background rotate-45 translate-x-4 translate-y-4 border-t border-l border-border/30" />
        </div>
      </div>

      {/* Shadow/depth layer */}
      <div className="absolute inset-0 -z-10 translate-x-1 translate-y-1 bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </article>
  )
}
