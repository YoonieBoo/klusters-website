import { PublicRoutePage } from '@/components/public-route-page'

export default function DashboardPage() {
  return (
    <PublicRoutePage
      eyebrow="Information"
      title="The dashboard has been replaced with public website content."
      description="Klusters no longer uses protected dashboard flows. Everything important is available publicly through the site navigation."
      primaryHref="/features"
      primaryLabel="Explore Features"
      secondaryHref="/contact"
      secondaryLabel="Contact Us"
    />
  )
}
