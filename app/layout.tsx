import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono, Noto_Sans_SC } from 'next/font/google'
import { LangProvider } from '@/lib/i18n'
import './globals.css'

const geist = Geist({ subsets: ['latin'], variable: '--font-geist' })
const geistMono = Geist_Mono({ subsets: ['latin'], variable: '--font-geist-mono' })
// Self-hosted CJK face so Chinese renders identically on every device, including headless review browsers without system CJK fonts.
const notoSC = Noto_Sans_SC({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-noto-sc',
  display: 'swap',
  preload: false,
})

export const metadata: Metadata = {
  title: 'Legacy2Modern — Design prototype',
  description:
    'Design prototype of the Legacy2Modern website: homepage, Transformations, How It Works and Pricing. DEMO only — not a production website.',
  generator: 'v0.app',
  robots: { index: false, follow: false },
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#17262D',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${geist.variable} ${geistMono.variable} ${notoSC.variable} bg-background`}
      suppressHydrationWarning
    >
      <body className="font-sans antialiased">
        <LangProvider>{children}</LangProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
