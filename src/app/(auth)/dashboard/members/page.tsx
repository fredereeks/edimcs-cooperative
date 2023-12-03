export const dynamic = 'force-static', revalidate = 'force-cache'

import React from 'react'
import MemberList from './MemberList'
import { MemberProps } from '@/types'
import { memberData } from '@/data/members'
import prisma from '@/lib/prisma'

const fetchMembers = async() => {
  // const member = await memberData
    const member = await prisma.member.findMany({
      orderBy: { createdAt: "desc" }
    })
    return member 
}

export default async function page() {
  const member = await memberData
  const realMembers = await fetchMembers();

  return (
    <main className="flex flex-col gap-4 px-2 sm:px-0 pt-5 pb-10">
      <MemberList key={'171243'} memberData={member}/>
    </main>
  )
}

