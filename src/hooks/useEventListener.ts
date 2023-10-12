import { useEffect, useRef } from 'react'

type EventHandler = (event: Event) => void

interface IUseEventListener {
  eventName: string
  handler: EventHandler
  element?: EventTarget
}

export function useEventListener({
  eventName,
  handler,
  element = globalThis
}: IUseEventListener) {
  const savedHandler = useRef<EventHandler>()

  useEffect(() => {
    savedHandler.current = handler
  }, [handler])

  useEffect(() => {
    const isSupported = typeof element?.addEventListener === 'function'
    if (!isSupported) return

    const eventListener: EventHandler = (event) => {
      if (savedHandler.current) {
        savedHandler.current(event)
      }
    }

    element.addEventListener(eventName, eventListener)

    return () => {
      element.removeEventListener(eventName, eventListener)
    }
  }, [eventName, element])
}
