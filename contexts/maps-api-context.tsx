'use client'

import React, { createContext, useContext, useState, ReactNode } from 'react'

interface MapsApiContextType {
  apiKey: string | null
  setApiKey: (key: string) => void
}

const MapsApiContext = createContext<MapsApiContextType | undefined>(undefined)

export function MapsApiProvider({ children }: { children: ReactNode }) {
  const [apiKey, setApiKey] = useState<string | null>('AIzaSyBwaJVGFhnhN-WKtiLn6KSa7PvRrauytHQ')

  return <MapsApiContext.Provider value={{ apiKey, setApiKey }}>{children}</MapsApiContext.Provider>
}

export function useMapsApi() {
  const context = useContext(MapsApiContext)
  if (context === undefined) {
    throw new Error('useMapsApi must be used within a MapsApiProvider')
  }
  return context
}
