'use client'

import { DepositProps, MemberProps } from '@/types'
import React, { useRef, useState } from 'react'
import Modal from '@/app/(auth)/ui/Modal'
import { FaCalendarAlt, FaClock } from 'react-icons/fa'
import Image from 'next/image'

import { MdAccountBalanceWallet } from 'react-icons/md'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import { TableSearch } from '../../ui'
import { edimcs_dollarbills } from '@/assets/images'
import moment from 'moment'
import { handleDeposits, verdictAction } from '@/actions'
import { handleExport } from '@/lib/handleExport'


export default function DepositList({ depositData, user }: { depositData: DepositProps[], user: MemberProps }) {
    const [allTableData, setAllTableData] = useState<DepositProps[] | []>(depositData)
    const [tableData, setTableData] = useState<DepositProps[] | []>(depositData)
    const modalRef = useRef<HTMLDialogElement | null>(null)
    const reviewRef = useRef<HTMLDialogElement | null>(null)
    const previewRef = useRef<HTMLDialogElement | null>(null)
    const formRef = useRef<HTMLFormElement | null>(null)
    const [interest, setInterest] = useState<number>(1)
    const amountRef = useRef<HTMLInputElement | null>(null)
    const inputRef = useRef<HTMLInputElement | null>(null)

    const [selectedDeposit, setSelectedDeposit] = useState<DepositProps>()
    const [loading, setLoading] = useState<boolean>(false)
    const router = useRouter()

    const refreshData = () => {
        router.replace(location.pathname);
      };


    const showReview = (id: string) => {
        try {
            const targetDeposit = depositData?.find(deposit => deposit.id === id)
            if (targetDeposit) {
                setSelectedDeposit(prev => ({ ...targetDeposit }))
            }
            reviewRef.current?.showModal()
        }
        catch (err) {
            console.log({ err })
        }
    }

    const showPreview = (id: string) => {
        try {
            const targetDeposit = depositData?.find(deposit => deposit.id === id)
            if (targetDeposit) {
                setSelectedDeposit(prev => ({ ...targetDeposit }))
            }
            previewRef.current?.showModal()
        }
        catch (err) {
            console.log({ err })
        }
    }

    const handleReview = async (id: string, verdict: string) => {
        setLoading(true)
        const depositInterest = selectedDeposit?.amount! * (interest)/100
        try {
            const res = await verdictAction("deposit", id, verdict, depositInterest, selectedDeposit?.amount!)
            if(res.error){
                reviewRef.current?.close()
                toast.error(res?.message, {id: "8290", duration: 5000})
            }
            else{
                reviewRef.current?.close()
                toast.success(res?.message, {id: "8290", duration: 5000})
            }
            setLoading(false)
            router.push("/dashboard/deposits")
            refreshData()
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
            const result = tableData.filter(el => el.amount.toString().toLowerCase().includes(keyword) || el?.depositor?.balance?.toString().toLowerCase().includes(keyword) || el.createdAt.toString().toLowerCase().includes(keyword) || el?.depositor?.firstname.toLowerCase().includes(keyword) || el?.depositor?.middlename.toLowerCase().includes(keyword) || el?.depositor?.lastname.toLowerCase().includes(keyword) || el?.depositor?.memberId.toString().toLowerCase().includes(keyword) || el?.depositor?.email.toLowerCase().includes(keyword) || el?.depositor?.phone?.toString().toLowerCase().includes(keyword) || el.status.toString().toLowerCase().includes(keyword) || el.verdict.toString().toLowerCase().includes(keyword))
            setTableData(prev => [...result])
        }
    }

    const ShowComputedValues = () => {
        return (
            <>
                {selectedDeposit?.status === "Pending" ? <div className="flex justify-between items-center gap-2 py-1">
                    <span className="text-xs font-light flex items-center justify-start flex-1">Add Interest (%):</span>
                    <div className="flex overflow-x-hidden relative w-[3rem] max-w-[3rem] border border-gray-300 rounded-md px-2 py-0">
                        <input value={interest} onChange={e => setInterest(Number(e.target.value))} type="number" required min={0} max={10} name='interest' placeholder={`Enter an Interest Rate NOT greater than 10`} className="relative outline-none py-2 pl-2 pr-4  text-gray-600 text-xs placeholder-opacity-70 font-normal flex w-[6rem] bg-transparent focus-within:bg-transparent focus:bg-transparent" />
                    </div>
                </div> : ""}
                <div className="flex justify-between items-center gap-2 py-1 text-slate-700">
                    <span className="text-xs font-light flex items-center justify-start">Amount Deposited:</span>
                    <h3 className="text-right text-sm font-semibold">&#8358;{selectedDeposit?.amount.toLocaleString()}.00</h3>
                </div>
                <div className="flex justify-between items-center gap-2 py-1 text-slate-700">
                    <span className="text-xs font-light flex items-center justify-start">Interest:</span>
                    {selectedDeposit?.status === "Pending" ? <h3 className="text-right text-sm font-medium">&#8358;{(Number(selectedDeposit?.amount || 1) * (interest / 100)).toLocaleString()}</h3> : ""}
                </div>
                <div className="flex justify-between items-center gap-2 py-1 text-slate-700">
                    <span className="text-xs font-light flex items-center justify-start">Total Deposit Record:</span>
                    {selectedDeposit?.status === "Pending" ? <h3 className="text-right text-lg font-semibold">&#8358;{(Number(selectedDeposit?.amount || 1) + (Number(selectedDeposit?.amount || 1) * (interest / 100))).toLocaleString()}</h3> : ""}
                </div>
            </>

        )
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true)
        const formData = new FormData(formRef?.current!)
        const res = await handleDeposits(formData)
        if (res.error) {
            modalRef.current?.close()
            toast.error(res?.message, { id: "8290", duration: 5000 })
        }
        else {
            modalRef.current?.close()
            toast.success(res?.message, { id: "8290", duration: 5000 })
        }
        setLoading(false)
        router.push("/dashboard/deposits")
    }

    const handleDownload = async (e: React.MouseEvent) => {
        try {
            const heading = [`S/N`, `Member Details`, `Amount`, `Date`, `Status`, `Verdict`];
            const fileName = `Deposit Record - ${moment(new Date()).format("DD-MM-YYYY")}`
            const data = tableData.map((deposit, i) => ([`${i + 1}`, `${deposit?.depositor?.firstname} ${deposit?.depositor?.middlename} ${deposit?.depositor?.lastname}`, deposit?.amount, moment(deposit?.createdAt).format("MM-DD-YYYY"), deposit?.status, deposit?.verdict]))
            await handleExport(heading, data, fileName)
        } catch (error) {
            toast.error(`Unable to export selected record. Please, try again`, { id: "8290", duration: 6000})
        }
    }

    return (
        <>
            <section className="relative flex flex-col gap-2 p-4 bg-white dark:bg-[#dbf0f724] dark:shadow-black shadow-slate-200 shadow-md rounded-lg">
                <div className="w-full overflow-x-scroll pb-6 x-scrollbar">
                    <table className="w-full text-slate-500 dark:text-slate-400 text-xs sm:text-sm min-w-[20rem]">
                        <thead>
                            <tr>
                                <th colSpan={user?.type === "Admin" ? 6 : 5}>
                                    <TableSearch title='DEPOSIT' key={'72088234'} handleSearch={handleSearch} inputRef={inputRef}>
                                        <div className="md:ml-[5rem] flex gap-2">
                                            <button onClick={() => modalRef.current?.showModal()} className="text-white bg-sky-500 px-4 py-2 rounded-md cursor-pointer text-xs font-light">Make Deposit</button>
                                            <button onClick={handleDownload} className="bg-default hover:bg-default/90 text-white text-xs font-light rounded-md py-2 px-4 cursor-pointer hover:shadow-default">Download Record</button>
                                        </div>
                                    </TableSearch>
                                </th>
                            </tr>
                            <tr className='text-slate-600 dark:text-slate-50 text-xs text-center'>
                                <th className='font-light text-left'>Member Details</th>
                                <th className='font-light'>Deposit Amount</th>
                                <th className='font-light'>Deposit Date</th>
                                <th className='font-light'>Verdict</th>
                                <th className='font-light'>Status</th>
                                {user?.type === "Admin" && <th className='font-light'>Action</th>}
                            </tr>
                        </thead>
                        <tbody className='w-full'>
                            {
                                tableData.length ?
                                    tableData.map(deposit => (
                                        <tr key={deposit.id} className='hover:bg-slate-50 dark:hover:bg-slate-900/30'>
                                            <td>
                                                <div onClick={() => showPreview(deposit.id.toString())} className="max-w-sm w-max flex items-center gap-2 cursor-pointer">
                                                    <div className="h-7 sm:h-8 w-7 sm:w-8 flex justify-center items-center rounded-full overflow-hidden text-white dark:text-primary relative bg-primary dark:bg-slate-100">
                                                        {user?.type === "Member" ? <MdAccountBalanceWallet className='text-sm sm:text-base text-inherit' /> : <Image src={deposit?.depositor?.image || edimcs_dollarbills} alt={`${deposit?.depositor?.firstname} ${deposit?.depositor?.middlename} ${deposit?.depositor?.lastname}`} fill={true} className="absolute left-0 top-0 object-cover w-full h-full" />}
                                                    </div>
                                                    <div className='flex flex-col'>
                                                        <h5 className="text-sm font-medium leading-tight whitespace-nowrap">{deposit.depositor?.firstname} {deposit.depositor?.middlename} {deposit.depositor?.lastname}</h5>
                                                        <h4 className="text-slate-400 text-xs py-[.1rem] sm:py-1">Balance: &#8358;{deposit?.depositor?.balance?.toLocaleString()}</h4>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="align-middle">
                                                <div className="flex justify-center items-center align-middle mx-auto whitespace-nowrap">
                                                    <div className={`${deposit.verdict === "Rejected" ? 'bg-red-100 text-red-500' : deposit.verdict === "Granted" ? 'bg-sky-100 text-sky-500' : 'bg-slate-100 text-slate-500'} text-xs py-[.1rem] sm:py-1 px-3 rounded-sm font-medium`}>&#8358;{deposit.amount.toLocaleString()}</div>
                                                </div>
                                            </td>
                                            <td className="align-middle">
                                                <div className="flex justify-center items-center gap-[.2rem] align-middle text-slate-400 text-xs py-[.1rem] sm:py-1">
                                                    <FaClock className="text-inherit mt-[.1rem]" /> <p className="">{moment(deposit.createdAt).format("DD-MM-YYYY")}</p>
                                                </div>
                                            </td>
                                            <td className="align-middle">
                                                <div className="flex justify-center gap-2">
                                                    <div className={`${deposit.verdict === "Rejected" ? 'bg-red-100 text-red-500' : deposit.verdict === "Granted" ? 'bg-teal-100 text-teal-500' : 'bg-slate-100 text-slate-500'} text-xs py-[.1rem] sm:py-1 px-3 rounded-sm font-medium`}>{deposit.verdict}</div>
                                                </div>
                                            </td>
                                            <td className="align-middle">
                                                <div className="flex justify-center gap-2">
                                                    <div className={`${deposit.status === "Suspended" ? 'bg-red-100 text-red-500' : deposit.status === "Completed" ? 'bg-sky-100 text-sky-500' : 'bg-slate-100 text-slate-500'} text-xs py-[.1rem] sm:py-1 px-3 rounded-sm font-medium`}>{deposit.status}</div>
                                                </div>
                                            </td>
                                            {user?.type === "Admin" &&
                                                <td className="align-middle">
                                                    <div className="flex justify-center gap-2">
                                                        {deposit.verdict === "Pending" && <button onClick={() => showReview(deposit.id)} className="flex justify-center items-center gap-[.2rem] align-middle bg-success hover:bg-success/80 text-white dark:text-slate-900 px-3 rounded-sm cursor-pointer text-[.6rem] py-2 sm:py-1">Review</button>}
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
                    {/* Deposit Verdict Form */}
                    <Modal modalRef={reviewRef}>
                        <div className='p-5 flex flex-col gap-4 text-slate-700'>
                            <span className="text-[.6rem] sm:text-[.75rem] text-sky-700 bg-sky-200/50 dark:bg-sky-200 p-2 px-[.3rem] rounded-xs uppercase text-center">Deposit Action Form </span>
                            <div className="w-full flex items-center gap-2">
                                <div className={`h-7 sm:h-8 w-7 sm:w-8 flex-shrink-0 flex justify-center items-center rounded-full overflow-hidden relative bg-primary dark:bg-slate-100 text-slate-100 dark:text-slate-600`}>
                                    <MdAccountBalanceWallet className='text-sm sm:text-base' />
                                </div>
                                <div className='flex-1 flex flex-col justify-center w-full'>
                                    <div className="flex justify-between items-center gap-4 text-slate-600">
                                        <div className="flex flex-col">
                                            {/* <span className="text-[.4rem] bg-slate-200/50 dark:bg-slate-200 py-2 px-[.3rem] rounded-xs uppercase ml-2">{selectedDeposit?.verdict}</span> */}
                                            <h5 className="text-sm font-semibold leading-tight whitespace-nowrap flex items-center">{`${selectedDeposit?.depositor?.firstname} ${selectedDeposit?.depositor?.middlename} ${selectedDeposit?.depositor?.lastname}`} </h5>
                                            <p className="text-slate-400 text-xs py-[.1rem] sm:py-1">Account Balance: &#8358;{selectedDeposit?.depositor?.balance?.toLocaleString()}</p>
                                        </div>
                                        <div className="flex justify-center items-center gap-[.2rem] align-middle dark:text-slate-100 text-[.6rem]">
                                            <FaCalendarAlt className="text-inherit opacity-60" /> <p className="">{moment(selectedDeposit?.createdAt).format("DD-MM-YYYY")}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col font-normal divide-y divide-slate-300 border-b border-b-slate-300 pt-4 pb-0">
                                {ShowComputedValues()}
                            </div>
                            {
                                selectedDeposit?.verdict === "Pending" ?
                                    <>
                                        <div className="flex gap-2 justify-end">
                                            <button onClick={() => handleReview(selectedDeposit?.id, "Granted")} className="flex justify-center items-center gap-[.2rem] align-middle bg-success hover:bg-success/80 text-white px-5 rounded-sm cursor-pointer text-[.6rem] py-[.4rem]" disabled={loading}>Approve</button>
                                            <button onClick={() => handleReview(selectedDeposit?.id, "Rejected")} className="flex justify-center items-center gap-[.2rem] align-middle bg-danger hover:bg-danger/80 text-white px-5 rounded-sm cursor-pointer text-[.6rem] py-[.4rem]" disabled={loading}>Reject</button>
                                        </div> </> : ""
                            }
                        </div>
                    </Modal>
                </> : <></>
            }
            <Modal modalRef={modalRef}>
                <div className='p-5 flex flex-col gap-4'>
                    <span className="text-[.6rem] sm:text-[.75rem] text-sky-700 bg-sky-200/50 dark:bg-sky-200 py-2 px-[.3rem] rounded-xs uppercase text-center">Deposit Form </span>
                    <div className="w-full flex items-center gap-2">
                        <div className={`h-7 sm:h-8 w-7 sm:w-8 flex-shrink-0 flex justify-center items-center rounded-full overflow-hidden relative bg-sky-400 dark:bg-slate-100 text-slate-100 dark:text-slate-600`}>
                            <MdAccountBalanceWallet className='text-sm sm:text-base' />
                        </div>
                        <div className='flex-1 flex flex-col justify-center w-full'>
                            <div className="flex justify-between items-center gap-4 text-slate-600">
                                <div className="flex flex-col">
                                    <h5 className="text-sm font-semibold leading-tight whitespace-nowrap flex items-center">{`${user?.firstname} ${user?.middlename} ${user?.lastname}`} </h5>
                                    <p className="text-slate-400 text-xs py-[.1rem] sm:py-1">Your Current Balance: &#8358;{user?.balance?.toLocaleString()}</p>
                                </div>
                                <div className="flex justify-center items-center gap-[.2rem] align-middle dark:text-slate-100 text-[.6rem]">
                                    <FaCalendarAlt className="text-inherit opacity-60" /> <p className="">{moment(new Date().getTime()).format("DD-MM-YYYY")}</p>
                                </div>
                            </div>
                            <div className="py-2 text-center text-xs md:text-sm text-sky-500 bg-sky-100 rounded-md md:col-span-2 flex flex-col divider-y divider-slate-200">
                                <h3 className="font-bold text-center">Please Make your Deposit into this Account BEFORE filling out the form</h3>
                                <div className="flex justify-between py-1"><span>Bank Name:</span> <span>Premium Trust</span></div>
                                <div className="flex justify-between py-1"><span>Account Number: 0040102612</span></div>
                                <div className="flex justify-between py-1"><span>Account Name:</span> <span>Enlightenment Drive Initiative Multipurpose Cooperative Society</span></div>
                            </div>
                        </div>
                    </div>
                    <form onSubmit={handleSubmit} ref={formRef} className="flex flex-col font-normal">
                        <div className="flex justify-between items-center gap-2 border-y border-y-slate-300 py-2 my-2 text-slate-700">
                            <span className="text-xs font-light flex items-center justify-start flex-1">Amount to Deposit:</span>
                            <input type="hidden" name="depositor" value={user?.id} />
                            <div className="flex overflow-x-hidden relative w-[8rem] max-w-[8rem] border border-gray-300 rounded-md px-2 py-0">
                                <input type="number" required min={500} ref={amountRef} name='amount' placeholder={`Minimum of ₦500`} className="relative outline-none py-2 pl-2 pr-4 text-gray-600 text-xs placeholder-opacity-70 font-normal flex w-[10rem] bg-transparent focus-within:bg-transparent focus:bg-transparent" />
                            </div>
                        </div>
                        <button type="submit" className="py-2 px-4 sm:px-8 bg-sky-400 text-white text-[.6rem] text-xs rounded-md hover:bg-sky-400/90 cursor-pointer" disabled={loading}>Make Payment</button>
                    </form>
                </div>
            </Modal>
            <Modal modalRef={previewRef}>
                <div className='p-5 flex flex-col gap-4'>
                    <span className="text-[.6rem] sm:text-[.75rem] text-sky-700 bg-sky-200/50 dark:bg-sky-200 p-2 px-[.3rem] rounded-xs uppercase text-center">Deposit Action Form </span>
                    <div className="w-full flex items-center gap-2">
                        <div className={`h-7 sm:h-8 w-7 sm:w-8 flex-shrink-0 flex justify-center items-center rounded-full overflow-hidden relative bg-primary dark:bg-slate-100 text-slate-100 dark:text-slate-600`}>
                            <MdAccountBalanceWallet className='text-sm sm:text-base' />
                        </div>
                        <div className='flex-1 flex flex-col justify-center w-full'>
                            <div className="flex justify-between items-center gap-4 text-slate-600">
                                <div className="flex flex-col">
                                    {/* <span className="text-[.4rem] bg-slate-200/50 dark:bg-slate-200 py-2 px-[.3rem] rounded-xs uppercase ml-2">{selectedDeposit?.verdict}</span> */}
                                    <h5 className="text-sm font-semibold leading-tight whitespace-nowrap flex items-center">{`${selectedDeposit?.depositor?.firstname} ${selectedDeposit?.depositor?.middlename} ${selectedDeposit?.depositor?.lastname}`} </h5>
                                    <p className="text-slate-400 text-xs py-[.1rem] sm:py-1">Account Balance: &#8358;{selectedDeposit?.depositor?.balance?.toLocaleString()}</p>
                                </div>
                                <div className="flex justify-center items-center gap-[.2rem] align-middle dark:text-slate-100 text-[.6rem]">
                                    <FaCalendarAlt className="text-inherit opacity-60" /> <p className="">{moment(selectedDeposit?.createdAt).format("DD-MM-YYYY")}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>
        </>
    )
}
