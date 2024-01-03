import type { Metadata } from 'next'
import React, { ReactElement } from 'react'

import { DashCharts } from '../ui'
import { fetchUser } from '../actions'
import prisma from '@/lib/prisma'
import { edimcs_logo } from '@/assets/images'
import { authOptions } from '@/lib/authOptions'

export const metadata: Metadata = {
  title: 'EDIMCS :: Dashboard',
  description: "EDIMCS stands for Enlightenment Drive Initiative Co-operative Society. We are the largest cooperative organization among cooperatives in Nigeria and in the world; with the goal of achieving a first-world Nigeria with empowerment and housing for low-income and small and medium enterprises as our primary goal",
}

const fetchDashContents = async (type: "Admin" | "Member", id: string) => {
  let loanTotal, depositTotal, withdrawalTotal, savingsTotal;
  if(type === "Admin"){
    [loanTotal, depositTotal, withdrawalTotal, savingsTotal] = await prisma.$transaction([
      prisma.loan.aggregate({ _sum: { amount: true }, where: { verdict: "Granted" }, _count: { loanerId: true, } }),
      prisma.deposit.aggregate({ _sum: { amount: true }, where: { verdict: "Granted" }, _count: { depositorId: true } }),
      prisma.withdrawal.aggregate({ _sum: { amount: true }, where: { verdict: "Granted" }, _count: { withdrawerId: true } }),
      prisma.saving.aggregate({ _sum: { amount: true }, where: { verdict: "Granted" }, _count: { id: true } }),
    ])
  }
  else{
    [loanTotal, depositTotal, withdrawalTotal, savingsTotal] = await prisma.$transaction([
      prisma.loan.aggregate({ _sum: { amount: true }, where: { verdict: "Granted", loanerId: id }, _count: { loanerId: true, } }),
      prisma.deposit.aggregate({ _sum: { amount: true }, where: { verdict: "Granted", depositorId: id }, _count: { depositorId: true } }),
      prisma.withdrawal.aggregate({ _sum: { amount: true }, where: { verdict: "Granted", withdrawerId: id }, _count: { withdrawerId: true } }),
      prisma.saving.aggregate({ _sum: { amount: true }, where: { verdict: "Granted", saverId: id }, _count: { id: true } }),
    ])
  }
  // console.log({loanTotal, depositTotal, withdrawalTotal, savingsTotal})
  return ({ loanTotal, depositTotal, withdrawalTotal, savingsTotal })
}

