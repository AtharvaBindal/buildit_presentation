import type React from "react"
import type { Metadata } from "next"
import { Bebas_Neue } from "next/font/google"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { SmoothScroll } from "@/components/smooth-scroll"
import { BackgroundBlobs } from "@/components/background-blobs"
import "./globals.css"

const bebasNeue = Bebas_Neue({ weight: "400", subsets: ["latin"], variable: "--font-bebas" })

export const metadata: Metadata = {
  title: "UNIVERSE — The Operating System for the Modern Digital Campus",
  description:
    "A closed-loop digital ecosystem integrating Academic Management, Community Engagement, Welfare, and Commerce.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark bg-background">
      <body
        className={`${GeistMono.variable} ${bebasNeue.variable} font-mono antialiased overflow-x-hidden`}
      >
        <BackgroundBlobs />
        <div className="noise-overlay" aria-hidden="true" />
        <SmoothScroll>{children}</SmoothScroll>
        <Analytics />
      </body>
    </html>
  )
}

