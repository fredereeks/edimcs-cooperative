import React from 'react'
import DepositList from './DepositList'
// import { depositData } from '@/data/deposits'
import { DepositProps, MemberProps } from '@/types'
import { fetchDeposits, fetchUser } from '../../actions'
import { Metadata } from 'next'


export const metadata: Metadata = {
  title: 'EDIMCS :: Deposits',
  description: "EDIMCS stands for Enlightenment Drive Initiative Co-operative Society. We are the largest cooperative organization among cooperatives in Nigeria and in the world; with the goal of achieving a first-world Nigeria with empowerment and housing for low-income and small and medium enterprises as our primary goal",
}


export default async function DepositPage() {
  // const user = session?.user
  const user: MemberProps = await fetchUser()
  const depositData: DepositProps[] = await fetchDeposits(user?.type as string, user?.id as string);
  
  return (
    <main className="flex flex-col gap-4 px-2 sm:px-0 pt-5 pb-10">
      <DepositList depositData={depositData} user={user} />
    </main>
  )
}
