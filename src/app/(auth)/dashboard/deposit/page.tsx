import React from 'react'
import DepositList from './DepositList'
import { depositData } from '@/data/deposits'
import { user } from '@/data'
import { DepositProps } from '@/types'

const fetchDeposits = async() => {
  const deposits = await depositData
  if(user?.type === "Member") {
    // const deposits = await prisma.deposit.findFirst({
    //   where: {
    //     depositorId: user?.id
    //   }
    // })
    return deposits.filter(deposit => deposit.depositorId === user?.id)
  }
  else {
    // const deposits = await prisma.deposit.findMany({
    //   where: {
    //     depositorId: user?.id
    //   }
    // })
    return deposits
  }
}

export default async function page() {
  const depositData: DepositProps[] = await fetchDeposits();
  // console.log({depositData})

  return (
    <main className="flex flex-col gap-4 px-2 sm:px-0 pt-5 pb-10">
      <DepositList depositData={depositData} />
    </main>
  )
}
