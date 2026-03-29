import {
  BarChart4,
  BriefcaseBusiness,
  Camera,
  CheckCircle2,
  CircleGauge,
  LayoutPanelTop,
  MessageSquareQuote,
  Rocket,
  ShieldCheck,
  Sparkles,
  Users,
} from 'lucide-react'

export const siteNavItems = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Features', href: '/features' },
]

export const heroMetrics = [
  { value: '220+', label: 'creator partnerships activated across campaign launches' },
  { value: '4.8x', label: 'average content efficiency when strategy and production stay aligned' },
  { value: '14 days', label: 'typical timeline from brief approval to launch-ready creative' },
]

export const serviceCards = [
  {
    title: 'Campaign Strategy',
    description: 'Audience planning, creator matching, and launch direction tied to measurable brand goals.',
    icon: BriefcaseBusiness,
    image: '/creators/whatwedo1.png',
  },
  {
    title: 'Creator Partnerships',
    description: 'A curated creator network with public profiles, fit-based recommendations, and streamlined approvals.',
    icon: Users,
    image: '/creators/whatwedo2.png',
  },
  {
    title: 'Content Production',
    description: 'UGC, social creative, short-form video, and campaign assets designed to perform across channels.',
    icon: Camera,
    image: '/creators/whatwedo3.png',
  },
  {
    title: 'Performance Reporting',
    description: 'Decision-ready reporting that keeps stakeholders aligned on reach, engagement, and conversion signals.',
    icon: BarChart4,
    image: '/creators/whatwedo4.png',
  },
]

export const productHighlights = [
  {
    title: 'Discovery That Feels Editorial',
    description: 'Present creators in a premium, searchable format that feels more like a showcase than a database.',
    icon: LayoutPanelTop,
  },
  {
    title: 'Workflow Without Friction',
    description: 'Keep campaign planning, creative review, and launch coordination inside one clear process.',
    icon: Rocket,
  },
  {
    title: 'Insight That Closes the Loop',
    description: 'Move from creative direction to post-launch analysis without losing context or momentum.',
    icon: CircleGauge,
  },
]

export const processSteps = [
  {
    title: 'Shape the brief',
    description: 'We map the audience, campaign goals, creative needs, and success metrics before outreach starts.',
    icon: Sparkles,
  },
  {
    title: 'Build the creator mix',
    description: 'Klusters curates a shortlist of creators based on brand fit, platform strengths, and content style.',
    icon: Users,
  },
  {
    title: 'Launch with control',
    description: 'Approvals, timelines, deliverables, and reporting stay visible from kickoff through publishing.',
    icon: CheckCircle2,
  },
]

export const valuePillars = [
  {
    title: 'Clear positioning',
    description: 'Klusters helps brands explain what they are launching, who it is for, and why creators are the right channel.',
  },
  {
    title: 'High-trust talent',
    description: 'We emphasize creator quality, campaign fit, and creative consistency instead of volume for volume’s sake.',
  },
  {
    title: 'Operational clarity',
    description: 'Every engagement is structured around fewer handoff gaps, faster approvals, and cleaner reporting.',
  },
]

export const benefits = [
  'Faster launch cycles with one coordinated campaign team',
  'Stronger creative consistency across paid and organic outputs',
  'A clearer public-facing platform story that supports trust before outreach',
  'Simpler reporting for internal stakeholders and external partners',
]

export const faqItems = [
  {
    question: 'Who is Klusters built for?',
    answer: 'Klusters supports brands, agencies, and in-house teams that need creator strategy, production, and campaign execution in one place.',
  },
  {
    question: 'Can visitors browse creators before contacting the team?',
    answer: 'Visitors can review the platform offering, services, workflow, and launch support publicly before starting a conversation.',
  },
  {
    question: 'What kinds of campaigns do you support?',
    answer: 'Klusters supports product launches, creator seeding, UGC programs, awareness campaigns, and always-on creator marketing systems.',
  },
  {
    question: 'How is this different from a gated creator dashboard?',
    answer: 'The site is designed as a premium public marketing experience first, with creator discovery and campaign storytelling visible without logins or onboarding flows.',
  },
]

export const contactCards = [
  {
    title: 'Book a Demo',
    body: 'Walk through the platform story, discovery approach, and how Klusters can support upcoming campaigns.',
    ctaLabel: 'Schedule a Conversation',
    href: 'mailto:hello@klusters.co?subject=Book%20a%20Demo',
  },
  {
    title: 'Discuss a Campaign',
    body: 'Share goals, timeline, and category details so we can recommend the right creator and content approach.',
    ctaLabel: 'Start an Inquiry',
    href: 'mailto:hello@klusters.co?subject=Campaign%20Inquiry',
  },
  {
    title: 'Creator Partnerships',
    body: 'Reach out about featured creators, partnership opportunities, or inclusion in future campaigns.',
    ctaLabel: 'Talk Partnerships',
    href: 'mailto:hello@klusters.co?subject=Creator%20Partnership',
  },
]

export const proofCards = [
  {
    title: 'Audience fit',
    description: 'Shortlists are shaped around content tone, channel strengths, and commercial intent.',
    icon: ShieldCheck,
  },
  {
    title: 'Creative control',
    description: 'Feedback, approvals, and rollout planning stay organized without slowing creators down.',
    icon: MessageSquareQuote,
  },
  {
    title: 'Performance visibility',
    description: 'Campaigns stay measurable with reporting designed for both marketing teams and leadership.',
    icon: BarChart4,
  },
]
