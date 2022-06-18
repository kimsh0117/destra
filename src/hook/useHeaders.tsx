import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'

export function useHeaders() {
  const { data: session, status } = useSession()
  const [headers, setHeaders] = useState<{
    [key: string]: string
  }>({})
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)

  useEffect(() => {
    if (session) {
      setHeaders(prev => ({
        ...prev,
        'x-access-token': session.accessToken as string,
      }))
      setIsLoggedIn(prev => !prev)
    }
  }, [session])

  return {
    headers,
    isLoggedIn,
    status,
  }
}
