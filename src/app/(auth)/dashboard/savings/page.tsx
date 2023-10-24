import React from 'react'
import { FaSackDollar } from 'react-icons/fa6'
import { IoReceiptOutline, IoTrophyOutline } from 'react-icons/io5'

export default function Savings() {
  return (
    <main className="flex flex-col relative px-4">
      <section className="flex flex-col sm:flex-row justify-center sm:justify-between items-center gap-4 py-20">
        <div className="flex flex-col items-center">
          <p className="text-slate-400 text-xs sm:text-base">Total Savings</p>
          <h3 className="text-slate-800 dark:text-slate-300 text-lg sm:text-2xl font-extrabold">&#8358;8,292,340</h3>
        </div>
        <div className="flex gap-4 items-center bg-primary dark:bg-slate-700 rounded-md p-4 max-w-md text-center">
          <span className="h-10 w-10 p-2 rounded-md bg-slate-50 text-primary text-xl grid place-items-center"><IoTrophyOutline className='text-inherit ' /></span>
          <p className="text-white opacity-90 text-xs sm:text-base">You are doing <span className="font-bold">great</span> this month with <span className="font-bold">&#8358;8,292</span> saved</p>
        </div>
      </section>
      <section className="grid sm:grid-cols-2 justify-center sm:justify-between items-center gap-4 py-20">
        <aside className="flex items-center gap-3 p-2">
          <div className="shadow-lg w-10 h-10 rounded-full grid place-items-center text-lg text-white bg-[#09dba0]">
            <FaSackDollar className="text-inherit" />
          </div>
          <div className="flex-1 flex flex-col">
            <div className="flex justify-between items-center">
              <h2 className="text-slate-500 font-bold text-sm base:text-base">Adobe Creative Suite</h2>
              <p className="font-medium text-xs text-[#09dba0]">&#8358;37,000</p>
            </div>
            <div className="flex justify-between items-center">
              <h2 className="text-slate-500/50 font-semibold text-xs">Income Transfer</h2>
              <p className="font-medium text-xs text-slate-400">18 May, 2023</p>
            </div>
          </div>
        </aside>
        <aside className="flex items-center gap-3 p-2 px-3 border-l-[2px] border-l-slate-200">
          <div className="shadow-lg w-10 h-10 rounded-full grid place-items-center text-lg text-white bg-[#09dba0]">
            <FaSackDollar className="text-inherit" />
          </div>
          <div className="flex-1 flex flex-col">
            <div className="flex justify-between items-center">
              <h2 className="text-slate-500 font-bold text-sm base:text-base">New House Goal</h2>
              <p className="font-medium text-xs text-[#09dba0]">&#8358;220,000</p>
            </div>
            <div className="flex justify-between items-center">
              <h2 className="text-slate-500/50 font-semibold text-xs">Salary Direct Transfer</h2>
              <p className="font-medium text-xs text-slate-400">24 August, 2023</p>
            </div>
          </div>
        </aside>
      </section>
    </main>
  )
}
