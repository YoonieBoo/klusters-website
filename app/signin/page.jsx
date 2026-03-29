import { PublicRoutePage } from '@/components/public-route-page'

export default function SigninPage() {
  return (
    <PublicRoutePage
      eyebrow="Information"
      title="Klusters is now a public marketing website."
      description="There is no sign-in flow here anymore. Review the platform, explore services, and contact the team directly."
      primaryHref="/contact"
      primaryLabel="Contact Us"
      secondaryHref="/features"
      secondaryLabel="Explore Features"
    />
  )
}
