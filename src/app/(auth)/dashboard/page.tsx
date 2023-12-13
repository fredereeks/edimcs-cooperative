import type { Metadata } from 'next'
import React, { ReactElement } from 'react'
import { edimcs_blackpeople, edimcs_calculator, edimcs_cliff, edimcs_coinstack, edimcs_moneybox } from '@/assets/images'

import { TransactionProps } from '@/types'
import {DashCharts} from '../ui'
import TransactionList from './TransactionList';
import { fetchMembers, fetchUser } from '../actions'
import prisma from '@/lib/prisma'

export const metadata: Metadata = {
  title: 'EDIMCS :: Dashboard',
  description: "EDIMCS stands for Enlightenment Drive Initiative Co-operative Society. We are the largest cooperative organization among cooperatives in Nigeria and in the world; with the goal of achieving a first-world Nigeria with empowerment and housing for low-income and small and medium enterprises as our primary goal",
}

const fetchDashContents = async() => {
  const user = await fetchUser()
  const [loan, deposit, withdrawal, savings] = await prisma.$transaction([
    prisma.loan.findMany({ where: { verdict: "Granted"}}),
    prisma.deposit.findMany({ where: { verdict: "Granted"}}),
    prisma.saving.findMany({ where: { verdict: "Granted"}}),
    prisma.withdrawal.findMany({ where: { verdict: "Granted"}}),
  ])
  const loanTotal = user?.type === "Admin" ? loan.reduce((total, el) => el.amount + total, 0) : loan.filter(el => el.loanerId === user?.id).reduce((total, el) => el.amount + total, 0)
  const depositTotal = user?.type === "Admin" ? deposit.reduce((total, el) => el.amount + total, 0) : deposit.filter(el => el.depositorId === user?.id).reduce((total, el) => el.amount + total, 0)
  const withdrawalTotal = user?.type === "Admin" ? withdrawal.reduce((total, el) => el.amount + total, 0) : withdrawal.filter(el => el.saverId === user?.id).reduce((total, el) => el.amount + total, 0)
  const savingsTotal = user?.type === "Admin" ? savings.reduce((total, el) => el.amount + total, 0) : savings.filter(el => el.withdrawerId === user?.id).reduce((total, el) => el.amount + total, 0)
  // console.log({loanTotal, depositTotal, withdrawalTotal, savingsTotal})
  return({loanTotal, depositTotal, withdrawalTotal, savingsTotal})
}

