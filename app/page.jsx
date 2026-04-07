"use client"

import Link from 'next/link'
import { useState } from 'react'
import { ContactSection } from '@/components/contact-section'
import { MarketingPageLayout } from '@/components/marketing-page-layout'
import { Button } from '@/components/ui/button'
import { processSteps, serviceCards } from '@/lib/marketing-content'
import { ArrowRight, CircleDashed, Clock, Eye, Gem, Mail, Sparkles, Users } from 'lucide-react'

function WaveDivider() {
  return (
    <div aria-hidden="true" className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
      <svg viewBox="0 0 1440 120" className="h-[80px] w-full fill-[#f8f1ff]" preserveAspectRatio="none">
        <path d="M0,32C120,75,240,107,360,106.7C480,107,600,75,720,58.7C840,43,960,43,1080,58.7C1200,75,1320,107,1440,101.3V120H0Z" />
      </svg>
    </div>
  )
}

const homepageFeaturePreviews = [
  {
    id: 'creator-discovery',
    title: 'Creator Discovery',
    summary: 'Browse curated creators with clear categories and public profiles.',
    detail:
      'View creators by category, style, and audience so teams can quickly understand who fits the campaign.',
    label: 'Discovery Layer',
    meta: 'Public network',
    image: '/feature-previews/creator-discovery.svg',
    icon: Eye,
  },
  {
    id: 'public-profiles',
    title: 'Public Creator Profiles',
    summary: 'Showcase creators in a structured, brand-ready format.',
    detail:
      'Each profile highlights the creator, their content style, and key details in a format that is easy to review and share.',
    label: 'Presentation Layer',
    meta: 'Profile-led storytelling',
    image: '/feature-previews/public-profiles.svg',
    icon: Users,
  },
  {
    id: 'campaign-matching',
    title: 'Campaign Matching',
    summary: 'Match creators based on fit, content style, and campaign goals.',
    detail:
      'Compare creators against campaign needs and build shortlists based on audience fit, content type, and brand goals.',
    label: 'Matching System',
    meta: 'Brand-creator fit',
    image: '/feature-previews/campaign-matching.svg',
    icon: CircleDashed,
  },
  {
    id: 'launch-tracking',
    title: 'Launch Tracking',
    summary: 'Track progress, delivery, and campaign performance in one place.',
    detail:
      'Follow campaign progress from planning to delivery, with one place to review status, outputs, and performance.',
    label: 'Campaign Operations',
    meta: 'Live progress',
    image: '/feature-previews/launch-tracking.svg',
    icon: Sparkles,
  },
]

const heroHighlights = [
  {
    title: 'Discover',
    description: 'Browse polished creator offerings, campaign categories, and public-facing platform value.',
    icon: Eye,
  },
  {
    title: 'Coordinate',
    description: 'Keep planning, collaboration, and launch support in one cleaner marketing workflow.',
    icon: Users,
  },
  {
    title: 'Elevate',
    description: 'Present creator campaigns with a more premium story, clearer proof, and stronger brand trust.',
    icon: Gem,
  },
]

const homepageProofPoints = [
  {
    title: 'Public visibility',
    description: 'Present creators and campaigns in a clear, public format.',
  },
  {
    title: 'Structured matching',
    description: 'Organize creator selection based on fit, style, and goals.',
  },
  {
    title: 'Cleaner workflow',
    description: 'Manage planning and launch steps in one consistent flow.',
  },
]

const aboutKlustersVisuals = [
  {
    title: 'Public visibility',
    description: 'Present creators and campaigns in a clear, public format.',
    image: '/girl1.jpg',
    alt: 'Creator portrait',
  },
  {
    title: 'Structured matching',
    description: 'Organize creator selection based on fit, style, and goals.',
    image: '/girl2.jpg',
    alt: 'Creator portrait',
  },
  {
    title: 'Cleaner workflow',
    description: 'Manage planning and launch steps in one consistent flow.',
    image: '/boy1.jpg',
    alt: 'Creator portrait',
  },
]

