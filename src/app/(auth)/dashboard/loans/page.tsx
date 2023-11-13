import { edimcs_blackpeople, edimcs_calculator, edimcs_coins, edimcs_coinstack, edimcs_gathering } from '@/assets/images'
import React from 'react'
import { user } from '@/data/user'
import { LoanProps } from '@/types'
import LoanList from './LoanList'



export default function page() {

  const loanData: LoanProps[] = [
    {
      id: 73495340,
      image: edimcs_coins,
      name: "Amaka Orlando",
      amount: 2000,
      verdict: "Pending",
      status: "Pending",
      payback: 0,
      createdAt: "12:40pm",
      balance: 80000
    },
    {
      id: 73495341,
      image: edimcs_calculator,
      name: "Abubakar Suleiman",
      amount: 250000,
      verdict: "Pending",
      status: "Pending",
      payback: 0,
      createdAt: "08:37am",
      balance: 232200
    },
    {
      id: 73495342,
      image: edimcs_blackpeople,
      name: "Oloruntoba Samuel",
      amount: 32000,
      verdict: "Granted",
      status: "Running",
      payback: 15500,
      createdAt: "08:37am",
      balance: 51500
    },
    {
      id: 73495343,
      image: edimcs_gathering,
      name: "Danjuma Medugu",
      amount: 22000,
      verdict: "Rejected",
      status: "Completed",
      payback: 0,
      createdAt: "11:51am",
      balance: 78000
    },
    {
      id: 73495344,
      image: edimcs_coinstack,
      name: "Benjamin Bright",
      amount: 47500,
      verdict: "Granted",
      status: "Completed",
      payback: 47500,
      createdAt: "12:30pm",
      balance: 120000
    },
  ]

  return (
    <main className="flex flex-col gap-4 px-2 sm:px-0 pt-5 pb-10">
      <LoanList loanData={loanData} />
    </main>
  )
}
