'use client'

import { useEffect, useRef, useState, type ReactNode } from 'react'

/** Renders children at a fixed design width and zooms them to fit the container, preserving real page proportions. */
export function FitWidth({ designWidth, children }: { designWidth: number; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  const [zoom, setZoom] = useState<number | null>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const update = () => setZoom(Math.min(1, el.clientWidth / designWidth))
    update()
    const observer = new ResizeObserver(update)
    observer.observe(el)
    return () => observer.disconnect()
  }, [designWidth])

  return (
    <div ref={ref} className="w-full min-w-0 overflow-hidden">
      <div style={{ width: designWidth, zoom: zoom ?? 1, visibility: zoom === null ? 'hidden' : 'visible' }}>
        {children}
      </div>
    </div>
  )
}
