import type { Metadata } from 'next'
import { HowItWorksPage } from '@/components/pages/how-it-works'

export const metadata: Metadata = {
  title: 'How It Works — Legacy2Modern (design prototype)',
  description: 'Analyze, Plan, Upgrade, Deliver: how L2M upgrades an existing website, with a decision point at every phase.',
}

export default function Page() {
  return <HowItWorksPage />
}
