import React from 'react'
import WithdrawalList from './WithdrawalList'
import { MemberProps } from '@/types'
import { fetchUser, fetchWithdrawals } from '../../actions'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'EDIMCS :: Withdrawal',
  description: "EDIMCS stands for Enlightenment Drive Initiative Co-operative Society. We are the largest cooperative organization among cooperatives in Nigeria and in the world; with the goal of achieving a first-world Nigeria with empowerment and housing for low-income and small and medium enterprises as our primary goal",
}

export default async function page() {
  const user: MemberProps | null = await fetchUser()
  const withdrawalData = await fetchWithdrawals(user?.type as string, user?.id as string);
  // const userDeposits = await fetchWithdrawal(user?.type as string, user?.id as string)

  return (
    <main className="flex flex-col gap-4 px-2 sm:px-0 pt-5 pb-10">
      <WithdrawalList key={'171243'} user={user} withdrawalData={withdrawalData} />
    </main>
  )
}
