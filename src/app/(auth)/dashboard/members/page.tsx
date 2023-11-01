import React from 'react'
import { edimcs_cliff, edimcs_silhouette, edimcs_blackpeople, edimcs_calculator, edimcs_phonecalculator, edimcs_piggyvest } from '@/assets/images'
import MemberList from './MemberList'
import { MemberProps } from '@/types'



export default function page() {

  const memberData: MemberProps[] | [] = [
    {
      id: 8921140,
      image: edimcs_blackpeople,
      firstname: "Abubakar",
      middlename: '',
      lastname: "Suleiman",
      account_name: "Abubakar  Suleiman",
      type: "member",
      memberId: 208950,
      account_number: "0828208950",
      banker: 'Sterling Bank Plc',
      email: "Abubakar@gmail.com",
      phone: "+2340828208950",
      address: '130, Sporting Estate, Lugbe',
      status: 'Active',
      date: "26/01/2023",
      savings: 5400,
      investment: 32500,
      withdrawal: 15100,
      balance: 37900
    },
    {
      id: 8921141,
      image: edimcs_silhouette,
      firstname: "Dorcas",
      middlename: 'Omoh',
      lastname: "Kilbane",
      account_name: "Dorcas Omoh Kilbane",
      account_number: "0828250701",
      type: "admin",
      status: "Active",
      memberId: 250701,
      phone: "+234808250701",
      address: '6, Sirakoro Street, Adjecent Kilimanjaro Eatery, Wuse II',
      banker: 'Sterling Bank Plc',
      email: "Dorcas@gmail.com",
      date: "11/03/2023",
      savings: 41500,
      investment: 551000,
      withdrawal: 250000,
      balance: 956100
    },
    {
      id: 8921142,
      image: edimcs_cliff,
      firstname: "Oloruntoba",
      middlename: 'Sunday',
      lastname: "Samuel",
      account_name: "Oloruntoba Sunday Samuel",
      account_number: "0828321290",
      type: "member",
      status: "Active",
      memberId: 321290,
      phone: "+234808321290",
      address: '10, Garki Extension, Garki',
      banker: 'Sterling Bank Plc',
      email: "Oloruntoba@gmail.com",
      date: "05/05/2023",
      savings: 32200,
      investment: 85100,
      withdrawal: 32000,
      balance: 117300
    },
    {
      id: 8921143,
      image: edimcs_phonecalculator,
      firstname: "Benjamin",
      middlename: '',
      lastname: "Bright",
      account_name: "Benjamin  Bright",
      account_number: "0828782369",
      type: "member",
      status: "Active",
      memberId: 782369,
      phone: "+234808782369",
      address: '18, New Layout, Lokogoma Estate, Lokogoma',
      banker: 'Sterling Bank Plc',
      email: "Benjamin@gmail.com",
      date: "14/09/2023",
      savings: 22000,
      investment: 35100,
      withdrawal: 21500,
      balance: 57100
    },
    {
      id: 8921144,
      image: edimcs_piggyvest,
      firstname: "Kevin",
      middlename: 'Ojonugwa',
      lastname: "Gambari",
      account_name: "Kevin Ojonugwa Gambari",
      account_number: "0828709734",
      type: "admin",
      status: "Active",
      memberId: 709734,
      phone: "+234808709734",
      address: '32, Opposite Living Faith, Paso II, Gwagwalada',
      banker: 'Sterling Bank Plc',
      email: "Kevin@gmail.com",
      date: "28/10/2023",
      savings: 19800,
      investment: 70500,
      withdrawal: 12000,
      balance: 91300
    },
    {
      id: 8921145,
      image: edimcs_calculator,
      firstname: "Linda",
      middlename: '',
      lastname: "Ikagwu",
      account_name: "Linda  Ikagwu",
      account_number: "0828709734",
      type: "admin",
      status: "Active",
      memberId: 709734,
      phone: "+234808709734",
      address: '42, Federal Medical Center, Dawaki',
      banker: 'Sterling Bank Plc',
      email: "Linda@gmail.com",
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

