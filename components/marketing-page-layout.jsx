import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { PageShell } from '@/components/page-shell'

export function MarketingPageLayout({ children, footerEmbedded = true, footerClassName = '' }) {
  return (
    <PageShell>
      <Navbar />
      <main className="relative flex-1 overflow-hidden">{children}</main>
      <Footer embedded={footerEmbedded} className={footerClassName} />
    </PageShell>
  )
}