export default function HomePage() {
  const [activeFeatureId, setActiveFeatureId] = useState(null)

  return (
    <MarketingPageLayout footerClassName="mt-0">
      <section className="relative overflow-hidden px-4 pb-40 pt-10 sm:px-6 lg:px-8 lg:pt-14">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-white" />
          <div className="absolute left-[-10%] top-10 h-64 w-64 rounded-full bg-primary/28 blur-2xl" />
          <div className="absolute left-[10%] top-[64%] h-28 w-28 rounded-full bg-primary/18 blur-xl" />
          <div className="absolute right-[-8%] top-[-10%] h-80 w-80 rounded-full bg-secondary/24 blur-2xl" />
          <div className="absolute right-[12%] bottom-[10%] h-56 w-56 rounded-full bg-primary/22 blur-2xl" />
          <div className="absolute left-[26%] top-[12%] h-20 w-20 rounded-full bg-primary/12 blur-lg" />
          <div className="absolute right-[24%] top-[22%] h-18 w-18 rounded-full bg-secondary/10 blur-lg" />
        </div>

        <div className="relative mx-auto max-w-7xl">
          <div className="relative px-1 pb-2 pt-8 text-foreground sm:px-2 lg:pt-10">
            <div className="relative mx-auto max-w-5xl text-center">
              <div className="mx-auto mt-7 max-w-4xl space-y-4 sm:space-y-5">
                <p className="text-[1.35rem] font-black uppercase leading-none tracking-[-0.03em] text-foreground sm:text-[1.9rem] lg:text-[2.2rem]">
                  Craft
                </p>
                <h1 className="text-[2.5rem] font-black uppercase leading-[0.9] tracking-[-0.06em] text-foreground sm:text-[4rem] lg:text-[5.2rem]">
                  <span className="text-primary">Creator</span>
                </h1>
                <p className="text-[1.15rem] font-black uppercase leading-none tracking-[-0.03em] text-foreground sm:text-[1.8rem] lg:text-[2.5rem]">
                  Campaigns With Impact
                </p>
              </div>
            </div>

            <div className="mx-auto mt-12 max-w-5xl">
              <div className="grid gap-8 py-8 md:grid-cols-3 md:gap-6">
                {heroHighlights.map((item) => (
                  <div key={item.title} className="text-left">
                    <div className="flex items-center gap-2.5 text-foreground">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full border border-primary/12 bg-[#f8f1ff] text-primary">
                        <item.icon className="h-4 w-4" />
                      </div>
                      <p className="text-base font-semibold">{item.title}</p>
                    </div>
                    <p className="mt-3 text-base leading-relaxed text-slate-500 sm:text-lg">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-center">
                <Link href="/features">
                  <Button size="lg" className="w-full justify-center sm:w-52">
                    Explore Features
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/signup">
                  <Button size="lg" variant="secondary" className="w-full justify-center sm:w-52">
                    Sign Up
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        <WaveDivider />
      </section>

      <section className="marketing-section bg-[#f8f1ff] px-4 pb-32 pt-20 sm:px-6 sm:pb-36 sm:pt-24 lg:px-8 lg:pb-40">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-[-4rem] top-10 h-64 w-64 rounded-full bg-primary/6 blur-3xl" />
          <div className="absolute right-[6%] top-24 h-72 w-72 rounded-full bg-primary/5 blur-3xl" />
        </div>
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.88fr_1.12fr] lg:items-start lg:gap-16">
          <div className="max-w-2xl lg:pt-2">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">ABOUT KLUSTERS</p>
            <h2 className="mt-4 text-4xl font-black tracking-tight text-foreground sm:text-5xl">
              Built to make creator marketing easier to understand
            </h2>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-slate-600">
              Klusters is a platform that helps brands discover creators, plan campaigns, and present their work in a more structured and transparent way.
            </p>
          </div>

    <div className="grid gap-0 sm:grid-cols-2 lg:grid-cols-3 lg:grid-rows-2">
      <article className="flex flex-col justify-center border border-primary/10 bg-white/60 p-5">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary/80">01</p>
        <p className="mt-3 text-lg font-black tracking-tight text-foreground">{aboutKlustersVisuals[0].title}</p>
        <p className="mt-2 max-w-[15rem] text-base leading-relaxed text-slate-600">{aboutKlustersVisuals[0].description}</p>
      </article>

      <div className="relative overflow-hidden border border-primary/10 bg-white/40 aspect-[1.18/1] lg:aspect-auto">
        <img
          src={aboutKlustersVisuals[0].image}
          alt={aboutKlustersVisuals[0].alt}
          className="absolute inset-0 block h-full w-full scale-[1.16] object-cover object-center"
        />
      </div>

      <article className="flex flex-col justify-center border border-primary/10 bg-white/60 p-5">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary/80">02</p>
        <p className="mt-3 text-lg font-black tracking-tight text-foreground">{aboutKlustersVisuals[1].title}</p>
        <p className="mt-2 max-w-[15rem] text-base leading-relaxed text-slate-600">{aboutKlustersVisuals[1].description}</p>
      </article>

      <div className="relative overflow-hidden border border-primary/10 bg-white/40 aspect-[1.18/1] lg:aspect-auto">
        <img
          src={aboutKlustersVisuals[1].image}
          alt={aboutKlustersVisuals[1].alt}
          className="absolute inset-0 block h-full w-full scale-[1.16] object-cover object-center"
        />
      </div>

      <article className="flex flex-col justify-center border border-primary/10 bg-white/60 p-5">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary/80">03</p>
        <p className="mt-3 text-lg font-black tracking-tight text-foreground">{aboutKlustersVisuals[2].title}</p>
        <p className="mt-2 max-w-[15rem] text-base leading-relaxed text-slate-600">{aboutKlustersVisuals[2].description}</p>
      </article>

      <div className="relative overflow-hidden border border-primary/10 bg-white/40 aspect-[1.18/1] lg:aspect-auto">
        <img
          src={aboutKlustersVisuals[2].image}
          alt={aboutKlustersVisuals[2].alt}
          className="absolute inset-0 block h-full w-full scale-[1.16] object-cover object-center"
        />
      </div>
    </div>
  </div>
  <WaveDivider />
</section>

      <section className="marketing-section px-4 py-20 sm:px-6 lg:px-8">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-[12%] top-12 h-52 w-52 rounded-full bg-primary/5 blur-3xl" />
          <div className="absolute right-[-2rem] top-[42%] h-72 w-72 rounded-full bg-primary/5 blur-3xl" />
        </div>
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.92fr_1.08fr]">
          <div className="max-w-md">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">Featured Previews</p>
            <h2 className="mt-4 text-4xl font-black tracking-tight text-foreground sm:text-5xl">
              Explore how Klusters works
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-slate-600">
              A quick look at how creators, campaigns, and workflows are structured inside the platform.
            </p>
            <Link href="/features" className="mt-8 inline-flex">
              <Button variant="secondary">
                View All Features
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="relative pl-5 sm:pl-6">
            <div className="absolute bottom-0 left-2.5 top-0 w-px bg-primary/12" />
            <div className="space-y-1" onMouseLeave={() => setActiveFeatureId(null)}>
              {homepageFeaturePreviews.map((feature) => {
                const isExpanded = feature.id === activeFeatureId

                return (
                  <div
                    key={feature.id}
                    className="relative py-5"
                    onMouseEnter={() => setActiveFeatureId(feature.id)}
                  >
                    <span
                      className={`absolute left-[-1.2rem] top-7 h-3 w-3 rounded-full border transition-all duration-300 sm:left-[-1.42rem] ${
                        isExpanded ? 'border-primary bg-primary shadow-[0_0_0_6px_rgba(203,108,230,0.1)]' : 'border-primary/30 bg-white'
                      }`}
                    />
                    <button
                      type="button"
                      className="block w-full border-b border-primary/10 pb-5 text-left transition-colors duration-300"
                    >
                      <p className={`text-xs font-semibold uppercase tracking-[0.18em] transition-colors duration-300 ${isExpanded ? 'text-primary' : 'text-brand-secondary'}`}>
                        {feature.label}
                      </p>
                      <h3 className={`mt-2 text-xl font-black tracking-tight transition-colors duration-300 ${isExpanded ? 'text-primary' : 'text-foreground'}`}>
                        {feature.title}
                      </h3>
                      <p className="mt-2 text-base leading-relaxed text-slate-600">{feature.summary}</p>
                    </button>

                    <div
                      className={`grid transition-[grid-template-rows,opacity,margin] duration-400 ease-out ${
                        isExpanded ? 'mt-5 grid-rows-[1fr] opacity-100' : 'mt-0 grid-rows-[0fr] opacity-0'
                      }`}
                    >
                      <div className="overflow-hidden">
                        <div className="max-w-2xl pr-4">
                          <p className="text-base leading-relaxed text-slate-600">{feature.detail}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#f8f1ff] px-4 pb-28 pt-28 sm:px-6 sm:pb-32 sm:pt-32 lg:px-8 lg:pb-36 lg:pt-36">
        <div aria-hidden="true" className="absolute left-0 top-0 z-0 w-full overflow-hidden leading-none">
          <svg viewBox="0 0 1440 120" className="h-[56px] w-full -scale-y-100 fill-[#f8f1ff] sm:h-[80px]" preserveAspectRatio="none">
            <path d="M0,32C120,75,240,107,360,106.7C480,107,600,75,720,58.7C840,43,960,43,1080,58.7C1200,75,1320,107,1440,101.3V120H0Z" />
          </svg>
        </div>
        <div className="relative z-10 mx-auto max-w-7xl">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-4xl">
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">What You Get</p>
              <h2 className="mt-4 text-4xl font-black tracking-tight text-foreground sm:text-5xl lg:text-[3rem]">
                Outcomes that make creator campaigns easier to trust.
              </h2>
              <p className="mt-5 max-w-2xl text-xl leading-relaxed text-slate-600">
                The value here is stronger creator fit, more usable content, and clearer visibility across the campaign.
              </p>
            </div>

            <Link href="/how-it-works" className="inline-flex shrink-0 lg:self-end">
              <Button variant="secondary">
                Learn More
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="mt-12 grid gap-10 lg:grid-cols-3 lg:gap-8">
            {processSteps.map((step, index) => (
              <article key={step.title} className="relative">
                <div className="flex items-center gap-4">
                  <span className="text-sm font-semibold tracking-[0.18em] text-primary">
                    0{index + 1}
                  </span>
                  <div className="h-px flex-1 bg-primary/12" />
                </div>

                <div className="mt-6 max-w-sm">
                  <h3 className="text-2xl font-black tracking-tight text-foreground">
                    {index === 0
                      ? 'Right creators, not random reach'
                      : index === 1
                        ? 'Content you can actually use'
                        : 'Clear results, not guesswork'}
                  </h3>
                  <p className="mt-4 text-lg leading-relaxed text-slate-600">
                    {index === 0
                      ? 'We match creators based on content fit, audience relevance, and brand alignment — not just follower count.'
                      : index === 1
                        ? 'Every piece is reviewed, structured, and aligned with your campaign goals — not one-off posts.'
                        : 'Track performance, approvals, and outcomes in one place — with full visibility from start to finish.'}
                  </p>
                </div>
              </article>
            ))}
          </div>

        </div>
        <WaveDivider />
      </section>

      <ContactSection />
    </MarketingPageLayout>
  )
}
