import Link from 'next/link'
import { MarketingPageLayout } from '@/components/marketing-page-layout'
import { Button } from '@/components/ui/button'
import { benefits, processSteps } from '@/lib/marketing-content'
import { ArrowRight, ShieldCheck } from 'lucide-react'

export default function HowItWorksPage() {
  return (
    <MarketingPageLayout>
      <section className="marketing-section px-4 pb-16 pt-18 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">How It Works</p>
            <h1 className="mt-4 text-4xl font-black tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              A campaign process that stays visible from brief to reporting.
            </h1>
          </div>
          <div className="marketing-panel p-6 sm:p-7">
            <p className="text-lg leading-relaxed text-slate-600">
              Klusters is structured to make creator work easier to coordinate and easier to explain. The workflow reduces handoff confusion while keeping the public-facing experience sharp.
            </p>
          </div>
        </div>
      </section>

      <section className="marketing-section px-4 py-6 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-2 lg:grid-cols-3">
          {processSteps.map((step, index) => (
            <article key={step.title} className="marketing-panel-soft p-7">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-bg-soft text-primary">
                <step.icon className="h-6 w-6" />
              </div>
              <p className="mt-6 text-xs font-semibold uppercase tracking-[0.18em] text-brand-secondary">Step {index + 1}</p>
              <h2 className="mt-3 text-2xl font-black tracking-tight text-foreground">{step.title}</h2>
              <p className="mt-3 text-base leading-relaxed text-slate-600">{step.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="marketing-section px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-2">
          {benefits.map((benefit) => (
            <article key={benefit} className="flex items-start gap-4 marketing-panel-soft p-6">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <p className="text-lg leading-relaxed text-slate-600">{benefit}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="marketing-section px-4 pb-20 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 marketing-panel px-8 py-10 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">Next Step</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-foreground">See how the platform story supports this workflow.</h2>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link href="/features">
              <Button variant="secondary">
                Explore Features
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button>Contact Us</Button>
            </Link>
          </div>
        </div>
      </section>
    </MarketingPageLayout>
  )
}
