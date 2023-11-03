import { edimcs_blackpeople, edimcs_calculator, edimcs_coins, edimcs_coinstack, edimcs_gathering } from '@/assets/images'
import Image, { StaticImageData } from 'next/image'
import React from 'react'
import { FaClock } from 'react-icons/fa'

type LoanProps = {
  id: number
  image: StaticImageData
  name: string
  type: string
  amount: number
  date: string
  balance: number
} 

export default function page() {

  const loanData : LoanProps[] = [
    {
      id: 73495340,
      image: edimcs_coins,
      name: "Amaka Orlando",
      type: "Pay In",
      amount: 2000,
      date: "12:40pm",
      balance: 80000
    },
    {
      id: 73495341,
      image: edimcs_calculator,
      name: "Abubakar Suleiman",
      type: "Pay Out",
      amount: 250000,
      date: "08:37am",
      balance: 232200
    },
    {
      id: 73495342,
      image: edimcs_blackpeople,
      name: "Oloruntoba Samuel",
      type: "Pay Out",
      amount: 32000,
      date: "08:37am",
      balance: 51500
    },
    {
      id: 73495343,
      image: edimcs_gathering,
      name: "Benjamin Bright",
      type: "Pay In",
      amount: 22000,
      date: "11:51am",
      balance: 78000
    },
    {
      id: 73495344,
      image: edimcs_coinstack,
      name: "Benjamin Bright",
      type: "Pay Out",
      amount: 12000,
      date: "12:30pm",
      balance: 120000
    },
  ]

  return (
    <main className="flex flex-col gap-4 px-2 sm:px-0 pt-5 pb-10">
      <section className="relative flex flex-col gap-2 p-4 bg-white  dark:bg-[#dbf0f724] dark:shadow-black shadow-slate-200 shadow-md rounded-lg">
        <div className="w-full overflow-x-scroll pb-6 x-scrollbar">
          <table className="w-full text-slate-500 dark:text-slate-400 text-xs sm:text-sm min-w-[20rem]">
            <thead>
              <tr>
                <th colSpan={4}>
                  <h4 className="uppercase font-light text-slate-400 text-left pb-2 mb-2 border-b border-b-slate-200">LOAN TRANSACTIONS</h4>
                </th>
              </tr>
              <tr className='text-slate-400 py-2 border-b border-slate-200'>
                <th className='font-thin text-xs text-slate-400 text-left'>Member Details</th>
                <th className='font-thin text-xs text-slate-400 text-center'>Loan Amount</th>
                <th className='font-thin text-xs text-slate-400 text-center'>Loan Date</th>
                <th className='font-thin text-xs text-slate-400 text-center'>Balance at Date</th>
              </tr>
            </thead>
            <tbody className='w-full'>
              {
                loanData.map(loan => (
                  <tr key={loan.id}>
                    <td>
                      <div className="max-w-sm w-max flex items-center gap-2 cursor-pointer">
                        <div className="h-7 sm:h-8 w-7 sm:w-8 flex justify-center items-center rounded-full overflow-hidden relative bg-primary dark:bg-slate-600/50">
                          <Image src={loan.image} alt={loan.name} fill={true} className="absolute left-0 top-0 object-cover w-full h-full" />
                        </div>
                        <div>
                          <h5 className="text-xs font-medium leading-tight whitespace-nowrap">{loan.name}</h5>
                          <p className="text-[.6rem] font-thin opacity-70 leading-tight">{loan.type}</p>
                        </div>
                      </div>
                    </td>
                    <td className="align-middle">
                      <div className="flex justify-center items-center align-middle mx-auto whitespace-nowrap">
                        <div className={`${loan.type === "Pay Out" ? 'bg-red-100 text-red-500' : 'bg-sky-100 text-sky-500'} text-[.6rem] py-[.1rem] sm:py-1 px-3 rounded-sm font-medium`}>{loan.type === "Pay Out" ? '-' : ''}&#8358;{loan.amount.toLocaleString()}</div>
                      </div>
                    </td>
                    <td className="align-middle">
                      <div className="flex justify-center items-center gap-[.2rem] align-middle text-slate-400 text-[.6rem] py-[.1rem] sm:py-1">
                        <FaClock className="text-inherit mt-[.1rem]" /> <p className="">{loan.date}</p>
                      </div>
                    </td>
                    <td className="align-middle">
                      <h4 className="flex justify-center items-center gap-[.2rem] align-middle text-slate-400 text-[.6rem] py-[.1rem] sm:py-1">&#8358;{loan.balance.toLocaleString()}</h4>
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
