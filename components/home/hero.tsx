'use client'

import { ArrowDown } from 'lucide-react'
import { UrlAnalyzer } from '@/components/l2m/url-analyzer'
import { DemoViewport } from '@/components/l2m/demo-viewport'
import { Segmented } from '@/components/l2m/brand'
import { useFlagship } from '@/components/l2m/use-flagship'
import { cn } from '@/lib/utils'
import { HERO_INPUT_ID, useHomeCopy, useHomeDemo } from './home-state'

export function Hero() {
  const { h, t, lang } = useHomeCopy()
  const { view, setView } = useHomeDemo()
  const { device } = useFlagship(null)

  return (
    <section aria-labelledby="hero-title" className="bg-ink text-ivory">
      <div className="mx-auto grid max-w-[1440px] gap-10 px-5 pt-8 pb-14 md:px-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:items-center lg:gap-14 lg:pt-14 lg:pb-20">
        <div className="flex min-w-0 flex-col gap-6">
          <p className="w-fit rounded-full border border-ivory/20 px-3 py-1 font-mono text-xs uppercase tracking-[0.18em] text-ivory/75">
            {t.hero.brandLine}
          </p>
          <h1
            id="hero-title"
            className={cn(
              'text-balance font-semibold',
              lang === 'zh' ? 'text-[32px] leading-tight sm:text-5xl' : 'text-[36px] leading-[1.04] tracking-[-0.03em] sm:text-5xl xl:text-[60px]',
            )}
          >
            {t.hero.headline}
          </h1>
          <p className="text-pretty leading-relaxed text-ivory/75 lg:text-lg">{t.hero.subtitle}</p>
          <UrlAnalyzer tone="dark" inputId={HERO_INPUT_ID} size="lg" sampleReportHref="#report" />
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6">
            <a
              href="#transformation"
              className="inline-flex min-h-11 w-fit items-center gap-2 font-semibold text-ivory underline decoration-lime decoration-2 underline-offset-[6px] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-lime"
            >
              {t.hero.ctaSecondary}
              <ArrowDown className="size-4" aria-hidden="true" />
            </a>
            <p className="text-sm text-ivory/65">{t.hero.boundary.join(' · ')}</p>
          </div>
        </div>

        <div className="flex min-w-0 flex-col gap-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <Segmented
              label={h.hero.viewLabel}
              value={view}
              onChange={setView}
              options={[
                { value: 'before', label: t.flagship.before },
                { value: 'after', label: t.flagship.after },
              ]}
            />
            <p className="font-mono text-[11px] uppercase tracking-wider text-ivory/60">{t.flagship.fictional}</p>
          </div>
          <DemoViewport
            view={view}
            device={device}
            className={device === 'mobile' ? '' : 'w-full'}
            bodyHeight="h-[440px] xl:h-[500px]"
            mobileBodyHeight="h-[420px]"
            badgeLabel={t.flagship.fictional}
          />
          <div aria-live="polite" className="flex flex-col gap-1 border-l-2 border-lime pl-4 text-sm leading-relaxed">
            <p className="text-ivory">{view === 'after' ? h.hero.proofAfter : h.hero.proofBefore}</p>
            <p className="text-ivory/55">{h.hero.caption}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
