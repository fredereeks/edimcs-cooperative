import React from 'react'
import { edimcs_cliff, edimcs_silhouette, edimcs_blackpeople, edimcs_calculator, edimcs_phonecalculator, edimcs_piggyvest } from '@/assets/images'
import Image, { StaticImageData } from 'next/image'
import { FaCalendarAlt } from 'react-icons/fa'
import MemberList from './MemberList'

type MemberProps = {
  id: number
  image: StaticImageData
  name: string
  type: string
  memberId: number
  date: string
  savings: number
  investment: number
  withdrawal: number
  balance: number
}

export default function page() {

  const memberData: MemberProps[] | [] = [
    {
      id: 8921140,
      image: edimcs_blackpeople,
      name: "Abubakar Suleiman",
      type: "member",
      memberId: 208950,
      date: "26/01/2023",
      savings: 5400,
      investment: 32500,
      withdrawal: 15100,
      balance: 37900
    },
    {
      id: 8921141,
      image: edimcs_silhouette,
      name: "Dorcas Kilbane",
      type: "admin",
      memberId: 250701,
      date: "11/03/2023",
      savings: 41500,
      investment: 551000,
      withdrawal: 250000,
      balance: 956100
    },
    {
      id: 8921142,
      image: edimcs_cliff,
      name: "Oloruntoba Samuel",
      type: "member",
      memberId: 321290,
      date: "05/05/2023",
      savings: 32200,
      investment: 85100,
      withdrawal: 32000,
      balance: 117300
    },
    {
      id: 8921143,
      image: edimcs_phonecalculator,
      name: "Benjamin Bright",
      type: "member",
      memberId: 782369,
      date: "14/09/2023",
      savings: 22000,
      investment: 35100,
      withdrawal: 21500,
      balance: 57100
    },
    {
      id: 8921144,
      image: edimcs_piggyvest,
      name: "Kevin Gambari",
      type: "admin",
      memberId: 709734,
      date: "28/10/2023",
      savings: 19800,
      investment: 70500,
      withdrawal: 12000,
      balance: 91300
    },
    {
      id: 8921145,
      image: edimcs_calculator,
      name: "Linda Ikagwu",
      type: "admin",
      memberId: 709734,
      date: "28/10/2023",
      savings: 19800,
      investment: 70500,
      withdrawal: 12000,
      balance: 91300
    },
  ]

  return (
    <main className="flex flex-col gap-4 px-2 sm:px-0 pt-5 pb-10">
      
      <MemberList key={'171243'} memberData={memberData}/>
    </main>
  )
}

