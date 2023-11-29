"use client"

import React, { useRef, useState } from 'react'
import { edimcs_bookkeeping } from '@/assets/images'
import Image from 'next/image'
import { FaCalendarAlt } from 'react-icons/fa'
import { TextInput } from '@/components'
import { MemberProps } from '@/types'
import { user } from '@/data'
import Link from 'next/link'
import { TableSearch, Modal } from '@/app/(auth)/ui'


export default function MemberList({ memberData }: { memberData: MemberProps[] }) {
    const [allTableData, setAllTableData] = useState<MemberProps[] | []>(memberData)
    const [tableData, setTableData] = useState<MemberProps[] | []>(memberData)
    const modalRef = useRef<HTMLDialogElement | null>(null)
    const inputRef = useRef<HTMLInputElement | null>(null)
    const [selectedMember, setSelectedMember] = useState<MemberProps>()

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault()
        let keyword = inputRef.current?.value.toLowerCase() || ''
        if (!keyword || keyword === '') {
            setTableData(allTableData)
        }
        else {
            const result = tableData.filter(el => el.firstname.toLowerCase().includes(keyword) || el.middlename.toLowerCase().includes(keyword) || el.lastname.toLowerCase().includes(keyword) || el.memberId.toString().toLowerCase().includes(keyword) || el.createdAt?.toString().toLowerCase().includes(keyword) || el.email.toLowerCase().includes(keyword) || el.phone?.toString().toLowerCase().includes(keyword) || el.address?.toLowerCase().includes(keyword) || el.type?.toLowerCase().includes(keyword) || el.balance?.toString().toLowerCase().includes(keyword) || el.deposits?.toString().toLowerCase().includes(keyword) || el.withdrawal?.toString().toLowerCase().includes(keyword))
            setTableData(prev => [...result])
        }
    }

    return (
        <>
            <section className="relative flex flex-col gap-2 p-4 bg-white  dark:bg-[#dbf0f724] shadow-slate-200 dark:shadow-black shadow-md rounded-lg">
                <div className="w-full overflow-x-scroll pb-6 x-scrollbar">
                    <table className="w-full text-slate-500 dark:text-slate-200 text-xs sm:text-sm min-w-[20rem]">
                        <thead className='pb-2 border-b border-b-slate-200 dark:border-b-slate-500'>
                            <tr>
                                <th colSpan={6}>
                                    <TableSearch title='MEMBERS' key={'72088234'} handleSearch={handleSearch} inputRef={inputRef}>
                                    </TableSearch>
                                </th>
                            </tr>
                            <tr className='text-slate-600 dark:text-slate-50'>
                                <th className='whitespace-nowrap px-4 font-light text-xs text-left'>Member Details</th>
                                <th className='whitespace-nowrap px-4 font-light text-xs text-center'>Date Registered</th>
                                <th className='whitespace-nowrap px-2 font-light text-xs text-center'>Total Savings</th>
                                <th className='whitespace-nowrap px-2 font-light text-xs text-center'>Total Deposits</th>
                                <th className='whitespace-nowrap px-2 font-light text-xs text-center'>Total Withdrawals</th>
                                <th className='whitespace-nowrap px-2 font-light text-xs text-center'>Current Balance</th>
                            </tr>
                        </thead>
                        <tbody className='w-full'>
                            {
                                tableData.length ?
                                    tableData.map(member => (
                                        <tr key={member?.id} className='hover:bg-slate-50 dark:hover:bg-slate-900/30'>
                                            <td>
                                                <Link href={`/dashboard/members/${member?.id}`} className="max-w-sm w-max flex items-center gap-2 cursor-pointer text-slate-700 dark:text-slate-50">
                                                    <div className="h-7 sm:h-8 w-7 sm:w-8 flex justify-center items-center rounded-full overflow-hidden relative bg-primary dark:bg-slate-600">
                                                        <Image src={member?.image || edimcs_bookkeeping} alt={`${member?.firstname} ${member?.firstname} ${member?.lastname}`} fill={true} className="absolute left-0 top-0 object-cover w-full h-full" />
                                                    </div>
                                                    <div>
                                                        <h5 className="text-xs font-medium leading-tight whitespace-nowrap flex items-center">{member?.firstname} {member?.middlename} {member?.lastname} <span className="text-[.4rem] bg-slate-200/50 p-[.2rem] px-[.3rem] rounded-[2px] uppercase ml-2">{member?.type}</span></h5>
                                                        <p className="text-[.6rem] font-medium opacity-70 leading-tight">{member?.memberId}</p>
                                                    </div>
                                                </Link>
                                            </td>
                                            <td className="align-middle">
                                                <div className="flex justify-center items-center gap-[.2rem] align-middle text-slate-600 dark:text-slate-50 text-[.6rem] py-[.1rem] sm:py-1">
                                                    <FaCalendarAlt className="text-inherit mt-[.1rem]" /> <p className="">{member?.createdAt}</p>
                                                </div>
                                            </td>
                                            <td className="align-middle">
                                                <div className="flex justify-center items-center align-middle mx-auto">
                                                    <div className={`bg-teal-100 dark:bg-slate-50 text-teal-600 text-[.6rem] py-[.1rem] sm:py-1 px-3 rounded-sm font-medium`}>&#8358;{member?.savings?.toLocaleString()}</div>
                                                </div>
                                            </td>
                                            <td className="align-middle">
                                                <div className="flex justify-center items-center align-middle mx-auto">
                                                    <div className={`bg-sky-100 dark:bg-slate-50 text-sky-600 text-[.6rem] py-[.1rem] sm:py-1 px-3 rounded-sm font-medium`}>&#8358;{member?.deposits?.toLocaleString()}</div>
                                                </div>
                                            </td>
                                            <td className="align-middle">
                                                <div className="flex justify-center items-center align-middle mx-auto">
                                                    <div className={`bg-red-100 dark:bg-slate-50 text-red-600 text-[.6rem] py-[.1rem] sm:py-1 px-3 rounded-sm font-medium whitespace-nowrap`}>-&#8358;{member?.withdrawal?.toLocaleString()}</div>
                                                </div>
                                            </td>
                                            <td className="align-middle">
                                                <h4 className="flex justify-center items-center gap-[.2rem] align-middle text-slate-500 dark:text-slate-50 text-[.6rem] py-[.1rem] sm:py-1">&#8358;{member?.balance?.toLocaleString()}</h4>
                                            </td>
                                        </tr>
                                    ))
                                    :
                                    <tr>
                                        <td colSpan={6}>
                                            <h4 className="text-slate-500 text-center dark:text-slate-300">No Record(s) Found</h4>
                                        </td>
                                    </tr>
                            }
                        </tbody>
                    </table>
                </div>
            </section>
            <Modal modalRef={modalRef}>
                <div className="flex flex-col gap-6">
                    <div className="flex flex-col gap-4 p-4 pb-2 items-center">
                        <h4 className="text-lg sm:text-2xl text-slate-700 text-center mb-2 font-bold opacity-80 relative after:bg-slate-300 after:-bottom-2 after:h-[.51px] after:w-11/12 after:left-1/2 after:-translate-x-1/2 after:absolute">{selectedMember?.firstname} {selectedMember?.middlename} {selectedMember?.lastname} Details</h4>
                        <div className="flex gap-4 md:gap-6">
                            <div className="relative h-14 w-14 md:h-16 md:w-16 flex-shrink-0 rounded-full overflow-hidden cursor-pointer">
                                <Image src={selectedMember?.image || edimcs_bookkeeping} alt={`${selectedMember?.firstname} ${selectedMember?.middlename} ${selectedMember?.lastname}`} fill={true} className='object-cover' />
                            </div>
                            <div className="flex flex-col gap-1 w-max justify-center">
                                <div className="flex flex-col">
                                    <h3 className="text-sm text-primary">{selectedMember?.firstname} {selectedMember?.middlename} {selectedMember?.lastname}</h3>
                                    <p className="text-[.6rem] text-slate-500">{selectedMember?.accountDetails && selectedMember?.accountDetails[0]?.banker}</p>
                                    <p className="text-xs text-slate-500 font-semibold">{selectedMember?.accountDetails && selectedMember?.accountDetails[0].accountNo}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* <form action="dialog" className="px-4 sm:px-0 w-full scale-90 -translate-x-1/2 -translate-y-4 left-1/2 grid sm:grid-cols-2 gap-4 sm:gap-y-6 sm:justify-center relative after:bg-slate-300 after:-top-4 after:h-[.51px] after:w-11/12 after:left-1/2 after:-translate-x-1/2 after:absolute">
                        <TextInput key={6273} id='memberId' onChange={handleChange} name='memberId' label='Your Member ID' value={inputs?.memberId} minLength={3} required={true} containerClassName={'text-xs sm:col-span-2'} className='bg-slate-200 cursor-not-allowed' />
                        <TextInput key={6274} id='firstname' onChange={handleChange} name='firstname' label='First Name' value={inputs?.firstname} minLength={3} required={true} containerClassName={'text-xs'} />
                        <TextInput key={6275} id='middlename' onChange={handleChange} name='middlename' label='Middle Name' value={inputs?.middlename} minLength={3} required={false} containerClassName={'text-xs'} />
                        <TextInput key={6276} id='lastname' onChange={handleChange} name='lastname' label='Last Name' value={inputs?.lastname} minLength={3} required={true} containerClassName={'text-xs'} />
                        <TextInput key={6277} id='email' onChange={handleChange} name='email' label='Email' value={inputs?.email} minLength={3} required={true} containerClassName={'text-xs'} />
                        <TextInput key={6278} id='phone' onChange={handleChange} name='phone' label='Phone Number' value={inputs?.phone} minLength={11} required={true} containerClassName={'text-xs'} />
                        <TextInput key={6279} id='address' onChange={handleChange} name='address' label='Address' value={inputs?.address} minLength={3} required={true} containerClassName={'text-xs sm:col-span-2'} />
                        <div className="flex flex-col gap-1 w-max justify-center sm:items-center">
                            <div className="flex gap-4">
                                <button type="submit" className="py-2 px-4 sm:px-8 bg-primary text-white text-[.6rem] text-xs rounded-md hover:bg-blue-600 cursor-pointer">Update Member Record</button>
                                <button type="button" className="py-2 px-4 sm:px-8 bg-danger text-white text-[.6rem] text-xs rounded-md hover:bg-[#ed3869] hover:text-white cursor-pointer">Delete User</button>
                            </div>
                        </div>
                    </form> */}
                </div>
            </Modal>
        </>
    )
}
