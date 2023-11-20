import React from 'react'
import SavingsList from './SavingsList'
import { savingsData } from '@/data'



export default function page() {
  return (
    <main className="flex flex-col gap-4 px-2 sm:px-0 pt-5 pb-10">
      <SavingsList key={'171243'} savingsData={savingsData} />
    </main>
  )
}