export default async function page() {
  const user = await fetchUser()
  const { loanTotal, depositTotal, withdrawalTotal, savingsTotal } = await fetchDashContents(user.type!, user.id)
  const loanSum = loanTotal._sum.amount || 0, depositSum = depositTotal._sum.amount || 0, withdrawalSum = withdrawalTotal._sum.amount || 0, savingsSum = savingsTotal._sum.amount || 0
  const userImage = user?.image || edimcs_logo, fullname = `${user?.firstname} ${user?.middlename} ${user?.lastname}`

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
      data-te-dataset-data={`[${loanSum}, ${savingsSum}, ${withdrawalSum}, ${depositSum}]`}
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
      <section className="relative grid md:grid-cols-2 gap-4">
        <aside className="relative h-full">
          <figure className="bg-slate-800 dark:bg-[rgba(219,240,247,0.14)] dark:shadow-black shadow-slate-600 shadow-lg rounded-lg p-4 relative min-h-[180px] sm:min-h-[230px] h-full max-w-sm sm:max-w-md mx-auto">
            <div className={`w-full h-full rounded-md flex flex-col gap-2 p-2 transition-all duration-300`}>
              <h4 className="text-white font-semibold text-center text-xs md:text-sm dark:opacity-80">Enlightenment Drive Initiative Multipurpose Cooperative Society</h4>
              <p className="bg-white text-primary py-1 px-4 rounded-md mx-auto w-max font-semibold text-center text-xs md:text-sm dark:opacity-80">{user.loanRating} Account</p>
              <div className="flex-1 flex gap-2 items-center">
                <div className="h-8 w-11 rounded-[.2rem] bg-orange-300 border border-slate-800 relative before:absolute before:w-[.6rem] before:h-[.6rem] before:bg-orange-400 before:rounded-full before:bottom-1 before:right-[.6rem] after:absolute after:w-[.6rem] after:h-[.6rem] after:rounded-full after:bottom-1 after:right-1 after:bg-gradient-to-br after:from-slate-200 via-slate-100 to-slate-100/90">
                  <div className="absolute w-[.6rem] h-2 rounded-sm bg-orange-200 top-1/2 -translate-y-1/2 left-1"></div>
                </div>
                <div className="text-slate-50 text-xl sm:text-3xl md:text-2xl lg:text-3xl tracking-tighter dark:text-slate-200 font-bold">&#8358;{user?.balance?.toLocaleString()}</div>
              </div>
              <div className="flex flex-row-reverse gap-2 items-center justify-between">
                <h4 className="text-success font-semibold text-xs sm:text-sm dark:opacity-80">{fullname || 'EDIMCS Member'}</h4>
                <p className="text-slate-50 dark:text-slate-100 text-xs opacity-60 dark:opacity-100 font-light">{user?.accountDetails?.length ? user?.accountDetails[0]?.accountnumber : "No Linked Account"}</p>
              </div>
            </div>
          </figure>
        </aside>
        <aside className="scrollbar x-scrollbar bg-white dark:bg-[#dbf0f724] dark:shadow-black shadow-slate-200 shadow-md rounded-lg p-4 relative grid grid-cols-2 gap-4">
          <div className="stat place-items-center px-4">
            <div className="stat-title text-sm dark:text-slate-400">Loans</div>
            <div className="stat-value text-xl sm:text-3xl md:text-2xl lg:text-3xl tracking-tighter dark:text-slate-200">&#8358;{loanSum.toLocaleString()}</div>
            <div className="stat-desc text-xs dark:text-slate-500 whitespace-pre-wrap text-center">From {loanTotal._count.loanerId} {user?.type === "Admin" ? "Members" : "Transactions"}</div>
          </div>
          <div className="stat place-items-center px-4">
            <div className="stat-title text-sm dark:text-slate-400">Savings</div>
            <div className="stat-value text-xl sm:text-3xl md:text-2xl lg:text-3xl tracking-tighter dark:text-slate-200">&#8358;{savingsSum.toLocaleString()}</div>
            <div className="stat-desc text-xs dark:text-slate-500 whitespace-pre-wrap text-center">From {savingsTotal._count.id} {user?.type === "Admin" ? "Members" : "Transactions"}</div>
          </div>
          <div className="stat place-items-center px-4">
            <div className="stat-title text-sm dark:text-slate-400">Deposits</div>
            <div className="stat-value text-xl sm:text-3xl md:text-2xl lg:text-3xl tracking-tighter dark:text-slate-200">&#8358;{depositSum.toLocaleString()}</div>
            <div className="stat-desc text-xs dark:text-slate-500 whitespace-pre-wrap text-center">From {depositTotal._count.depositorId} {user?.type === "Admin" ? "Members" : "Transactions"}</div>
          </div>
          <div className="stat place-items-center px-4">
            <div className="stat-title text-sm dark:text-slate-400">Withdrawals</div>
            <div className="stat-value text-xl sm:text-3xl md:text-2xl lg:text-3xl tracking-tighter dark:text-slate-200">&#8358;{withdrawalSum.toLocaleString()}</div>
            <div className="stat-desc text-xs dark:text-slate-500 whitespace-pre-wrap text-center">From {withdrawalTotal._count.withdrawerId} {user?.type === "Admin" ? "Members" : "Transactions"}</div>
          </div>
        </aside>
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
