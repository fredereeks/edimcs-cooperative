import React, { ReactElement } from 'react'
import { edimcs_blackpeople, edimcs_calculator, edimcs_cliff, edimcs_coinstack, edimcs_moneybox } from '@/assets/images'

import { TransactionProps } from '@/types'
import {DashCharts} from '../components'
import TransactionList from './TransactionList';

export default async function page() {

  // initTE({ Chart });
  const transactionData: TransactionProps[] | [] = [
    {
      id: 812331,
      memberId: "EDIMCS-812331",
      image: edimcs_blackpeople,
      firstname: 'Amaka',
      middlename: '',
      lastname: 'Orlando',
      type: "Savings",
      amount: 2000,
      createdAt: "12:40pm",
      balance: 80000,
      approvedBy: 'Bright Anjelo'
    },
    {
      id: 812332,
      memberId: "EDIMCS-812332",
      image: edimcs_cliff,
      firstname: 'David',
      middlename: '',
      lastname: 'Suleiman',
      type: "Withdrawal",
      amount: 2500,
      createdAt: "08:37am",
      balance: 232000,
      approvedBy: 'Antony Tairu'
    },
    {
      id: 812333,
      memberId: "EDIMCS-812333",
      image: edimcs_coinstack,
      firstname: 'Ejeh',
      middlename: '',
      lastname: 'Mariam',
      type: "Withdrawal",
      amount: 59150,
      createdAt: "08:37am",
      balance: 23590,
      approvedBy: 'Ibrahim Konate'
    },
    {
      id: 812334,
      memberId: "EDIMCS-812334",
      image: edimcs_calculator,
      firstname: 'Ebenezer',
      middlename: '',
      lastname: 'Joseph',
      type: "Money Pool",
      amount: 120000,
      createdAt: "01:06pm",
      balance: 723900,
      approvedBy: 'Ibrahima Konate'
    },
    {
      id: 812335,
      memberId: "EDIMCS-812335",
      image: edimcs_moneybox,
      firstname: 'David',
      middlename: '',
      lastname: 'Okolo',
      type: "Savings",
      amount: 140000,
      createdAt: "04:22am",
      balance: 11200,
      approvedBy: 'Ibrahim Konate'
    },
  ]

  const savings: ReactElement<HTMLDivElement> = <div className="mx-auto p-5 w-3/5 md:w-2/4 overflow-hidden">
  <canvas
    data-te-chart="line"
    data-te-dataset-label="Traffic"
    data-te-labels="['Monday', 'Tuesday' , 'Wednesday' , 'Thursday' , 'Friday' , 'Saturday' , 'Sunday ']"
    data-te-dataset-data="[2112, 2343, 2545, 3423, 2365, 1985, 987]">
  </canvas>
</div>
  const doughnut: ReactElement<HTMLDivElement> = <div className="mx-auto p-5 w-3/5 md:w-2/4 overflow-hidden">
  <canvas
      data-te-chart="doughnut"
      data-te-dataset-label="Traffic"
      data-te-labels="['Monday', 'Tuesday' , 'Wednesday' , 'Thursday' , 'Friday' , 'Saturday' , 'Sunday ']"
      data-te-dataset-data="[2112, 2343, 2545, 3423, 2365, 1985, 987]"
      data-te-dataset-background-color="['rgba(63, 81, 181, 0.5)', 'rgba(77, 182, 172, 0.5)', 'rgba(66, 133, 244, 0.5)', 'rgba(156, 39, 176, 0.5)', 'rgba(233, 30, 99, 0.5)', 'rgba(66, 73, 244, 0.4)', 'rgba(66, 133, 244, 0.2)']">
  </canvas>
</div>
  const investment: ReactElement<HTMLDivElement> = <div className="mx-auto p-5 w-3/5 md:w-2/4 overflow-hidden">
  <canvas
      data-te-chart="pie"
      data-te-dataset-label="Investment"
      data-te-labels="['Monday', 'Tuesday' , 'Wednesday' , 'Thursday' , 'Friday' , 'Saturday' , 'Sunday ']"
      data-te-dataset-data="[2112, 2343, 2545, 3423, 2365, 1985, 987]"
      data-te-dataset-background-color="['rgba(63, 81, 181, 0.5)', 'rgba(77, 182, 172, 0.5)', 'rgba(66, 133, 244, 0.5)', 'rgba(156, 39, 176, 0.5)', 'rgba(233, 30, 99, 0.5)', 'rgba(66, 73, 244, 0.4)', 'rgba(66, 133, 244, 0.2)']">
  </canvas>
</div>

  return (
    <main className="flex flex-col gap-4 px-2 sm:px-0 pt-5 pb-10">
      <section className="scrollbar x-scrollbar bg-white dark:bg-[#dbf0f724] dark:shadow-black shadow-slate-200 shadow-md rounded-lg p-4 relative grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="stat place-items-center px-4">
          <div className="stat-title text-sm dark:text-slate-400">Loans</div>
          <div className="stat-value text-xl sm:text-3xl md:text-2xl lg:text-3xl tracking-tighter dark:text-slate-200">500,000</div>
          <div className="stat-desc text-xs dark:text-slate-500 whitespace-pre-wrap text-center">From Last Month</div>
        </div>
        <div className="stat place-items-center px-4">
          <div className="stat-title text-sm dark:text-slate-400">Savings</div>
          <div className="stat-value text-xl sm:text-3xl md:text-2xl lg:text-3xl tracking-tighter dark:text-slate-200">68,820,027</div>
          <div className="stat-desc text-xs dark:text-slate-500 whitespace-pre-wrap text-center">From 35 Members</div>
        </div>
        <div className="stat place-items-center px-4">
          <div className="stat-title text-sm dark:text-slate-400">Investments</div>
          <div className="stat-value text-xl sm:text-3xl md:text-2xl lg:text-3xl tracking-tighter dark:text-slate-200">45,323,000</div>
          <div className="stat-desc text-xs dark:text-slate-500 whitespace-pre-wrap text-center">Since last week</div>
        </div>
        <div className="stat place-items-center px-4">
          <div className="stat-title text-sm dark:text-slate-400">Total Members</div>
          <div className="stat-value text-xl sm:text-3xl md:text-2xl lg:text-3xl tracking-tighter dark:text-slate-200">58</div>
          <div className="stat-desc text-xs dark:text-slate-500 whitespace-pre-wrap text-center">5+ since last week</div>
        </div>
      </section>
      <section className="relative">
        <DashCharts doughtnut={doughnut} savings={savings} investment={investment} />
      </section>
      {/* <section className="relative grid md:flex flex-wrap gap-2">
        <div className="bg-white dark:bg-[#dbf0f724] dark:shadow-black rounded-lg p-3 dark:text-slate-200 shadow-slate-200 shadow-md flex-1 flex justify-center flex-wrap sm:flex-nowrap items-center gap-2">
          <button className="transition-all text-xs text-primary dark:text-slate-200 border-b-2 border-b-primary hover:border-b-primary py-2 px-4 cursor-pointer">Transactions</button>
          <button className="transition-all text-xs hover:text-primary dark:hover:text-slate-200 border-b-2 border-b-transparent hover:border-b-primary py-2 px-4 cursor-pointer">Savings</button>
          <button className="transition-all text-xs hover:text-primary dark:hover:text-slate-200 border-b-2 border-b-transparent hover:border-b-primary py-2 px-4 cursor-pointer">Loans</button>
          <button className="transition-all text-xs hover:text-primary dark:hover:text-slate-200 border-b-2 border-b-transparent hover:border-b-primary py-2 px-4 cursor-pointer">Withdrawals</button>
        </div>
      </section> */}
      <TransactionList key={'820416'} transactionData={transactionData} />
    </main>
  )
}
