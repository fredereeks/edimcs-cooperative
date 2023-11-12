import React, { ReactElement } from 'react'
import { edimcs_blackpeople, edimcs_calculator, edimcs_cliff, edimcs_coinstack, edimcs_moneybox } from '@/assets/images'
import { FaClock } from 'react-icons/fa'
import Image from 'next/image'
import { TransactionProps } from '@/types'
import DashCharts from '../components/DashCharts'
import { Chart, initTE } from "tw-elements";

export default async function page() {

  // initTE({ Chart });
  const transactionData: TransactionProps[] | [] = [
    {
      id: 812331,
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
      <section className="relative flex flex-col gap-2 p-4 bg-white dark:bg-[#dbf0f724] dark:shadow-black shadow-slate-200 shadow-md rounded-lg">
        <div className="w-full overflow-x-scroll pb-6 x-scrollbar">
          <table className="w-full text-slate-600 dark:text-slate-50 text-xs sm:text-sm min-w-[20rem]">
            <thead>
              <tr>
                <th colSpan={4}>
                  <h4 className="uppercase font-medium text-slate-400 text-left pb-2 mb-2 border-b border-b-slate-200">RECENT TRANSACTIONS</h4>
                </th>
              </tr>
              <tr className='text-slate-500 dark:text-slate-50'>
                <th className='uppercase font-medium text-xs text-left'>Member/Transaction Details</th>
                <th className='font-medium text-xs text-center'>Transaction Amount</th>
                <th className='font-medium text-xs text-center'>Transaction Date</th>
                <th className='font-medium text-xs text-center'>Balance at Date</th>
              </tr>
            </thead>
            <tbody className='w-full text-slate-700 dark:text-slate-50'>
              {
                transactionData.map(transaction => (
                  <tr key={transaction.id} className='hover:bg-slate-50 dark:hover:bg-slate-900/30'>
                    <td>
                      <div className="max-w-sm w-max flex items-center gap-2 cursor-pointer">
                        <div className="h-7 sm:h-8 w-7 sm:w-8 flex justify-center items-center rounded-full overflow-hidden relative bg-primary dark:bg-slate-600/50">
                          <Image src={transaction.image} alt={`${transaction?.firstname} ${transaction?.middlename} ${transaction?.lastname}`} fill={true} className="absolute left-0 top-0 object-cover w-full h-full" />
                        </div>
                        <div>
                          <h5 className="text-sm font-medium leading-tight whitespace-nowrap">{transaction?.firstname} {transaction?.middlename} {transaction?.lastname}</h5>
                          <p className="text-xs font-medium opacity-70 text-slate-600 dark:text-slate-50 dark:opacity-100 leading-tight">{transaction.type}</p>
                        </div>
                      </div>
                    </td>
                    <td className="align-middle">
                      <div className="flex justify-center items-center align-middle mx-auto">
                        <div className={`${transaction.type === 'Savings' ? 'bg-teal-100 text-teal-500' : transaction.type === 'Withdrawal' ? 'bg-red-100 text-red-500' : 'bg-sky-100 text-sky-500'} text-xs py-[.1rem] sm:py-1 px-3 rounded-sm font-medium`}>{transaction.type === 'Withdrawal' ? '-' : ''}&#8358;{transaction.amount.toLocaleString()}</div>
                      </div>
                    </td>
                    <td className="align-middle">
                      <div className="flex justify-center items-center gap-[.2rem] align-middle text-xs py-[.1rem] sm:py-1">
                        <FaClock className="text-inherit mt-[.1rem]" /> <p className="">{transaction.createdAt}</p>
                      </div>
                    </td>
                    <td className="align-middle">
                      <h4 className="flex justify-center items-center gap-[.2rem] align-middle text-xs py-[.1rem] sm:py-1">&#8358;{transaction.balance.toLocaleString()}</h4>
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
      </section>
    </main>
  )
}
