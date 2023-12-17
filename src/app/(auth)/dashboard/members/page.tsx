// export const dynamic = 'force-static', revalidate = '60'

import React from 'react'
import MemberList from './MemberList'
import { fetchMembers } from '../../actions'
import { Metadata } from 'next'


export const metadata: Metadata = {
  title: 'EDIMCS :: Members',
  description: "EDIMCS stands for Enlightenment Drive Initiative Co-operative Society. We are the largest cooperative organization among cooperatives in Nigeria and in the world; with the goal of achieving a first-world Nigeria with empowerment and housing for low-income and small and medium enterprises as our primary goal",
}

export default async function page() {
  const memberData = await fetchMembers()

  return (
    <main className="flex flex-col gap-4 px-2 sm:px-0 pt-5 pb-10">
      <MemberList key={'171243'} memberData={memberData}/>
    </main>
  )
}

