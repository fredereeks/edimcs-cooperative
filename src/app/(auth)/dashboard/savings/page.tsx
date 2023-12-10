import React from 'react'
import SavingsList from './SavingsList'
import { fetchSavings, fetchUser } from '../../actions'
import { MemberProps, SavingsProps, UserProps } from '@/types'


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

