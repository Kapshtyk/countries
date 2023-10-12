import { useEffect } from 'react'

interface IKeyDown {
  (callback: () => void, keys: string[], modifier?: boolean): void
}

export const useKeyDown: IKeyDown = (callback, keys, modifier) => {
  const onKeyDown = (event: KeyboardEvent) => {
    const wasAnyKeyPressed = keys.some((key) => event.key === key)
    const wasModifierPressed = modifier ? event.ctrlKey : true
    if (wasAnyKeyPressed && wasModifierPressed) {
      event.preventDefault()
      callback()
    }
  }
  useEffect(() => {
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [onKeyDown])
}
