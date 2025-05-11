'use client'

import {setGlobalRouter} from '@/shared/globalRouter/const/globalRouter'
import {useRouter} from 'next/navigation'
import {ReactNode, useEffect} from 'react'

export default function GlobalRouterLayout({
  children,
}: {
  children: ReactNode
}) {
  const router = useRouter()

  useEffect(() => {
    setGlobalRouter(router)
  }, []);

  return (
    <>
      {children}
    </>
  )
}