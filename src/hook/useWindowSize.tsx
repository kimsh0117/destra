import React from 'react'
import { useClientSide } from './useClientSide'

export interface IUseWindowSize {
  width: number
  height: number
}

export function useWindowSize(): IUseWindowSize {
  const isClientSide = useClientSide()
  const [size, setSize] = React.useState<IUseWindowSize>({
    width: 0,
    height: 0,
  })
  React.useLayoutEffect(() => {
    const updateSize = () => {
      isClientSide &&
        setSize(prev => ({
          ...prev,
          width: window.innerWidth,
          height: window.innerHeight,
        }))
    }
    if (isClientSide) {
      window.addEventListener('resize', updateSize)
      updateSize()
    }

    return () => window.removeEventListener('resize', updateSize)
  }, [isClientSide])
  return size
}
