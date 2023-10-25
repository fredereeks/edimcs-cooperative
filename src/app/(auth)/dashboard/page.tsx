import { edimcs_blackpeople, edimcs_calculator, edimcs_cliff, edimcs_coins, edimcs_gathering, edimcs_moneybox } from '@/assets/images'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { FaClock } from 'react-icons/fa'
import { FaClockRotateLeft } from 'react-icons/fa6'
import { IoIosClock } from 'react-icons/io'
import { IoCaretDown } from 'react-icons/io5'

export default function page() {
  return (
    <main className="flex flex-col gap-4 px-2 sm:px-0 pt-5 pb-10">
      <section className="relative grid md:flex flex-wrap gap-2">
        <div className="bg-white rounded-lg p-3  shadow-slate-200 shadow-md flex-1 flex flex-wrap sm:flex-nowrap items-center gap-2">
          <button className="transition-all text-xs text-primary border-b-2 border-b-primary hover:border-b-primary py-2 px-4 cursor-pointer">Transactions</button>
          <button className="transition-all text-xs hover:text-primary text-slate-500 border-b-2 border-b-transparent hover:border-b-primary py-2 px-4 cursor-pointer">Savings</button>
          <button className="transition-all text-xs hover:text-primary text-slate-500 border-b-2 border-b-transparent hover:border-b-primary py-2 px-4 cursor-pointer">Loans</button>
          <button className="transition-all text-xs hover:text-primary text-slate-500 border-b-2 border-b-transparent hover:border-b-primary py-2 px-4 cursor-pointer">Withdrawals</button>
          <button className="transition-all text-xs hover:text-primary text-slate-500 border-b-2 border-b-transparent hover:border-b-primary py-2 px-4 cursor-pointer">Reports</button>
        </div>
        <Link href="/dashboard/profile" className="bg-white rounded-lg p-3  shadow-slate-200 shadow-md max-w-sm w-max flex items-center gap-2 cursor-pointer">
          <div className="h-8 w-8 flex justify-center items-center rounded-full overflow-hidden relative bg-primary dark:bg-slate-600/50">
            <Image src={edimcs_coins} alt={`Abubakar Mutari`} fill={true} className="absolute left-0 top-0 object-cover w-full h-full" />
          </div>
          <h5 className="text-xs font-semibold text-slate-500">Abubakar Mutari</h5>
          <IoCaretDown className="text-sm font-thin text-slate-300" />
        </Link>
      </section>
      <section className="relative flex flex-col gap-2 p-4 bg-white shadow-slate-200 shadow-md rounded-lg">
        <div className="w-full overflow-x-scroll pb-6 x-scrollbar">
          <table className="w-full text-slate-500 dark:text-slate-400 text-xs sm:text-sm min-w-[20rem]">
            <thead>
              <tr>
                <th colSpan={4}>
                  <h4 className="uppercase font-light text-slate-400 text-left pb-2 mb-2 border-b border-b-slate-200">TODAY</h4>
                </th>
              </tr>
              <tr className='text-slate-400'>
                <th className='uppercase font-thin text-xs text-slate-400 text-left'>Transaction Details</th>
                <th className='font-thin text-xs text-slate-400 text-center'>Transaction Amount</th>
                <th className='font-thin text-xs text-slate-400 text-center'>Transaction Date</th>
                <th className='font-thin text-xs text-slate-400 text-center'>Balance at Date</th>
              </tr>
            </thead>
            <tbody className='w-full'>
              <tr>
                <td>
                  <div className="max-w-sm w-max flex items-center gap-2 cursor-pointer">
                    <div className="h-7 sm:h-8 w-7 sm:w-8 flex justify-center items-center rounded-full overflow-hidden relative bg-primary dark:bg-slate-600/50">
                      <Image src={edimcs_blackpeople} alt={`Amaka Orlando`} fill={true} className="absolute left-0 top-0 object-cover w-full h-full" />
                    </div>
                    <div>
                      <h5 className="text-xs font-medium leading-tight whitespace-nowrap">Amaka Orlando</h5>
                      <p className="text-[.6rem] font-thin opacity-70 leading-tight">Savings</p>
                    </div>
                  </div>
                </td>
                <td className="align-middle">
                  <div className="flex justify-center items-center align-middle mx-auto">
                    <div className="bg-teal-100 text-teal-500 text-[.6rem] py-[.1rem] sm:py-1 px-3 rounded-sm font-medium">&#8358;2,000</div>
                  </div>
                </td>
                <td className="align-middle">
                  <div className="flex justify-center items-center gap-[.2rem] align-middle text-slate-400 text-[.6rem] py-[.1rem] sm:py-1">
                    <FaClock className="text-inherit mt-[.1rem]" /> <p className="">12:40pm</p>
                  </div>
                </td>
                <td className="align-middle">
                  <h4 className="flex justify-center items-center gap-[.2rem] align-middle text-slate-400 text-[.6rem] py-[.1rem] sm:py-1">&#8358;80,000</h4>
                </td>
              </tr>
              <tr>
                <td>
                  <div className="max-w-sm w-max flex items-center gap-2 cursor-pointer">
                    <div className="h-7 sm:h-8 w-7 sm:w-8 flex justify-center items-center rounded-full overflow-hidden relative bg-primary dark:bg-slate-600/50">
                      <Image src={edimcs_gathering} alt={`Abubakar Suleiman`} fill={true} className="absolute left-0 top-0 object-cover w-full h-full" />
                    </div>
                    <div>
                      <h5 className="text-xs font-medium leading-tight whitespace-nowrap">Abubakar Suleiman</h5>
                      <p className="text-[.6rem] font-thin opacity-70 leading-tight">Withdrawal</p>
                    </div>
                  </div>
                </td>
                <td className="align-middle">
                  <div className="flex justify-center items-center align-middle mx-auto">
                    <div className="bg-red-100 text-red-500 text-[.6rem] py-[.1rem] sm:py-1 px-3 rounded-sm font-medium">-&#8358;250,000</div>
                  </div>
                </td>
                <td className="align-middle">
                  <div className="flex justify-center items-center gap-[.2rem] align-middle text-slate-400 text-[.6rem] py-[.1rem] sm:py-1">
                    <FaClock className="text-inherit mt-[.1rem]" /> <p className="">08:37am</p>
                  </div>
                </td>
                <td className="align-middle">
                  <h4 className="flex justify-center items-center gap-[.2rem] align-middle text-slate-400 text-[.6rem] py-[.1rem] sm:py-1">&#8358;232,000</h4>
                </td>
              </tr>
              <tr>
                <td>
                  <div className="max-w-sm w-max flex items-center gap-2 cursor-pointer">
                    <div className="h-7 sm:h-8 w-7 sm:w-8 flex justify-center items-center rounded-full overflow-hidden relative bg-primary dark:bg-slate-600/50">
                      <Image src={edimcs_calculator} alt={`Oloruntoba Samuel`} fill={true} className="absolute left-0 top-0 object-cover w-full h-full" />
                    </div>
                    <div>
                      <h5 className="text-xs font-medium leading-tight whitespace-nowrap">Oloruntoba Samuel</h5>
                      <p className="text-[.6rem] font-thin opacity-70 leading-tight">Withdrawal</p>
                    </div>
                  </div>
                </td>
                <td className="align-middle">
                  <div className="flex justify-center items-center align-middle mx-auto">
                    <div className="bg-red-100 text-red-500 text-[.6rem] py-[.1rem] sm:py-1 px-3 rounded-sm font-medium">-&#8358;470,500</div>
                  </div>
                </td>
                <td className="align-middle">
                  <div className="flex justify-center items-center gap-[.2rem] align-middle text-slate-400 text-[.6rem] py-[.1rem] sm:py-1">
                    <FaClock className="text-inherit mt-[.1rem]" /> <p className="">01:06pm</p>
                  </div>
                </td>
                <td className="align-middle">
                  <h4 className="flex justify-center items-center gap-[.2rem] align-middle text-slate-400 text-[.6rem] py-[.1rem] sm:py-1">&#8358;365,200</h4>
                </td>
              </tr>
              <tr>
                <td>
                  <div className="max-w-sm w-max flex items-center gap-2 cursor-pointer">
                    <div className="h-7 sm:h-8 w-7 sm:w-8 flex justify-center items-center rounded-full overflow-hidden relative bg-primary dark:bg-slate-600/50">
                      <Image src={edimcs_cliff} alt={`Benjamin Bright`} fill={true} className="absolute left-0 top-0 object-cover w-full h-full" />
                    </div>
                    <div>
                      <h5 className="text-xs font-medium leading-tight whitespace-nowrap">Benjamin Bright</h5>
                      <p className="text-[.6rem] font-thin opacity-70 leading-tight">Investment Pool</p>
                    </div>
                  </div>
                </td>
                <td className="align-middle">
                  <div className="flex justify-center items-center align-middle mx-auto">
                    <div className="bg-sky-100 text-sky-500 text-[.6rem] py-[.1rem] sm:py-1 px-3 rounded-sm font-medium">&#8358;250,000</div>
                  </div>
                </td>
                <td className="align-middle">
                  <div className="flex justify-center items-center gap-[.2rem] align-middle text-slate-400 text-[.6rem] py-[.1rem] sm:py-1">
                    <FaClock className="text-inherit mt-[.1rem]" /> <p className="">08:37am</p>
                  </div>
                </td>
                <td className="align-middle">
                  <h4 className="flex justify-center items-center gap-[.2rem] align-middle text-slate-400 text-[.6rem] py-[.1rem] sm:py-1">&#8358;140,000</h4>
                </td>
              </tr>
              <tr>
                <td>
                  <div className="max-w-sm w-max flex items-center gap-2 cursor-pointer">
                    <div className="h-7 sm:h-8 w-7 sm:w-8 flex justify-center items-center rounded-full overflow-hidden relative bg-primary dark:bg-slate-600/50">
                      <Image src={edimcs_blackpeople} alt={`Ejeh Mariam`} fill={true} className="absolute left-0 top-0 object-cover w-full h-full" />
                    </div>
                    <div>
                      <h5 className="text-xs font-medium leading-tight whitespace-nowrap">Ejeh Mariam</h5>
                      <p className="text-[.6rem] font-thin opacity-70 leading-tight">Savings</p>
                    </div>
                  </div>
                </td>
                <td className="align-middle">
                  <div className="flex justify-center items-center align-middle mx-auto">
                    <div className="bg-teal-100 text-teal-500 text-[.6rem] py-[.1rem] sm:py-1 px-3 rounded-sm font-medium">&#8358;2,000</div>
                  </div>
                </td>
                <td className="align-middle">
                  <div className="flex justify-center items-center gap-[.2rem] align-middle text-slate-400 text-[.6rem] py-[.1rem] sm:py-1">
                    <FaClock className="text-inherit mt-[.1rem]" /> <p className="">12:40pm</p>
                  </div>
                </td>
                <td className="align-middle">
                  <h4 className="flex justify-center items-center gap-[.2rem] align-middle text-slate-400 text-[.6rem] py-[.1rem] sm:py-1">&#8358;80,000</h4>
                </td>
              </tr>
              <tr>
                <td>
                  <div className="max-w-sm w-max flex items-center gap-2 cursor-pointer">
                    <div className="h-7 sm:h-8 w-7 sm:w-8 flex justify-center items-center rounded-full overflow-hidden relative bg-primary dark:bg-slate-600/50">
                      <Image src={edimcs_moneybox} alt={`Ebenezer Mohamma`} fill={true} className="absolute left-0 top-0 object-cover w-full h-full" />
                    </div>
                    <div>
                      <h5 className="text-xs font-medium leading-tight whitespace-nowrap">Ebenezer Mohammad</h5>
                      <p className="text-[.6rem] font-thin opacity-70 leading-tight">Withdrawal</p>
                    </div>
                  </div>
                </td>
                <td className="align-middle">
                  <div className="flex justify-center items-center align-middle mx-auto">
                    <div className="bg-red-100 text-red-500 text-[.6rem] py-[.1rem] sm:py-1 px-3 rounded-sm font-medium">-&#8358;50,000</div>
                  </div>
                </td>
                <td className="align-middle">
                  <div className="flex justify-center items-center gap-[.2rem] align-middle text-slate-400 text-[.6rem] py-[.1rem] sm:py-1">
                    <FaClock className="text-inherit mt-[.1rem]" /> <p className="">11:45am</p>
                  </div>
                </td>
                <td className="align-middle">
                  <h4 className="flex justify-center items-center gap-[.2rem] align-middle text-slate-400 text-[.6rem] py-[.1rem] sm:py-1">&#8358;140,000</h4>
                </td>
              </tr>
              <tr>
                <td>
                  <div className="max-w-sm w-max flex items-center gap-2 cursor-pointer">
                    <div className="h-7 sm:h-8 w-7 sm:w-8 flex justify-center items-center rounded-full overflow-hidden relative bg-primary dark:bg-slate-600/50">
                      <Image src={edimcs_cliff} alt={`Benjamin Bright`} fill={true} className="absolute left-0 top-0 object-cover w-full h-full" />
                    </div>
                    <div>
                      <h5 className="text-xs font-medium leading-tight whitespace-nowrap">Benjamin Bright</h5>
                      <p className="text-[.6rem] font-thin opacity-70 leading-tight">Investment Pool</p>
                    </div>
                  </div>
                </td>
                <td className="align-middle">
                  <div className="flex justify-center items-center align-middle mx-auto">
                    <div className="bg-sky-100 text-sky-500 text-[.6rem] py-[.1rem] sm:py-1 px-3 rounded-sm font-medium">&#8358;120,000</div>
                  </div>
                </td>
                <td className="align-middle">
                  <div className="flex justify-center items-center gap-[.2rem] align-middle text-slate-400 text-[.6rem] py-[.1rem] sm:py-1">
                    <FaClock className="text-inherit mt-[.1rem]" /> <p className="">04:17pm</p>
                  </div>
                </td>
                <td className="align-middle">
                  <h4 className="flex justify-center items-center gap-[.2rem] align-middle text-slate-400 text-[.6rem] py-[.1rem] sm:py-1">&#8358;112,000</h4>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </main>
  )
}
