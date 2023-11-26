import React from 'react'
import MemberList from './MemberList'
import { MemberProps } from '@/types'
import { memberData } from '@/data/members'

const fetchMembers = async() => {
  const member = await memberData
    // const member = await prisma.loan.findMany({
    //   where: {
    //     loanerId: user?.id
    //   }
    // })
    return member
}

export default async function page() {
  const memberData: MemberProps[] = await fetchMembers();

  return (
    <main className="flex flex-col gap-4 px-2 sm:px-0 pt-5 pb-10">
      <MemberList key={'171243'} memberData={memberData}/>
    </main>
  )
}

