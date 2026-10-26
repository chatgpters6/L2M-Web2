'use client'

import { SectionIntro, useHomeCopy } from './home-state'

export function WhatYouGet() {
  const { h } = useHomeCopy()
  const g = h.get
  return (
    <section id="what-you-get" aria-labelledby="get-title" className="scroll-mt-4 bg-ivory text-ink">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-12 px-5 py-16 md:px-10 lg:py-24">
        <SectionIntro id="get-title" eyebrow={g.eyebrow} title={g.title} lede={g.lede} />

        <ul className="grid gap-x-10 sm:grid-cols-2 lg:grid-cols-4">
          {g.values.map(([title, body]) => (
            <li key={title} className="flex flex-col gap-2 border-t-2 border-ink py-5">
              <h3 className="text-lg font-semibold">{title}</h3>
              <p className="leading-relaxed text-ink/75">{body}</p>
            </li>
          ))}
        </ul>

        <div className="grid gap-8 rounded-xl bg-mist p-6 md:p-10 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
          <div className="flex flex-col gap-5">
            <h3 className="text-xl font-semibold">{g.deliveryHeading}</h3>
            <dl className="grid gap-5 md:grid-cols-3">
              {g.delivery.map(([k, v]) => (
                <div key={k} className="flex flex-col gap-1">
                  <dt className="font-semibold">{k}</dt>
                  <dd className="text-sm leading-relaxed text-ink/75">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="flex flex-col gap-2 lg:items-end">
            <span
              aria-disabled="true"
              className="inline-flex min-h-12 cursor-not-allowed items-center justify-center rounded-md border border-ink/25 px-6 font-semibold text-ink/55"
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
