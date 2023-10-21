'use client'
import Aos from 'aos'
import React, { ReactNode } from 'react'

// type LayoutProps = {children?: ReactNode}
interface LayoutProps {
  children: React.ReactNode
}

export default function AosProvider({children} : LayoutProps) {
    React.useEffect(() => {
        Aos.init({
            duration: 3000,
            once: true
        })
    },[])
  return (
    <>
      {children}
    </>
  )
}
