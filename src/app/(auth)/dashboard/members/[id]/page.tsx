// export const dynamic = 'force-static', revalidate = 'force-cache'

import React from 'react'
import SingleMemberData from './SingleMemberData'
import { MemberProps } from '@/types'
import prisma from '@/lib/prisma'
import { fetchUser } from '@/app/(auth)/actions'

type PageProp = {
    params: {
        id: string
    }
}

const fetchMember = async (id: string) => {
    const member = await prisma.member.findUnique({
       where: {id}, include: { accountDetails: true, deposits: true, loans: true, savings: true, withdrawals: true }
    })
    return member as MemberProps;
}

export default async function page({ params: { id } }: PageProp) {
    const member: MemberProps = await fetchMember(id);
    const user: MemberProps = await fetchUser()
    return (
        <main className="relative">
            <SingleMemberData member={member} user={user} />
        </main>
    )
}


export async function generateStaticParams(){
    const members = await prisma.member.findMany({
        select: { id: true }
    })
    return members.map(member => ({ id:  member.id.toString() }))
}