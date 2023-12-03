'use client'

import { SessionProvider } from "next-auth/react"

export const Provider = ({children}: {children?: React.ReactNode | React.ReactNode[]}) => {
    return <SessionProvider>{children}</SessionProvider>
}