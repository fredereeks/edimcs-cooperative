import { TextInput } from '@/components'
import { memberData } from '@/data/member'
import React from 'react'
import SingleMemberData from './SingleMemberData'
import { MemberProps } from '@/types'

type PageProp = {
    params: {
        id: string
    }
}

const fetchMember = async (id: string | number) => {
    const member = memberData.find(member => member.id.toString() === id.toString())
    return member;
}

export default async function page({ params: { id } }: PageProp) {
    const member: MemberProps | undefined = await fetchMember(id);
    console.log({ params: id, member })
    return (
        <main className="relative">
            <SingleMemberData member={member} />
        </main>
    )
}


export const getStaticParams = () => {

}