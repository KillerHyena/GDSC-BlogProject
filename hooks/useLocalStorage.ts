import { useState, useEffect } from 'react'
export default function useLocalStorage<T>(key: string, initialValue: T) {
  const [state, setState] = useState<T>(() => {
    if (typeof window === 'undefined') return initialValue
    try {
      const v = localStorage.getItem(key)
      return v ? JSON.parse(v) : initialValue
    } catch { return initialValue }
  })
  useEffect(() => {
    try { localStorage.setItem(key, JSON.stringify(state)) } catch {}
  }, [key, state])
  return [state, setState] as const
}
