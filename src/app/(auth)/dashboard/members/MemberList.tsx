"use client"

import React, { useRef, useState } from 'react'
import { edimcs_blackpeople } from '@/assets/images'
import Image, { StaticImageData } from 'next/image'
import { FaCalendarAlt } from 'react-icons/fa'
import { TextInput } from '@/components'

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

export default function MemberList({ memberData }: { memberData: MemberProps[] }) {
    const modalRef = useRef<HTMLElement | null>(null)
    const [showModal, setShowModal] = useState<boolean>(false)
    const [selectedMember, setSelectedMember] = useState<[MemberProps] | []>([
        id: 823478234
        image: ""
        name: string
        type: string
        memberId: number
        date: string
        savings: number
        investment: number
        withdrawal: number
        balance: number
    ])

    modalRef.current?.addEventListener("click", e => {
        e.stopPropagation();
        if (modalRef.current?.nodeName === "SECTION") setShowModal(false)
    })

    const handleClick = (id: number) => {
        try {
            // make request to get user details
            const targetMember = memberData?.find(member => member.id === id)
            if (targetMember) {
                setSelectedMember(prev => [{ ...targetMember }])
            }
            setShowModal(true)
        }
        catch (err) {
            console.log({ err })
        }
    }

    return (
        <>
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
                                <th className='whitespace-nowrap px-4 font-thin text-xs text-slate-400 text-left'>Member Details</th>
                                <th className='whitespace-nowrap px-4 font-thin text-xs text-slate-400 text-center'>Date Registered</th>
                                <th className='whitespace-nowrap px-2 font-thin text-xs text-slate-400 text-center'>Total Savings</th>
                                <th className='whitespace-nowrap px-2 font-thin text-xs text-slate-400 text-center'>Total Investment</th>
                                <th className='whitespace-nowrap px-2 font-thin text-xs text-slate-400 text-center'>Total Withdrawals</th>
                                <th className='whitespace-nowrap px-2 font-thin text-xs text-slate-400 text-center'>Current Balance</th>
                            </tr>
                        </thead>
                        <tbody className='w-full'>
                            {
                                memberData.map(member => (
                                    <tr onClick={() => handleClick(member.id)} key={member.id}>
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
                                                <div className={`bg-red-100 text-red-600 text-[.6rem] py-[.1rem] sm:py-1 px-3 rounded-sm font-medium whitespace-nowrap`}>-&#8358;{member.withdrawal}</div>
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
            <section ref={modalRef} className={`${showModal ? 'grid' : 'hidden'} modal-container`}>
                <aside className="modal flex-col">
                    <div className="flex flex-col gap-6">
                        <form action="" className="flex flex-col gap-4 p-4 pb-2 items-center">
                            <h4 className="text-lg sm:text-2xl text-slate-700 mb-2 font-bold opacity-80 relative after:bg-slate-300 after:-bottom-2 after:h-[.51px] after:w-11/12 after:left-1/2 after:-translate-x-1/2 after:absolute">{selectedMember?.name} Record</h4>
                            <div className="flex gap-4 md:gap-6">
                                <div className="relative h-14 w-14 md:h-16 md:w-16 flex-shrink-0 rounded-full overflow-hidden cursor-pointer">
                                    <Image src={edimcs_blackpeople} alt="Mohammad Aturu" fill={true} className='object-cover' />
                                </div>
                                <div className="flex flex-col gap-1 w-max justify-center">
                                    <div className="flex flex-col">
                                        <h3 className="text-sm text-primary">Abdullah Mutari</h3>
                                        <p className="text-[.6rem] text-slate-500">Sterling Bank Plc</p>
                                        <p className="text-xs text-slate-500 font-semibold">0061827052</p>
                                    </div>
                                </div>
                            </div>
                        </form>
                        <form action="" className="px-4 sm:px-0 w-full scale-90 -translate-x-1/2 -translate-y-4 left-1/2 grid sm:grid-cols-2 gap-4 sm:gap-y-6 sm:justify-center relative after:bg-slate-300 after:-top-4 after:h-[.51px] after:w-11/12 after:left-1/2 after:-translate-x-1/2 after:absolute">
                            <TextInput key={6274} id='member-id' name='member-id' label='Your Member ID' value={'EDIMCS-18340'} minLength={3} required={true} containerClassName={'text-xs sm:col-span-2'} className='bg-slate-200 cursor-not-allowed' />
                            <TextInput key={6275} id='firstname' name='firstname' label='First Name' value={'Abubakar'} minLength={3} required={true} containerClassName={'text-xs'} />
                            <TextInput key={6276} id='lastname' name='lastname' label='Last Name' value={'Mutari'} minLength={3} required={true} containerClassName={'text-xs'} />
                            <TextInput key={6277} id='email' name='email' label='Email' value={'abumutari@gmail.com'} minLength={3} required={true} containerClassName={'text-xs'} />
                            <TextInput key={6278} id='phone' name='phone' label='Phone Number' value={'08141941985'} minLength={11} required={true} containerClassName={'text-xs'} />
                            <TextInput key={6279} id='address' name='address' label='Address' value={'6, Sirakoro Street, Adjecent Kilimanjaro Eatery, Wuse II'} minLength={3} required={true} containerClassName={'text-xs sm:col-span-2'} />
                            <div className="flex flex-col gap-1 w-max justify-center sm:items-center">
                                <div className="flex gap-4">
                                    <button type="submit" className="py-2 px-4 sm:px-8 bg-primary text-white text-[.6rem] text-xs rounded-md hover:bg-blue-600 cursor-pointer">Update Member Record</button>
                                    <button type="button" className="py-2 px-4 sm:px-8 bg-danger text-white text-[.6rem] text-xs rounded-md hover:bg-[#ed3869] hover:text-white cursor-pointer">Delete User</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </aside>
            </section>
        </>
    )
}
