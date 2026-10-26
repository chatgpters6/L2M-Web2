'use client'

import { createContext, useContext, useState, type ReactNode } from 'react'
import type { UrlCheck } from '@/lib/url'

export type UrlStage = 'input' | 'continue' | 'next'

export type UrlFlow = {
  value: string
  setValue: (v: string) => void
  result: UrlCheck | null
  setResult: (r: UrlCheck | null) => void
  stage: UrlStage
  setStage: (s: UrlStage) => void
}

export function useUrlFlowState(): UrlFlow {
  const [value, setValue] = useState('')
  const [result, setResult] = useState<UrlCheck | null>(null)
  const [stage, setStage] = useState<UrlStage>('input')
  return { value, setValue, result, setResult, stage, setStage }
}

const UrlFlowContext = createContext<UrlFlow | null>(null)

/** Shares one URL entry between every analyzer on a page (e.g. hero and closing invitation). */
export function UrlFlowProvider({ children }: { children: ReactNode }) {
  const flow = useUrlFlowState()
  return <UrlFlowContext.Provider value={flow}>{children}</UrlFlowContext.Provider>
}

export function useSharedUrlFlow() {
  return useContext(UrlFlowContext)
}
