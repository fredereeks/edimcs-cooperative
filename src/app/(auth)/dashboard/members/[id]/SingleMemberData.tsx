"use client"

import React, { useEffect, useMemo, useRef, useState } from 'react'
import { edimcs_bookkeeping, edimcs_dollarbills } from '@/assets/images'
import Image from 'next/image'
import { FaCalendarAlt, FaClock, FaPiggyBank } from 'react-icons/fa'
import { TextInput } from '@/components'
import { LoanProps, MemberProps } from '@/types'
import Modal from '@/app/(auth)/ui/Modal'
import { user } from '@/data'
// import Link from 'next/link'
import { FaSackDollar } from 'react-icons/fa6'
import { IoClipboardOutline } from 'react-icons/io5'
import { loansData } from '@/data/loans'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { TableSearch } from '@/app/(auth)/ui'


export default function SingleMemberData({ member }: { member: MemberProps | undefined }) {
    const [selectedLoan, setSelectedLoan] = useState<LoanProps>()
    const modalRef = useRef<HTMLDialogElement | null>(null)
    const reviewRef = useRef<HTMLDialogElement | null>(null)
    const previewRef = useRef<HTMLDialogElement | null>(null)
    const formRef = useRef<HTMLFormElement | null>(null)
    const [interest, setInterest] = useState<number>(1)
    const [payback, setPayback] = useState<number>(500)
    const amountRef = useRef<HTMLInputElement | null>(null)
    const inputRef = useRef<HTMLInputElement | null>(null)
    const [loading, setLoading] = useState<boolean>(false)
    const router = useRouter()

    const inputs: { [key: string]: string | number | undefined } = useMemo(() => ({
        "memberId": member?.memberId,
        "firstname": member?.firstname,
        "middlename": member?.middlename,
        "lastname": member?.lastname,
        "email": member?.email,
        "phone": member?.phone,
        "address": member?.address,
    }), [member?.memberId, member?.firstname, member?.middlename, member?.lastname, member?.email, member?.phone, member?.address,])


    useEffect(() => {
        (async () => {
            const { Stepper, initTE } = await require("tw-elements");

            initTE({ Stepper });
        })()
    }, [])



    const showReview = (id: string) => {
        try {
            const targetLoan = loansData?.find(loan => loan.id === id)
            if (targetLoan) {
                setSelectedLoan(prev => ({ ...targetLoan }))
            }
            reviewRef.current?.showModal()
        }
        catch (err) {
            console.log({ err })
        }
    }

    const showPreview = (id: string) => {
        try {
            const targetLoan = loansData?.find(loan => loan.id === id)
            if (targetLoan) {
                setSelectedLoan(prev => ({ ...targetLoan }))
            }
            previewRef.current?.showModal()
        }
        catch (err) {
            console.log({ err })
        }
    }

    const handleReview = async (id: string, status: string) => {
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

    // const handleSearch = (e: React.FormEvent) => {
    //     e.preventDefault()
    //     let keyword = inputRef.current?.value.toLowerCase() || ''
    //     if (!keyword || keyword === '') {
    //         setTableData(allTableData)
    //     }
    //     else {

    //         const result = tableData.filter(el => el.amount.toString().toLowerCase().includes(keyword) || el?.loaner?.balance?.toString().toLowerCase().includes(keyword) || el.createdAt.toString().toLowerCase().includes(keyword) || el?.loaner?.firstname.toLowerCase().includes(keyword) || el?.loaner?.middlename.toLowerCase().includes(keyword) || el?.loaner?.lastname.toLowerCase().includes(keyword) || el?.loaner?.memberId.toString().toLowerCase().includes(keyword) || el?.loaner?.email.toLowerCase().includes(keyword) || el?.loaner?.phone?.toString().toLowerCase().includes(keyword) || el.status.toString().toLowerCase().includes(keyword) || el.verdict.toString().toLowerCase().includes(keyword))
    //         setTableData(prev => [...result])
    //     }
    // }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const myKey: string = e.currentTarget.name;
        const value: string | number = e.currentTarget.value;
        const getKeyValue = <T extends object, U extends keyof T>(key: U) => (obj: T) => obj[key]
        inputs[myKey as keyof MemberProps] = value
        // console.log({ myKey, value, inputs })
    }


    const ShowComputedValues = () => {
        return (
            <>
                {selectedLoan?.status === "Pending" ? <div className="flex justify-between items-center gap-2 py-1">
                    <span className="text-xs font-light flex items-center justify-start flex-1">Add Interest (%):</span>
                    <div className="flex overflow-x-hidden relative w-[3rem] max-w-[3rem] border border-gray-300 rounded-md px-2 py-0">
                        <input value={interest} onChange={e => setInterest(Number(e.target.value))} type="number" required min={0} max={10} name='interest' placeholder={`Enter an Interest Rate NOT greater than 10`} className="relative outline-none py-2 pl-2 pr-4  text-gray-600 text-xs placeholder-opacity-70 font-normal flex w-[6rem] bg-transparent focus-within:bg-transparent focus:bg-transparent" />
                    </div>
                </div> : selectedLoan?.status === "Running" ? <form ref={formRef} action={'dialog'} onSubmit={handleSubmit} className="relative flex flex-col"> <div className="flex justify-between items-center gap-2 py-1">
                    <span className="text-xs font-light flex items-center justify-start flex-1">Add Loan Payback Amount:</span>
                    <div className="flex gap-1">
                        <div className="flex overflow-x-hidden relative w-[5rem] max-w-[5rem] border border-gray-300 rounded-md px-2 py-0">
                            <input value={payback} onChange={e => setPayback(Number(e.target.value))} type="number" required min={500} max={selectedLoan?.amount + (selectedLoan?.payback || 0)} name='interest' placeholder={`Enter an Interest Rate NOT greater than 10`} className="relative outline-none py-2 pl-2 pr-4  text-gray-600 text-xs placeholder-opacity-70 font-normal flex w-[7rem] bg-transparent focus-within:bg-transparent focus:bg-transparent" />
                        </div>
                        <button type="submit" className="py-2 px-3 sm:px-8 bg-primary text-white text-[.6rem] text-xs rounded-md hover:bg-primary/90 cursor-pointer" disabled={loading}>Record Payment</button>
                    </div>
                </div> </form> : ""}
                <div className="flex justify-between items-center gap-2 py-1">
                    <span className="text-xs font-light flex items-center justify-start">Amount Requested:</span>
                    <h3 className="text-right text-sm font-semibold">&#8358;{selectedLoan?.amount.toLocaleString()}.00</h3>
                </div>
                <div className="flex justify-between items-center gap-2 py-1">
                    <span className="text-xs font-light flex items-center justify-start">Interest:</span>
                    {selectedLoan?.status === "Pending" ? <h3 className="text-right text-sm font-medium">&#8358;{(Number(selectedLoan?.amount || 1) * (interest / 100)).toLocaleString()}</h3> : selectedLoan?.status === "Running" ? <h3 className="text-right text-sm font-medium">&#8358;{(Number(selectedLoan?.interest)).toLocaleString()}</h3> : ""}
                </div>
                <div className="flex justify-between items-center gap-2 py-1">
                    <span className="text-xs font-light flex items-center justify-start">Total Expected Payment:</span>
                    {selectedLoan?.status === "Pending" ? <h3 className="text-right text-lg font-semibold">&#8358;{(Number(selectedLoan?.amount || 1) + (Number(selectedLoan?.amount || 1) * (interest / 100))).toLocaleString()}</h3> : selectedLoan?.status === "Running" ? <h3 className="text-right text-lg font-semibold">&#8358;{(Number(selectedLoan?.amount || 1) + (Number(selectedLoan?.interest))).toLocaleString()}</h3> : ""}
                </div>
                <div className="flex justify-between items-center gap-2 py-1">
                    <span className="text-xs font-light flex items-center justify-start">Amount Repaid:</span>
                    <h3 className="text-right text-sm font-semibold">&#8358;{selectedLoan?.payback?.toLocaleString() || 0}</h3>
                </div>
            </>

        )
    }

    return (
        <>
            <section className="relative">
                <div className="flex flex-col gap-6">
                    <div className="flex flex-col gap-4 p-4 pb-2 items-center">
                        <h4 className="text-lg sm:text-2xl text-slate-700 text-center mb-2 font-bold opacity-80 relative after:bg-slate-300 after:-bottom-2 after:h-[.51px] after:w-11/12 after:left-1/2 after:-translate-x-1/2 after:absolute">{member?.firstname} {member?.middlename} {member?.lastname} Details</h4>
                        <div className="flex gap-4 md:gap-6">
                            <div className="relative h-14 w-14 md:h-16 md:w-16 flex-shrink-0 rounded-full overflow-hidden cursor-pointer">
                                <Image src={member?.image || edimcs_bookkeeping} alt={`${member?.firstname} ${member?.middlename} ${member?.lastname}`} fill={true} className='object-cover' />
                            </div>
                            <div className="flex flex-col gap-1 w-max justify-center">
                                <div className="flex flex-col">
                                    <h3 className="text-sm text-primary">{member?.firstname} {member?.middlename} {member?.lastname}</h3>
                                    <p className="text-[.6rem] text-slate-500">{member?.accountDetails && member?.accountDetails[0]?.banker}</p>
                                    <p className="text-xs text-slate-500 font-semibold">{member?.accountDetails && member?.accountDetails[0].accountNo}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <form action="dialog" className="px-4 sm:px-0 w-full scale-90 -translate-x-1/2 -translate-y-4 left-1/2 grid sm:grid-cols-2 gap-4 sm:gap-y-6 sm:justify-center relative after:bg-slate-300 after:-top-4 after:h-[.51px] after:w-11/12 after:left-1/2 after:-translate-x-1/2 after:absolute">
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
                    </form>
                </div>
            </section>
            <section className="relative flex-col">
                <ul data-te-stepper-init className="relative m-0 flex list-none justify-between overflow-hidden p-0 transition-[height] duration-200 ease-in-out">
                    <li data-te-stepper-step-ref data-te-stepper-step-active className="w-[4.5rem] flex-auto">
                        <div data-te-stepper-head-ref className="flex cursor-pointer items-center pl-2 leading-[1.3rem] no-underline after:ml-2 after:h-px after:w-full after:flex-1 after:bg-[#e0e0e0] after:content-[''] hover:bg-[#f9f9f9] focus:outline-none dark:after:bg-neutral-600 dark:hover:bg-[#3b3b3b]">
                            <span data-te-stepper-head-icon-ref className="my-6 mr-2 flex h-[1.938rem] w-[1.938rem] items-center justify-center rounded-full bg-[#ebedef] text-sm font-medium text-[#40464f]">
                                <FaPiggyBank className='text-inherit ' />
                            </span>
                            <span data-te-stepper-head-text-ref className="font-medium text-xs text-neutral-500 after:flex after:text-xs after:content-[data-content] dark:text-neutral-300">
                                Loans
                            </span>
                        </div>
                        <div data-te-stepper-content-ref className="absolute w-full p-4 transition-all duration-500 ease-in-out">
                            <section className="relative flex flex-col gap-2 p-4 bg-white  dark:bg-[#dbf0f724] dark:shadow-black shadow-slate-200 shadow-md rounded-lg">
                                <div className="w-full overflow-x-scroll pb-6 x-scrollbar">
                                    <table className="w-full text-slate-500 dark:text-slate-400 text-xs sm:text-sm min-w-[20rem]">
                                        <thead>
                                            <tr>
                                                <th colSpan={user.type === "Admin" ? 6 : 5}>
                                                    {/* <TableSearch title='LOAN' key={'72088234'} handleSearch={handleSearch} inputRef={inputRef}>
                                                        <div className="md:ml-[5rem] flex gap-2">
                                                            <button onClick={() => modalRef.current?.showModal()} className="text-white bg-primary px-4 py-2 rounded-md cursor-pointer text-xs font-light">Apply for Loan</button>
                                                            <Link href={`/public/documents/EDIMCS-LOAN-APPLICATION-FORM.pdf`} className="text-white bg-success hover:bg-success/90 px-4 py-2 rounded-md cursor-pointer text-xs font-light">Download Loan Form</Link>
                                                        </div>
                                                    </TableSearch> */}
                                                    LOAN LIST
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
                                                loansData.map(loan => (
                                                    <tr key={loan.id} className='hover:bg-slate-50 dark:hover:bg-slate-900/30'>
                                                        <td>
                                                            <div onClick={() => showPreview(loan.id.toString())} className="max-w-sm w-max flex items-center gap-2 cursor-pointer">
                                                                <div className="h-7 sm:h-8 w-7 sm:w-8 flex justify-center items-center rounded-full overflow-hidden text-white dark:text-primary relative bg-primary dark:bg-slate-100">
                                                                    {user.type === "Member" ? <FaSackDollar className='text-sm sm:text-base text-inherit' /> : <Image src={loan?.loaner?.image || edimcs_dollarbills} alt={`${loan?.loaner?.firstname} ${loan?.loaner?.middlename} ${loan?.loaner?.lastname}`} fill={true} className="absolute left-0 top-0 object-cover w-full h-full" />}
                                                                </div>
                                                                <div className='flex flex-col'>
                                                                    <h5 className="text-sm font-medium leading-tight whitespace-nowrap">{loan.loaner?.firstname} {loan.loaner?.middlename} {loan.loaner?.lastname}</h5>
                                                                    <h4 className="text-slate-400 text-xs py-[.1rem] sm:py-1">Balance: &#8358;{loan.loaner?.balance?.toLocaleString()}</h4>
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
                                                                <div className={`${loan.status === "Rejected" ? 'bg-red-100 text-red-500' : loan.status === "Running" ? 'bg-sky-100 text-sky-500' : 'bg-slate-100 text-slate-500'} text-xs py-[.1rem] sm:py-1 px-3 rounded-sm font-medium`}>{loan.status}</div>
                                                            </div>
                                                        </td>
                                                        {user.type === "Admin" &&
                                                            <td className="align-middle">
                                                                <div className="flex justify-center gap-2">
                                                                    {loan.verdict === "Pending" && <button onClick={() => showReview(loan.id)} className="flex justify-center items-center gap-[.2rem] align-middle bg-success hover:bg-success/80 text-white dark:text-slate-900 px-3 rounded-sm cursor-pointer text-[.6rem] py-2 sm:py-1">Review</button>}
                                                                    {loan.verdict === "Granted" && (loan.amount - (loan?.payback || 0)) !== 0 && <button onClick={() => showReview(loan.id)} className="flex justify-center items-center gap-[.2rem] align-middle bg-sky-500 hover:bg-sky-500/80 text-white dark:text-slate-900 px-3 rounded-sm cursor-pointer text-[.6rem] py-2 sm:py-1 whitespace-nowrap">Add Payback</button>}

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
                                Savings
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
                                                        <h4 className="uppercase font-semibold text-slate-400 text-left">SAVINGS TRANSACTIONS</h4>
                                                        <button className="text-white bg-success px-4 py-2 rounded-md cursor-pointer text-xs font-light btn-primary">Save Money</button>
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
                                                loansData.map(loan => (
                                                    <tr key={loan.id} className='hover:bg-slate-50 dark:hover:bg-slate-900/30'>
                                                        <td>
                                                            <div onClick={() => showPreview(loan.id.toString())} className="max-w-sm w-max flex items-center gap-2 cursor-pointer">
                                                                <div className="h-7 sm:h-8 w-7 sm:w-8 flex justify-center items-center rounded-full overflow-hidden text-white dark:text-primary relative bg-primary dark:bg-slate-100">
                                                                    {user.type === "Member" ? <FaSackDollar className='text-sm sm:text-base text-inherit' /> : <Image src={loan?.loaner?.image || edimcs_dollarbills} alt={`${loan?.loaner?.firstname} ${loan?.loaner?.middlename} ${loan?.loaner?.lastname}`} fill={true} className="absolute left-0 top-0 object-cover w-full h-full" />}
                                                                </div>
                                                                <div className='flex flex-col'>
                                                                    <h5 className="text-sm font-medium leading-tight whitespace-nowrap">{loan.loaner?.firstname} {loan.loaner?.middlename} {loan.loaner?.lastname}</h5>
                                                                    <h4 className="text-slate-400 text-xs py-[.1rem] sm:py-1">Balance: &#8358;{loan.loaner?.balance?.toLocaleString()}</h4>
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
                                                                <div className={`${loan.status === "Rejected" ? 'bg-red-100 text-red-500' : loan.status === "Running" ? 'bg-sky-100 text-sky-500' : 'bg-slate-100 text-slate-500'} text-xs py-[.1rem] sm:py-1 px-3 rounded-sm font-medium`}>{loan.status}</div>
                                                            </div>
                                                        </td>
                                                        {user.type === "Admin" &&
                                                            <td className="align-middle">
                                                                <div className="flex justify-center gap-2">
                                                                    {loan.verdict === "Pending" && <button onClick={() => showReview(loan.id)} className="flex justify-center items-center gap-[.2rem] align-middle bg-success hover:bg-success/80 text-white dark:text-slate-900 px-3 rounded-sm cursor-pointer text-[.6rem] py-2 sm:py-1">Review</button>}
                                                                    {loan.verdict === "Granted" && (loan.amount - (loan?.payback || 0)) !== 0 && <button onClick={() => showReview(loan.id)} className="flex justify-center items-center gap-[.2rem] align-middle bg-sky-500 hover:bg-sky-500/80 text-white dark:text-slate-900 px-3 rounded-sm cursor-pointer text-[.6rem] py-2 sm:py-1 whitespace-nowrap">Add Payback</button>}

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
                            <span data-te-stepper-head-text-ref className="text-neutral-500 text-xs after:flex after:text-xs after:content-[data-content] dark:text-neutral-300">Money Pool
                            </span>
                        </div>
                        <div data-te-stepper-content-ref className="absolute left-0 w-full translate-x-[150%] p-4 transition-all duration-500 ease-in-out">
                            Money Pool Table in a bit...
                        </div>
                    </li>
                </ul>
            </section>
            {
                user.type === "Admin" ? <>
                    {/* Loan Verdict Form */}
                    <Modal modalRef={reviewRef}>
                        <div className='p-5 flex flex-col gap-4 text-slate-700'>
                            <span className="text-[.6rem] sm:text-[.75rem] text-sky-700 bg-sky-200/50 dark:bg-sky-200 p-2 px-[.3rem] rounded-xs uppercase text-center">Loan Action Form </span>
                            <div className="w-full flex items-center gap-2">
                                <div className={`h-7 sm:h-8 w-7 sm:w-8 flex-shrink-0 flex justify-center items-center rounded-full overflow-hidden relative bg-primary dark:bg-slate-100 text-slate-100 dark:text-slate-600`}>
                                    <FaSackDollar className='text-sm sm:text-base' />
                                </div>
                                <div className='flex-1 flex flex-col justify-center w-full'>
                                    <div className="flex justify-between items-center gap-4 text-slate-600">
                                        <div className="flex flex-col">
                                            {/* <span className="text-[.4rem] bg-slate-200/50 dark:bg-slate-200 p-[.2rem] px-[.3rem] rounded-xs uppercase ml-2">{selectedLoan?.verdict}</span> */}
                                            <h5 className="text-sm font-semibold leading-tight whitespace-nowrap flex items-center">{`${selectedLoan?.loaner?.firstname} ${selectedLoan?.loaner?.middlename} ${selectedLoan?.loaner?.lastname}`} </h5>
                                            <p className="text-slate-400 text-xs py-[.1rem] sm:py-1">Account Balance: &#8358;{selectedLoan?.loaner?.balance?.toLocaleString()}</p>
                                        </div>
                                        <div className="flex justify-center items-center gap-[.2rem] align-middle dark:text-slate-100 text-[.6rem]">
                                            <FaCalendarAlt className="text-inherit opacity-60" /> <p className="">{selectedLoan?.createdAt}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col font-normal divide-y divide-slate-300 pt-4 pb-2">
                                {ShowComputedValues()}
                            </div>
                            {
                                selectedLoan?.verdict === "Pending" ?
                                    <>
                                        <div className="flex gap-2 justify-end">
                                            <button onClick={() => handleReview(selectedLoan?.id, "Approve")} className="flex justify-center items-center gap-[.2rem] align-middle bg-success hover:bg-success/80 text-white px-5 rounded-sm cursor-pointer text-[.6rem] py-[.4rem]" disabled={loading}>Approve</button>
                                            <button onClick={() => handleReview(selectedLoan?.id, "Reject")} className="flex justify-center items-center gap-[.2rem] align-middle bg-danger hover:bg-danger/80 text-white px-5 rounded-sm cursor-pointer text-[.6rem] py-[.4rem]" disabled={loading}>Reject</button>
                                        </div> </> : ""
                            }
                        </div>
                    </Modal>
                </> : <></>
            }
            <Modal modalRef={previewRef}>
                <div className='p-5 flex flex-col gap-4'>
                    <span className="text-[.6rem] sm:text-[.75rem] text-sky-700 bg-sky-200/50 dark:bg-sky-200 p-2 px-[.3rem] rounded-xs uppercase text-center">Loan Action Form </span>
                    <div className="w-full flex items-center gap-2">
                        <div className={`h-7 sm:h-8 w-7 sm:w-8 flex-shrink-0 flex justify-center items-center rounded-full overflow-hidden relative bg-primary dark:bg-slate-100 text-slate-100 dark:text-slate-600`}>
                            <FaSackDollar className='text-sm sm:text-base' />
                        </div>
                        <div className='flex-1 flex flex-col justify-center w-full'>
                            <div className="flex justify-between items-center gap-4 text-slate-600">
                                <div className="flex flex-col">
                                    {/* <span className="text-[.4rem] bg-slate-200/50 dark:bg-slate-200 p-[.2rem] px-[.3rem] rounded-xs uppercase ml-2">{selectedLoan?.verdict}</span> */}
                                    <h5 className="text-sm font-semibold leading-tight whitespace-nowrap flex items-center">{`${selectedLoan?.loaner?.firstname} ${selectedLoan?.loaner?.middlename} ${selectedLoan?.loaner?.lastname}`} </h5>
                                    <p className="text-slate-400 text-xs py-[.1rem] sm:py-1">Account Balance: &#8358;{selectedLoan?.loaner?.balance?.toLocaleString()}</p>
                                </div>
                                <div className="flex justify-center items-center gap-[.2rem] align-middle dark:text-slate-100 text-[.6rem]">
                                    <FaCalendarAlt className="text-inherit opacity-60" /> <p className="">{selectedLoan?.createdAt}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-between items-center border border-slate-200 border-l-0 border-r-0 py-4">
                        <h3 className="-my-2 text-slate-700 text-center text-lg font-bold"><span className="text-xs font-light flex items-center">Amount Requested:</span> &#8358;{selectedLoan?.amount.toLocaleString()}</h3>
                        <h3 className="-my-2 text-slate-700 text-center text-lg font-bold"><span className="text-xs font-light flex items-center">Amount Repaid:</span> &#8358;{selectedLoan?.payback?.toLocaleString() || 0}</h3>
                    </div>
                </div>
            </Modal>
        </>
    )
}
