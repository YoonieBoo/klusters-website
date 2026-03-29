import { PublicRoutePage } from '@/components/public-route-page'

export default function BrandDashboardPage() {
  return (
    <PublicRoutePage
      eyebrow="Brands"
      title="Brand planning now starts with a public conversation."
      description="There is no private brand dashboard here anymore. Review the offering and reach out for a tailored recommendation."
      primaryHref="/contact"
      primaryLabel="Book a Demo"
      secondaryHref="/features"
      secondaryLabel="View Services"
    />
  )
}
