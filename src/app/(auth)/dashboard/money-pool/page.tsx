import React from 'react'
import MoneyPoolList from './MoneyPoolList'
import { memberData } from '@/data'
import { MemberProps } from '@/types'

export default function MoneyPool() {
  const members: MemberProps[] | [] = memberData
  return (
    <main className="flex flex-col gap-4 px-2 sm:px-0 pt-5 pb-10">
      <MoneyPoolList key={'171249'} member={members} />
    </main>
  )
}
