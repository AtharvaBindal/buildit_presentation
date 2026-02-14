"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export function BackgroundBlobs() {
    const containerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (!containerRef.current) return

        const blobs = containerRef.current.querySelectorAll(".blob")

        blobs.forEach((blob: any) => {
            gsap.to(blob, {
                x: "random(-400, 400)",
                y: "random(-200, 200)",
                scale: "random(0.8, 1.5)",
                rotation: "random(-45, 45)",
                duration: "random(10, 15)",
                repeat: -1,
                repeatRefresh: true,
                yoyo: true,
                ease: "sine.inOut",
            })
        })

        // Parallax effect for the container
        gsap.to(containerRef.current, {
            y: "20%", // Move slightly down as we scroll down to create depth
            ease: "none",
            scrollTrigger: {
                trigger: document.body,
                start: "top top",
                end: "bottom bottom",
                scrub: 0.5,
            },
        })
    }, [])

    return (
        <div ref={containerRef} className="fixed inset-0 z-0 overflow-hidden pointer-events-none scale-110">
            <div className="blob absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[100px] mix-blend-screen" />
            <div className="blob absolute top-3/4 right-1/4 w-[400px] h-[400px] bg-blue-600/10 rounded-full blur-[80px] mix-blend-screen" />
            <div className="blob absolute bottom-0 left-1/3 w-[600px] h-[600px] bg-purple-900/20 rounded-full blur-[120px] mix-blend-screen" />
            <div className="blob absolute -top-20 right-0 w-[300px] h-[300px] bg-indigo-600/20 rounded-full blur-[90px] mix-blend-screen" />
        </div>
    )
}
