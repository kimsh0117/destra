import React from 'react'

export function useClientSide(): boolean {
  const [isClientSide, setIsClientSide] = React.useState(false)

  React.useEffect(() => {
    setIsClientSide(true)
  }, [])

  return isClientSide
}
