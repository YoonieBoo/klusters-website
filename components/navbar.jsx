"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { siteNavItems } from '@/lib/marketing-content'
import { Menu } from 'lucide-react'

export function Navbar() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const isActiveItem = (href) => {
    if (href === '/') return pathname === '/'
    return pathname === href || pathname.startsWith(`${href}/`)
  }

  const navLinkClass = (href) =>
    `rounded-full px-3 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
      isActiveItem(href) ? 'bg-primary text-black shadow-[0_10px_24px_rgba(203,108,230,0.2)]' : 'text-black hover:bg-white/6 hover:text-black'
    }`

  const mobileNavLinkClass = (href) =>
    `block rounded-full px-3 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
      isActiveItem(href) ? 'bg-primary text-black' : 'text-white hover:bg-white/8 hover:text-white'
    }`

  return (
    <header
      className={`sticky top-0 z-50 w-full backdrop-blur-xl transition-all duration-300 ${
        isScrolled
          ? 'bg-white/90 shadow-[0_16px_44px_rgba(0,0,0,0.08)]'
          : 'bg-white/80'
      }`}
    >
      <nav className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:h-16 sm:px-6 lg:px-8">
        <Link href="/" className="-ml-2 flex items-center gap-2 sm:-ml-4 lg:-ml-6">
          <img
            src="/logo4-removebg.png"
            alt="Klusters"
            className="h-10 w-auto scale-110 object-contain sm:h-12 sm:scale-115 lg:h-14 lg:scale-125"
          />
        </Link>

        <div className="hidden items-center gap-1 lg:flex">
          {siteNavItems.map((item) => (
            <Link key={item.href} href={item.href} className={navLinkClass(item.href)}>
              {item.label}
            </Link>
          ))}

          <div className="ml-3 flex items-center gap-3">
            <Link href="/contact">
              <Button>Book a Demo</Button>
            </Link>
          </div>
        </div>

        <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
          <SheetTrigger asChild>
            <button
              type="button"
              aria-label="Open navigation menu"
              className="inline-flex items-center justify-center rounded-md border border-primary/12 bg-white p-2 text-foreground transition hover:bg-[#f8f1ff] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent lg:hidden"
            >
              <Menu className="h-6 w-6" />
            </button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[88vw] max-w-sm border-l border-white/10 bg-[#111111] text-white">
            <SheetTitle className="sr-only">Mobile Navigation</SheetTitle>
            <div className="mt-10 flex flex-col gap-2 px-1">
              {siteNavItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={mobileNavLinkClass(item.href)}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </div>
            <div className="mt-6 border-t border-white/10 pt-6">
              <Link
                href="/contact"
                className="inline-flex w-full items-center justify-center rounded-lg border border-primary bg-primary px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#b95ed8]"
                onClick={() => setMobileMenuOpen(false)}
              >
                Book a Demo
              </Link>
            </div>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  )
}
