import { useState, useEffect } from 'react'

export default function IsWindowSizeLargerThan(pixels: number) {
  const [windowIsLarger, setwindowIsLarger] = useState(false)
  useEffect(() => {
    function handleResize() {
      const { innerWidth: windowWidth } = window
      if (windowWidth >= pixels) return setwindowIsLarger(true)
      return setwindowIsLarger(false)
    }

    window.addEventListener('resize', handleResize)
    handleResize()
    return () => window.removeEventListener('resize', handleResize)
  }, [pixels])

  return windowIsLarger
}
