export const dynamic = 'force-static', revalidate = 'force-cache'

import React from 'react'
import MemberList from './MemberList'
import { MemberProps } from '@/types'
import prisma from '@/lib/prisma'
import { fetchMembers } from '../../actions'


export default async function page() {
  const memberData = await fetchMembers()

  return (
    <main className="flex flex-col gap-4 px-2 sm:px-0 pt-5 pb-10">
      <MemberList key={'171243'} memberData={memberData}/>
    </main>
  )
}

