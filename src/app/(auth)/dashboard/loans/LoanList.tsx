'use client'

import { LoanProps, MemberProps } from '@/types'
import React, { useRef, useState } from 'react'
import Modal from '@/app/(auth)/ui/Modal'
import { FaCalendarAlt, FaClock } from 'react-icons/fa'
import Image from 'next/image'

import { FaSackDollar } from 'react-icons/fa6'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import { TableSearch } from '../../ui'
import { edimcs_dollarbills } from '@/assets/images'
import Link from 'next/link'
import moment from 'moment'
import { MdAttachMoney } from 'react-icons/md'
import { handleLoanRepayment, handleLoans, verdictAction } from '@/actions'

// import {useForm} from 'react-hook-form'

export default function LoanList({ loansData, user }: { loansData: LoanProps[], user: MemberProps }) {
    const [allTableData, setAllTableData] = useState<LoanProps[] | []>(loansData)
    const [tableData, setTableData] = useState<LoanProps[] | []>(loansData)
    const modalRef = useRef<HTMLDialogElement | null>(null)
    const reviewRef = useRef<HTMLDialogElement | null>(null)
    const previewRef = useRef<HTMLDialogElement | null>(null)
    const formRef = useRef<HTMLFormElement | null>(null)
    const repaymentFormRef = useRef<HTMLFormElement | null>(null)
    const [interest, setInterest] = useState<number>(1)
    const [payback, setPayback] = useState<number>(500)
    const inputRef = useRef<HTMLInputElement | null>(null)
    const amountRef = useRef<HTMLInputElement | null>(null)

    const [selectedLoan, setSelectedLoan] = useState<LoanProps>()
    const [loading, setLoading] = useState<boolean>(false)
    const router = useRouter()
    const loanRating = user?.loanRating
    const maxLoanAmount = loanRating === "Basic" ? 100000 : loanRating === "BasicPlus" ? 200000 : loanRating === "Standard" ? 300000 : loanRating === "StandardPlus" ? 950000 : 5000000


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

    const handleReview = async (id: string, verdict: string) => {
        setLoading(true)
        const loanInterest = selectedLoan?.amount! * (interest)/100
        try {
            const res = await verdictAction("loan", id, verdict, loanInterest)
            if(res.error){
                reviewRef.current?.close()
                toast.error(res?.message, {id: "8290", duration: 5000})
            }
            else{
                reviewRef.current?.close()
                toast.success(res?.message, {id: "8290", duration: 5000})
            }
            setLoading(false)
            router.refresh()
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

            const result = tableData.filter(el => el.amount.toString().toLowerCase().includes(keyword) || el?.loaner?.balance?.toString().toLowerCase().includes(keyword) || el.createdAt.toString().toLowerCase().includes(keyword) || el?.loaner?.firstname.toLowerCase().includes(keyword) || el?.loaner?.middlename.toLowerCase().includes(keyword) || el?.loaner?.lastname.toLowerCase().includes(keyword) || el?.loaner?.memberId.toString().toLowerCase().includes(keyword) || el?.loaner?.email.toLowerCase().includes(keyword) || el?.loaner?.phone?.toString().toLowerCase().includes(keyword) || el.status.toString().toLowerCase().includes(keyword) || el.verdict.toString().toLowerCase().includes(keyword))
            setTableData(prev => [...result])
        }
    }

    const ShowComputedValues = () => {
        const balance = selectedLoan?.amount! - selectedLoan?.payback!
        const loanInterest = selectedLoan?.amount! * (selectedLoan?.interest!)/100
        const variableInterest = selectedLoan?.amount! * (interest!)/100
        const amountToReceive = selectedLoan?.amount! - variableInterest
        return (
            <>
                {selectedLoan?.status === "Pending" ? <div className="flex justify-between items-center gap-2 py-1">
                    <span className="text-xs font-light flex items-center justify-start flex-1">Add Interest (%):</span>
                    <div className="flex overflow-x-hidden relative w-[3rem] max-w-[3rem] border border-gray-300 rounded-md px-2 py-0">
                        <input value={interest} onChange={e => setInterest(Number(e.target.value))} type="number" required min={0} max={10} name='interest' placeholder={`Enter an Interest Rate NOT greater than 10`} className="relative outline-none py-2 pl-2 pr-4  text-gray-600 text-xs placeholder-opacity-70 font-normal flex w-[6rem] bg-transparent focus-within:bg-transparent focus:bg-transparent" />
                    </div>
                </div> : selectedLoan?.status === "Running" ? <form ref={repaymentFormRef} onSubmit={handleRepayment} className="relative flex flex-col"> <div className="flex justify-between items-center gap-2 py-1">
                    <span className="text-xs font-light flex items-center justify-start flex-1">Add Loan Payback Amount:</span>
                    <div className="flex gap-1">
                        <input type="hidden" name="loaner" value={selectedLoan?.id} />
                        <div className="flex overflow-x-hidden relative w-[5rem] max-w-[5rem] border border-gray-300 rounded-md px-2 py-0">
                            <input value={payback} onChange={e => setPayback(Number(e.target.value))} type="number" required min={500} max={selectedLoan?.amount - (selectedLoan?.payback || 0)} name='payback' placeholder={`Enter an Interest Rate NOT greater than 10`} className="relative outline-none py-2 pl-2 pr-4  text-gray-600 text-xs placeholder-opacity-70 font-normal flex w-[7rem] bg-transparent focus-within:bg-transparent focus:bg-transparent" />
                        </div>
                        <button type="submit" className="py-2 px-3 sm:px-8 bg-primary text-white text-[.6rem] text-xs rounded-md hover:bg-primary/90 cursor-pointer" disabled={loading}>Record Payment</button>
                    </div>
                </div> </form> : ""}
                <div className="flex justify-between items-center gap-2 py-1 text-slate-700">
                    <span className="text-xs font-light flex items-center justify-start">Amount Requested:</span>
                    <h3 className="text-right text-sm font-semibold">&#8358;{selectedLoan?.amount.toLocaleString()}.00</h3>
                </div>
                <div className="flex justify-between items-center gap-2 py-1 text-slate-700">
                    <span className="text-xs font-light flex items-center justify-start">Interest:</span>
                    {selectedLoan?.status === "Running" ? <h3 className="text-right text-sm font-medium">&#8358;{(selectedLoan?.interest).toLocaleString()}</h3> : selectedLoan?.status === "Pending" ? <h3 className="text-right text-sm font-medium">&#8358;{(Number(selectedLoan?.amount) * Number(interest)/100).toLocaleString()}</h3> : ""}
                </div>
                <div className="flex justify-between items-center gap-2 py-1 text-slate-700">
                    <span className="text-xs font-light flex items-center justify-start">{selectedLoan?.status === "Pending" ? 'Amount to Receive' : 'Amount Received'}:</span>
                    {selectedLoan?.status === "Pending" ? <h3 className="text-right text-sm font-semibold">&#8358;{(amountToReceive).toLocaleString()}</h3> : selectedLoan?.status === "Running" ? <h3 className="text-right text-lg font-semibold">&#8358;{(amountToReceive).toLocaleString()}</h3> : ""}
                </div>
                <div className="flex justify-between items-center gap-2 py-1 text-slate-700">
                    <span className="text-xs font-light flex items-center justify-start">Amount Repaid:</span>
                    <h3 className="text-right text-sm font-semibold">&#8358;{selectedLoan?.payback?.toLocaleString() || 0}</h3>
                </div>
                <div className="flex justify-between items-center gap-2 py-1 text-pink-500">
                    <span className="text-xs font-light flex items-center justify-start">Balance:</span>
                    <h3 className="text-right text-base font-semibold">&#8358;{balance.toLocaleString() || 0}</h3>
                </div>
            </>

        )
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true)
        const formData = new FormData(formRef?.current!)
        const res = await handleLoans(formData)
        if (res.error) {
            modalRef.current?.close()
            toast.error(res?.message, { id: "8290", duration: 5000 })
        }
        else {
            modalRef.current?.close()
            toast.success(res?.message, { id: "8290", duration: 5000 })
        }
        setLoading(false)
        router.refresh()
    }
    
    const handleRepayment = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true)
        const formData = new FormData(repaymentFormRef?.current!)
        const res = await handleLoanRepayment(formData)
        if (res.error) {
            reviewRef.current?.close()
            toast.error(res?.message, { id: "8290", duration: 5000 })
        }
        else {
            reviewRef.current?.close()
            toast.success(res?.message, { id: "8290", duration: 5000 })
        }
        setLoading(false)
        router.refresh()
    }

    return (
        <>
            <section className="relative flex flex-col gap-2 p-4 bg-white  dark:bg-[#dbf0f724] dark:shadow-black shadow-slate-200 shadow-md rounded-lg">
                <div className="w-full overflow-x-scroll pb-6 x-scrollbar">
                    <table className="w-full text-slate-500 dark:text-slate-400 text-xs sm:text-sm min-w-[20rem]">
                        <thead>
                            <tr>
                                <th colSpan={user?.type === "Admin" ? 7 : 6}>
                                    <TableSearch title='LOAN' key={'72088234'} handleSearch={handleSearch} inputRef={inputRef}>
                                        <div className="md:ml-[5rem] flex gap-2">
                                            <button onClick={() => modalRef.current?.showModal()} className="text-white bg-primary px-4 py-2 rounded-md cursor-pointer text-xs font-light">Apply for Loan</button>
                                            <Link href={`/documents/EDIMCS-LOAN-APPLICATION-FORM.pdf`} className="text-white bg-success hover:bg-success/90 px-4 py-2 rounded-md cursor-pointer text-xs font-light">Download Loan Form</Link>
                                        </div>
                                    </TableSearch>
                                </th>
                            </tr>
                            <tr className='text-slate-600 dark:text-slate-50 text-xs text-center'>
                                <th className='font-light text-left'>Member Details</th>
                                <th className='font-light'>Loan Amount</th>
                                <th className='font-light'>Amount Received</th>
                                <th className='font-light'>Loan Date</th>
                                <th className='font-light'>Verdict</th>
                                <th className='font-light'>Status</th>
                                {user?.type === "Admin" && <th className='font-light'>Action</th>}
                            </tr>
                        </thead>
                        <tbody className='w-full'>
                            {
                                tableData.length ?
                                    tableData.map(loan => (
                                        <tr key={loan.id} className='hover:bg-slate-50 dark:hover:bg-slate-900/30'>
                                            <td>
                                                <div onClick={() => showPreview(loan.id.toString())} className="max-w-sm w-max flex items-center gap-2 cursor-pointer">
                                                    <div className="h-7 sm:h-8 w-7 sm:w-8 flex justify-center items-center rounded-full overflow-hidden text-white dark:text-primary relative bg-primary dark:bg-slate-100">
                                                        {user?.type === "Member" ? <FaSackDollar className='text-sm sm:text-base text-inherit' /> : <Image src={loan?.loaner?.image || edimcs_dollarbills} alt={`${loan?.loaner?.firstname} ${loan?.loaner?.middlename} ${loan?.loaner?.lastname}`} fill={true} className="absolute left-0 top-0 object-cover w-full h-full" />}
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
                                                <div className="flex justify-center items-center align-middle mx-auto whitespace-nowrap">
                                                    <div className={`${loan.verdict === "Rejected" ? 'bg-red-100 text-red-500' : loan.verdict === "Granted" ? 'bg-sky-100 text-sky-500' : 'bg-slate-100 text-slate-500'} text-xs py-[.1rem] sm:py-1 px-3 rounded-sm font-medium`}>&#8358;{(loan.amount - loan.interest).toLocaleString()}</div>
                                                </div>
                                            </td>
                                            <td className="align-middle">
                                                <div className="flex justify-center items-center gap-[.2rem] align-middle text-slate-400 text-xs py-[.1rem] sm:py-1">
                                                    <FaClock className="text-inherit mt-[.1rem]" /> <p className="">{moment(loan?.createdAt).format("DD-MM-YYYY")}</p>
                                                </div>
                                            </td>
                                            <td className="align-middle">
                                                <div className="flex justify-center gap-2">
                                                    <div className={`${loan.verdict === "Rejected" ? 'bg-red-100 text-red-500' : loan.verdict === "Granted" ? 'bg-teal-100 text-teal-500' : 'bg-slate-100 text-slate-500'} text-xs py-[.1rem] sm:py-1 px-3 rounded-sm font-medium`}>{loan.verdict}</div>
                                                </div>
                                            </td>
                                            <td className="align-middle">
                                                <div className="flex justify-center gap-2">
                                                    <div className={`${loan.status === "Suspended" ? 'bg-red-100 text-red-500' : loan.status === "Running" ? 'bg-sky-100 text-sky-500' : 'bg-slate-100 text-slate-500'} text-xs py-[.1rem] sm:py-1 px-3 rounded-sm font-medium`}>{loan.status}</div>
                                                </div>
                                            </td>
                                            {user?.type === "Admin" &&
                                                <td className="align-middle">
                                                    <div className="flex justify-center gap-2">
                                                        {loan.verdict === "Pending" && <button onClick={() => showReview(loan.id)} className="flex justify-center items-center gap-[.2rem] align-middle bg-success hover:bg-success/80 text-white dark:text-slate-900 px-3 rounded-sm cursor-pointer text-[.6rem] py-2 sm:py-1">Review</button>}
                                                        {loan.verdict === "Granted" && (loan.amount - (loan?.payback || 0)) !== 0 && <button onClick={() => showReview(loan.id)} className="flex justify-center items-center gap-[.2rem] align-middle bg-sky-500 hover:bg-sky-500/80 text-white dark:text-slate-900 px-3 rounded-sm cursor-pointer text-[.6rem] py-2 sm:py-1 whitespace-nowrap">Add Payback</button>}
                                                    </div>
                                                </td>}
                                        </tr>
                                    ))
                                    :
                                    <tr>
                                        <td colSpan={user?.type === "Admin" ? 6 : 5}>
                                            <h4 className="text-slate-500 text-center dark:text-slate-300">No Record(s) Found</h4>
                                        </td>
                                    </tr>
                            }
                        </tbody>
                    </table>
                </div>
            </section>
            {/* <Modal modalRef={modalRef}>
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
            </Modal> */}
            <Modal modalRef={modalRef}>
                <div className='p-5 flex flex-col gap-4'>
                    <span className="text-[.6rem] sm:text-[.75rem] text-primary bg-indigo-100 py-2 px-[.3rem] rounded-xs uppercase text-center">Loan Application Form </span>
                    <div className="w-full flex items-center gap-2">
                        <div className={`h-7 sm:h-8 w-7 sm:w-8 flex-shrink-0 flex justify-center items-center rounded-full overflow-hidden relative bg-primary dark:bg-slate-100 text-slate-100 dark:text-slate-600`}>
                            <MdAttachMoney className='text-sm sm:text-base' />
                        </div>
                        <div className='flex-1 flex flex-col justify-center w-full'>
                            <div className="flex justify-between items-center gap-4 text-slate-600">
                                <div className="flex flex-col">
                                    <h5 className="text-sm font-semibold leading-tight whitespace-nowrap flex items-center">{`${user?.firstname} ${user?.middlename} ${user?.lastname}`} </h5>
                                    <p className="text-slate-400 text-xs py-[.1rem] sm:py-1">Your Current Balance: &#8358;{user?.balance?.toLocaleString() || 0}</p>
                                </div>
                                <div className="flex justify-center items-center gap-[.2rem] align-middle dark:text-slate-100 text-[.6rem]">
                                    <FaCalendarAlt className="text-inherit opacity-60" /> <p className="">{moment(new Date().getTime()).format("DD-MM-YYYY")}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col font-normal">
                        <div className="flex justify-between items-center gap-2 border-y border-y-slate-300 py-2 my-2 text-slate-700">
                            <span className="text-xs font-light flex items-center justify-start flex-1">Amount Requesting:</span>
                            <input type="hidden" name="loaner" value={user?.id} />
                            <div className="flex overflow-x-hidden relative w-[8rem] max-w-[8rem] border border-gray-300 rounded-md px-2 py-0">
                                <input type="number" required min={500} max={maxLoanAmount} ref={amountRef} name='amount' placeholder={`Minimum of ₦500`} className="relative outline-none py-2 pl-2 pr-4 text-gray-600 text-xs placeholder-opacity-70 font-normal flex w-[10rem] bg-transparent focus-within:bg-transparent focus:bg-transparent" />
                            </div>
                        </div>
                        {user?.balance! < 500 ? <span className="text-[.6rem] sm:text-[.75rem] text-primary bg-indigo-100 dark:bg-indigo-100 p-2 px-[.3rem] rounded-xs uppercase text-center">Sorry, your acount is lower than ₦500 </span> :
                            <button type="submit" className="py-2 px-4 sm:px-8 bg-primary text-white text-[.6rem] text-xs rounded-md hover:bg-primary/90 cursor-pointer" disabled={loading}>{loading ? 'Processing...' : 'Submit Loan Request'}</button>}
                    </form>
                </div>
            </Modal>
            {
                user?.type === "Admin" ? <>
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
                                            <FaCalendarAlt className="text-inherit opacity-60" /> <p className="">{moment(selectedLoan?.createdAt).format("DD-MM-YYYY")}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col font-normal divide-y divide-slate-300 border-b border-b-slate-300 pt-4 pb-0">
                                {ShowComputedValues()}
                            </div>
                            {
                                selectedLoan?.verdict === "Pending" ?
                                    <>
                                        <div className="flex gap-2 justify-end">
                                            <button onClick={() => handleReview(selectedLoan?.id, "Granted")} className="flex justify-center items-center gap-[.2rem] align-middle bg-success hover:bg-success/80 text-white px-5 rounded-sm cursor-pointer text-[.6rem] py-[.4rem]" disabled={loading}>Approve</button>
                                            <button onClick={() => handleReview(selectedLoan?.id, "Rejected")} className="flex justify-center items-center gap-[.2rem] align-middle bg-danger hover:bg-danger/80 text-white px-5 rounded-sm cursor-pointer text-[.6rem] py-[.4rem]" disabled={loading}>Reject</button>
                                        </div> </> : ""
                            }
                            {
                                // selectedLoan?.status === "Running" ?
                                //     <form ref={formRef} action={'dialog'} onSubmit={handleSubmit} className="relative flex flex-col gap-2">
                                //         <p className="bg-sky-100 text-sky-500 text-center text-xs py-1 px-2 -mt-4">This member currently has &#8358;{selectedLoan?.loaner?.balance?.toLocaleString()} and has a &#8358;{(selectedLoan.amount - (selectedLoan?.payback || 0)).toLocaleString()} to payback</p>
                                //         <input type="number" required min={0} max={selectedLoan.amount - (selectedLoan?.payback || 0)} name='payback' placeholder={`Enter an amount NOT greater than ₦${(selectedLoan.amount - (selectedLoan?.payback || 0)).toLocaleString()}`} className="relative outline-none py-2 pl-2 pr-4 border border-gray-300 rounded-md text-gray-600 text-sm placeholder-opacity-70 bg-transparent focus-within:bg-transparent focus:bg-transparent" />
                                //         <button type="submit" className="py-2 px-4 sm:px-8 bg-sky-500 text-white text-[.6rem] text-xs rounded-md hover:bg-sky-600 cursor-pointer" disabled={loading}>Record Payment</button>
                                //     </form> : ""
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
                                    <FaCalendarAlt className="text-inherit opacity-60" /> <p className="">{moment(selectedLoan?.createdAt).format("DD-MM-YYYY")}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-between items-center border border-slate-200 border-l-0 border-r-0 py-4">
                        <h3 className="-my-2 text-slate-700 text-center text-lg font-bold"><span className="text-xs font-light flex items-center">Loan Requested:</span> &#8358;{selectedLoan?.amount.toLocaleString()}</h3>
                        <h3 className="-my-2 text-slate-700 text-center text-lg font-bold"><span className="text-xs font-light flex items-center">Amount Repaid:</span> &#8358;{selectedLoan?.payback?.toLocaleString() || 0}</h3>
                    </div>
                </div>
            </Modal>
        </>
    )
}
