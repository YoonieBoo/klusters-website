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
            <p className="mt-4 text-lg leading-relaxed text-slate-600">
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
                  <p className="mt-2 text-base leading-relaxed text-slate-600">{item.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="marketing-section bg-[#141218] px-4 py-20 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 xl:grid-cols-[0.95fr_1.05fr] xl:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary/90">Why teams use it</p>
              <h2 className="mt-4 max-w-lg text-4xl font-black tracking-tight text-white sm:text-5xl">
                Useful for both internal teams and client conversations
              </h2>
              <p className="mt-4 max-w-lg text-lg leading-relaxed text-white/72">
                Klusters keeps the platform presentable for clients while still giving teams enough structure to manage campaign work confidently.
              </p>

              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {aboutOutcomes.slice(0, 2).map((item, index) => (
                  <article
                    key={item.title}
                    className="group rounded-[1.5rem] border border-white/6 bg-white/5 p-5 text-white transition-colors duration-300 hover:border-primary/40 hover:bg-[linear-gradient(180deg,#cb6ce6_0%,#8d63ea_100%)]"
                  >
                    <h3 className="text-xl font-semibold tracking-tight sm:text-[1.4rem]">{item.title}</h3>
                    <p className="mt-3 text-base leading-relaxed text-white/72 transition-colors duration-300 group-hover:text-white/86">
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
                    <p className="mt-3 max-w-xl text-base leading-relaxed text-white/72 transition-colors duration-300 group-hover:text-white/86">
                      {item.description}
                    </p>
                  </article>
                ))}
              </div>
            </div>

            <div className="relative mx-auto mt-2 flex min-h-[20rem] w-full max-w-[22rem] items-center justify-center sm:min-h-[22rem] sm:max-w-[26rem] xl:mt-0 xl:min-h-[24rem] xl:max-w-[30rem]">
              <div className="absolute inset-auto h-[15rem] w-[15rem] rounded-full border border-white/8 bg-white/[0.04] sm:h-[17rem] sm:w-[17rem] xl:h-[19rem] xl:w-[19rem]" />
              <div className="absolute inset-auto h-[11rem] w-[11rem] rounded-full border border-white/10 bg-white/[0.06] sm:h-[13rem] sm:w-[13rem] xl:h-[14rem] xl:w-[14rem]" />
              <div className="absolute inset-auto h-[9.25rem] w-[9.25rem] overflow-hidden rounded-full border-6 border-[#1f1d24] shadow-[0_18px_34px_rgba(0,0,0,0.24)] sm:h-[10.5rem] sm:w-[10.5rem] xl:h-[12rem] xl:w-[12rem] xl:border-8">
                <img src="/person1.png" alt="Creator portrait" className="h-full w-full object-cover" />
              </div>

              <div className="absolute right-7 top-10 flex h-12 w-12 items-center justify-center rounded-full bg-[linear-gradient(180deg,#cb6ce6_0%,#8d63ea_100%)] shadow-[0_18px_28px_rgba(203,108,230,0.24)] sm:right-10 sm:top-12 sm:h-14 sm:w-14 xl:right-12 xl:top-16 xl:h-16 xl:w-16">
                <Users className="h-4 w-4 text-white sm:h-5 sm:w-5 xl:h-6 xl:w-6" />
              </div>

              <div className="absolute left-8 top-4 h-12 w-12 sm:left-12 sm:top-5 sm:h-14 sm:w-14 xl:left-16 xl:top-6 xl:h-16 xl:w-16">
                <div className="glass-float-a h-full w-full overflow-hidden rounded-full border-4 border-[#141218] shadow-[0_12px_22px_rgba(0,0,0,0.2)]">
                  <img src="/person2.png" alt="Team member portrait" className="h-full w-full object-cover" />
                </div>
              </div>
              <div className="absolute left-1 top-1/2 h-7 w-7 -translate-y-1/2 sm:left-3 sm:h-8 sm:w-8 xl:left-6 xl:h-9 xl:w-9">
                <div className="glass-float-b h-full w-full overflow-hidden rounded-full border-2 border-[#141218] shadow-[0_10px_18px_rgba(0,0,0,0.2)]">
                  <img src="/person3.png" alt="Team member portrait" className="h-full w-full object-cover" />
                </div>
              </div>
              <div className="absolute bottom-8 left-6 h-14 w-14 sm:bottom-10 sm:left-10 sm:h-16 sm:w-16 xl:bottom-12 xl:left-14 xl:h-20 xl:w-20">
                <div className="glass-float-c h-full w-full overflow-hidden rounded-full border-4 border-[#141218] shadow-[0_12px_22px_rgba(0,0,0,0.2)]">
                  <img src="/person4.png" alt="Team member portrait" className="h-full w-full object-cover" />
                </div>
              </div>
              <div className="absolute bottom-1 left-1/2 h-9 w-9 -translate-x-1/2 sm:bottom-2 sm:h-10 sm:w-10 xl:bottom-4 xl:h-12 xl:w-12">
                <div className="glass-float-a h-full w-full overflow-hidden rounded-full border-2 border-[#141218] shadow-[0_10px_18px_rgba(0,0,0,0.2)]">
                  <img src="/person5.png" alt="Team member portrait" className="h-full w-full object-cover" />
                </div>
              </div>
              <div className="absolute bottom-8 right-4 h-14 w-14 sm:bottom-10 sm:right-6 sm:h-16 sm:w-16 xl:bottom-12 xl:right-10 xl:h-20 xl:w-20">
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
