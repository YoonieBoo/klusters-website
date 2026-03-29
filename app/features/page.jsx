import Link from 'next/link'
import { MarketingPageLayout } from '@/components/marketing-page-layout'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import { serviceCards } from '@/lib/marketing-content'

const featureIntroPoints = serviceCards.map(({ title, description }) => ({
  title,
  description,
}))

const featureConnectionSteps = [
  {
    title: 'Define the brief',
    description: 'Set goals, audience, and deliverables before creator selection begins.',
  },
  {
    title: 'Match the right creators',
    description: 'Shortlist creators based on fit, content style, and campaign needs.',
  },
  {
    title: 'Launch and track',
    description: 'Keep approvals, delivery, and reporting connected in one flow.',
  },
]

const featureDifferentiators = [
  {
    title: 'Clear creator presentation',
    description: 'Show creator profiles in a polished, client-facing format.',
  },
  {
    title: 'Structured campaign planning',
    description: 'Keep briefs, matching, and approvals easier to follow.',
  },
  {
    title: 'Transparent workflow',
    description: 'Make campaign progress visible from planning through launch.',
  },
]

export default function FeaturesPage() {
  return (
    <MarketingPageLayout>
      <section className="marketing-section px-4 py-16 sm:px-6 lg:px-8">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-24 top-0 h-[34rem] w-[34rem] rounded-full border border-primary/10" />
          <div className="absolute -left-16 top-8 h-[30rem] w-[30rem] rounded-full border border-primary/8" />
          <div className="absolute left-[34%] top-[22%] h-28 w-28 rounded-full bg-primary/28 blur-2xl" />
        </div>

        <div className="relative mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-center">
          <div className="relative flex min-h-[24rem] items-center justify-center lg:justify-start">
            <div className="flex items-center gap-4 sm:gap-6">
              <span className="text-[8rem] font-black leading-none tracking-[-0.08em] text-primary sm:text-[10rem] lg:text-[12rem]">
                4
              </span>
              <span className="text-4xl font-black uppercase tracking-[-0.06em] text-foreground [writing-mode:vertical-rl] [text-orientation:mixed] sm:text-5xl lg:text-6xl">
                Features
              </span>
            </div>
          </div>

          <div className="relative space-y-5 lg:space-y-6">
            {featureIntroPoints.map((item, index) => (
              <article
                key={item.title}
                className="group relative rounded-[2rem] border border-primary/10 bg-transparent px-7 py-8 transition-all duration-300 ease-out hover:border-primary/20 hover:bg-white hover:shadow-[0_24px_50px_rgba(17,17,17,0.08)] hover:lg:-ml-16 hover:lg:mr-6"
              >
                <div
                  className="pointer-events-none absolute -right-5 top-1/2 h-14 w-14 -translate-y-1/2 rotate-12 rounded-2xl bg-[linear-gradient(180deg,#8fc5ff_0%,#004aad_100%)] opacity-0 shadow-[0_18px_28px_rgba(0,74,173,0.18)] transition-all duration-300 group-hover:opacity-100"
                />
                <div className="grid gap-4 sm:grid-cols-[5.5rem_1fr] sm:items-start">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full border border-primary/10 bg-white/80 text-lg font-semibold text-slate-500 shadow-[inset_0_0_0_1px_rgba(203,108,230,0.04)]">
                    0{index + 1}
                  </div>
                  <div className="max-w-xl pt-1">
                    <h1 className="text-2xl font-black tracking-tight text-foreground sm:text-[2rem]">
                      {item.title}
                    </h1>
                    <p className="mt-3 text-base leading-relaxed text-slate-600 sm:text-lg">
                      {item.description}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="marketing-section bg-[#111111] px-4 py-20 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary/90">How it all connects</p>
            <h2 className="mt-4 text-4xl font-black tracking-tight text-white sm:text-5xl">
              A simple path from planning to launch.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-white/72">
              Klusters connects the main parts of the workflow so teams can move from decision-making to delivery without losing context.
            </p>
          </div>

          <div className="mt-12 grid gap-8 lg:grid-cols-3 lg:gap-10">
            {featureConnectionSteps.map((step, index) => (
              <article key={step.title} className="border-t border-white/12 pt-5">
                <p className="text-sm font-semibold tracking-[0.18em] text-primary/90">0{index + 1}</p>
                <h3 className="mt-4 text-2xl font-black tracking-tight text-white">{step.title}</h3>
                <p className="mt-3 max-w-sm text-sm leading-relaxed text-white/68">{step.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="marketing-section px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">What makes Klusters different</p>
            <h2 className="mt-4 text-4xl font-black tracking-tight text-foreground sm:text-5xl">
              Most creator tools are hard to explain. Klusters isn’t.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-600">
              The platform focuses on clear structure, presentable creator information, and a workflow clients can understand quickly.
            </p>
          </div>

          <div className="mt-12 grid gap-8 lg:grid-cols-3 lg:gap-10">
            {featureDifferentiators.map((item, index) => (
              <article
                key={item.title}
                className={`${index !== 0 ? 'lg:border-l lg:border-primary/12 lg:pl-8' : ''} border-t border-primary/12 pt-5 lg:border-t-0 lg:pt-0`}
              >
                <h3 className="text-2xl font-black tracking-tight text-foreground">{item.title}</h3>
                <p className="mt-3 max-w-sm text-sm leading-relaxed text-slate-600">{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="marketing-section px-4 pb-20 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 border-t border-primary/12 pt-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">Next Step</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-foreground">See the platform in context.</h2>
            <p className="mt-3 text-slate-600">
              Explore the About page for a clearer overview, or start a conversation about how these features could support your campaigns.
            </p>
          </div>
          <Link href="/about">
            <Button variant="secondary">
              Explore About
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>
    </MarketingPageLayout>
  )
}
