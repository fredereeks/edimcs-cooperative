import React from 'react'
import LoanList from './LoanList'
import { loanData } from '@/data/loans'



export default function page() {


  return (
    <main className="flex flex-col gap-4 px-2 sm:px-0 pt-5 pb-10">
      <LoanList loanData={loanData} />
    </main>
  )
}
