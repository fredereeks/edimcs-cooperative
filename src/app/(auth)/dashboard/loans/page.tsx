import { edimcs_blackpeople, edimcs_calculator, edimcs_coins, edimcs_coinstack, edimcs_gathering } from '@/assets/images'
import React from 'react'
import { user } from '@/data/user'
import { LoanProps } from '@/types'
import LoanList from './LoanList'
import { loanData } from '@/data/loans'



export default function page() {

  

  return (
    <main className="flex flex-col gap-4 px-2 sm:px-0 pt-5 pb-10">
      <LoanList loanData={loanData} />
    </main>
  )
}
