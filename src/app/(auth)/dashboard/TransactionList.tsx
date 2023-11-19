"use client"

import React, { useRef, useState } from 'react'
import { edimcs_blackpeople, edimcs_bookkeeping } from '@/assets/images'
import Image from 'next/image'
import { FaClock } from 'react-icons/fa'
import { TransactionProps } from '@/types'
import { user } from '@/data/user'
import { TableSearch, Modal } from '@/app/(auth)/components'


export default function TransactionList({ transactionData }: { transactionData: TransactionProps[] }) {
    const [allTableData, setAllTableData] = useState<TransactionProps[] | []>(transactionData)
    const [tableData, setTableData] = useState<TransactionProps[] | []>(transactionData)
    const modalRef = useRef<HTMLDialogElement | null>(null)
    const inputRef = useRef<HTMLInputElement | null>(null)
    const [selectedTransaction, setSelectedTransaction] = useState<TransactionProps>({
        id: "id",
        image: edimcs_blackpeople,
        firstname: "firstname",
        middlename: "middlename",
        lastname: "lastname",
        memberId: "string",
        type: "type",
        amount: 1,
        createdAt: "createdAt",
        balance: 1,
        approvedBy: "approvedBy",
    })

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault()
        let keyword = inputRef.current?.value.toLowerCase() || ''
        if (!keyword || keyword === '') {
            setTableData(allTableData)
        }
        else {
            const result = tableData.filter(el => el.firstname.toLowerCase().includes(keyword) || el.middlename?.toLowerCase().includes(keyword) || el.lastname.toLowerCase().includes(keyword) || el.memberId.toString().toLowerCase().includes(keyword) || el.createdAt?.toString().toLowerCase().includes(keyword) || el.approvedBy.toLowerCase().includes(keyword) || el.memberId.toString().toLowerCase().includes(keyword))
            console.log({result})
            setTableData(prev => [...result])
        }
    }

    return (
        <>
            <section className="relative flex flex-col gap-2 p-4 bg-white dark:bg-[#dbf0f724] dark:shadow-black shadow-slate-200 shadow-md rounded-lg">
                <div className="w-full overflow-x-scroll pb-6 x-scrollbar">
                    <table className="w-full text-slate-600 dark:text-slate-50 text-xs sm:text-sm min-w-[20rem]">
                        <thead>
                            <tr>
                                <th colSpan={4}>
                                    <TableSearch title='RECENT TRANSACTIONS' key={'72088234'} handleSearch={handleSearch} inputRef={inputRef}>
                                    </TableSearch>
                                </th>
                            </tr>
                            <tr className='text-slate-500 dark:text-slate-50'>
                                <th className='uppercase font-medium text-xs text-left'>Member/Transaction Details</th>
                                <th className='font-medium text-xs text-center'>Transaction Amount</th>
                                <th className='font-medium text-xs text-center'>Transaction Date</th>
                                <th className='font-medium text-xs text-center'>Balance at Date</th>
                            </tr>
                        </thead>
                        <tbody className='w-full text-slate-700 dark:text-slate-50'>
                            {
                                tableData.map(transaction => (
                                    <tr key={transaction.id} onClick={() => modalRef.current?.showModal()} className='hover:bg-slate-50 dark:hover:bg-slate-900/30'>
                                        <td>
                                            <div className="max-w-sm w-max flex items-center gap-2 cursor-pointer">
                                                <div className="h-7 sm:h-8 w-7 sm:w-8 flex justify-center items-center rounded-full overflow-hidden relative bg-primary dark:bg-slate-600/50">
                                                    <Image src={transaction?.image || edimcs_bookkeeping} alt={`${transaction?.firstname} ${transaction?.middlename} ${transaction?.lastname}`} fill={true} className="absolute left-0 top-0 object-cover w-full h-full" />
                                                </div>
                                                <div>
                                                    <h5 className="text-sm font-medium leading-tight whitespace-nowrap">{transaction?.firstname} {transaction?.middlename} {transaction?.lastname}</h5>
                                                    <p className="text-xs font-medium opacity-70 text-slate-600 dark:text-slate-50 dark:opacity-100 leading-tight">{transaction.type}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="align-middle">
                                            <div className="flex justify-center items-center align-middle mx-auto">
                                                <div className={`${transaction.type === 'Savings' ? 'bg-teal-100 text-teal-500' : transaction.type === 'Withdrawal' ? 'bg-red-100 text-red-500' : 'bg-sky-100 text-sky-500'} text-xs py-[.1rem] sm:py-1 px-3 rounded-sm font-medium`}>{transaction.type === 'Withdrawal' ? '-' : ''}&#8358;{transaction.amount.toLocaleString()}</div>
                                            </div>
                                        </td>
                                        <td className="align-middle">
                                            <div className="flex justify-center items-center gap-[.2rem] align-middle text-xs py-[.1rem] sm:py-1">
                                                <FaClock className="text-inherit mt-[.1rem]" /> <p className="">{transaction.createdAt}</p>
                                            </div>
                                        </td>
                                        <td className="align-middle">
                                            <h4 className="flex justify-center items-center gap-[.2rem] align-middle text-xs py-[.1rem] sm:py-1">&#8358;{transaction.balance.toLocaleString()}</h4>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </section>
            <Modal modalRef={modalRef}>
                <div className="flex flex-col gap-6">
                    <div className="flex flex-col gap-4 p-4 pb-2 items-center">
                        <h4 className="text-lg sm:text-2xl text-slate-700 text-center mb-2 font-bold opacity-80 relative after:bg-slate-300 after:-bottom-2 after:h-[.51px] after:w-11/12 after:left-1/2 after:-translate-x-1/2 after:absolute">{selectedTransaction?.firstname} {selectedTransaction?.middlename} {selectedTransaction?.lastname} Details</h4>
                        <div className="flex gap-4 md:gap-6">
                            <div className="relative h-14 w-14 md:h-16 md:w-16 flex-shrink-0 rounded-full overflow-hidden cursor-pointer">
                                <Image src={selectedTransaction?.image || edimcs_bookkeeping} alt={`${selectedTransaction?.firstname} ${selectedTransaction?.middlename} ${selectedTransaction?.lastname}`} fill={true} className='object-cover' />
                            </div>
                            <div className="flex flex-col gap-1 w-max justify-center">
                                <div className="flex flex-col">
                                    
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
