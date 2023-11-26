import React from 'react'
import WithdrawalList from './WithdrawalList'
import { withdrawalData } from '@/data/withdrawals'
import { user } from '@/data'
import { WithdrawalProps } from '@/types'

const fetchWithdrawals = async() => {
  const withdrawals = await withdrawalData
  if(user?.type === "Member") {
    // const withdrawals = await prisma.withdrawal.findFirst({
    //   where: {
    //     withdrawerId: user?.id
    //   }
    // })
    return withdrawals.filter(withdrawal => withdrawal.withdrawerId === user?.id)
  }
  else {
    // const withdrawals = await prisma.withdrawal.findMany({
    //   where: {
    //     withdrawerId: user?.id
    //   }
    // })
    return withdrawals
  }
}

export default async function page() {
  const withdrawalData: WithdrawalProps[] = await fetchWithdrawals();
  // console.log({withdrawalData})

  return (
    <main className="flex flex-col gap-4 px-2 sm:px-0 pt-5 pb-10">
      <WithdrawalList withdrawalData={withdrawalData} />
    </main>
  )
}
