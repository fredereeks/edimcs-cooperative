import React from 'react'
import LoanList from './LoanList'
import { LoanProps, MemberProps } from '@/types'
import { fetchLoans, fetchUser } from '../../actions'


export default async function page() {
  const user: MemberProps = await fetchUser()
  const loansData: LoanProps[] = await fetchLoans(user?.type as string, user?.id as string);
  console.log({loansData: loansData.map(el => el.loaner)})

  return (
    <main className="flex flex-col gap-4 px-2 sm:px-0 pt-5 pb-10">
      <LoanList loansData={loansData} user={user} /> 
    </main>
  )
}
