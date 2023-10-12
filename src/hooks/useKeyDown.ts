import { useEffect } from 'react'

type KeyDownCallback = () => void

export const useKeyDown = (
  callback: KeyDownCallback,
  keys: string[],
  modifier?: boolean
) => {
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
