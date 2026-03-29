import Link from 'next/link'
import { MarketingPageLayout } from '@/components/marketing-page-layout'
import { Button } from '@/components/ui/button'

export function PublicRoutePage({ eyebrow, title, description, primaryHref = '/contact', primaryLabel = 'Contact Us', secondaryHref = '/features', secondaryLabel = 'Explore Features' }) {
  return (
    <MarketingPageLayout>
      <div className="relative flex flex-1 items-center">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-0 top-24 h-72 w-72 rounded-full bg-primary/12 blur-3xl" />
          <div className="absolute right-0 top-1/3 h-80 w-80 rounded-full bg-primary/10 blur-3xl" />
        </div>
        <section className="relative mx-auto w-full max-w-4xl px-4 py-20 text-center sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-border-soft bg-white p-8 shadow-[0_24px_60px_rgba(203,108,230,0.12)] sm:p-12">
            <p className="text-sm font-semibold uppercase tracking-[0.12em] text-primary">{eyebrow}</p>
            <h1 className="mt-4 text-4xl font-black tracking-tight text-foreground sm:text-5xl">{title}</h1>
            <p className="mx-auto mt-5 max-w-2xl text-lg text-slate-600">{description}</p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Link href={primaryHref}>
                <Button className="w-full sm:w-auto">{primaryLabel}</Button>
              </Link>
              <Link href={secondaryHref}>
                <Button variant="secondary" className="w-full sm:w-auto">
                  {secondaryLabel}
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </MarketingPageLayout>
  )
}
