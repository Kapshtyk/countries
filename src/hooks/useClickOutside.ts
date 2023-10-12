import { useRef } from 'react'

import { useEventListener } from '@/hooks/useEventListener'

type Handler = (event: Event) => void

export function useClickOutside<T extends HTMLElement = HTMLElement>(
  handler: Handler
) {
  const ref = useRef<T>(null)

  useEventListener({
    eventName: 'mousedown',
    handler: (event: Event) => {
      const element = ref?.current

      if (!element || element.contains(event.target as Node)) {
        return
      }

      handler(event)
    }
  })

  return ref
}
