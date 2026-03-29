import { PublicRoutePage } from '@/components/public-route-page'

export default function SignupPage() {
  return (
    <PublicRoutePage
      eyebrow="Information"
      title="No account creation is required."
      description="Klusters now works as a public-facing information site. Learn about the offering, browse creators, and reach out when you are ready."
      primaryHref="/features"
      primaryLabel="Explore Features"
      secondaryHref="/contact"
      secondaryLabel="Book a Demo"
    />
  )
}
