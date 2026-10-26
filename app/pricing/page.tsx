import type { Metadata } from 'next'
import { PricingPage } from '@/components/pages/pricing'

export const metadata: Metadata = {
  title: 'Pricing & Delivery — Legacy2Modern (design prototype)',
  description: 'L2M Website Upgrade: scope and total price confirmed before payment, independent source-code delivery. SAMPLE PRICE only.',
}

export default function Page() {
  return <PricingPage />
}
