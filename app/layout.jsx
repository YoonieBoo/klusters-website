import { Analytics } from '@vercel/analytics/next'
import { Toaster } from '@/components/ui/toaster'
import './globals.css'

export const metadata = {
  title: 'Klusters - Creator Profiles & Showcase',
  description: 'Discover talented creators, showcase your work, and connect with like-minded professionals on Klusters.',
  generator: 'v0.app',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full" style={{ backgroundColor: '#ffffff' }}>
      <body className="min-h-full antialiased text-foreground" style={{ backgroundColor: '#ffffff' }}>
        <div className="relative min-h-screen app-route-fade">
          {children}
        </div>
        <Toaster />
        <Analytics />
      </body>
    </html>
  )
}
