'use client'

import { AfterDesktop, AfterMobile } from '@/components/l2m/demo-sites'
import { DemoBadge } from '@/components/l2m/brand'
import { FitWidth } from '@/components/l2m/fit-width'
import { DEMO_COMPANY } from '@/lib/demo-facts'
import { SectionIntro, useHomeCopy } from './home-state'

function BrowserFrame({ label }: { label: string }) {
  return (
    <figure className="flex min-w-0 flex-col overflow-hidden rounded-xl border border-ink/20 bg-ivory shadow-2xl shadow-ink/15">
      <div className="flex items-center gap-3 border-b border-ink/10 bg-mist px-4 py-2.5">
        <span aria-hidden="true" className="flex gap-1.5">
          <span className="size-2.5 rounded-full bg-ink/20" />
          <span className="size-2.5 rounded-full bg-ink/20" />
          <span className="size-2.5 rounded-full bg-ink/20" />
        </span>
        <span className="min-w-0 flex-1 truncate rounded-sm bg-ivory px-3 py-1 font-mono text-xs text-ink/60">{DEMO_COMPANY.domain}</span>
      </div>
      <div className="relative aspect-[16/10] overflow-hidden" inert>
        <FitWidth designWidth={1280}>
          <AfterDesktop />
        </FitWidth>
      </div>
      <figcaption className="sr-only">{label}</figcaption>
    </figure>
  )
}

function PhoneFrame({ label }: { label: string }) {
  return (
    <figure className="flex w-40 shrink-0 flex-col rounded-[1.75rem] border-[6px] border-ink bg-ink shadow-2xl shadow-ink/30 sm:w-48 lg:w-56">
      <div className="relative aspect-[9/19] overflow-hidden rounded-[1.25rem] bg-ivory" inert>
        <FitWidth designWidth={375}>
          <AfterMobile />
        </FitWidth>
      </div>
      <figcaption className="sr-only">{label}</figcaption>
    </figure>
  )
}

export function WhatYouGet() {
  const { h } = useHomeCopy()
  const g = h.get
  return (
    <section id="what-you-get" aria-labelledby="get-title" className="scroll-mt-4 bg-ivory text-ink">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-12 px-5 py-16 md:px-10 lg:py-24">
        <SectionIntro id="get-title" eyebrow={g.eyebrow} title={g.title} lede={g.lede} />

        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <DemoBadge label={g.showcaseLabel} />
            <p className="text-sm text-ink/65">{g.deviceNote}</p>
          </div>

          <div className="relative rounded-2xl bg-mist px-4 pt-6 pb-10 sm:px-8 sm:pt-10 lg:px-14 lg:pt-14 lg:pb-16">
            <div className="flex items-end gap-4 sm:gap-6 lg:gap-0">
              <div className="min-w-0 flex-1 lg:pr-32">
                <BrowserFrame label={`${g.desktopLabel} — ${g.showcaseLabel}`} />
              </div>
              <div className="hidden sm:block lg:absolute lg:right-14 lg:bottom-8">
                <PhoneFrame label={`${g.mobileLabel} — ${g.showcaseLabel}`} />
              </div>
            </div>
            <div className="mt-6 flex justify-center sm:hidden">
              <PhoneFrame label={`${g.mobileLabel} — ${g.showcaseLabel}`} />
            </div>
          </div>
        </div>

        <ul className="grid gap-x-10 gap-y-2 sm:grid-cols-2 lg:grid-cols-4">
          {g.values.map(([title, body]) => (
            <li key={title} className="flex flex-col gap-1.5 border-t-2 border-ink py-4">
              <h3 className="font-semibold">{title}</h3>
              <p className="text-sm leading-relaxed text-ink/75">{body}</p>
            </li>
          ))}
        </ul>

        <div className="flex flex-col gap-5 border-t border-ink/15 pt-6 lg:flex-row lg:items-center lg:justify-between">
          <dl className="flex flex-col gap-3 text-sm md:flex-row md:gap-8">
            {g.delivery.map(([k, v], i) => (
              <div key={k} className={i === 2 ? 'flex flex-col text-ink/55' : 'flex flex-col'}>
                <dt className="font-semibold">{k}</dt>
                <dd className="leading-relaxed text-ink/70">{v}</dd>
              </div>
            ))}
          </dl>
          <div className="flex flex-col gap-1.5 lg:items-end">
            <span
              aria-disabled="true"
              className="inline-flex min-h-12 w-fit cursor-not-allowed items-center justify-center rounded-md border border-ink/25 px-6 font-semibold text-ink/55"
            >
              {g.cta}
            </span>
            <p className="text-xs text-ink/60">{g.ctaNote}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
