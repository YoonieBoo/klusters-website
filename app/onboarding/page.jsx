import { PublicRoutePage } from '@/components/public-route-page'

export default function OnboardingPage() {
  return (
    <PublicRoutePage
      eyebrow="Information"
      title="The onboarding flow has been removed."
      description="Instead of setup steps, the site now focuses on clear public information about services, creators, and how Klusters works."
      primaryHref="/how-it-works"
      primaryLabel="How It Works"
      secondaryHref="/about"
      secondaryLabel="Learn More"
    />
  )
}
