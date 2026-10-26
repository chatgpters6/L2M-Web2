'use client'

import { DemoBadge } from './brand'
import { useLang } from '@/lib/i18n'
import { cn } from '@/lib/utils'

export function EvidenceList({ tone = 'light', className }: { tone?: 'light' | 'dark'; className?: string }) {
  const { t } = useLang()
  const dark = tone === 'dark'
  return (
    <div className={cn('flex flex-col gap-3 rounded-lg border p-4', dark ? 'border-ivory/15' : 'border-ink/15 bg-ivory', className)}>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h4 className={cn('text-sm font-semibold', dark ? 'text-ivory' : 'text-ink')}>{t.flagship.evidenceHeading}</h4>
        <DemoBadge tone={tone} />
      </div>
      <p className={cn('text-sm leading-relaxed', dark ? 'text-ivory/70' : 'text-muted-foreground')}>{t.flagship.placeholderNote}</p>
      <dl className="flex flex-col text-[13px]">
        {t.flagship.evidence.map(([k, v]) => (
          <div key={k} className={cn('flex justify-between gap-4 border-t py-1.5', dark ? 'border-ivory/10' : 'border-ink/10')}>
            <dt className={dark ? 'text-ivory/60' : 'text-ink/60'}>{k}</dt>
            <dd className={cn('text-right', dark ? 'text-ivory/90' : 'text-ink')}>{v}</dd>
          </div>
        ))}
      </dl>
    </div>
  )
}
