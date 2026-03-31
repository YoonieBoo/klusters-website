import Link from 'next/link'
import { Instagram, Linkedin, Twitter } from 'lucide-react'
import { siteNavItems } from '@/lib/marketing-content'

export function Footer({ embedded = false, className = '' }) {
  const wrapperClassName = embedded
    ? `relative overflow-hidden border-t border-primary/10 bg-[#f8f1ff] text-foreground ${className}`.trim()
    : `relative overflow-hidden border-t border-primary/10 bg-[#f8f1ff] text-foreground ${className}`.trim()

  return (
    <footer id="contact" className={wrapperClassName}>
      <div className={`relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 ${embedded ? 'py-10 sm:py-12' : 'py-20'}`}>
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center -ml-2 sm:-ml-6">
              <img
                src="/logo4-removebg.png"
                alt="Klusters"
                className="h-9 w-auto object-contain sm:h-10"
              />
            </Link>
            <p className="mt-4 max-w-md text-base leading-relaxed text-[#111111]/80">
              Public-facing creator marketing for teams that want strategy, production, and performance insight without a gated product flow.
            </p>
            <div className="mt-6 flex items-center gap-3">
              <Link href="#" aria-label="Instagram" className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-primary/10 bg-white/70 text-[#111111]/72 transition hover:border-primary hover:bg-white hover:text-[#111111]">
                <Instagram className="h-4 w-4" />
              </Link>
              <Link href="#" aria-label="LinkedIn" className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-primary/10 bg-white/70 text-[#111111]/72 transition hover:border-primary hover:bg-white hover:text-[#111111]">
                <Linkedin className="h-4 w-4" />
              </Link>
              <Link href="#" aria-label="Twitter" className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-primary/10 bg-white/70 text-[#111111]/72 transition hover:border-primary hover:bg-white hover:text-[#111111]">
                <Twitter className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-[#111111]">Navigate</h3>
            <ul className="mt-4 space-y-3">
              {siteNavItems.slice(1, 4).map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-base text-[#111111]/70 transition hover:text-[#111111]">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-[#111111]">Contact</h3>
            <ul className="mt-4 space-y-3">
              <li>
                <Link href="/contact" className="text-base text-[#111111]/70 transition hover:text-[#111111]">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/features" className="text-base text-[#111111]/70 transition hover:text-[#111111]">
                  View Features
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-primary/10 pt-8">
          <p className="text-center text-base text-[#111111]/60">{new Date().getFullYear()} Klusters. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
