'use client'

import { useState, type FormEvent } from 'react'
import { Check, FileText, RotateCcw } from 'lucide-react'
import { cn } from '@/lib/utils'
import {
  DEMO_APPLICATIONS,
  DEMO_COMPANY,
  DEMO_PRODUCT,
  demoApplication,
  demoDatasheetLabel,
  demoInquiryChip,
  demoInquiryContext,
} from '@/lib/demo-facts'
import { SectionIntro, useHomeCopy } from './home-state'

export function Journey() {
  const { h, lang } = useHomeCopy()
  const [step, setStep] = useState(0)
  const current = h.journey.steps[step]

  return (
    <section id="journey" aria-labelledby="journey-title" className="scroll-mt-4 bg-mist text-ink">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-10 px-5 py-16 md:px-10 lg:py-24">
        <SectionIntro id="journey-title" eyebrow={h.journey.eyebrow} title={h.journey.title} lede={h.journey.lede} />

        <div role="tablist" aria-label={h.journey.stepsLabel} className="grid grid-cols-3 border-b border-ink/20">
          {h.journey.steps.map((s, i) => {
            const selected = i === step
            return (
              <button
                key={s.key}
                id={`journey-tab-${s.key}`}
                type="button"
                role="tab"
                aria-selected={selected}
                aria-controls={`journey-panel-${s.key}`}
                tabIndex={selected ? 0 : -1}
                onClick={() => setStep(i)}
                onKeyDown={(e) => {
                  if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return
                  const next = (i + (e.key === 'ArrowRight' ? 1 : 2)) % 3
                  setStep(next)
                  document.getElementById(`journey-tab-${h.journey.steps[next].key}`)?.focus()
                }}
                className={cn(
                  '-mb-px flex min-h-14 items-center gap-3 border-b-2 px-1 text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink sm:px-2',
                  selected ? 'border-ink text-ink' : 'border-transparent text-ink/55 hover:text-ink',
                )}
              >
                <span
                  className={cn(
                    'hidden size-7 shrink-0 items-center justify-center rounded-full font-mono text-xs font-bold sm:flex',
                    selected ? 'bg-ink text-lime' : 'bg-ink/10 text-ink',
                  )}
                >
                  {i + 1}
                </span>
                <span className="text-base font-semibold sm:text-lg">{s.label}</span>
              </button>
            )
          })}
        </div>

        <div
          id={`journey-panel-${current.key}`}
          role="tabpanel"
          aria-labelledby={`journey-tab-${current.key}`}
          className="grid gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-14"
        >
          <dl className="flex flex-col">
            {(
              [
                [h.journey.buyer, current.buyer],
                [h.journey.page, current.page],
                [h.journey.value, current.value],
              ] as const
            ).map(([k, v], i) => (
              <div key={k} className={cn('flex flex-col gap-1 border-t border-ink/15 py-4', i === 2 && 'border-b')}>
                <dt className="font-mono text-[11px] uppercase tracking-wider text-ink/60">{k}</dt>
                <dd className={cn('leading-relaxed', i === 2 ? 'text-lg font-semibold' : 'text-ink/85')}>{v}</dd>
              </div>
            ))}
          </dl>

          <div className="flex min-w-0 flex-col overflow-hidden rounded-xl border border-ink/15 bg-site-bg text-site-ink shadow-xl shadow-ink/10">
            <div className="flex items-center justify-between gap-3 border-b border-ink/10 bg-site-soft px-4 py-2.5">
              <span className="truncate font-mono text-xs text-site-ink/70">{DEMO_COMPANY.domain}</span>
              <span className="shrink-0 rounded-sm border border-ink/30 px-1.5 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-wider">
                {h.path.demo}
              </span>
            </div>
            <div className="p-5 md:p-7">
              {current.key === 'discover' && <DiscoverMock lang={lang} />}
              {current.key === 'evaluate' && <EvaluateMock />}
              {current.key === 'act' && <ActMock />}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function DiscoverMock({ lang }: { lang: 'en' | 'zh' }) {
  const { h } = useHomeCopy()
  const [app, setApp] = useState<string>(DEMO_PRODUCT.applicationKey)
  return (
    <div className="flex flex-col gap-5">
      <fieldset className="flex flex-col gap-3">
        <legend className="mb-3 text-sm font-semibold">{h.journey.appsLabel}</legend>
        <div className="flex flex-wrap gap-2">
          {DEMO_APPLICATIONS.map((a) => (
            <label
              key={a.key}
              className={cn(
                'inline-flex min-h-11 cursor-pointer items-center rounded-full border px-4 text-sm font-medium has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-ink',
                app === a.key ? 'border-site-brand bg-site-brand text-site-bg' : 'border-site-ink/25 hover:border-site-ink',
              )}
            >
              <input type="radio" name="journey-app" value={a.key} checked={app === a.key} onChange={() => setApp(a.key)} className="sr-only" />
              {a.name[lang]}
            </label>
          ))}
        </div>
      </fieldset>
      <div aria-live="polite" className="flex flex-col gap-2">
        <p className="font-mono text-[11px] uppercase tracking-wider text-site-ink/60">{h.journey.families}</p>
        <ul className="grid gap-2 sm:grid-cols-2">
          {demoApplication(app).families.map((f) => (
            <li key={f.en} className="flex items-center justify-between rounded-md border border-site-ink/15 bg-site-soft/60 px-4 py-3 text-sm font-medium">
              {f[lang]}
              <span aria-hidden="true" className="text-site-ink/40">
                →
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

function EvaluateMock() {
  const { lang } = useHomeCopy()
  const specs: [string, string][] = DEMO_PRODUCT.specs.map((s) => [s.label[lang], s.value[lang]])
  return (
    <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
      <img src={DEMO_PRODUCT.image} alt="" className="aspect-square w-28 shrink-0 rounded-md bg-site-soft object-cover sm:w-36" />
      <div className="flex min-w-0 flex-1 flex-col gap-4">
        <div>
          <p className="font-mono text-xs text-site-ink/60">
            {demoApplication().name[lang]} · {DEMO_PRODUCT.category[lang]}
          </p>
          <p className="text-lg font-semibold">{DEMO_PRODUCT.name[lang]}</p>
        </div>
        <dl className="grid grid-cols-2 gap-x-4 gap-y-3 text-sm">
          {specs.map(([k, v]) => (
            <div key={k} className="border-t border-site-ink/15 pt-2">
              <dt className="text-site-ink/60">{k}</dt>
              <dd className="font-semibold">{v}</dd>
            </div>
          ))}
        </dl>
        <span className="inline-flex w-fit items-center gap-2 text-sm font-medium text-site-ink/75">
          <FileText className="size-4" aria-hidden="true" />
          {demoDatasheetLabel(lang)}
        </span>
      </div>
    </div>
  )
}

function ActMock() {
  const { h, lang } = useHomeCopy()
  const [sent, setSent] = useState(false)
  const context = demoInquiryContext(lang)

  function onSubmit(e: FormEvent) {
    e.preventDefault()
    setSent(true)
  }

  if (sent) {
    return (
      <div role="status" className="flex flex-col gap-4">
        <p className="flex items-start gap-2 text-sm font-medium">
          <Check className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
          {h.journey.notSent}
        </p>
        <ul className="flex flex-col gap-1 rounded-md bg-site-soft p-4 font-mono text-sm">
          {context.map((c) => (
            <li key={c}>{c}</li>
          ))}
        </ul>
        <button
          type="button"
          onClick={() => setSent(false)}
          className="inline-flex min-h-11 w-fit items-center gap-2 text-sm font-semibold underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-ink"
        >
          <RotateCcw className="size-4" aria-hidden="true" />
          {h.journey.reset}
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4">
      <div className="flex flex-wrap gap-2">
        <span className="rounded-full bg-site-brand px-3 py-1 text-xs font-semibold text-site-bg">{demoInquiryChip(lang)}</span>
        <span className="rounded-full border border-site-ink/20 px-3 py-1 text-xs font-semibold">{demoApplication().name[lang]}</span>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        {[h.journey.fieldName, h.journey.fieldEmail].map((label, i) => (
          <label key={label} className="flex flex-col gap-1 text-sm font-medium">
            {label}
            <input
              type={i === 1 ? 'email' : 'text'}
              autoComplete={i === 1 ? 'email' : 'name'}
              className="min-h-11 rounded-md border border-site-ink/25 bg-site-bg px-3 text-base focus:outline-2 focus:outline-site-brand"
            />
          </label>
        ))}
        <label className="flex flex-col gap-1 text-sm font-medium sm:col-span-2">
          {h.journey.fieldQty}
          <input className="min-h-11 rounded-md border border-site-ink/25 bg-site-bg px-3 text-base focus:outline-2 focus:outline-site-brand" />
        </label>
      </div>
      <button
        type="submit"
        className="inline-flex min-h-12 w-fit items-center rounded-md bg-site-brand px-5 font-semibold text-site-bg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-site-brand"
      >
        {h.journey.sendDemo}
      </button>
    </form>
  )
}
