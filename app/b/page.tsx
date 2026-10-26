import type { Metadata } from 'next'
import { ReviewBar, SiteHeader } from '@/components/l2m/site-header'
import { HeroB } from '@/components/direction-b/hero-b'
import { FlagshipB } from '@/components/direction-b/flagship-b'

export const metadata: Metadata = {
  title: 'Direction B — Interactive Product · L2M Stage 1 Review',
}

const INPUT_ID = 'analyze-url-b'

export default function DirectionBPage() {
  return (
    <>
      <ReviewBar direction="B" />
      <SiteHeader tone="dark" inputId={INPUT_ID} />
      <main>
        <HeroB inputId={INPUT_ID} />
        <FlagshipB inputId={INPUT_ID} />
      </main>
    </>
  )
}
