'use client'

import { MemberProps, SavingsProps } from '@/types'
import React, { useRef, useState } from 'react'
import { FaCalendarAlt, FaClock } from 'react-icons/fa'
import Image from 'next/image'

// import { user } from '@/data'
import { FaPiggyBank } from 'react-icons/fa6'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import { TableSearch, Modal } from '@/app/(auth)/ui'
import { edimcs_piggyvest } from '@/assets/images'
import Link from 'next/link'
import moment from 'moment'
import { handleSavings } from '@/actions'



export default function SavingsList({ savingsData, user }: { savingsData: SavingsProps[], user: MemberProps }) {
    const [allTableData, setAllTableData] = useState<SavingsProps[] | []>(savingsData)
    const [tableData, setTableData] = useState<SavingsProps[] | []>(savingsData)
    const modalRef = useRef<HTMLDialogElement | null>(null)
    const reviewRef = useRef<HTMLDialogElement | null>(null)
    const previewRef = useRef<HTMLDialogElement | null>(null)
    const formRef = useRef<HTMLFormElement | null>(null)
    const [interest, setInterest] = useState<number>(1)
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

    const showPreview = (id: string) => {
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

    const handleReview = async (id: string, status: string) => {
        setLoading(true)
        try {
            // const res = await reviewAction(id, status)
            router.refresh()
            reviewRef.current?.close()
        } catch (error) {
            toast.error(`Unable to process your request. Please, check your connection and try again`)
        }
        setLoading(false)
    }

    const ShowComputedValues = () => {
        return (
            <>
                {selectedSavings?.status === "Pending" ? <div className="flex justify-between items-center gap-2 py-1">
                    <span className="text-xs font-light flex items-center justify-start flex-1">Add Interest (%):</span>
                    <div className="flex overflow-x-hidden relative w-[3rem] max-w-[3rem] border border-gray-300 rounded-md px-2 py-0">
                        <input value={interest} onChange={e => setInterest(Number(e.target.value))} type="number" required min={0} max={10} name='interest' placeholder={`Enter an Interest Rate NOT greater than 10`} className="relative outline-none py-2 pl-2 pr-4  text-gray-600 text-xs placeholder-opacity-70 font-normal flex w-[6rem] bg-transparent focus-within:bg-transparent focus:bg-transparent" />
                    </div>
                </div> : ""}
                <div className="flex justify-between items-center gap-2 py-1 text-slate-700">
                    <span className="text-xs font-light flex items-center justify-start">Amount Saved:</span>
                    <h3 className="text-right text-sm font-semibold">&#8358;{selectedSavings?.amount.toLocaleString()}.00</h3>
                </div>
                <div className="flex justify-between items-center gap-2 py-1 text-slate-700">
                    <span className="text-xs font-light flex items-center justify-start">Interest:</span>
                    {selectedSavings?.status === "Pending" ? <h3 className="text-right text-sm font-medium">&#8358;{(Number(selectedSavings?.amount || 1) * (interest / 100)).toLocaleString()}</h3> : ""}
                </div>
                <div className="flex justify-between items-center gap-2 py-1 text-slate-700">
                    <span className="text-xs font-light flex items-center justify-start">Total Saving Record:</span>
                    {selectedSavings?.status === "Pending" ? <h3 className="text-right text-lg font-semibold">&#8358;{(Number(selectedSavings?.amount || 1) + (Number(selectedSavings?.amount || 1) * (interest / 100))).toLocaleString()}</h3> : ""}
                </div>
            </>

        )
    }

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault()
        let keyword = inputRef.current?.value.toLowerCase() || ''
        if (!keyword || keyword === '') {
            setTableData(allTableData)
        }
        else {
            const result = tableData.filter(el => el.updatedBy?.toString().toLowerCase().includes(keyword) || el.status.toString().toLowerCase().includes(keyword) || el.amount.toString().toLowerCase().includes(keyword) || el.createdAt.toString().toLowerCase().includes(keyword) || el.saver?.firstname.toLowerCase().includes(keyword) || el.saver?.middlename.toLowerCase().includes(keyword) || el.saver?.lastname.toLowerCase().includes(keyword) || el.saver?.memberId.toString().toLowerCase().includes(keyword) || el.saver?.email.toLowerCase().includes(keyword) || el.saver?.phone?.toString().toLowerCase().includes(keyword))
            setTableData(result)
        } 
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true)
        const formData = new FormData(formRef?.current!)
        const res = await handleSavings(formData)
        if(res.error){
            modalRef.current?.close()
            toast.error(res?.message, {id: "8290", duration: 5000})
        }
        else{
            modalRef.current?.close()
            toast.success(res?.message, {id: "8290", duration: 5000})
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
                                <th colSpan={user?.type === "Admin" ? 5 : 4}>
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
                                {user?.type === "Admin" && <th className='font-light'>Action</th>}
                            </tr>
                        </thead>
                        <tbody className='w-full'>
                            {
                                tableData.length ?
                                    tableData.map(savings => (
                                        <tr key={savings.id} className='hover:bg-slate-50 dark:hover:bg-slate-900/30'>
                                            <td>
                                                <div onClick={() => showPreview(savings.id.toString())} className="max-w-sm w-max flex items-center gap-2 cursor-pointer">
                                                    <div className="h-7 sm:h-8 w-7 sm:w-8 flex justify-center items-center rounded-full overflow-hidden text-white dark:text-success relative bg-success dark:bg-slate-100">
                                                        {user?.type === "Member" ? <FaPiggyBank className='text-sm sm:text-base text-inherit' /> : <Link href={`/dashboard/members/${savings?.saverId}`}><Image src={savings.saver?.image || edimcs_piggyvest} alt={`${savings.saver?.firstname} ${savings.saver?.middlename} ${savings.saver?.lastname}`} fill={true} className="absolute left-0 top-0 object-cover w-full h-full" /></Link>}
                                                    </div>
                                                    <div className='flex flex-col'>
                                                        <h5 className="text-sm font-medium leading-tight whitespace-nowrap">{savings?.saver?.firstname} {savings?.saver?.middlename} {savings?.saver?.lastname}</h5>
                                                        <h4 className="text-slate-400 text-xs py-[.1rem] sm:py-1">Total Savings: &#8358;{savings?.total?.toLocaleString()}</h4>
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
                                                    <FaClock className="text-inherit mt-[.1rem]" /> <p className="">{moment(savings.createdAt).format("DD-MM-YYYY")}</p>
                                                </div>
                                            </td>
                                            <td className="align-middle">
                                                <div className="flex justify-center gap-2">
                                                    <div className={`${savings.verdict === "Rejected" ? 'bg-red-100 text-red-500' : savings.verdict === "Granted" ? 'bg-teal-100 text-teal-500' : 'bg-slate-100 text-slate-500'} text-xs py-[.1rem] sm:py-1 px-3 rounded-sm font-medium`}>{savings.verdict}</div>
                                                </div>
                                            </td>
                                            {user?.type === "Admin" &&
                                                <td className="align-middle">
                                                    <div className="flex justify-center gap-2">
                                                        {savings.status === "Pending" && <button onClick={() => showReview(savings.id)} className="flex justify-center items-center gap-[.2rem] align-middle bg-success hover:bg-success/80 text-white dark:text-slate-900 px-3 rounded-sm cursor-pointer text-[.6rem] py-2 sm:py-1">Review</button>}
                                                    </div>
                                                </td>}
                                        </tr>
                                    ))
                                    :
                                    <tr>
                                        <td colSpan={user?.type === "Admin" ? 5 : 4}>
                                            <h4 className="text-slate-500 text-center dark:text-slate-300">No Record(s) Found</h4>
                                        </td>
                                    </tr>
                            }
                        </tbody>
                    </table>
                </div>
            </section>

            <Modal modalRef={reviewRef}>
                <div className='p-5 flex flex-col gap-4'>
                    <span className="text-[.6rem] sm:text-[.75rem] text-teal-700 bg-teal-200/50 dark:bg-teal-200 py-2 px-[.3rem] rounded-xs uppercase text-center">Savings Action Form </span>
                    <div className="w-full flex items-center gap-2">
                        <div className={`h-7 sm:h-8 w-7 sm:w-8 flex-shrink-0 flex justify-center items-center rounded-full overflow-hidden relative bg-success dark:bg-slate-100 text-slate-100 dark:text-slate-600`}>
                            <FaPiggyBank className='text-sm sm:text-base' />
                        </div>
                        <div className='flex-1 flex flex-col justify-center w-full'>
                            <div className="flex justify-between items-center gap-4 text-slate-600">
                                <div className="flex flex-col">
                                    <h5 className="text-sm font-semibold leading-tight whitespace-nowrap flex items-center">{`${selectedSavings?.saver?.firstname} ${selectedSavings?.saver?.middlename} ${selectedSavings?.saver?.lastname}`} </h5>
                                    {/* <p className="text-slate-400 text-xs py-[.1rem] sm:py-1">Account Balance: &#8358;{selectedSavings?.saver?.balance?.toLocaleString()}</p> */}
                                </div>
                                <div className="flex justify-center items-center gap-[.2rem] align-middle dark:text-slate-100 text-[.6rem]">
                                    <FaCalendarAlt className="text-inherit opacity-60" /> <p className="">{selectedSavings?.createdAt.toString()}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col font-normal divide-y divide-slate-300 border-b border-b-slate-300 pt-4 pb-0">
                        {ShowComputedValues()}
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
            <Modal modalRef={modalRef}>
                <div className='p-5 flex flex-col gap-4'>
                    <span className="text-[.6rem] sm:text-[.75rem] text-teal-700 bg-teal-200/50 dark:bg-teal-200 py-2 px-[.3rem] rounded-xs uppercase text-center">Savings Form </span>
                    <div className="w-full flex items-center gap-2">
                        <div className={`h-7 sm:h-8 w-7 sm:w-8 flex-shrink-0 flex justify-center items-center rounded-full overflow-hidden relative bg-success dark:bg-slate-100 text-slate-100 dark:text-slate-600`}>
                            <FaPiggyBank className='text-sm sm:text-base' />
                        </div>
                        <div className='flex-1 flex flex-col justify-center w-full'>
                            <div className="flex justify-between items-center gap-4 text-slate-600">
                                <div className="flex flex-col">
                                    <h5 className="text-sm font-semibold leading-tight whitespace-nowrap flex items-center">{`${user?.firstname} ${user?.middlename} ${user?.lastname}`} </h5>
                                    {/* <p className="text-slate-400 text-xs py-[.1rem] sm:py-1">Your Current Balance: &#8358;{user?.balance?.toLocaleString()}</p> */}
                                </div>
                                <div className="flex justify-center items-center gap-[.2rem] align-middle dark:text-slate-100 text-[.6rem]">
                                    <FaCalendarAlt className="text-inherit opacity-60" /> <p className="">{moment(new Date().getTime()).format("DD-MM-YYYY")}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col font-normal">
                        <div className="flex justify-between items-center gap-2 border-y border-y-slate-300 py-2 mb-2 text-slate-700">
                            <span className="text-xs font-light flex items-center justify-start flex-1">Amount to Save:</span>
                            <input type="hidden" name="saver" value={user?.id} />
                            <div className="flex overflow-x-hidden relative w-[8rem] max-w-[8rem] border border-gray-300 rounded-md px-2 py-0">
                                <input type="number" required min={500} ref={amountRef} name='amount' placeholder={`Minimum of ₦500`} className="relative outline-none py-2 pl-2 pr-4 text-gray-600 text-xs placeholder-opacity-70 font-normal flex w-[10rem] bg-transparent focus-within:bg-transparent focus:bg-transparent" />
                            </div>
                        </div>
                        <button type="submit" className="py-2 px-4 sm:px-8 bg-success text-white text-[.6rem] text-xs rounded-md hover:bg-success/90 cursor-pointer" disabled={loading}>{loading ? 'Processing...' : 'Make Payment'}</button>
                    </form>
                </div>
            </Modal>
            <Modal modalRef={previewRef}>
                <div className='p-5 flex flex-col gap-4'>
                    <span className="text-[.6rem] sm:text-[.75rem] text-sky-700 bg-sky-200/50 dark:bg-sky-200 p-2 px-[.3rem] rounded-xs uppercase text-center">Loan Action Form </span>
                    <div className="w-full flex items-center gap-2">
                        <div className={`h-7 sm:h-8 w-7 sm:w-8 flex-shrink-0 flex justify-center items-center rounded-full overflow-hidden relative bg-primary dark:bg-slate-100 text-slate-100 dark:text-slate-600`}>
                            <FaPiggyBank className='text-sm sm:text-base' />
                        </div>
                        <div className='flex-1 flex flex-col justify-center w-full'>
                            <div className="flex justify-between items-center gap-4 text-slate-600">
                                <div className="flex flex-col">
                                    {/* <span className="text-[.4rem] bg-slate-200/50 dark:bg-slate-200 py-2 px-[.3rem] rounded-xs uppercase ml-2">{selectedSavings?.verdict}</span> */}
                                    <h5 className="text-sm font-semibold leading-tight whitespace-nowrap flex items-center">{`${selectedSavings?.saver?.firstname} ${selectedSavings?.saver?.middlename} ${selectedSavings?.saver?.lastname}`} </h5>
                                    <p className="text-slate-400 text-xs py-[.1rem] sm:py-1">Account Balance: &#8358;{selectedSavings?.saver?.balance?.toLocaleString()}</p>
                                </div>
                                <div className="flex justify-center items-center gap-[.2rem] align-middle dark:text-slate-100 text-[.6rem]">
                                    <FaCalendarAlt className="text-inherit opacity-60" /> <p className="">{selectedSavings?.createdAt.toString()}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-between items-center border border-slate-200 border-l-0 border-r-0 py-4">
                        {/* <h3 className="-my-2 text-slate-700 text-center text-lg font-bold"><span className="text-xs font-light flex items-center">Amount Requested:</span> &#8358;{selectedSavings?.amount.toLocaleString()}</h3>
                        <h3 className="-my-2 text-slate-700 text-center text-lg font-bold"><span className="text-xs font-light flex items-center">Amount Repaid:</span> &#8358;{selectedSavings?.payback?.toLocaleString() || 0}</h3> */}
                    </div>
                </div>
            </Modal>
        </>
    )
}
