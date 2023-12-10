'use client'

import { MemberProps, WithdrawalProps } from '@/types'
import React, { useRef, useState } from 'react'
import Modal from '@/app/(auth)/ui/Modal'
import { FaCalendarAlt, FaClock } from 'react-icons/fa'
import Image from 'next/image'

import { MdAttachMoney } from 'react-icons/md'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import { TableSearch } from '../../ui'
import { edimcs_dollarbills } from '@/assets/images'
import moment from 'moment'
import { handleWithdrawal } from '@/actions'

export default function WithdrawalList({ withdrawalData, user }: { withdrawalData: WithdrawalProps[], user: MemberProps }) {
    const [allTableData, setAllTableData] = useState<WithdrawalProps[] | []>(withdrawalData)
    const [tableData, setTableData] = useState<WithdrawalProps[] | []>(withdrawalData)
    const modalRef = useRef<HTMLDialogElement | null>(null)
    const reviewRef = useRef<HTMLDialogElement | null>(null)
    const previewRef = useRef<HTMLDialogElement | null>(null)
    const formRef = useRef<HTMLFormElement | null>(null)
    const [charges, setCharges] = useState<number>(1)
    const amountRef = useRef<HTMLInputElement | null>(null)
    const inputRef = useRef<HTMLInputElement | null>(null)

    const [selectedWithdrawal, setSelectedWithdrawal] = useState<WithdrawalProps>()
    const [loading, setLoading] = useState<boolean>(false)
    const router = useRouter()


    const showReview = (id: string) => {
        try {
            const targetDeposit = withdrawalData?.find(withdrawal => withdrawal.id === id)
            if (targetDeposit) {
                setSelectedWithdrawal(prev => ({ ...targetDeposit }))
            }
            reviewRef.current?.showModal()
        }
        catch (err) {
            console.log({ err })
        }
    }

    const showPreview = (id: string) => {
        try {
            const targetDeposit = withdrawalData?.find(withdrawal => withdrawal.id === id)
            if (targetDeposit) {
                setSelectedWithdrawal(prev => ({ ...targetDeposit }))
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

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault()
        let keyword = inputRef.current?.value.toLowerCase() || ''
        if (!keyword || keyword === '') {
            setTableData(allTableData)
        }
        else {

            const result = tableData.filter(el => el.amount.toString().toLowerCase().includes(keyword) || el?.withdrawer?.balance?.toString().toLowerCase().includes(keyword) || el.createdAt.toString().toLowerCase().includes(keyword) || el?.withdrawer?.firstname.toLowerCase().includes(keyword) || el?.withdrawer?.middlename.toLowerCase().includes(keyword) || el?.withdrawer?.lastname.toLowerCase().includes(keyword) || el?.withdrawer?.memberId.toString().toLowerCase().includes(keyword) || el?.withdrawer?.email.toLowerCase().includes(keyword) || el?.withdrawer?.phone?.toString().toLowerCase().includes(keyword) || el.status.toString().toLowerCase().includes(keyword) || el.verdict.toString().toLowerCase().includes(keyword))
            setTableData(prev => [...result])
        }
    }

    const ShowComputedValues = () => {
        return (
            <>
                {selectedWithdrawal?.status === "Pending" ? <div className="flex justify-between items-center gap-2 py-1">
                    <span className="text-xs font-light flex items-center justify-start flex-1">Add Charges (%):</span>
                    <div className="flex overflow-x-hidden relative w-[3rem] max-w-[3rem] border border-gray-300 rounded-md px-2 py-0">
                        <input value={charges} onChange={e => setCharges(Number(e.target.value))} type="number" required min={0} max={10} name='charges' placeholder={`Enter an Interest Rate NOT greater than 10`} className="relative outline-none py-2 pl-2 pr-4  text-gray-600 text-xs placeholder-opacity-70 font-normal flex w-[6rem] bg-transparent focus-within:bg-transparent focus:bg-transparent" />
                    </div>
                </div> : ""}
                <div className="flex justify-between items-center gap-2 py-1 text-slate-700">
                    <span className="text-xs font-light flex items-center justify-start">Amount Requested:</span>
                    <h3 className="text-right text-sm font-semibold">&#8358;{Number(selectedWithdrawal?.amount).toFixed().toLocaleString()}</h3>
                </div>
                <div className="flex justify-between items-center gap-2 py-1 text-slate-700">
                    <span className="text-xs font-light flex items-center justify-start">Charges:</span>
                    {selectedWithdrawal?.status === "Pending" ? <h3 className="text-right text-sm font-medium">&#8358;{(Number(selectedWithdrawal?.amount || 1) * (charges / 100)).toLocaleString()}</h3> : ""}
                </div>
                <div className="flex justify-between items-center gap-2 py-1 text-slate-700">
                    <span className="text-xs font-light flex items-center justify-start">Total Withdrawal:</span>
                    {selectedWithdrawal?.status === "Pending" ? <h3 className="text-right text-lg font-semibold">&#8358;{(Number(selectedWithdrawal?.amount || 1) - (Number(selectedWithdrawal?.amount || 1) * (charges / 100))).toLocaleString()}</h3> : ""}
                </div>
            </>
        )
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true)
        const formData = new FormData(formRef?.current!)
        const res = await handleWithdrawal(formData)
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

    return (
        <>
            <section className="relative flex flex-col gap-2 p-4 bg-white  dark:bg-[#dbf0f724] dark:shadow-black shadow-slate-200 shadow-md rounded-lg">
                <div className="w-full overflow-x-scroll pb-6 x-scrollbar">
                    <table className="w-full text-slate-500 dark:text-slate-400 text-xs sm:text-sm min-w-[20rem]">
                        <thead>
                            <tr>
                                <th colSpan={user?.type === "Admin" ? 6 : 5}>
                                    <TableSearch title={`WITHDRAWAL ${user?.type === "Admin" ? 'LIST' : 'RECORDS'}`} key={'72088234'} handleSearch={handleSearch} inputRef={inputRef}>
                                        <button onClick={() => modalRef.current?.showModal()} className="text-white bg-danger px-4 py-2 rounded-md cursor-pointer text-xs font-light">Request Withdrawal</button>
                                    </TableSearch>
                                </th>
                            </tr>
                            <tr className='text-slate-600 dark:text-slate-50 text-xs text-center'>
                                <th className='font-light text-left'>Member Details</th>
                                <th className='font-light'>Withdrawal Amount</th>
                                <th className='font-light'>Withdrawal Date</th>
                                <th className='font-light'>Verdict</th>
                                <th className='font-light'>Status</th>
                                {user?.type === "Admin" && <th className='font-light'>Action</th>}
                            </tr>
                        </thead>
                        <tbody className='w-full'>
                            {
                                tableData.length ?
                                    tableData.map(withdrawal => (
                                        <tr key={withdrawal.id} className='hover:bg-slate-50 dark:hover:bg-slate-900/30'>
                                            <td>
                                                <div onClick={() => showPreview(withdrawal.id.toString())} className="max-w-sm w-max flex items-center gap-2 cursor-pointer">
                                                    <div className="h-7 sm:h-8 w-7 sm:w-8 flex justify-center items-center rounded-full overflow-hidden text-white dark:text-danger relative bg-danger dark:bg-slate-100">
                                                        {user?.type === "Member" ? <MdAttachMoney className='text-sm sm:text-base text-inherit' /> : <Image src={withdrawal?.withdrawer?.image || edimcs_dollarbills} alt={`${withdrawal?.withdrawer?.firstname} ${withdrawal?.withdrawer?.middlename} ${withdrawal?.withdrawer?.lastname}`} fill={true} className="absolute left-0 top-0 object-cover w-full h-full" />}
                                                    </div>
                                                    <div className='flex flex-col'>
                                                        <h5 className="text-sm font-medium leading-tight whitespace-nowrap">{withdrawal.withdrawer?.firstname} {withdrawal.withdrawer?.middlename} {withdrawal.withdrawer?.lastname}</h5>
                                                        <h4 className="text-slate-400 text-xs py-[.1rem] sm:py-1">Balance: &#8358;{user?.balance?.toLocaleString()}</h4>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="align-middle">
                                                <div className="flex justify-center items-center align-middle mx-auto whitespace-nowrap">
                                                    <div className={`${withdrawal.verdict === "Rejected" ? 'bg-[#f34e7c20] dark:bg-[#faf0f3de] text-danger' : withdrawal.verdict === "Granted" ? 'bg-[#f34e7c20] dark:bg-[#faf0f3de] text-danger' : 'bg-slate-100 text-slate-500'} text-xs py-[.1rem] sm:py-1 px-3 rounded-sm font-medium`}>-&#8358;{withdrawal.amount.toLocaleString()}</div>
                                                </div>
                                            </td>
                                            <td className="align-middle">
                                                <div className="flex justify-center items-center gap-[.2rem] align-middle text-slate-400 text-xs py-[.1rem] sm:py-1">
                                                    <FaClock className="text-inherit mt-[.1rem]" /> <p className="">{moment(withdrawal.createdAt).format("DD-MM-YYYY")}</p>
                                                </div>
                                            </td>
                                            <td className="align-middle">
                                                <div className="flex justify-center gap-2">
                                                    <div className={`${withdrawal.verdict === "Rejected" ? 'bg-[#f34e7c20] dark:bg-[#faf0f3de] text-danger' : withdrawal.verdict === "Granted" ? 'bg-teal-100 text-teal-500' : 'bg-slate-100 text-slate-500'} text-xs py-[.1rem] sm:py-1 px-3 rounded-sm font-medium`}>{withdrawal.verdict}</div>
                                                </div>
                                            </td>
                                            <td className="align-middle">
                                                <div className="flex justify-center gap-2">
                                                    <div className={`${withdrawal.status === "Suspended" ? 'bg-[#f34e7c20] dark:bg-[#faf0f3de] text-danger' : 'bg-slate-100 text-slate-500'} text-xs py-[.1rem] sm:py-1 px-3 rounded-sm font-medium`}>{withdrawal.status}</div>
                                                </div>
                                            </td>
                                            {user?.type === "Admin" &&
                                                <td className="align-middle">
                                                    <div className="flex justify-center gap-2">
                                                        {withdrawal.verdict === "Pending" && <button onClick={() => showReview(withdrawal.id)} className="flex justify-center items-center gap-[.2rem] align-middle bg-success hover:bg-success/80 text-white dark:text-slate-900 px-3 rounded-sm cursor-pointer text-[.6rem] py-2 sm:py-1">Review</button>}
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
            {
                user?.type === "Admin" ? <>
                    {/* Withdrawal Verdict Form */}
                    <Modal modalRef={reviewRef}>
                        <div className='p-5 flex flex-col gap-4 text-slate-700'>
                            <span className="text-[.6rem] sm:text-[.75rem] text-danger bg-[#f34e7c20] dark:bg-[#faf0f3de] dark:bg-danger p-2 px-[.3rem] rounded-xs uppercase text-center">Withdrawal Action Form </span>
                            <div className="w-full flex items-center gap-2">
                                <div className={`h-7 sm:h-8 w-7 sm:w-8 flex-shrink-0 flex justify-center items-center rounded-full overflow-hidden relative bg-danger dark:bg-slate-100 text-slate-100 dark:text-slate-600`}>
                                    <MdAttachMoney className='text-sm sm:text-base' />
                                </div>
                                <div className='flex-1 flex flex-col justify-center w-full'>
                                    <div className="flex justify-between items-center gap-4 text-slate-600">
                                        <div className="flex flex-col">
                                            {/* <span className="text-[.4rem] bg-slate-200/50 dark:bg-slate-200 p-[.2rem] px-[.3rem] rounded-xs uppercase ml-2">{selectedWithdrawal?.verdict}</span> */}
                                            <h5 className="text-sm font-semibold leading-tight whitespace-nowrap flex items-center">{`${selectedWithdrawal?.withdrawer?.firstname} ${selectedWithdrawal?.withdrawer?.middlename} ${selectedWithdrawal?.withdrawer?.lastname}`} </h5>
                                            <p className="text-slate-400 text-xs py-[.1rem] sm:py-1">Account Balance: &#8358;{selectedWithdrawal?.withdrawer?.balance?.toLocaleString()}</p>
                                        </div>
                                        <div className="flex justify-center items-center gap-[.2rem] align-middle dark:text-slate-100 text-[.6rem]">
                                            <FaCalendarAlt className="text-inherit opacity-60" /> <p className="">{moment(selectedWithdrawal?.createdAt).format("DD-MM-YYYY")}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col font-normal divide-y divide-slate-300 border-b border-b-slate-300 pt-4 pb-0">
                                {ShowComputedValues()}
                            </div>
                            {
                                selectedWithdrawal?.verdict === "Pending" ?
                                    <>
                                        <div className="flex gap-2 justify-end">
                                            <button onClick={() => handleReview(selectedWithdrawal?.id, "Approve")} className="flex justify-center items-center gap-[.2rem] align-middle bg-success hover:bg-success/80 text-white px-5 rounded-sm cursor-pointer text-[.6rem] py-[.4rem]" disabled={loading}>Approve</button>
                                            <button onClick={() => handleReview(selectedWithdrawal?.id, "Reject")} className="flex justify-center items-center gap-[.2rem] align-middle bg-danger hover:bg-danger/80 text-white px-5 rounded-sm cursor-pointer text-[.6rem] py-[.4rem]" disabled={loading}>Reject</button>
                                        </div> </> : ""
                            }
                        </div>
                    </Modal>
                </> : <></>
            }
            <Modal modalRef={modalRef}>
                <div className='p-5 flex flex-col gap-4'>
                    <span className="text-[.6rem] sm:text-[.75rem] text-danger bg-[#faf0f3de] py-2 px-[.3rem] rounded-xs uppercase text-center">Withdrawal Form </span>
                    <div className="w-full flex items-center gap-2">
                        <div className={`h-7 sm:h-8 w-7 sm:w-8 flex-shrink-0 flex justify-center items-center rounded-full overflow-hidden relative bg-danger dark:bg-slate-100 text-slate-100 dark:text-slate-600`}>
                            <MdAttachMoney className='text-sm sm:text-base' />
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
                        <div className="flex justify-between items-center gap-2 border-y border-y-slate-300 py-2 my-2 text-slate-700">
                            <span className="text-xs font-light flex items-center justify-start flex-1">Amount to Withdraw:</span>
                            <input type="hidden" name="withdrawer" value={user?.id} />
                            <div className="flex overflow-x-hidden relative w-[8rem] max-w-[8rem] border border-gray-300 rounded-md px-2 py-0">
                                <input type="number" required min={500} max={user?.balance} ref={amountRef} name='amount' placeholder={`Minimum of ₦500`} className="relative outline-none py-2 pl-2 pr-4 text-gray-600 text-xs placeholder-opacity-70 font-normal flex w-[10rem] bg-transparent focus-within:bg-transparent focus:bg-transparent" />
                            </div>
                        </div>
                        {user?.balance! < 500 ? <span className="text-[.6rem] sm:text-[.75rem] text-danger bg-[#f34e7c20] dark:bg-[#faf0f3de] dark:bg-danger p-2 px-[.3rem] rounded-xs uppercase text-center">Sorry, your acount is lower than ₦500 </span> :
                            <button type="submit" className="py-2 px-4 sm:px-8 bg-danger text-white text-[.6rem] text-xs rounded-md hover:bg-danger/90 cursor-pointer" disabled={loading}>{loading ? 'Processing...' : 'Request Withdrawal'}</button>}
                    </form>
                </div>
            </Modal>
            <Modal modalRef={previewRef}>
                <div className='p-5 flex flex-col gap-4'>
                    <span className="text-[.6rem] sm:text-[.75rem] text-danger bg-[#f34e7c20] dark:bg-[#faf0f3de] dark:bg-danger p-2 px-[.3rem] rounded-xs uppercase text-center">Withdrawal Action Form </span>
                    <div className="w-full flex items-center gap-2">
                        <div className={`h-7 sm:h-8 w-7 sm:w-8 flex-shrink-0 flex justify-center items-center rounded-full overflow-hidden relative bg-danger dark:bg-slate-100 text-slate-100 dark:text-slate-600`}>
                            <MdAttachMoney className='text-sm sm:text-base' />
                        </div>
                        <div className='flex-1 flex flex-col justify-center w-full'>
                            <div className="flex justify-between items-center gap-4 text-slate-600">
                                <div className="flex flex-col">
                                    {/* <span className="text-[.4rem] bg-slate-200/50 dark:bg-slate-200 p-[.2rem] px-[.3rem] rounded-xs uppercase ml-2">{selectedWithdrawal?.verdict}</span> */}
                                    <h5 className="text-sm font-semibold leading-tight whitespace-nowrap flex items-center">{`${selectedWithdrawal?.withdrawer?.firstname} ${selectedWithdrawal?.withdrawer?.middlename} ${selectedWithdrawal?.withdrawer?.lastname}`} </h5>
                                    <p className="text-slate-400 text-xs py-[.1rem] sm:py-1">Account Balance: &#8358;{selectedWithdrawal?.withdrawer?.balance?.toLocaleString()}</p>
                                </div>
                                <div className="flex justify-center items-center gap-[.2rem] align-middle dark:text-slate-100 text-[.6rem]">
                                    <FaCalendarAlt className="text-inherit opacity-60" /> <p className="">{moment(selectedWithdrawal?.createdAt).format("DD-MM-YYYY")}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>
        </>
    )
}
