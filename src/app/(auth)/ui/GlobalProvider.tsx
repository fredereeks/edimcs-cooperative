"use client"
import { useSession } from 'next-auth/react'
import React, { createContext } from 'react'

type UserType = {
  email?: string | null | undefined
  image?: string | null | undefined
} & {
  type?: string | null | undefined
  id?: string | null | undefined
  fullname?: string | null | undefined
} | undefined

export const GlobalContext = createContext<UserType>({})

export default function GlobalProvider ({children}: {children: React.ReactNode}) {
    const user: UserType = useSession()?.data?.user 
    // const activeContext = useContext(GlobalProvider)
    // console.log(JSON.stringify(session))
  return (
    <GlobalContext.Provider value={{...user}}>
        {children}
    </GlobalContext.Provider>
  )
}
