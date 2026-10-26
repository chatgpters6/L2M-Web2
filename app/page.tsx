import type { Metadata } from 'next'
import { SiteHeader } from '@/components/l2m/site-header'
import { UrlFlowProvider } from '@/components/l2m/url-flow'
import { HERO_INPUT_ID, HomeDemoProvider } from '@/components/home/home-state'
import { ProtoBar } from '@/components/home/proto-bar'
import { Hero } from '@/components/home/hero'
import { Transformation } from '@/components/home/transformation'
import { Journey } from '@/components/home/journey'
import { Report } from '@/components/home/report'
import { DeliveryPath } from '@/components/home/delivery-path'
import { WhatYouGet } from '@/components/home/what-you-get'
import { Proof } from '@/components/home/proof'
import { Invitation, SiteFooter } from '@/components/home/invitation'

export const metadata: Metadata = {
  title: 'Legacy2Modern — Make your existing website work better for your customers',
  description:
    'Start from the website you already have. Upgrade its visual design, content structure and customer actions. Design prototype — not a production website.',
  robots: { index: false, follow: false },
}

export default function HomePage() {
  return (
    <UrlFlowProvider>
      <HomeDemoProvider>
        <ProtoBar />
        <SiteHeader tone="dark" inputId={HERO_INPUT_ID} anchors={['#transformation', '#url-to-delivery', '#what-you-get']} />
        <main>
          <Hero />
          <Transformation />
          <Journey />
          <Report />
          <DeliveryPath />
          <WhatYouGet />
          <Proof />
          <Invitation />
        </main>
        <SiteFooter />
      </HomeDemoProvider>
    </UrlFlowProvider>
  )
}
