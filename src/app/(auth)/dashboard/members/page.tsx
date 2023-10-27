import { edimcs_cliff, edimcs_silhouette, edimcs_blackpeople, edimcs_calculator, edimcs_phonecalculator, edimcs_piggyvest } from '@/assets/images'
import Image, { StaticImageData } from 'next/image'
import React from 'react'
import { FaCalendarAlt } from 'react-icons/fa'

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

  const memberData: MemberProps[] = [
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
      <section className="relative flex flex-col gap-2 p-4 bg-white shadow-slate-200 shadow-md rounded-lg">
        <div className="w-full overflow-x-scroll pb-6 x-scrollbar">
          <table className="w-full text-slate-500 dark:text-slate-400 text-xs sm:text-sm min-w-[20rem]">
            <thead>
              <tr>
                <th colSpan={6}>
                  <h4 className="uppercase font-semibold text-slate-400 text-left pb-2 mb-2 border-b border-b-slate-200">MEMBER LIST</h4>
                </th>
              </tr>
              <tr className='text-slate-400'>
                <th className='font-thin text-xs text-slate-400 text-left'>Member Details</th>
                <th className='font-thin text-xs text-slate-400 text-center'>Date Registered</th>
                <th className='font-thin text-xs text-slate-400 text-center'>Savings</th>
                <th className='font-thin text-xs text-slate-400 text-center'>Investment</th>
                <th className='font-thin text-xs text-slate-400 text-center'>Withdrawals</th>
                <th className='font-thin text-xs text-slate-400 text-center'>Total Balance</th>
              </tr>
            </thead>
            <tbody className='w-full'>
              {
                memberData.map(member => (
                  <tr key={member.id}>
                    <td>
                      <div className="max-w-sm w-max flex items-center gap-2 cursor-pointer">
                        <div className="h-7 sm:h-8 w-7 sm:w-8 flex justify-center items-center rounded-full overflow-hidden relative bg-primary dark:bg-slate-600">
                          <Image src={member.image} alt={member.name} fill={true} className="absolute left-0 top-0 object-cover w-full h-full" />
                        </div>
                        <div>
                          <h5 className="text-xs font-medium leading-tight whitespace-nowrap flex items-center">{member.name} <span className="text-[.4rem] bg-slate-200/50 p-[.2rem] px-[.3rem] rouded-md text-slate-600 uppercase ml-2">{member.type}</span></h5>
                          <p className="text-[.6rem] font-thin opacity-70 leading-tight">EDIMCS-{member.memberId}</p>
                        </div>
                      </div>
                    </td>
                    <td className="align-middle">
                      <div className="flex justify-center items-center gap-[.2rem] align-middle text-slate-500 text-[.6rem] py-[.1rem] sm:py-1">
                        <FaCalendarAlt className="text-inherit mt-[.1rem]" /> <p className="">{member.date}</p>
                      </div>
                    </td>
                    <td className="align-middle">
                      <div className="flex justify-center items-center align-middle mx-auto">
                        <div className={`bg-teal-100 text-teal-600 text-[.6rem] py-[.1rem] sm:py-1 px-3 rounded-sm font-medium`}>&#8358;{member.savings}</div>
                      </div>
                    </td>
                    <td className="align-middle">
                      <div className="flex justify-center items-center align-middle mx-auto">
                        <div className={`bg-sky-100 text-sky-600 text-[.6rem] py-[.1rem] sm:py-1 px-3 rounded-sm font-medium`}>&#8358;{member.investment}</div>
                      </div>
                    </td>
                    <td className="align-middle">
                      <div className="flex justify-center items-center align-middle mx-auto">
                        <div className={`bg-red-100 text-red-600 text-[.6rem] py-[.1rem] sm:py-1 px-3 rounded-sm font-medium`}>-&#8358;{member.withdrawal}</div>
                      </div>
                    </td>
                    <td className="align-middle">
                      <h4 className="flex justify-center items-center gap-[.2rem] align-middle text-slate-400 text-[.6rem] py-[.1rem] sm:py-1">&#8358;{member.balance}</h4>
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
      </section>
    </main>
  )
}

