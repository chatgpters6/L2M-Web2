'use client'

import Link from 'next/link'
import { Logo } from '@/components/l2m/brand'
import { UrlAnalyzer } from '@/components/l2m/url-analyzer'
import { cn } from '@/lib/utils'
import { INVITE_INPUT_ID, useHomeCopy } from './home-state'

export function Invitation() {
  const { h, lang } = useHomeCopy()
  return (
    <section aria-labelledby="invite-title" className="bg-ink text-ivory">
      <div className="mx-auto flex max-w-3xl flex-col items-center gap-6 px-5 py-20 text-center md:px-10 lg:py-28">
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-lime">{h.invite.eyebrow}</p>
        <h2
          id="invite-title"
          className={cn(
            'text-balance font-semibold',
            lang === 'zh' ? 'text-3xl leading-tight sm:text-5xl' : 'text-[36px] leading-[1.05] tracking-[-0.03em] sm:text-[56px]',
          )}
        >
          {h.invite.title}
        </h2>
        <UrlAnalyzer tone="dark" inputId={INVITE_INPUT_ID} size="lg" className="w-full text-left" sampleReportHref="#report" />
        <ul className="flex flex-col gap-1 text-sm text-ivory/65 sm:flex-row sm:gap-6">
          {h.invite.boundary.map((b) => (
            <li key={b}>{b}</li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export function SiteFooter() {
  const { h } = useHomeCopy()
  return (
    <footer className="border-t border-ivory/10 bg-ink text-ivory">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-6 px-5 py-10 md:flex-row md:items-center md:justify-between md:px-10">
        <div className="flex flex-col gap-3">
          <Logo tone="dark" />
          <p className="max-w-md text-sm leading-relaxed text-ivory/60">{h.footer.note}</p>
        </div>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-ivory/70">
          {[h.footer.privacy, h.footer.terms].map((l) => (
            <span key={l} title={h.footer.placeholder} aria-disabled="true">
              {l}
            </span>
          ))}
          <Link href="/review/stage-1" className="underline underline-offset-4 hover:text-lime focus-visible:outline-2 focus-visible:outline-lime">
            {h.reviewLink}
          </Link>
        </div>
      </div>
    </footer>
  )
}
