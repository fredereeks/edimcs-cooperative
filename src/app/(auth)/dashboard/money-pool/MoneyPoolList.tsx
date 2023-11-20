"use client"

import React, { useEffect, useMemo, useRef, useState } from 'react'
import { edimcs_blackpeople, edimcs_bookkeeping } from '@/assets/images'
import Image, { StaticImageData } from 'next/image'
import { FaCalendarAlt, FaClock, FaPiggyBank } from 'react-icons/fa'
import { TextInput } from '@/components'
import { LoanProps, MemberProps } from '@/types'
import Modal from '@/app/(auth)/components/Modal'
import { user } from '@/data/user'
import Link from 'next/link'
import { FaSackDollar } from 'react-icons/fa6'
import { IoClipboardOutline } from 'react-icons/io5'
import { loanData } from '@/data/loans'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'


export default function MoneyPoolList({ member }: { member: MemberProps[] | [] }) {
    const [selectedLoan, setSelectedLoan] = useState<LoanProps>()
    const modalRef = useRef<HTMLDialogElement | null>(null)
    const reviewRef = useRef<HTMLDialogElement | null>(null)
    const previewRef = useRef<HTMLDialogElement | null>(null)
    const formRef = useRef<HTMLFormElement | null>(null)
    const amountRef = useRef<HTMLInputElement | null>(null)
    const [loading, setLoading] = useState<boolean>(false)
    const router = useRouter()


    const showReview = (id: number) => {
        try {
            const targetLoan = loanData?.find(loan => loan.id === id)
            if (targetLoan) {
                setSelectedLoan(prev => ({ ...targetLoan }))
            }
            reviewRef.current?.showModal()
        }
        catch (err) {
            console.log({ err })
        }
    }

    const showPreview = (id: number) => {
        try {
            const targetLoan = loanData?.find(loan => loan.id === id)
            if (targetLoan) {
                setSelectedLoan(prev => ({ ...targetLoan }))
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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
    }

    useEffect(() => {
        (async () => {
            const { Stepper, initTE } = await require("tw-elements");

            initTE({ Stepper });
        })()
    }, [])

    return (
        <>

            <section className="relative flex-col">
                <ul data-te-stepper-init className="relative m-0 flex list-none justify-between overflow-hidden p-0 transition-[height] duration-200 ease-in-out">
                    <li data-te-stepper-step-ref data-te-stepper-step-active className="w-[4.5rem] flex-auto">
                        <div data-te-stepper-head-ref className="flex cursor-pointer items-center pl-2 leading-[1.3rem] no-underline after:ml-2 after:h-px after:w-full after:flex-1 after:bg-[#e0e0e0] after:content-[''] hover:bg-[#f9f9f9] focus:outline-none dark:after:bg-neutral-600 dark:hover:bg-[#3b3b3b]">
                            <span data-te-stepper-head-icon-ref className="my-6 mr-2 flex h-[1.938rem] w-[1.938rem] items-center justify-center rounded-full bg-[#ebedef] text-sm font-medium text-[#40464f]">
                                <FaPiggyBank className='text-inherit ' />
                            </span>
                            <span data-te-stepper-head-text-ref className="font-medium text-neutral-500 text-xs after:flex after:text-xs after:content-[data-content] dark:text-neutral-300">
                                Basic Plan
                            </span>
                        </div>
                        <div data-te-stepper-content-ref className="absolute w-full p-4 transition-all duration-500 ease-in-out">
                            <section className="relative flex flex-col gap-2 p-4 bg-white  dark:bg-[#dbf0f724] dark:shadow-black shadow-slate-200 shadow-md rounded-lg">
                                <div className="w-full overflow-x-scroll pb-6 x-scrollbar">
                                    <table className="w-full text-slate-500 dark:text-slate-400 text-xs sm:text-sm min-w-[20rem]">
                                        <thead>
                                            <tr>
                                                <th colSpan={user.type === "Admin" ? 6 : 5}>
                                                    <div className='w-full flex justify-between items-center pb-2 mb-2 border-b border-b-slate-200'>
                                                        <h4 className="uppercase font-semibold text-slate-400 text-left">BASIC PLAN TRANSACTIONS</h4>
                                                        <button onClick={() => modalRef.current?.showModal()} className="text-white bg-primary px-4 py-2 rounded-md cursor-pointer text-xs font-light">Invest in Basic Plan</button>
                                                    </div>
                                                </th>
                                            </tr>
                                            <tr className='text-slate-600 dark:text-slate-50 text-xs text-center'>
                                                <th className='font-light text-left'>Member Details</th>
                                                <th className='font-light'>Loan Amount</th>
                                                <th className='font-light'>Loan Date</th>
                                                <th className='font-light'>Verdict</th>
                                                <th className='font-light'>Status</th>
                                                {user.type === "Admin" && <th className='font-light'>Action</th>}
                                            </tr>
                                        </thead>
                                        <tbody className='w-full'>
                                            {
                                                loanData.map(loan => (
                                                    <tr key={loan.id} className='hover:bg-slate-50 dark:hover:bg-slate-900/30'>
                                                        <td>
                                                            <div onClick={() => showPreview(loan.id)} className="max-w-sm w-max flex items-center gap-2 cursor-pointer">
                                                                <div className="h-7 sm:h-8 w-7 sm:w-8 flex justify-center items-center rounded-full overflow-hidden text-white dark:text-primary relative bg-primary dark:bg-slate-100">
                                                                    {user.type === "Member" ? <FaSackDollar className='text-sm sm:text-base text-inherit' /> : <Image src={loan.image} alt={loan.name} fill={true} className="absolute left-0 top-0 object-cover w-full h-full" />}
                                                                </div>
                                                                <div className='flex flex-col'>
                                                                    <h5 className="text-sm font-medium leading-tight whitespace-nowrap">{loan.name}</h5>
                                                                    <h4 className="text-slate-400 text-xs py-[.1rem] sm:py-1">Balance: &#8358;{loan.balance.toLocaleString()}</h4>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td className="align-middle">
                                                            <div className="flex justify-center items-center align-middle mx-auto whitespace-nowrap">
                                                                <div className={`${loan.verdict === "Rejected" ? 'bg-red-100 text-red-500' : loan.verdict === "Granted" ? 'bg-sky-100 text-sky-500' : 'bg-slate-100 text-slate-500'} text-xs py-[.1rem] sm:py-1 px-3 rounded-sm font-medium`}>&#8358;{loan.amount.toLocaleString()}</div>
                                                            </div>
                                                        </td>
                                                        <td className="align-middle">
                                                            <div className="flex justify-center items-center gap-[.2rem] align-middle text-slate-400 text-xs py-[.1rem] sm:py-1">
                                                                <FaClock className="text-inherit mt-[.1rem]" /> <p className="">{loan.createdAt}</p>
                                                            </div>
                                                        </td>
                                                        <td className="align-middle">
                                                            <div className="flex justify-center gap-2">
                                                                <div className={`${loan.verdict === "Rejected" ? 'bg-red-100 text-red-500' : loan.verdict === "Granted" ? 'bg-teal-100 text-teal-500' : 'bg-slate-100 text-slate-500'} text-xs py-[.1rem] sm:py-1 px-3 rounded-sm font-medium`}>{loan.verdict}</div>
                                                            </div>
                                                        </td>
                                                        <td className="align-middle">
                                                            <div className="flex justify-center gap-2">
                                                                <div className={`${loan.status === "Defaulted" ? 'bg-red-100 text-red-500' : loan.status === "Running" ? 'bg-sky-100 text-sky-500' : 'bg-slate-100 text-slate-500'} text-xs py-[.1rem] sm:py-1 px-3 rounded-sm font-medium`}>{loan.status}</div>
                                                            </div>
                                                        </td>
                                                        {user.type === "Admin" &&
                                                            <td className="align-middle">
                                                                <div className="flex justify-center gap-2">
                                                                    {loan.verdict === "Pending" && <button onClick={() => showReview(loan.id)} className="flex justify-center items-center gap-[.2rem] align-middle bg-success hover:bg-success/80 text-white dark:text-slate-900 px-3 rounded-sm cursor-pointer text-[.6rem] py-2 sm:py-1">Review</button>}
                                                                    {loan.verdict === "Granted" && (loan.amount - loan.payback) !== 0 && <button onClick={() => showReview(loan.id)} className="flex justify-center items-center gap-[.2rem] align-middle bg-sky-500 hover:bg-sky-500/80 text-white dark:text-slate-900 px-3 rounded-sm cursor-pointer text-[.6rem] py-2 sm:py-1">Add Payback</button>}

                                                                </div>
                                                            </td>}
                                                    </tr>
                                                ))
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </section>
                        </div>
                    </li>

                    <li data-te-stepper-step-ref className="w-[4.5rem] flex-auto">
                        <div data-te-stepper-head-ref className="flex cursor-pointer items-center leading-[1.3rem] no-underline before:mr-2 before:h-px before:w-full before:flex-1 before:bg-[#e0e0e0] before:content-[''] after:ml-2 after:h-px after:w-full after:flex-1 after:bg-[#e0e0e0] after:content-[''] hover:bg-[#f9f9f9] focus:outline-none dark:before:bg-neutral-600 dark:after:bg-neutral-600 dark:hover:bg-[#3b3b3b]">
                            <span data-te-stepper-head-icon-ref className="my-6 mr-2 flex h-[1.938rem] w-[1.938rem] items-center justify-center rounded-full bg-[#ebedef] text-sm font-medium text-[#40464f]">
                                <FaSackDollar className='text-inherit ' />
                            </span>
                            <span data-te-stepper-head-text-ref className="text-neutral-500 text-xs after:flex after:text-xs after:content-[data-content] dark:text-neutral-300">
                                Premium Plan
                            </span>
                        </div>
                        <div data-te-stepper-content-ref className="absolute left-0 w-full translate-x-[150%] p-4 transition-all duration-500 ease-in-out">
                            <section className="relative flex flex-col gap-2 p-4 bg-white  dark:bg-[#dbf0f724] dark:shadow-black shadow-slate-200 shadow-md rounded-lg">
                                <div className="w-full overflow-x-scroll pb-6 x-scrollbar">
                                    <table className="w-full text-slate-500 dark:text-slate-400 text-xs sm:text-sm min-w-[20rem]">
                                        <thead>
                                            <tr>
                                                <th colSpan={user.type === "Admin" ? 6 : 5}>
                                                    <div className='w-full flex justify-between items-center pb-2 mb-2 border-b border-b-slate-200'>
                                                        <h4 className="uppercase font-semibold text-slate-400 text-left">Premium Plan TRANSACTIONS</h4>
                                                        <button className="text-white bg-success px-4 py-2 rounded-md cursor-pointer text-xs font-light">Invest in Premium Plan</button>
                                                    </div>
                                                </th>
                                            </tr>
                                            <tr className='text-slate-600 dark:text-slate-50 text-xs text-center'>
                                                <th className='font-light text-left'>Member Details</th>
                                                <th className='font-light'>Amount</th>
                                                <th className='font-light'>Date</th>
                                                <th className='font-light'>Verdict</th>
                                                <th className='font-light'>Status</th>
                                                {user.type === "Admin" && <th className='font-light'>Action</th>}
                                            </tr>
                                        </thead>
                                        <tbody className='w-full'>
                                            {
                                                loanData.map(loan => (
                                                    <tr key={loan.id} className='hover:bg-slate-50 dark:hover:bg-slate-900/30'>
                                                        <td>
                                                            <div onClick={() => showPreview(loan.id)} className="max-w-sm w-max flex items-center gap-2 cursor-pointer">
                                                                <div className="h-7 sm:h-8 w-7 sm:w-8 flex justify-center items-center rounded-full overflow-hidden text-white dark:text-primary relative bg-primary dark:bg-slate-100">
                                                                    {user.type === "Member" ? <FaSackDollar className='text-sm sm:text-base text-inherit' /> : <Image src={loan.image} alt={loan.name} fill={true} className="absolute left-0 top-0 object-cover w-full h-full" />}
                                                                </div>
                                                                <div className='flex flex-col'>
                                                                    <h5 className="text-sm font-medium leading-tight whitespace-nowrap">{loan.name}</h5>
                                                                    <h4 className="text-slate-400 text-xs py-[.1rem] sm:py-1">Balance: &#8358;{loan.balance.toLocaleString()}</h4>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td className="align-middle">
                                                            <div className="flex justify-center items-center align-middle mx-auto whitespace-nowrap">
                                                                <div className={`${loan.verdict === "Rejected" ? 'bg-red-100 text-red-500' : loan.verdict === "Granted" ? 'bg-sky-100 text-sky-500' : 'bg-slate-100 text-slate-500'} text-xs py-[.1rem] sm:py-1 px-3 rounded-sm font-medium`}>&#8358;{loan.amount.toLocaleString()}</div>
                                                            </div>
                                                        </td>
                                                        <td className="align-middle">
                                                            <div className="flex justify-center items-center gap-[.2rem] align-middle text-slate-400 text-xs py-[.1rem] sm:py-1">
                                                                <FaClock className="text-inherit mt-[.1rem]" /> <p className="">{loan.createdAt}</p>
                                                            </div>
                                                        </td>
                                                        <td className="align-middle">
                                                            <div className="flex justify-center gap-2">
                                                                <div className={`${loan.verdict === "Rejected" ? 'bg-red-100 text-red-500' : loan.verdict === "Granted" ? 'bg-teal-100 text-teal-500' : 'bg-slate-100 text-slate-500'} text-xs py-[.1rem] sm:py-1 px-3 rounded-sm font-medium`}>{loan.verdict}</div>
                                                            </div>
                                                        </td>
                                                        <td className="align-middle">
                                                            <div className="flex justify-center gap-2">
                                                                <div className={`${loan.status === "Defaulted" ? 'bg-red-100 text-red-500' : loan.status === "Running" ? 'bg-sky-100 text-sky-500' : 'bg-slate-100 text-slate-500'} text-xs py-[.1rem] sm:py-1 px-3 rounded-sm font-medium`}>{loan.status}</div>
                                                            </div>
                                                        </td>
                                                        {user.type === "Admin" &&
                                                            <td className="align-middle">
                                                                <div className="flex justify-center gap-2">
                                                                    {loan.verdict === "Pending" && <button onClick={() => showReview(loan.id)} className="flex justify-center items-center gap-[.2rem] align-middle bg-success hover:bg-success/80 text-white dark:text-slate-900 px-3 rounded-sm cursor-pointer text-[.6rem] py-2 sm:py-1">Review</button>}
                                                                    {loan.verdict === "Granted" && (loan.amount - loan.payback) !== 0 && <button onClick={() => showReview(loan.id)} className="flex justify-center items-center gap-[.2rem] align-middle bg-sky-500 hover:bg-sky-500/80 text-white dark:text-slate-900 px-3 rounded-sm cursor-pointer text-[.6rem] py-2 sm:py-1">Add Payback</button>}
                                                                </div>
                                                            </td>}
                                                    </tr>
                                                ))
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </section>
                        </div>
                    </li>

                    <li data-te-stepper-step-ref className="w-[4.5rem] flex-auto">
                        <div data-te-stepper-head-ref className="flex cursor-pointer items-center pr-2 leading-[1.3rem] no-underline before:mr-2 before:h-px before:w-full before:flex-1 before:bg-[#e0e0e0] before:content-[''] hover:bg-[#f9f9f9] focus:outline-none dark:before:bg-neutral-600 dark:after:bg-neutral-600 dark:hover:bg-[#3b3b3b]">
                            <span data-te-stepper-head-icon-ref className="my-6 mr-2 flex h-[1.938rem] w-[1.938rem] items-center justify-center rounded-full bg-[#ebedef] text-sm font-medium text-[#40464f]">
                                <IoClipboardOutline className='text-inherit ' />
                            </span>
                            <span data-te-stepper-head-text-ref className="text-neutral-500 text-xs after:flex after:text-xs after:content-[data-content] dark:text-neutral-300">Platinum Plan
                            </span>
                        </div>
                        <div data-te-stepper-content-ref className="absolute left-0 w-full translate-x-[150%] p-4 transition-all duration-500 ease-in-out">
                            <section className="relative flex flex-col gap-2 p-4 bg-white  dark:bg-[#dbf0f724] dark:shadow-black shadow-slate-200 shadow-md rounded-lg">
                                <div className="w-full overflow-x-scroll pb-6 x-scrollbar">
                                    <table className="w-full text-slate-500 dark:text-slate-400 text-xs sm:text-sm min-w-[20rem]">
                                        <thead>
                                            <tr>
                                                <th colSpan={user.type === "Admin" ? 6 : 5}>
                                                    <div className='w-full flex justify-between items-center pb-2 mb-2 border-b border-b-slate-200'>
                                                        <h4 className="uppercase font-semibold text-slate-400 text-left">Platinum Plan TRANSACTIONS</h4>
                                                        <button className="text-white bg-danger px-4 py-2 rounded-md cursor-pointer text-xs font-light">Invest in Platinum Plan</button>
                                                    </div>
                                                </th>
                                            </tr>
                                            <tr className='text-slate-600 dark:text-slate-50 text-xs text-center'>
                                                <th className='font-light text-left'>Member Details</th>
                                                <th className='font-light'>Amount</th>
                                                <th className='font-light'>Date</th>
                                                <th className='font-light'>Verdict</th>
                                                <th className='font-light'>Status</th>
                                                {user.type === "Admin" && <th className='font-light'>Action</th>}
                                            </tr>
                                        </thead>
                                        <tbody className='w-full'>
                                            {
                                                loanData.map(loan => (
                                                    <tr key={loan.id} className='hover:bg-slate-50 dark:hover:bg-slate-900/30'>
                                                        <td>
                                                            <div onClick={() => showPreview(loan.id)} className="max-w-sm w-max flex items-center gap-2 cursor-pointer">
                                                                <div className="h-7 sm:h-8 w-7 sm:w-8 flex justify-center items-center rounded-full overflow-hidden text-white dark:text-primary relative bg-primary dark:bg-slate-100">
                                                                    {user.type === "Member" ? <FaSackDollar className='text-sm sm:text-base text-inherit' /> : <Image src={loan.image} alt={loan.name} fill={true} className="absolute left-0 top-0 object-cover w-full h-full" />}
                                                                </div>
                                                                <div className='flex flex-col'>
                                                                    <h5 className="text-sm font-medium leading-tight whitespace-nowrap">{loan.name}</h5>
                                                                    <h4 className="text-slate-400 text-xs py-[.1rem] sm:py-1">Balance: &#8358;{loan.balance.toLocaleString()}</h4>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td className="align-middle">
                                                            <div className="flex justify-center items-center align-middle mx-auto whitespace-nowrap">
                                                                <div className={`${loan.verdict === "Rejected" ? 'bg-red-100 text-red-500' : loan.verdict === "Granted" ? 'bg-sky-100 text-sky-500' : 'bg-slate-100 text-slate-500'} text-xs py-[.1rem] sm:py-1 px-3 rounded-sm font-medium`}>&#8358;{loan.amount.toLocaleString()}</div>
                                                            </div>
                                                        </td>
                                                        <td className="align-middle">
                                                            <div className="flex justify-center items-center gap-[.2rem] align-middle text-slate-400 text-xs py-[.1rem] sm:py-1">
                                                                <FaClock className="text-inherit mt-[.1rem]" /> <p className="">{loan.createdAt}</p>
                                                            </div>
                                                        </td>
                                                        <td className="align-middle">
                                                            <div className="flex justify-center gap-2">
                                                                <div className={`${loan.verdict === "Rejected" ? 'bg-red-100 text-red-500' : loan.verdict === "Granted" ? 'bg-teal-100 text-teal-500' : 'bg-slate-100 text-slate-500'} text-xs py-[.1rem] sm:py-1 px-3 rounded-sm font-medium`}>{loan.verdict}</div>
                                                            </div>
                                                        </td>
                                                        <td className="align-middle">
                                                            <div className="flex justify-center gap-2">
                                                                <div className={`${loan.status === "Defaulted" ? 'bg-red-100 text-red-500' : loan.status === "Running" ? 'bg-sky-100 text-sky-500' : 'bg-slate-100 text-slate-500'} text-xs py-[.1rem] sm:py-1 px-3 rounded-sm font-medium`}>{loan.status}</div>
                                                            </div>
                                                        </td>
                                                        {user.type === "Admin" &&
                                                            <td className="align-middle">
                                                                <div className="flex justify-center gap-2">
                                                                    {loan.verdict === "Pending" && <button onClick={() => showReview(loan.id)} className="flex justify-center items-center gap-[.2rem] align-middle bg-success hover:bg-success/80 text-white dark:text-slate-900 px-3 rounded-sm cursor-pointer text-[.6rem] py-2 sm:py-1">Review</button>}
                                                                    {loan.verdict === "Granted" && (loan.amount - loan.payback) !== 0 && <button onClick={() => showReview(loan.id)} className="flex justify-center items-center gap-[.2rem] align-middle bg-sky-500 hover:bg-sky-500/80 text-white dark:text-slate-900 px-3 rounded-sm cursor-pointer text-[.6rem] py-2 sm:py-1">Add Payback</button>}
                                                                </div>
                                                            </td>}
                                                    </tr>
                                                ))
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </section>
                            {/* </div> */}
                        </div>
                    </li>
                </ul>
            </section >
        </>
    )
}

