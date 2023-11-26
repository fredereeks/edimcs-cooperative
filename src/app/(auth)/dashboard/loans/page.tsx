import React from 'react'
import LoanList from './LoanList'
import { loansData } from '@/data/loans'
import { user } from '@/data'
import { LoanProps } from '@/types'

const fetchLoans = async() => {
  const loans = await loansData
  if(user?.type === "Member") {
    // const loans = await prisma.loan.findFirst({
    //   where: {
    //     loanerId: user?.id
    //   }
    // })
    return loans.filter(loan => loan.loanerId === user?.id)
  }
  else {
    // const loans = await prisma.loan.findMany({
    //   where: {
    //     loanerId: user?.id
    //   }
    // })
    return loans
  }
}

export default async function page() {
  const loansData: LoanProps[] = await fetchLoans();
  // console.log({loansData})

  return (
    <main className="flex flex-col gap-4 px-2 sm:px-0 pt-5 pb-10">
      <LoanList loansData={loansData} />
    </main>
  )
}
