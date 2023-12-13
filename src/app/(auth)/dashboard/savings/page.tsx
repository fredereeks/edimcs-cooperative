import React from 'react'
import SavingsList from './SavingsList'
import { fetchSavings, fetchUser } from '../../actions'
import { MemberProps, SavingsProps, UserProps } from '@/types'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'EDIMCS :: Savings',
  description: "EDIMCS stands for Enlightenment Drive Initiative Co-operative Society. We are the largest cooperative organization among cooperatives in Nigeria and in the world; with the goal of achieving a first-world Nigeria with empowerment and housing for low-income and small and medium enterprises as our primary goal",
}

export default async function page() {
  const user: MemberProps | null = await fetchUser()
  const savingsData: SavingsProps[] = await fetchSavings(user?.type as string, user?.id as string);
  // console.log({savingsData})
  
  return (
    <main className="flex flex-col gap-4 px-2 sm:px-0 pt-5 pb-10">
      <SavingsList key={'171243'} user={user} savingsData={savingsData} /> 
    </main>
  )
}

