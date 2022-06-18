import React from 'react'

export function useClickOutside(
  refs: React.RefObject<HTMLElement>[],
  cb: (e: React.MouseEvent | React.TouchEvent) => void,
): void {
  React.useEffect(() => {
    // @ts-ignore
    const handler = (event: any) => {
      refs = Array.isArray(refs) ? refs : [refs]
      const mountedRefs = refs.filter(ref => ref.current !== null)

      if (mountedRefs.length > 0) {
        const isSomeRef = mountedRefs.every(ref => {
          if (ref.current !== null) {
            return !ref.current.contains(event.target)
          }
        })

        if (isSomeRef && cb) cb(event)
      }
    }

    document.addEventListener('mousedown', handler)
    document.addEventListener('touchstart', handler)

    return () => {
      document.removeEventListener('mousedown', handler)
      document.removeEventListener('touchstart', handler)
    }
  }, [refs, cb])
}
