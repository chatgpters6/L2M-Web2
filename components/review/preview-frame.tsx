'use client'

import { FitWidth } from '@/components/l2m/fit-width'

export function PreviewFrame({ src, width, height, title }: { src: string; width: number; height: number; title: string }) {
  return (
    <div className="flex flex-col gap-2">
      <p className="font-mono text-xs uppercase tracking-wider text-ink/70">
        {width}px · {title}
      </p>
      <div className="overflow-hidden rounded-lg border border-ink/15 bg-ivory shadow-sm">
        <FitWidth designWidth={width}>
          <iframe src={src} title={`${title} at ${width}px`} width={width} height={height} className="block border-0" loading="lazy" />
        </FitWidth>
      </div>
    </div>
  )
}
