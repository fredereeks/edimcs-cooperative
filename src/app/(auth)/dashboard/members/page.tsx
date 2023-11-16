import React from 'react'
import { edimcs_cliff, edimcs_silhouette, edimcs_blackpeople, edimcs_calculator, edimcs_phonecalculator, edimcs_piggyvest } from '@/assets/images'
import MemberList from './MemberList'
import { MemberProps } from '@/types'
import { memberData } from '@/data/member'



export default function page() {

  return (
    <main className="flex flex-col gap-4 px-2 sm:px-0 pt-5 pb-10">
      <MemberList key={'171243'} memberData={memberData}/>
    </main>
  )
}

