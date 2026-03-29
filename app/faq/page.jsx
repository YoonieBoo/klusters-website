import Link from 'next/link'
import { MarketingPageLayout } from '@/components/marketing-page-layout'
import { Button } from '@/components/ui/button'
import { faqItems } from '@/lib/marketing-content'
import { ArrowRight } from 'lucide-react'

export default function FaqPage() {
  return (
    <MarketingPageLayout>
      <section className="marketing-section px-4 pb-16 pt-18 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">FAQ</p>
          <h1 className="mt-4 text-5xl font-black tracking-tight text-foreground sm:text-6xl">
            Answers for teams exploring creator-led growth with Klusters.
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-slate-600">
            The platform is public-facing by design, so most of what you need to understand the offer is visible before any conversation starts.
          </p>
        </div>
      </section>

      <section className="marketing-section px-4 pb-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl space-y-5">
          {faqItems.map((item, index) => (
            <article key={item.question} className="marketing-panel-soft p-7">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div className="max-w-3xl">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-secondary">Question {index + 1}</p>
                  <h2 className="mt-2 text-2xl font-black tracking-tight text-foreground">{item.question}</h2>
                  <p className="mt-4 text-base leading-relaxed text-slate-600">{item.answer}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="marketing-section px-4 pb-20 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-5xl flex-col gap-5 marketing-panel px-8 py-10 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">Still Need Help?</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-foreground">Use the contact page to start a direct conversation.</h2>
          </div>
          <Link href="/contact">
            <Button variant="secondary">
              Contact Us
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>
    </MarketingPageLayout>
  )
}
