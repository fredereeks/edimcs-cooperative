import Link from 'next/link'
import React from 'react'
import { FaDollarSign, FaDownload, FaSackDollar } from 'react-icons/fa6'
import { IoReceiptOutline, IoTrophyOutline } from 'react-icons/io5'

export default function Savings() {
  return (
    <main className="flex flex-col relative px-4 pb-10 dark">
      <section className="flex flex-col sm:flex-row justify-center sm:justify-between items-center gap-4 py-10">
        <div className="flex flex-col items-center">
          <p className="text-slate-400 text-xs sm:text-base">Total Savings</p>
          <h3 className="text-slate-700 dark:text-slate-300 text-3xl sm:text-4xl font-sans font-extrabold">&#8358;8,292,340</h3>
        </div>
        <div className="shadow-lg shadow-slate-300 sm:ml-auto flex gap-4 items-center bg-primary-grad dark:bg-slate-700 rounded-md p-4 w-[90%] max-w-sm text-center">
          <span className="h-10 w-10 p-2 rounded-md bg-slate-50 text-primary text-xl grid place-items-center"><IoTrophyOutline className='text-inherit ' /></span>
          <p className="text-white opacity-90 text-xs sm:text-sm">You are doing <span className="font-bold">great</span> this month with <span className="font-bold">&#8358;8,292</span> saved</p>
        </div>
      </section>
      <section className="grid sm:grid-cols-2 sm:justify-between items-center gap-4">
        <div className="flex justify-between items-center flex-wrap gap-2 sm:gap-4 sm:col-span-2 pb-5">
          <button className='shadow-lg hover:shadow-xl flex items-center gap-2 bg-orange-grad w-max px-4 sm:px-8 py-[.45rem] sm:py-[.55rem] text-xs sm:text-sm text-white text-center rounded-[2rem]'>
            <FaSackDollar className="text-inherit" /> Deposit
          </button>
          <button className='shadow-lg hover:shadow-xl flex items-center gap-2 bg-red-grad w-max px-4 sm:px-8 py-[.45rem] sm:py-[.55rem] text-xs sm:text-sm text-white text-center rounded-[2rem]'>
            <FaDollarSign className="text-inherit" /> Withdraw
          </button>
          <button className='shadow-lg hover:shadow-xl flex items-center gap-2 bg-dark-grad w-max px-4 sm:px-8 py-[.45rem] sm:py-[.55rem] text-xs sm:text-sm text-white text-center rounded-[2rem] cursor-pointer'>
            <FaDownload className="text-inherit" /> Export
          </button>
        </div>
        <aside className="border-b border-b-slate-200 pb-2 flex items-center gap-3 sm:p-2">
          <div className="shadow-lg w-10 h-10 rounded-full grid place-items-center text-lg text-white bg-green-grad">
            <FaSackDollar className="text-inherit" />
          </div>
          <div className="flex-1 flex flex-col">
            <div className="flex justify-between items-center">
              <h2 className="text-slate-500 font-bold text-xs md:text-sm">Adobe Creative Suite</h2>
              <p className="font-medium text-[.65rem] text-xs text-green whitespace-nowrap">+&#8358;37,000</p>
            </div>
            <div className="flex justify-between items-center">
              <h2 className="text-slate-500/50 font-semibold text-[.6rem] md:text-xs">Income Transfer</h2>
              <p className="font-medium text-[.55rem] sm:text-[.65rem] text-slate-400">18 May, 2023</p>
            </div>
          </div>
        </aside>
        <aside className="border-b border-b-slate-200 pb-2 flex items-center gap-3 sm:p-2 sm:pl-3 sm:border-l-[2px] sm:border-l-slate-200">
          <div className="shadow-lg w-10 h-10 rounded-full grid place-items-center text-lg text-white bg-green-grad">
            <FaSackDollar className="text-inherit" />
          </div>
          <div className="flex-1 flex flex-col">
            <div className="flex justify-between items-center">
              <h2 className="text-slate-500 font-bold text-xs md:text-sm">New House Goal</h2>
              <p className="font-medium text-[.65rem] text-xs text-green whitespace-nowrap">+&#8358;220,000</p>
            </div>
            <div className="flex justify-between items-center">
              <h2 className="text-slate-500/50 font-semibold text-[.6rem] md:text-xs">Salary Direct Transfer</h2>
              <p className="font-medium text-[.55rem] sm:text-[.65rem] text-slate-400">24 August, 2023</p>
            </div>
          </div>
        </aside>
        <aside className="border-b border-b-slate-200 pb-2 flex items-center gap-3 sm:p-2">
          <div className="shadow-lg w-10 h-10 rounded-full grid place-items-center text-lg text-white bg-red-grad">
            <FaSackDollar className="text-inherit" />
          </div>
          <div className="flex-1 flex flex-col">
            <div className="flex justify-between items-center">
              <h2 className="text-slate-500 font-bold text-sm base:text-base">New House Goal</h2>
              <p className="font-medium text-xs text-red">-&#8358;220,000</p>
            </div>
            <div className="flex justify-between items-center">
              <h2 className="text-slate-500/50 font-semibold text-xs">Salary Direct Transfer</h2>
              <p className="font-medium text-xs text-slate-400">24 August, 2023</p>
            </div>
          </div>
        </aside>
        <aside className="border-b border-b-slate-200 pb-2 flex items-center gap-3 sm:p-2 sm:pl-3 sm:border-l-[2px] sm:border-l-slate-200">
          <div className="shadow-lg w-10 h-10 rounded-full grid place-items-center text-lg text-white bg-green-grad">
            <FaSackDollar className="text-inherit" />
          </div>
          <div className="flex-1 flex flex-col">
            <div className="flex justify-between items-center">
              <h2 className="text-slate-500 font-bold text-xs md:text-sm">Trip to Kebbi State</h2>
              <p className="font-medium text-[.65rem] text-xs text-green whitespace-nowrap">+&#8358;220,000</p>
            </div>
            <div className="flex justify-between items-center">
              <h2 className="text-slate-500/50 font-semibold text-[.6rem] md:text-xs">Income Cash</h2>
              <p className="font-medium text-[.55rem] sm:text-[.65rem] text-slate-400">24 August, 2023</p>
            </div>
          </div>
        </aside>
      </section>
    </main>
  )
}
