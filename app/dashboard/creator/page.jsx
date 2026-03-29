import { PublicRoutePage } from '@/components/public-route-page'

export default function CreatorDashboardPage() {
  return (
    <PublicRoutePage
      eyebrow="Information"
      title="The creator workspace has been removed."
      description="Klusters is now focused on public-facing marketing pages, services, and campaign information."
      primaryHref="/features"
      primaryLabel="Explore Features"
      secondaryHref="/contact"
      secondaryLabel="Contact Us"
    />
  )
}
