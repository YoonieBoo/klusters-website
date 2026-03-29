import Link from 'next/link'
import { MarketingPageLayout } from '@/components/marketing-page-layout'
import { Button } from '@/components/ui/button'
import { ArrowRight, Eye, LayoutPanelTop, Users } from 'lucide-react'

const aboutHighlights = [
  {
    title: 'Public creator visibility',
    description: 'Show creators, campaign categories, and platform value in a format clients can review quickly.',
    icon: Eye,
  },
  {
    title: 'Structured campaign planning',
    description: 'Organize matching, approvals, and launch steps in one clearer process.',
    icon: LayoutPanelTop,
  },
  {
    title: 'Client-ready presentation',
    description: 'Present creator work and campaign direction in a way that feels polished and easy to understand.',
    icon: Users,
  },
]

const aboutPrinciples = [
  {
    title: 'What the platform does',
    description: 'Klusters brings creator discovery, campaign planning, and launch visibility into one clearer product story.',
  },
  {
    title: 'How teams use it',
    description: 'Brands can review creators, organize campaign decisions, and keep client-facing information easier to follow.',
  },
  {
    title: 'Why it matters',
    description: 'A clearer structure helps teams explain the offer faster and move work forward with less friction.',
  },
]

const aboutOutcomes = [
  {
    title: 'Clearer positioning',
    description: 'Present creator work in a way clients can understand quickly.',
  },
  {
    title: 'Simpler workflow',
    description: 'Move from brief to shortlist and launch with less friction.',
  },
  {
    title: 'Transparent presentation',
    description: 'Keep campaign direction, progress, and outcomes easier to follow.',
  },
  {
    title: 'Client-ready communication',
    description: 'Support internal planning without making the product harder to explain.',
  },
]

export default function AboutPage() {
  return (
    <MarketingPageLayout>
      <section className="marketing-section bg-[#f8f1ff] px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">Platform Overview</p>
            <h2 className="mt-4 text-4xl font-black tracking-tight text-foreground sm:text-5xl">
              A clearer way to follow what the product is for
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-600">
              The platform is designed to be easy to scan, so clients and teams can quickly understand what Klusters does and how it supports campaign work.
            </p>
          </div>

          <div className="space-y-5">
            {aboutPrinciples.map((item, index) => (
              <article key={item.title} className="flex gap-4 border-b border-primary/10 pb-5 last:border-b-0 last:pb-0">
                <div className="pt-1 text-sm font-semibold tracking-[0.18em] text-primary">
                  0{index + 1}
                </div>
                <div>
                  <h3 className="text-xl font-black tracking-tight text-foreground">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="marketing-section bg-[#141218] px-4 py-20 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary/90">Why teams use it</p>
              <h2 className="mt-4 max-w-lg text-4xl font-black tracking-tight text-white sm:text-5xl">
                Useful for both internal teams and client conversations
              </h2>
              <p className="mt-4 max-w-lg text-base leading-relaxed text-white/72">
                Klusters keeps the platform presentable for clients while still giving teams enough structure to manage campaign work confidently.
              </p>

              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {aboutOutcomes.slice(0, 2).map((item, index) => (
                  <article
                    key={item.title}
                    className="group rounded-[1.5rem] border border-white/6 bg-white/5 p-5 text-white transition-colors duration-300 hover:border-primary/40 hover:bg-[linear-gradient(180deg,#cb6ce6_0%,#8d63ea_100%)]"
                  >
                    <h3 className="text-xl font-semibold tracking-tight sm:text-[1.4rem]">{item.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-white/72 transition-colors duration-300 group-hover:text-white/86">
                      {item.description}
                    </p>
                  </article>
                ))}

                {aboutOutcomes.slice(2, 4).map((item) => (
                  <article
                    key={item.title}
                    className="group rounded-[1.5rem] border border-white/6 bg-white/5 p-5 transition-colors duration-300 hover:border-primary/40 hover:bg-[linear-gradient(180deg,#cb6ce6_0%,#8d63ea_100%)]"
                  >
                    <h3 className="text-xl font-semibold tracking-tight text-white sm:text-[1.4rem]">{item.title}</h3>
                    <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/72 transition-colors duration-300 group-hover:text-white/86">
                      {item.description}
                    </p>
                  </article>
                ))}
              </div>
            </div>

            <div className="relative mx-auto flex min-h-[24rem] w-full max-w-[30rem] items-center justify-center">
              <div className="absolute inset-auto h-[19rem] w-[19rem] rounded-full border border-white/8 bg-white/[0.04]" />
              <div className="absolute inset-auto h-[14rem] w-[14rem] rounded-full border border-white/10 bg-white/[0.06]" />
              <div className="absolute inset-auto h-[12rem] w-[12rem] overflow-hidden rounded-full border-8 border-[#1f1d24] shadow-[0_18px_34px_rgba(0,0,0,0.24)]">
                <img src="/person1.png" alt="Creator portrait" className="h-full w-full object-cover" />
              </div>

              <div className="absolute right-12 top-16 flex h-16 w-16 items-center justify-center rounded-full bg-[linear-gradient(180deg,#cb6ce6_0%,#8d63ea_100%)] shadow-[0_18px_28px_rgba(203,108,230,0.24)]">
                <Users className="h-6 w-6 text-white" />
              </div>

              <div className="absolute left-16 top-6 h-16 w-16">
                <div className="glass-float-a h-full w-full overflow-hidden rounded-full border-4 border-[#141218] shadow-[0_12px_22px_rgba(0,0,0,0.2)]">
                  <img src="/person2.png" alt="Team member portrait" className="h-full w-full object-cover" />
                </div>
              </div>
              <div className="absolute left-6 top-1/2 h-9 w-9 -translate-y-1/2">
                <div className="glass-float-b h-full w-full overflow-hidden rounded-full border-2 border-[#141218] shadow-[0_10px_18px_rgba(0,0,0,0.2)]">
                  <img src="/person3.png" alt="Team member portrait" className="h-full w-full object-cover" />
                </div>
              </div>
              <div className="absolute bottom-12 left-14 h-20 w-20">
                <div className="glass-float-c h-full w-full overflow-hidden rounded-full border-4 border-[#141218] shadow-[0_12px_22px_rgba(0,0,0,0.2)]">
                  <img src="/person4.png" alt="Team member portrait" className="h-full w-full object-cover" />
                </div>
              </div>
              <div className="absolute bottom-4 left-1/2 h-12 w-12 -translate-x-1/2">
                <div className="glass-float-a h-full w-full overflow-hidden rounded-full border-2 border-[#141218] shadow-[0_10px_18px_rgba(0,0,0,0.2)]">
                  <img src="/person5.png" alt="Team member portrait" className="h-full w-full object-cover" />
                </div>
              </div>
              <div className="absolute bottom-12 right-10 h-20 w-20">
                <div className="glass-float-b h-full w-full overflow-hidden rounded-full border-4 border-[#141218] shadow-[0_12px_22px_rgba(0,0,0,0.2)]">
                  <img src="/person6.png" alt="Team member portrait" className="h-full w-full object-cover" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </MarketingPageLayout>
  )
}
