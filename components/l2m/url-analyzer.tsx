'use client'

import { useId, type FormEvent } from 'react'
import { ArrowLeft, ArrowRight, Check, CircleAlert, Pencil } from 'lucide-react'
import { checkUrl } from '@/lib/url'
import { useLang } from '@/lib/i18n'
import { cn } from '@/lib/utils'
import { useSharedUrlFlow, useUrlFlowState, type UrlStage } from './url-flow'

type Tone = 'light' | 'dark'

export function UrlAnalyzer({
  tone = 'light',
  inputId,
  className,
  size = 'md',
  sampleReportHref,
}: {
  tone?: Tone
  inputId?: string
  className?: string
  size?: 'md' | 'lg'
  sampleReportHref?: string
}) {
  const { t } = useLang()
  const generatedId = useId()
  const id = inputId ?? generatedId
  const messageId = `${id}-message`
  const statusId = `${id}-status`

  const shared = useSharedUrlFlow()
  const local = useUrlFlowState()
  const { value, setValue, result, setResult, stage, setStage } = shared ?? local

  const dark = tone === 'dark'
  const hasError = result !== null && result.state !== 'valid'

  function goTo(next: UrlStage, focusId: string) {
    setStage(next)
    requestAnimationFrame(() => document.getElementById(focusId)?.focus())
  }

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const next = checkUrl(value)
    setResult(next)
    if (next.state === 'valid') goTo('continue', statusId)
  }

  function onChange(next: string) {
    setValue(next)
    if (result) {
      const checked = checkUrl(next)
      setResult(checked.state === 'empty' ? null : checked)
    }
  }

  const cardCls = cn(
    'flex flex-col gap-4 rounded-lg border p-5 text-left',
    dark ? 'border-ivory/20 bg-ivory/5 text-ivory' : 'border-ink/15 bg-mist/60 text-ink',
    className,
  )
  const subtle = dark ? 'text-ivory/75' : 'text-muted-foreground'
  const ghostBtn = cn(
    'inline-flex min-h-11 items-center gap-2 rounded-md px-3 text-sm font-medium underline-offset-4 hover:underline focus-visible:outline-2',
    dark ? 'focus-visible:outline-ivory' : 'focus-visible:outline-ink',
  )

  if (stage !== 'input' && result?.state === 'valid') {
    if (stage === 'next') {
      return (
        <div role="region" aria-labelledby={statusId} className={cardCls}>
          <span
            className={cn(
              'w-fit rounded-sm border px-1.5 py-0.5 font-mono text-[11px] font-semibold uppercase tracking-wider',
              dark ? 'border-lime/60 text-lime' : 'border-ink/40 text-ink',
            )}
          >
            {t.url.nextBadge}
          </span>
          <div className="flex flex-col gap-1">
            <p id={statusId} tabIndex={-1} className="text-lg font-semibold outline-none">
              {t.url.nextTitle}
            </p>
            <p className={cn('text-sm', subtle)}>
              {t.url.nextKept}: <span className="font-mono">{result.normalized}</span>
            </p>
          </div>
          <ol className="flex flex-col">
            {t.url.nextSteps.map(([step, status], i) => (
              <li key={step} className={cn('flex items-start gap-3 border-t py-2.5 text-sm', dark ? 'border-ivory/15' : 'border-ink/10')}>
                <span className={cn('flex size-6 shrink-0 items-center justify-center rounded-full font-mono text-xs font-bold', dark ? 'bg-ivory/10 text-ivory' : 'bg-ink/10 text-ink')}>
                  {i + 1}
                </span>
                <span className="flex flex-col">
                  <span className="font-medium">{step}</span>
                  <span className={subtle}>{status}</span>
                </span>
              </li>
            ))}
          </ol>
          <div className="flex flex-wrap items-center gap-3">
            {sampleReportHref && (
              <a
                href={sampleReportHref}
                className="inline-flex min-h-11 items-center gap-2 rounded-md bg-lime px-4 font-semibold text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime"
              >
                {t.url.nextSample}
                <ArrowRight className="size-4" aria-hidden="true" />
              </a>
            )}
            <button type="button" onClick={() => goTo('continue', statusId)} className={ghostBtn}>
              <ArrowLeft className="size-3.5" aria-hidden="true" />
              {t.url.back}
            </button>
            <button type="button" onClick={() => goTo('input', id)} className={ghostBtn}>
              <Pencil className="size-3.5" aria-hidden="true" />
              {t.url.edit}
            </button>
          </div>
          <p className="font-mono text-xs uppercase tracking-wide opacity-70">{t.url.demo}</p>
        </div>
      )
    }

    return (
      <div role="status" className={cardCls}>
        <div className="flex items-start gap-3">
          <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-lime text-ink">
            <Check className="size-4" aria-hidden="true" />
          </span>
          <div className="flex min-w-0 flex-col gap-1">
            <p id={statusId} tabIndex={-1} className="font-semibold outline-none">
              {t.url.continueTitle}
            </p>
            <p className="truncate font-mono text-sm">{result.normalized}</p>
            <p className={cn('text-sm leading-relaxed', subtle)}>{t.url.continueBody}</p>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => goTo('next', statusId)}
            aria-describedby={`${id}-demo`}
            className={cn(
              'inline-flex min-h-11 items-center gap-2 rounded-md bg-lime px-4 font-semibold text-ink outline-offset-2 focus-visible:outline-2',
              dark ? 'focus-visible:outline-lime' : 'focus-visible:outline-ink',
            )}
          >
            {t.url.continueCta}
            <ArrowRight className="size-4" aria-hidden="true" />
          </button>
          <button type="button" onClick={() => goTo('input', id)} className={ghostBtn}>
            <Pencil className="size-3.5" aria-hidden="true" />
            {t.url.edit}
          </button>
        </div>
        <p id={`${id}-demo`} className="font-mono text-xs uppercase tracking-wide opacity-70">
          {t.url.demo}
        </p>
      </div>
    )
  }

  const message =
    result?.state === 'empty'
      ? t.url.empty
      : result?.state === 'invalid'
        ? t.url.invalid
        : result?.state === 'unavailable'
          ? t.url.unavailable
          : null

  return (
    <form noValidate onSubmit={onSubmit} className={cn('flex flex-col gap-2', className)}>
      <label htmlFor={id} className={cn('text-sm font-medium', dark ? 'text-ivory/80' : 'text-muted-foreground')}>
        {t.url.label}
      </label>
      <div
        className={cn(
          'flex flex-col gap-2 rounded-lg border bg-ivory p-1.5 text-ink sm:flex-row sm:items-center',
          hasError ? 'border-destructive ring-1 ring-destructive' : dark ? 'border-ivory' : 'border-ink/30',
          'focus-within:ring-2 focus-within:ring-offset-2',
          dark ? 'focus-within:ring-lime focus-within:ring-offset-ink' : 'focus-within:ring-ink focus-within:ring-offset-ivory',
        )}
      >
        <input
          id={id}
          type="url"
          inputMode="url"
          autoComplete="url"
          autoCapitalize="none"
          spellCheck={false}
          placeholder={t.url.placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          aria-invalid={hasError || undefined}
          aria-describedby={messageId}
          className={cn(
            'min-h-12 w-full min-w-0 flex-1 rounded-md bg-transparent px-3 font-mono text-ink placeholder:text-ink/45 focus:outline-none',
            size === 'lg' ? 'text-lg' : 'text-base',
          )}
        />
        <button
          type="submit"
          className={cn(
            'inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-md px-5 font-semibold outline-offset-2 focus-visible:outline-2',
            dark
              ? 'bg-lime text-ink hover:bg-lime/90 focus-visible:outline-lime'
              : 'bg-ink text-ivory hover:bg-ink/90 focus-visible:outline-ink',
          )}
        >
          {t.hero.ctaPrimary}
          <span
            className={cn('flex size-6 items-center justify-center rounded-full', dark ? 'bg-ink text-lime' : 'bg-lime text-ink')}
            aria-hidden="true"
          >
            <ArrowRight className="size-3.5" />
          </span>
        </button>
      </div>
      <div id={messageId} aria-live="polite" className="min-h-5 text-sm">
        {message ? (
          <p className={cn('flex items-start gap-1.5 font-medium', dark ? 'text-[#ffb4a8]' : 'text-destructive')}>
            <CircleAlert className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
            {message}
          </p>
        ) : result?.state === 'valid' ? (
          <p className={cn('flex items-center gap-1.5', dark ? 'text-lime' : 'text-ink')}>
            <Check className="size-4" aria-hidden="true" />
            {t.url.recognized}: <span className="font-mono">{result.host}</span>
          </p>
        ) : null}
      </div>
    </form>
  )
}