export default async function page() {
  const {loanTotal, depositTotal, withdrawalTotal, savingsTotal} = await fetchDashContents()
  const memberTotal = await fetchMembers()

//   const savings: ReactElement<HTMLDivElement> = <div className="mx-auto p-5 w-3/5 md:w-2/4 overflow-hidden">
//   <canvas
//     data-te-chart="line"
//     data-te-dataset-label="Traffic"
//     data-te-labels="['Monday', 'Tuesday' , 'Wednesday' , 'Thursday' , 'Friday' , 'Saturday' , 'Sunday ']"
//     data-te-dataset-data="[2112, 2343, 2545, 3423, 2365, 1985, 987]">
//   </canvas>
// </div>
  const doughnut: ReactElement<HTMLDivElement> = <div className="mx-auto p-5 w-3/5 md:w-2/4 overflow-hidden">
  <canvas
      data-te-chart="doughnut"
      data-te-dataset-label="Transaction Overview"
      data-te-labels="['Loans', 'Savings' , 'Withdrawal' , 'Deposit']"
      data-te-dataset-data={`[${loanTotal}, ${savingsTotal}, ${withdrawalTotal}, ${depositTotal}]`}
      data-te-dataset-background-color="['#3b82f6', '#09dba0', '#f34f7c', '#09f9db', 'rgba(66, 73, 244, 0.4)', 'rgba(66, 133, 244, 0.2)']">
  </canvas>
</div>
//   const investment: ReactElement<HTMLDivElement> = <div className="mx-auto p-5 w-3/5 md:w-2/4 overflow-hidden">
//   <canvas
//       data-te-chart="pie"
//       data-te-dataset-label="Investment"
//       data-te-labels="['Monday', 'Tuesday' , 'Wednesday' , 'Thursday' , 'Friday' , 'Saturday' , 'Sunday ']"
//       data-te-dataset-data="[2112, 2343, 2545, 3423, 2365, 1985, 987]"
//       data-te-dataset-background-color="['rgba(63, 81, 181, 0.5)', 'rgba(77, 182, 172, 0.5)', 'rgba(66, 133, 244, 0.5)', 'rgba(156, 39, 176, 0.5)', 'rgba(233, 30, 99, 0.5)', 'rgba(66, 73, 244, 0.4)', 'rgba(66, 133, 244, 0.2)']">
//   </canvas>
// </div>

  return (
    <main className="flex flex-col gap-4 px-2 sm:px-0 pt-5 pb-10">
      <section className="scrollbar x-scrollbar bg-white dark:bg-[#dbf0f724] dark:shadow-black shadow-slate-200 shadow-md rounded-lg p-4 relative grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="stat place-items-center px-4">
          <div className="stat-title text-sm dark:text-slate-400">Loans</div>
          <div className="stat-value text-xl sm:text-3xl md:text-2xl lg:text-3xl tracking-tighter dark:text-slate-200">&#8358;{loanTotal.toLocaleString()}</div>
          <div className="stat-desc text-xs dark:text-slate-500 whitespace-pre-wrap text-center">From Last Month</div>
        </div>
        <div className="stat place-items-center px-4">
          <div className="stat-title text-sm dark:text-slate-400">Savings</div>
          <div className="stat-value text-xl sm:text-3xl md:text-2xl lg:text-3xl tracking-tighter dark:text-slate-200">&#8358;{savingsTotal.toLocaleString()}</div>
          <div className="stat-desc text-xs dark:text-slate-500 whitespace-pre-wrap text-center">From 35 Members</div>
        </div>
        <div className="stat place-items-center px-4">
          <div className="stat-title text-sm dark:text-slate-400">Deposits</div>
          <div className="stat-value text-xl sm:text-3xl md:text-2xl lg:text-3xl tracking-tighter dark:text-slate-200">&#8358;{depositTotal.toLocaleString()}</div>
          <div className="stat-desc text-xs dark:text-slate-500 whitespace-pre-wrap text-center">Since last week</div>
        </div>
        <div className="stat place-items-center px-4">
          <div className="stat-title text-sm dark:text-slate-400">Withdrawals</div>
          <div className="stat-value text-xl sm:text-3xl md:text-2xl lg:text-3xl tracking-tighter dark:text-slate-200">&#8358;{withdrawalTotal.toLocaleString()}</div>
          <div className="stat-desc text-xs dark:text-slate-500 whitespace-pre-wrap text-center">5+ since last week</div>
        </div>
      </section>
      <section className="relative">
        {/* <DashCharts doughnut={doughnut} savings={savings} investment={investment} /> */}
        <DashCharts doughnut={doughnut} />
      </section>
      {/* <section className="relative grid md:flex flex-wrap gap-2">
        <div className="bg-white dark:bg-[#dbf0f724] dark:shadow-black rounded-lg p-3 dark:text-slate-200 shadow-slate-200 shadow-md flex-1 flex justify-center flex-wrap sm:flex-nowrap items-center gap-2">
          <button className="transition-all text-xs hover:text-primary dark:hover:text-slate-200 border-b-2 border-b-transparent hover:border-b-primary py-2 px-4 cursor-pointer">Savings</button>
          <button className="transition-all text-xs hover:text-primary dark:hover:text-slate-200 border-b-2 border-b-transparent hover:border-b-primary py-2 px-4 cursor-pointer">Loans</button>
          <button className="transition-all text-xs hover:text-primary dark:hover:text-slate-200 border-b-2 border-b-transparent hover:border-b-primary py-2 px-4 cursor-pointer">Withdrawals</button>
        </div>
      </section> */}
    </main>
  )
}
