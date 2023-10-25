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
                <th className='uppercase font-thin text-xs text-slate-400 text-left'>Member Details</th>
                <th className='font-thin text-xs text-slate-400 text-center'>Date Registered</th>
                <th className='font-thin text-xs text-slate-400 text-center'>Savings</th>
                <th className='font-thin text-xs text-slate-400 text-center'>Investment</th>
                <th className='font-thin text-xs text-slate-400 text-center'>Withdrawals</th>
                <th className='font-thin text-xs text-slate-400 text-center'>Total Balance</th>
              </tr>
            </thead>
            {/* <tbody className='w-full'>
              {
                [
                  [734630, edimcs_blackpeople, "Oloruntoba Samuel", "EDIMC-134899", '23rd July, 2021', 1823400, 2000500],
                  [734631, edimcs_gathering, "Ejeh Mariam", "EDIMC-134894", '10th May, 2022', 50280, 2824008],
                  [734632, edimcs_calculator, "Ebenezer Mohammad", "EDIMC-134890", '21st February, 2023', 60000, 1250000],
                  [734633, edimcs_coins, "Benjamin Bright", "EDIMC-134891", '19th October, 2023', 60000, 1250000],
                  [734634, edimcs_moneybox, "Susan Ikechukwu", "EDIMC-134895", '2nd April, 2023', 60000, 1250000],
                ].map(([id,image, name, memberId, added, savings, investment],i) => (
                    <tr key={id.toString()}>
                      <td>
                        <button className="max-w-sm w-max flex items-center gap-2 cursor-pointer">
                          <div className="h-7 sm:h-8 w-7 sm:w-8 flex justify-center items-center rounded-full overflow-hidden relative bg-primary dark:bg-slate-600/50">
                            <Image src={`${image}`} alt={`${name}`} fill={true} className="absolute left-0 top-0 object-cover w-full h-full" />
                          </div>
                          <div>
                            <h5 className="text-xs font-medium leading-tight whitespace-nowrap">{`${name}`}</h5>
                            <p className="text-[.6rem] font-thin opacity-70 leading-tight">{`${memberId}`}</p>
                          </div>
                        </button>
                      </td>
                      <td className="align-middle">
                        <div className="flex justify-center items-center gap-[.2rem] align-middle text-slate-400 text-[.6rem] py-[.1rem] sm:py-1">
                          <FaClock className="text-inherit mt-[.1rem]" /> <p className="">{`${added}`}</p>
                        </div>
                      </td>
                      <td className="align-middle">
                        <div className="flex justify-center items-center align-middle mx-auto">
                          <div className="bg-teal-100 text-teal-500 text-[.6rem] py-[.1rem] sm:py-1 px-3 rounded-sm font-medium">&#8358;{`${savings}`}</div>
                        </div>
                      </td>
                      <td className="align-middle">
                        <div className="flex justify-center items-center align-middle mx-auto">
                          <div className="bg-sky-100 text-sky-500 text-[.6rem] py-[.1rem] sm:py-1 px-3 rounded-sm font-medium">&#8358;{`${savings}`}</div>
                        </div>
                      </td>
                      <td className="align-middle">
                        <h4 className="flex justify-center items-center gap-[.2rem] align-middle text-slate-400 text-[.6rem] py-[.1rem] sm:py-1">&#8358;{`${savings} + ${investment}`}</h4>
                      </td>
                    </tr>
                ))
              }
            </tbody> */}
          </table>
        </div>
      </section>
    </main>
  )
}
