// components/landing-hero.jsx
"use client"

import { useMemo } from "react"

function Ring({ size, opacity = 0.12 }) {
  return (
    <div
      aria-hidden="true"
      className="absolute left-1/2 top-[46%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-black/10"
      style={{
        width: size,
        height: size,
        opacity,
      }}
    />
  )
}

function FloatingPill({ icon, label, className = "", delay = "0s" }) {
  return (
    <div
      className={[
        "absolute",
        "rounded-full border border-black/10 bg-white/70 backdrop-blur",
        "px-4 py-2 shadow-sm",
        "flex items-center gap-2 text-sm text-neutral-700",
        "animate-float",
        className,
      ].join(" ")}
      style={{ animationDelay: delay }}
    >
      <span className="grid h-8 w-8 place-items-center rounded-full bg-primary/10 text-primary">
        {icon}
      </span>
      <span className="font-medium">{label}</span>
    </div>
  )
}

export default function LandingHero() {
  const pills = useMemo(
    () => [
      { label: "Design", icon: "🎨", pos: "left-[10%] top-[72%]", delay: "0s" },
      { label: "Analytics", icon: "📊", pos: "left-[28%] top-[64%]", delay: "0.4s" },
      { label: "Illustration", icon: "🖌️", pos: "left-[52%] top-[66%]", delay: "0.2s" },
      { label: "Music", icon: "🎵", pos: "left-[78%] top-[70%]", delay: "0.6s" },
      { label: "Development", icon: "💻", pos: "left-[18%] top-[84%]", delay: "0.3s" },
      { label: "Photography", icon: "📷", pos: "left-[40%] top-[88%]", delay: "0.7s" },
      { label: "Marketing", icon: "📣", pos: "left-[62%] top-[88%]", delay: "0.5s" },
      { label: "Video", icon: "🎬", pos: "left-[82%] top-[84%]", delay: "0.1s" },
    ],
    []
  )

  return (
    <section className="relative w-full overflow-hidden bg-white">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(900px 450px at 50% 38%, rgba(0,74,173,0.08), transparent 60%), radial-gradient(900px 450px at 20% 80%, rgba(203,108,230,0.08), transparent 60%)",
        }}
      />

      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <Ring size={1100} opacity={0.08} />
        <Ring size={850} opacity={0.10} />
        <Ring size={620} opacity={0.12} />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 py-14 sm:py-16">
        <div className="relative mx-auto rounded-3xl bg-white shadow-[0_24px_80px_rgba(0,74,173,0.08)] ring-1 ring-primary/10">
          <div className="px-6 py-14 sm:px-10 sm:py-16">
            <p className="text-center text-sm font-semibold text-accent">
              Klusters Communities
            </p>

            <h1 className="mt-4 text-center text-4xl font-extrabold tracking-tight text-neutral-900 sm:text-6xl">
              The home for
              <br />
              creator communities
            </h1>

            <p className="mx-auto mt-5 max-w-xl text-center text-base text-neutral-600 sm:text-lg">
              Ask questions, discover top creator profiles, and connect with talent
              that fits your project.
            </p>

            <div className="mx-auto mt-10 flex max-w-2xl items-center gap-3 rounded-full border border-primary/10 bg-white px-4 py-3 shadow-sm">
              <span className="text-neutral-400">🔎</span>
              <input
                className="w-full bg-transparent text-sm text-neutral-800 placeholder:text-neutral-400 focus:outline-none"
                placeholder="Designers, developers, photographers..."
              />
              <button className="grid h-11 w-11 place-items-center rounded-full bg-primary text-white shadow-sm transition hover:bg-primary/90">
                →
              </button>
            </div>

            <div className="relative mt-12 hidden h-[260px] sm:block">
              {pills.map((p) => (
                <FloatingPill
                  key={p.label}
                  label={p.label}
                  icon={p.icon}
                  className={p.pos}
                  delay={p.delay}
                />
              ))}
            </div>

            <div className="mt-10 flex flex-wrap justify-center gap-2 sm:hidden">
              {pills.slice(0, 6).map((p) => (
                <span
                  key={p.label}
                  className="rounded-full border border-black/10 bg-white px-3 py-1.5 text-sm text-neutral-700 shadow-sm"
                >
                  {p.label}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
