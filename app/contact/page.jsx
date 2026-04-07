"use client"

import { ContactSection } from '@/components/contact-section'
import { MarketingPageLayout } from '@/components/marketing-page-layout'

export default function ContactPage() {
  return (
    <MarketingPageLayout>
      <ContactSection className="pt-14" />
    </MarketingPageLayout>
  )
}
