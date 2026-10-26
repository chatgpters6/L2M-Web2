import type { Metadata } from 'next'
import { ReviewBar, SiteHeader } from '@/components/l2m/site-header'
import { HeroA } from '@/components/direction-a/hero-a'
import { FlagshipA } from '@/components/direction-a/flagship-a'

export const metadata: Metadata = {
  title: 'Direction A — Editorial Product · L2M Stage 1 Review',
}

const INPUT_ID = 'analyze-url-a'

export default function DirectionAPage() {
  return (
    <>
      <ReviewBar direction="A" />
      <SiteHeader inputId={INPUT_ID} />
      <main>
        <HeroA inputId={INPUT_ID} />
        <FlagshipA inputId={INPUT_ID} />
      </main>
    </>
  )
}
