import {useState, useEffect} from 'react'

export default function useIsOnline() {
  const [isOnline, setOnline] = useState(
    typeof window !== 'undefined' && window.navigator.onLine
  )

  useEffect(() => {
    function setFromEvent(event: Event) {
      setOnline(navigator.onLine)
    }

    window.addEventListener('online', setFromEvent)
    window.addEventListener('offline', setFromEvent)

    return () => {
      window.removeEventListener('online', setFromEvent)
      window.removeEventListener('offline', setFromEvent)
    }
  }, [])

  return isOnline
}
