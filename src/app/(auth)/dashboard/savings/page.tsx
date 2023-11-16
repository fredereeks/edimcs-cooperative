import React from 'react'
import { edimcs_cliff, edimcs_silhouette, edimcs_blackpeople, edimcs_bookkeeping, edimcs_calculator, edimcs_phonecalculator, edimcs_piggyvest } from '@/assets/images'
import SavingList from './SavingList'
import { MemberProps } from '@/types'
import Image from 'next/image'
import { FaCalendarAlt } from 'react-icons/fa'
import { user } from '@/data/user'
import { memberData } from '@/data/member'



export default function page() {


  return (
    <main className="flex flex-col gap-4 px-2 sm:px-0 pt-5 pb-10">
      <SavingList key={'171243'} memberData={memberData}>
        
      </SavingList>
    </main>
  )
}

