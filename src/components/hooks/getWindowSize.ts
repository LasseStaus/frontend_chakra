import { useState, useEffect } from 'react'

export default function useWindowSize() {
  const [isWindowSizeLargeThan900, setWindowSize] = useState(false)
  useEffect(() => {
    function handleResize() {
      const { innerWidth: windowWidth } = window
      if (windowWidth >= 900) return setWindowSize(true)
      return setWindowSize(false)
    }

    window.addEventListener('resize', handleResize)
    handleResize()
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return isWindowSizeLargeThan900
}
