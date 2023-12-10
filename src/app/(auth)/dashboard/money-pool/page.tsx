import React from 'react'
import MoneyPoolList from './MoneyPoolList'
import { MemberProps } from '@/types'
import { fetchMembers } from '../../actions'

export default async function MoneyPool() {
  const members: MemberProps[] = await fetchMembers()
  return (
    <main className="flex flex-col gap-4 px-2 sm:px-0 pt-5 pb-10">
      <MoneyPoolList key={'171249'} member={members} />
    </main>
  )
}
