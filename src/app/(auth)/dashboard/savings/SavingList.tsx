'use client'

import { SavingsProps } from '@/types'
import React, { useRef, useState } from 'react'
import { IoClose } from 'react-icons/io5'
import { FaCalendarAlt, FaClock } from 'react-icons/fa'
import Image, { StaticImageData } from 'next/image'

import { user } from '@/data/user'
import { FaSackDollar } from 'react-icons/fa6'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import { TableSearch, Modal } from '@/app/(auth)/components'
import { edimcs_piggyvest } from '@/assets/images'


export default function LoanList({ savingsData }: { savingsData: SavingsProps[] }) {
    const [allTableData, setAllTableData] = useState<SavingsProps[] | []>(savingsData)
    const [tableData, setTableData] = useState<SavingsProps[] | []>(savingsData)
    const modalRef = useRef<HTMLDialogElement | null>(null)
    const reviewRef = useRef<HTMLDialogElement | null>(null)
    const previewRef = useRef<HTMLDialogElement | null>(null)
    const formRef = useRef<HTMLFormElement | null>(null)
    const amountRef = useRef<HTMLInputElement | null>(null)
    const inputRef = useRef<HTMLInputElement | null>(null)

    const [selectedSavings, setSelectedSavings] = useState<SavingsProps>()
    const [loading, setLoading] = useState<boolean>(false)
    const router = useRouter()

    const showReview = (id: number | string) => {
        try {
            const targetSavings = savingsData?.find(savings => savings.id === id)
            if (targetSavings) {
                setSelectedSavings(prev => ({ ...targetSavings }))
            }
            reviewRef.current?.showModal()
        }
        catch (err) {
            console.log({ err })
        }
    }

    const showPreview = (id: number | string) => {
        try {
            const targetSavings = savingsData?.find(savings => savings.id === id)
            if (targetSavings) {
                setSelectedSavings(prev => ({ ...targetSavings }))
            }
            previewRef.current?.showModal()
        }
        catch (err) {
            console.log({ err })
        }
    }

    const handleReview = async (id: string | number | undefined, status: string) => {
        setLoading(true)
        try {
            // const res = await verdictAction(id, status)
            router.refresh()
            reviewRef.current?.close()
        } catch (error) {
            toast.error(`Unable to process your request. Please, check your connection and try again`)
        }
        setLoading(false)
    }

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault()
        let keyword = inputRef.current?.value.toLowerCase() || ''
        if (!keyword || keyword === '') {
            setTableData(allTableData)
        }
        else {
            const result = tableData.filter(el => el.updatedBy?.toString().toLowerCase().includes(keyword) ||  el.status.toString().toLowerCase().includes(keyword) ||  el.amount.toString().toLowerCase().includes(keyword) || el.createdAt.toString().toLowerCase().includes(keyword) ||  el.saver?.firstname.toLowerCase().includes(keyword) || el.saver?.middlename.toLowerCase().includes(keyword) || el.saver?.lastname.toLowerCase().includes(keyword) || el.saver?.memberId.toString().toLowerCase().includes(keyword) || el.saver?.email.toLowerCase().includes(keyword) || el.saver?.phone?.toString().toLowerCase().includes(keyword))
            // const freshResult = [...new Set(result.map(el => el.id))]
            setTableData(result)
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
    }

    return (
        <>
            <section className="relative flex flex-col gap-2 p-4 bg-white  dark:bg-[#dbf0f724] dark:shadow-black shadow-slate-200 shadow-md rounded-lg">
                <div className="w-full overflow-x-scroll pb-6 x-scrollbar">
                    <table className="w-full text-slate-500 dark:text-slate-400 text-xs sm:text-sm min-w-[20rem]">
                        <thead>
                            <tr>
                                <th colSpan={user.type === "Admin" ? 5 : 4}>
                                    <TableSearch title='SAVINGS' key={'72088234'} handleSearch={handleSearch} inputRef={inputRef}>
                                    <button onClick={() => modalRef.current?.showModal()} className="text-white bg-success px-4 py-2 rounded-md cursor-pointer text-xs font-light">Save Money</button>
                                    </TableSearch>
                                </th>
                            </tr>
                            <tr className='text-slate-600 dark:text-slate-50 text-xs text-center'>
                                <th className='font-light text-left'>Member Details</th>
                                <th className='font-light'>Amount Saved</th>
                                <th className='font-light'>Date</th>
                                <th className='font-light'>Status</th>
                                {user.type === "Admin" && <th className='font-light'>Action</th>}
                            </tr>
                        </thead>
                        <tbody className='w-full'>
                            {
                                tableData.map(savings => (
                                    <tr key={savings.id} className='hover:bg-slate-50 dark:hover:bg-slate-900/30'>
                                        <td>
                                            <div onClick={() => showPreview(savings.id)} className="max-w-sm w-max flex items-center gap-2 cursor-pointer">
                                                <div className="h-7 sm:h-8 w-7 sm:w-8 flex justify-center items-center rounded-full overflow-hidden text-white dark:text-success relative bg-success dark:bg-slate-100">
                                                    {user.type === "Member" ? <FaSackDollar className='text-sm sm:text-base text-inherit' /> : <Image src={savings.saver?.image || edimcs_piggyvest} alt={`${savings.saver?.firstname} ${savings.saver?.middlename} ${savings.saver?.lastname}`} fill={true} className="absolute left-0 top-0 object-cover w-full h-full" />}
                                                </div>
                                                <div className='flex flex-col'>
                                                    <h5 className="text-sm font-medium leading-tight whitespace-nowrap">{`${savings.saver?.firstname} ${savings.saver?.middlename} ${savings.saver?.lastname}`}</h5>
                                                    {/* <h4 className="text-slate-400 text-xs py-[.1rem] sm:py-1">Balance: &#8358;{savings.balance.toLocaleString()}</h4> */}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="align-middle">
                                            <div className="flex justify-center items-center align-middle mx-auto whitespace-nowrap">
                                                <div className={`${savings.status === "Suspended" ? 'bg-red-100 text-red-500' : savings.status === "Running" ? 'bg-teal-100 text-teal-500' : 'bg-slate-100 text-slate-500'} text-xs py-[.1rem] sm:py-1 px-3 rounded-sm font-medium`}>&#8358;{savings.amount.toLocaleString()}</div>
                                            </div>
                                        </td>
                                        <td className="align-middle">
                                            <div className="flex justify-center items-center gap-[.2rem] align-middle text-slate-400 text-xs py-[.1rem] sm:py-1">
                                                <FaClock className="text-inherit mt-[.1rem]" /> <p className="">{savings.createdAt}</p>
                                            </div>
                                        </td>
                                        <td className="align-middle">
                                            <div className="flex justify-center gap-2">
                                                <div className={`${savings.status === "Suspended" ? 'bg-red-100 text-red-500' : savings.status === "Running" ? 'bg-teal-100 text-teal-500' : savings.status === "Settled" ? 'bg-sky-100 text-sky-500' : 'bg-slate-100 text-slate-500'} text-xs py-[.1rem] sm:py-1 px-3 rounded-sm font-medium`}>{savings.status}</div>
                                            </div>
                                        </td>
                                        {/* <td className="align-middle">
                                            <div className="flex justify-center gap-2">
                                                <div className={`${savings.status === "Defaulted" ? 'bg-red-100 text-red-500' : savings.status === "Running" ? 'bg-sky-100 text-sky-500' : 'bg-slate-100 text-slate-500'} text-xs py-[.1rem] sm:py-1 px-3 rounded-sm font-medium`}>{savings.status}</div>
                                            </div>
                                        </td> */}
                                        {user.type === "Admin" &&
                                            <td className="align-middle">
                                                <div className="flex justify-center gap-2">
                                                    {savings.status === "Pending" && <button onClick={() => showReview(savings.id)} className="flex justify-center items-center gap-[.2rem] align-middle bg-success hover:bg-success/80 text-white dark:text-slate-900 px-3 rounded-sm cursor-pointer text-[.6rem] py-2 sm:py-1">Review</button>}
                                                    {savings.status === "Running" && <button onClick={() => showReview(savings.id)} className="flex justify-center items-center gap-[.2rem] align-middle bg-sky-500 hover:bg-sky-500/80 text-white dark:text-slate-900 px-3 rounded-sm cursor-pointer text-[.6rem] py-2 sm:py-1 whitespace-nowrap">Suspend Savings</button>}
                                                </div>
                                            </td>}
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </section>
            {
                user.type === "Admin" ? <>
                    {/* Savings Verdict Form */}
                    <Modal modalRef={reviewRef}>
                        <div className='p-5 flex flex-col gap-4'>
                            <span className="text-[.6rem] sm:text-[.75rem] text-sky-700 bg-sky-200/50 dark:bg-sky-200 p-[.2rem] px-[.3rem] rounded-xs uppercase text-center">Savings Action Form </span>
                            <div className="w-full flex items-center gap-2">
                                <div className={`h-7 sm:h-8 w-7 sm:w-8 flex-shrink-0 flex justify-center items-center rounded-full overflow-hidden relative bg-primary dark:bg-slate-100 text-slate-100 dark:text-slate-600`}>
                                    <FaSackDollar className='text-sm sm:text-base' />
                                </div>
                                <div className='flex-1 flex flex-col justify-center w-full'>
                                    <div className="flex justify-between items-center gap-4 text-slate-600">
                                        <div className="flex flex-col">
                                            {/* <span className="text-[.4rem] bg-slate-200/50 dark:bg-slate-200 p-[.2rem] px-[.3rem] rounded-xs uppercase ml-2">{selectedSavings?.verdict}</span> */}
                                            <h5 className="text-sm font-semibold leading-tight whitespace-nowrap flex items-center">{`${selectedSavings?.saver?.firstname} ${selectedSavings?.saver?.middlename} ${selectedSavings?.saver?.lastname}`} </h5>
                                            <p className="text-slate-400 text-xs py-[.1rem] sm:py-1">Account Balance: &#8358;{selectedSavings?.saver?.balance?.toLocaleString()}</p>
                                        </div>
                                        <div className="flex justify-center items-center gap-[.2rem] align-middle dark:text-slate-100 text-[.6rem]">
                                            <FaCalendarAlt className="text-inherit opacity-60" /> <p className="">{selectedSavings?.createdAt}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-between items-center border border-slate-200 border-l-0 border-r-0 py-4">
                                <h3 className="-my-2 text-slate-700 text-center text-lg font-bold"><span className="text-xs font-light flex items-center">Amount to Save:</span> &#8358;{selectedSavings?.amount.toLocaleString()}</h3>
                                {/* <h3 className="-my-2 text-slate-700 text-center text-lg font-bold"><span className="text-xs font-light flex items-center">Amount Repaid:</span> &#8358;{selectedSavings?.payback.toLocaleString()}</h3> */}
                            </div>
                            {
                                selectedSavings?.status === "Pending" ?
                                    <div className="flex gap-2 justify-end">
                                        <button onClick={() => handleReview(selectedSavings?.id, "Approve")} className="flex justify-center items-center gap-[.2rem] align-middle bg-success hover:bg-success/80 text-white px-5 rounded-sm cursor-pointer text-[.6rem] py-[.4rem]" disabled={loading}>Approve</button>
                                        <button onClick={() => handleReview(selectedSavings?.id, "Reject")} className="flex justify-center items-center gap-[.2rem] align-middle bg-danger hover:bg-danger/80 text-white px-5 rounded-sm cursor-pointer text-[.6rem] py-[.4rem]" disabled={loading}>Reject</button>
                                    </div> : ""
                            }
                        </div>
                    </Modal>
                </> : <></>
            }
            <Modal modalRef={previewRef}>
                <div className='p-5 flex flex-col gap-4'>
                    <span className="text-[.6rem] sm:text-[.75rem] text-sky-700 bg-sky-200/50 dark:bg-sky-200 p-[.2rem] px-[.3rem] rounded-xs uppercase text-center">Savings Action Form </span>
                    <div className="w-full flex items-center gap-2">
                        <div className={`h-7 sm:h-8 w-7 sm:w-8 flex-shrink-0 flex justify-center items-center rounded-full overflow-hidden relative bg-primary dark:bg-slate-100 text-slate-100 dark:text-slate-600`}>
                            <FaSackDollar className='text-sm sm:text-base' />
                        </div>
                        <div className='flex-1 flex flex-col justify-center w-full'>
                            <div className="flex justify-between items-center gap-4 text-slate-600">
                                <div className="flex flex-col">
                                    {/* <span className="text-[.4rem] bg-slate-200/50 dark:bg-slate-200 p-[.2rem] px-[.3rem] rounded-xs uppercase ml-2">{selectedSavings?.verdict}</span> */}
                                    <h5 className="text-sm font-semibold leading-tight whitespace-nowrap flex items-center">{`${selectedSavings?.saver?.firstname} ${selectedSavings?.saver?.middlename} ${selectedSavings?.saver?.lastname}`} </h5>
                                    <p className="text-slate-400 text-xs py-[.1rem] sm:py-1">Account Balance: &#8358;{selectedSavings?.saver?.balance?.toLocaleString()}</p>
                                </div>
                                <div className="flex justify-center items-center gap-[.2rem] align-middle dark:text-slate-100 text-[.6rem]">
                                    <FaCalendarAlt className="text-inherit opacity-60" /> <p className="">{selectedSavings?.createdAt}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-between items-center border border-slate-200 border-l-0 border-r-0 py-4">
                        <h3 className="-my-2 text-slate-700 text-center text-lg font-bold"><span className="text-xs font-light flex items-center">Amount Saved:</span> &#8358;{selectedSavings?.amount.toLocaleString()}</h3>
                    </div>
                </div>
            </Modal>
        </>
    )
}
