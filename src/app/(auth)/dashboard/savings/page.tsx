import React from 'react'
import SavingsList from './SavingsList'
import { savingsData } from '@/data'
import prisma from '@/lib/prisma'
import { user } from '@/data'


const fetchSavings = async() => {
  const savings = await savingsData
  if(user?.type === "Member") {
    // const savings = await prisma.saving.findFirst({
    //   where: {
    //     saverId: user?.id
    //   }
    // })
    return savings.filter(saving => saving.saverId === user?.id)
  }
  else {
    // const savings = await prisma.saving.findMany({
    //   where: {
    //     saverId: user?.id
    //   }
    // })
    return savings
  }
}

export default async function page() {
  const savingsData = await fetchSavings();

  return (
    <main className="flex flex-col gap-4 px-2 sm:px-0 pt-5 pb-10">
      <SavingsList key={'171243'} savingsData={savingsData} />
    </main>
  )
}

