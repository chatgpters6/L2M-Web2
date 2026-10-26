'use client'

import { useEffect, useState } from 'react'
import type { Device, View } from './demo-viewport'

export function useFlagship(initialHotspot: number | null = 0) {
  const [view, setView] = useState<View>('after')
  const [device, setDevice] = useState<Device>('desktop')
  const [activeHotspot, setActiveHotspot] = useState<number | null>(initialHotspot)

  useEffect(() => {
    if (window.matchMedia('(max-width: 767px)').matches) setDevice('mobile')
  }, [])

  return { view, setView, device, setDevice, activeHotspot, setActiveHotspot }
}

export function focusHeroInput(id: string) {
  const el = document.getElementById(id)
  if (!el) return
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'center' })
  el.focus({ preventScroll: true })
}
