import React from 'react'
import LoanList from './LoanList'
import { LoanProps, MemberProps } from '@/types'
import { fetchLoans, fetchUser } from '../../actions'
import { Metadata } from 'next'


export const metadata: Metadata = {
  title: 'EDIMCS :: Loans',
  description: "EDIMCS stands for Enlightenment Drive Initiative Co-operative Society. We are the largest cooperative organization among cooperatives in Nigeria and in the world; with the goal of achieving a first-world Nigeria with empowerment and housing for low-income and small and medium enterprises as our primary goal",
}

export default async function page() {
  const user: MemberProps = await fetchUser()
  const loansData: LoanProps[] = await fetchLoans(user?.type as string, user?.id as string);

  return (
    <main className="flex flex-col gap-4 px-2 sm:px-0 pt-5 pb-10">
      <LoanList loansData={loansData} user={user} /> 
    </main>
  )
}
