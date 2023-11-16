'use client'

import { LoanProps } from '@/types'
import React, { useRef, useState } from 'react'
import Modal from '../../components/Modal'
import { IoClose } from 'react-icons/io5'
import { FaCalendarAlt, FaClock } from 'react-icons/fa'
import Image, { StaticImageData } from 'next/image'

import { user } from '@/data/user'
import { FaSackDollar } from 'react-icons/fa6'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'


export default function LoanList({ loanData }: { loanData: LoanProps[] }) {
    const modalRef = useRef<HTMLDialogElement | null>(null)
    const reviewRef = useRef<HTMLDialogElement | null>(null)
    const previewRef = useRef<HTMLDialogElement | null>(null)
    const formRef = useRef<HTMLFormElement | null>(null)
    const amountRef = useRef<HTMLInputElement | null>(null)

    const [selectedLoan, setSelectedLoan] = useState<LoanProps>()
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

    return (
        <>
            <section className="relative flex flex-col gap-2 p-4 bg-white  dark:bg-[#dbf0f724] dark:shadow-black shadow-slate-200 shadow-md rounded-lg">
                <div className="w-full overflow-x-scroll pb-6 x-scrollbar">
                    <table className="w-full text-slate-500 dark:text-slate-400 text-xs sm:text-sm min-w-[20rem]">
                        <thead>
                            <tr>
                                <th colSpan={user.type === "Admin" ? 6 : 5}>
                                    <div className='w-full flex justify-between items-center pb-2 mb-2 border-b border-b-slate-200'>
                                        <h4 className="uppercase font-semibold text-slate-400 text-left">LOAN TRANSACTIONS</h4>
                                        <button onClick={() => modalRef.current?.showModal()} className="text-white bg-primary px-4 py-2 rounded-md cursor-pointer text-xs font-light btn-primary">Apply for Loan</button>
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
            <Modal modalRef={modalRef}>
                <form className="flex flex-col gap-2">
                    <h2 className="text-default text-xl sm:text-2xl font-bold text-center">ENLIGHTENMENT DRIVE INITIATIVE MULTI-PURPOSE CO-OPERATIVE SOCIETY</h2>
                    <h4 className="text-default text-sm sm:text-lg font-semibold text-center underline">LOAN APPLICATION FORM</h4>
                    <p className="bg-default/90 max-w-xl mx-auto leading-loose rounded-md text-xs sm:text-sm text-slate-100 font-medium text-center p-2">NOTE: Application can be as much as twice your savings whereas the maximum loan grantable is subject to conditions in the cooperative society&apos;s bylaws interest rate per annum and the maximum repayment period allowed.</p>
                    <article className="px-4 py-8 leading-loose text-sm text-justify">
                        <p className='py-1 leading-loose'>
                            I, <span className="border-b-2 border-default border-dotted">&nbsp;&nbsp; {user.lastname} {user.middlename} {user.firstname} &nbsp;&nbsp;</span> &nbsp;&nbsp;of&nbsp;&nbsp; <span className="border-b-2 border-default border-dotted">&nbsp;&nbsp; {user.address} &nbsp;&nbsp;</span>
                        </p>
                        <p className='py-1 leading-loose'>Apply for the sum of <span className="border-b-2 border-default border-dotted relative inline-block w-44 overflow-x-hidden">&nbsp;&nbsp;&#8358;<input type="number" placeholder={`Amount`} defaultValue={user?.balance} max={user?.balance ? user?.balance * 2 : 0} className="outline-none absolute left-6 -bottom-1 w-full text-default bg-transparent" /></span> loan from EDIMCS limited for a repayment period of <span className="border-b-2 border-default border-dotted relative inline-block w-12 overflow-x-hidden">&nbsp;&nbsp;<input type="number" placeholder={`Amount`} defaultValue={6} min={1} max={12} maxLength={2} className="outline-none absolute left-6 -bottom-1 w-full text-default bg-transparent" /></span> Months and pledged prompt repayment of the loan through postdated cheques. I shall issue the agreed repayment plan made in favor of Enlightenment Drive Initiative Multi-Purpose Cooperative Society Limited (EDIMCS) between me and the Society until the loan plus interest is completely liquidated.</p>
                        <p className='py-1 leading-loose'>Applicant&apos;s Place of Work: <span className="border-b-2 border-default border-dotted relative inline-block w-96 overflow-x-hidden">&nbsp;&nbsp;<input type="text" placeholder={`Enter your Current Place of Work`} className="outline-none absolute left-6 -bottom-1 w-full text-default bg-transparent" />&nbsp;&nbsp;</span></p>
                        <p className='py-1 leading-loose'>Business: <span className="border-b-2 border-default border-dotted relative inline-block w-96 overflow-x-hidden">&nbsp;&nbsp;<input type="text" placeholder={`Enter your Current Place of Work`} className="outline-none absolute left-6 -bottom-1 w-full text-default bg-transparent" />&nbsp;&nbsp;</span></p>
                        <p className='py-1 leading-loose'>NIN: <span className="border-b-2 border-default border-dotted relative inline-block w-[35%] overflow-x-hidden">&nbsp;&nbsp;<input type="number" max={10} placeholder={`Enter your 10-digits NIN`} className="outline-none absolute left-6 -bottom-1 w-full text-default bg-transparent" />&nbsp;&nbsp;</span> BVN: <span className="border-b-2 border-default border-dotted relative inline-block w-[35%] overflow-x-hidden">&nbsp;&nbsp;<input type="number" max={10} placeholder={`Enter your BVN Number`} className="outline-none absolute left-6 -bottom-1 w-full text-default bg-transparent" />&nbsp;&nbsp;</span></p>
                        <p className='py-1 leading-loose'>Type of Loan: <span className="border-b-2 border-default border-dotted relative inline-block w-[35%] overflow-x-hidden">&nbsp;&nbsp;<input type="number" max={10} placeholder={`Enter your 10-digits NIN`} className="outline-none absolute left-6 -bottom-1 w-full text-default bg-transparent" />&nbsp;&nbsp;</span> Membership: <span className="border-b-2 border-default border-dotted relative inline-block w-[35%] overflow-x-hidden">&nbsp;&nbsp;<input type="number" max={10} placeholder={`Membership Number`} className="outline-none absolute left-6 -bottom-1 w-full text-default bg-transparent" />&nbsp;&nbsp;</span></p>
                        <p className='py-1 leading-loose'>Phone Number of Applicant: <span className="border-b-2 border-default border-dotted relative inline-block w-[25%] overflow-x-hidden">&nbsp;&nbsp;<input type="number" max={15} placeholder={`Enter your Phone Number`} defaultValue={user.phone} className="outline-none absolute left-6 -bottom-1 w-full text-default bg-transparent" />&nbsp;&nbsp;</span> Email Address: <span className="border-b-2 border-default border-dotted relative inline-block w-[30%] overflow-x-hidden">&nbsp;&nbsp;<input type="email" placeholder={`Enter your Email Address`} defaultValue={user.email} className="outline-none absolute left-6 -bottom-1 w-full text-default bg-transparent" />&nbsp;&nbsp;</span></p>
                        <h4 className="text-default text-sm sm:text-lg font-semibold underline pt-4">GUARANTORS</h4>
                        <p className="py-1 leading-loose">(Guarantor contributions put together must be equal to what the applicant is taking as
                            a loan in case of default).</p>
                        <p className='py-1 leading-loose'>1. Guarantor Name: <span className="border-b-2 border-default border-dotted relative inline-block w-[30%] overflow-x-hidden">&nbsp;&nbsp;<input type="text" placeholder={`Name of Guarantor`} className="outline-none absolute left-6 -bottom-1 w-full text-default bg-transparent" />&nbsp;&nbsp;</span> Member ID No: <span className="border-b-2 border-default border-dotted relative inline-block w-[25%] overflow-x-hidden">&nbsp;&nbsp;<input type="text" placeholder={`Guarantor Member ID`} className="outline-none absolute left-6 -bottom-1 w-full text-default bg-transparent" />&nbsp;&nbsp;</span></p>
                        <p className='py-1 leading-loose'>Address: <span className="border-b-2 border-default border-dotted relative inline-block w-[60%] overflow-x-hidden">&nbsp;&nbsp;<input type="text" placeholder={`Guarantor's Address`} className="outline-none absolute left-6 -bottom-1 w-full text-default bg-transparent" />&nbsp;&nbsp;</span></p>
                        <p className='py-1 leading-loose'>Phone Number: <span className="border-b-2 border-default border-dotted relative inline-block w-[25%] overflow-x-hidden">&nbsp;&nbsp;<input type="text" placeholder={`Guarantor's Phone Number`} className="outline-none absolute left-6 -bottom-1 w-full text-default bg-transparent" />&nbsp;&nbsp;</span> Means of Identification: <span className="border-b-2 border-default border-dotted relative inline-block w-[25%] overflow-x-hidden">&nbsp;&nbsp;<input type="text" placeholder={`Guarantor's Means of Identification `} className="outline-none absolute left-6 -bottom-1 w-full text-default bg-transparent" />&nbsp;&nbsp;</span></p>
                        <p className='py-1 leading-loose'>Account Name: <span className="border-b-2 border-default border-dotted relative inline-block w-[40%] overflow-x-hidden">&nbsp;&nbsp;<input type="text" placeholder={`Guarantor's Address`} className="outline-none absolute left-6 -bottom-1 w-full text-default bg-transparent" />&nbsp;&nbsp;</span></p>
                        <p className='py-1 leading-loose'>Account Number: <span className="border-b-2 border-default border-dotted relative inline-block w-[25%] overflow-x-hidden">&nbsp;&nbsp;<input type="number" max={10} placeholder={`Guarantor's Phone Number`} className="outline-none absolute left-6 -bottom-1 w-full text-default bg-transparent" />&nbsp;&nbsp;</span> Bank: <span className="border-b-2 border-default border-dotted relative inline-block w-[25%] overflow-x-hidden">&nbsp;&nbsp;<input type="text" placeholder={`Guarantor's Bank Name`} className="outline-none absolute left-6 -bottom-1 w-full text-default bg-transparent" />&nbsp;&nbsp;</span></p>
                        <p className='py-1 leading-loose'>BVN Number: <span className="border-b-2 border-default border-dotted relative inline-block w-[25%] overflow-x-hidden">&nbsp;&nbsp;<input type="text" max={10} placeholder={`Guarantor's BVN`} className="outline-none absolute left-6 -bottom-1 w-full text-default bg-transparent" />&nbsp;&nbsp;</span> NIN: <span className="border-b-2 border-default border-dotted relative inline-block w-[25%] overflow-x-hidden">&nbsp;&nbsp;<input type="text" max={10} placeholder={`Guarantor's NIN `} className="outline-none absolute left-6 -bottom-1 w-full text-default bg-transparent" />&nbsp;&nbsp;</span></p>
                        <p className='py-1 leading-loose'>Signature: <span className="border-b-2 border-default border-dotted relative inline-block w-[25%] overflow-x-hidden">&nbsp;&nbsp;<input type="text" placeholder={`Guarantor's Signature`} className="outline-none absolute left-6 -bottom-1 w-full text-default bg-transparent" />&nbsp;&nbsp;</span> Date: <span className="border-b-2 border-default border-dotted relative inline-block w-[25%] overflow-x-hidden">&nbsp;&nbsp;<input type="date" placeholder={`Today's Date `} className="outline-none absolute left-6 -bottom-1 w-full text-default bg-transparent" />&nbsp;&nbsp;</span></p>
                    </article>
                    <button type='submit' className="cursor-pointer rounded-md ml-4 text-thin text-xs text-white bg-primary hover:bg-blue-600 py-2 px-4 sm:py-3 sm:px-6 w-max select-none">Submit Application</button>
                </form>
            </Modal>
            {
                user.type === "Admin" ? <>
                    {/* Loan Verdict Form */}
                    <Modal modalRef={reviewRef}>
                        <div className='p-5 flex flex-col gap-4'>
                            <span className="text-[.6rem] sm:text-[.75rem] text-sky-700 bg-sky-200/50 dark:bg-sky-200 p-[.2rem] px-[.3rem] rounded-xs uppercase text-center">Loan Action Form </span>
                            <div className="w-full flex items-center gap-2">
                                <div className={`h-7 sm:h-8 w-7 sm:w-8 flex-shrink-0 flex justify-center items-center rounded-full overflow-hidden relative bg-primary dark:bg-slate-100 text-slate-100 dark:text-slate-600`}>
                                    <FaSackDollar className='text-sm sm:text-base' />
                                </div>
                                <div className='flex-1 flex flex-col justify-center w-full'>
                                    <div className="flex justify-between items-center gap-4 text-slate-600">
                                        <div className="flex flex-col">
                                            {/* <span className="text-[.4rem] bg-slate-200/50 dark:bg-slate-200 p-[.2rem] px-[.3rem] rounded-xs uppercase ml-2">{selectedLoan?.verdict}</span> */}
                                            <h5 className="text-sm font-semibold leading-tight whitespace-nowrap flex items-center">{selectedLoan?.name} </h5>
                                            <p className="text-slate-400 text-xs py-[.1rem] sm:py-1">Account Balance: &#8358;{selectedLoan?.balance.toLocaleString()}</p>
                                        </div>
                                        <div className="flex justify-center items-center gap-[.2rem] align-middle dark:text-slate-100 text-[.6rem]">
                                            <FaCalendarAlt className="text-inherit opacity-60" /> <p className="">{selectedLoan?.createdAt}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-between items-center border border-slate-200 border-l-0 border-r-0 py-4">
                                <h3 className="-my-2 text-slate-700 text-center text-lg font-bold"><span className="text-xs font-light flex items-center">Amount Requested:</span> &#8358;{selectedLoan?.amount.toLocaleString()}</h3>
                                <h3 className="-my-2 text-slate-700 text-center text-lg font-bold"><span className="text-xs font-light flex items-center">Amount Repaid:</span> &#8358;{selectedLoan?.payback.toLocaleString()}</h3>
                            </div>
                            {
                                selectedLoan?.verdict === "Pending" ?
                                    <div className="flex gap-2 justify-end">
                                        <button onClick={() => handleReview(selectedLoan?.id, "Approve")} className="flex justify-center items-center gap-[.2rem] align-middle bg-success hover:bg-success/80 text-white px-5 rounded-sm cursor-pointer text-[.6rem] py-[.4rem]" disabled={loading}>Approve</button>
                                        <button onClick={() => handleReview(selectedLoan?.id, "Reject")} className="flex justify-center items-center gap-[.2rem] align-middle bg-danger hover:bg-danger/80 text-white px-5 rounded-sm cursor-pointer text-[.6rem] py-[.4rem]" disabled={loading}>Reject</button>
                                    </div> : ""
                            }
                            {
                                selectedLoan?.status === "Running" ?
                                    <form ref={formRef} action={'dialog'} onSubmit={handleSubmit} className="relative flex flex-col gap-2">
                                        <p className="bg-sky-100 text-sky-500 text-center text-xs py-1 px-2 -mt-4">This member currently has &#8358;{selectedLoan.balance.toLocaleString()} and has a &#8358;{(selectedLoan.amount - selectedLoan.payback).toLocaleString()} to payback</p>
                                        <input type="number" required min={0} max={selectedLoan.amount - selectedLoan.payback} ref={amountRef} name='payback' placeholder={`Enter an amount NOT greater than N${(selectedLoan.amount - selectedLoan.payback).toLocaleString()}`} className="relative outline-none py-2 px-4 border border-gray-300 rounded-md text-gray-600 text-sm placeholder-opacity-70 bg-transparent focus-within:bg-transparent focus:bg-transparent" />
                                        <button type="submit" className="py-2 px-4 sm:px-8 bg-sky-500 text-white text-[.6rem] text-xs rounded-md hover:bg-sky-600 cursor-pointer" disabled={loading}>Record Payment</button>
                                    </form> : ""
                            }
                        </div>
                    </Modal>
                </> : <></>
            }
            <Modal modalRef={previewRef}>
                <div className='p-5 flex flex-col gap-4'>
                    <span className="text-[.6rem] sm:text-[.75rem] text-sky-700 bg-sky-200/50 dark:bg-sky-200 p-[.2rem] px-[.3rem] rounded-xs uppercase text-center">Loan Action Form </span>
                    <div className="w-full flex items-center gap-2">
                        <div className={`h-7 sm:h-8 w-7 sm:w-8 flex-shrink-0 flex justify-center items-center rounded-full overflow-hidden relative bg-primary dark:bg-slate-100 text-slate-100 dark:text-slate-600`}>
                            <FaSackDollar className='text-sm sm:text-base' />
                        </div>
                        <div className='flex-1 flex flex-col justify-center w-full'>
                            <div className="flex justify-between items-center gap-4 text-slate-600">
                                <div className="flex flex-col">
                                    {/* <span className="text-[.4rem] bg-slate-200/50 dark:bg-slate-200 p-[.2rem] px-[.3rem] rounded-xs uppercase ml-2">{selectedLoan?.verdict}</span> */}
                                    <h5 className="text-sm font-semibold leading-tight whitespace-nowrap flex items-center">{selectedLoan?.name} </h5>
                                    <p className="text-slate-400 text-xs py-[.1rem] sm:py-1">Account Balance: &#8358;{selectedLoan?.balance.toLocaleString()}</p>
                                </div>
                                <div className="flex justify-center items-center gap-[.2rem] align-middle dark:text-slate-100 text-[.6rem]">
                                    <FaCalendarAlt className="text-inherit opacity-60" /> <p className="">{selectedLoan?.createdAt}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-between items-center border border-slate-200 border-l-0 border-r-0 py-4">
                        <h3 className="-my-2 text-slate-700 text-center text-lg font-bold"><span className="text-xs font-light flex items-center">Amount Requested:</span> &#8358;{selectedLoan?.amount.toLocaleString()}</h3>
                        <h3 className="-my-2 text-slate-700 text-center text-lg font-bold"><span className="text-xs font-light flex items-center">Amount Repaid:</span> &#8358;{selectedLoan?.payback.toLocaleString()}</h3>
                    </div>
                </div>
            </Modal>
        </>
    )
}
