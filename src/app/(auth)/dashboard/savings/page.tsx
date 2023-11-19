import React from 'react'
import SavingList from './SavingList'
import { savingsData } from '@/data'



export default function page() {
  return (
    <main className="flex flex-col gap-4 px-2 sm:px-0 pt-5 pb-10">
      <SavingList key={'171243'} savingsData={savingsData} />
    </main>
  )
}

