"use client"

import React, { useRef, useState } from 'react'
import { TextInput } from '@/components'
import { MemberProps } from '@/types'
import { useRouter } from 'next/navigation'
import { deleteAction, updateMemberProfile } from '@/actions'
import toast from 'react-hot-toast'
import { MemberRating, MemberType, Status } from '@prisma/client'
import { IoTrashBinOutline } from 'react-icons/io5'
import { Modal } from '@/app/(auth)/ui'
// import { useRouter } from 'next/navigation'


export default function SingleMemberData({ member, user }: { member: MemberProps | undefined, user: MemberProps }) {
    const modalRef = useRef<HTMLDialogElement | null>(null)
    // const reviewRef = useRef<HTMLDialogElement | null>(null)
    // const previewRef = useRef<HTMLDialogElement | null>(null)
    const formRef = useRef<HTMLFormElement | null>(null)
    const [loading, setLoading] = useState<boolean>(false)
    const router = useRouter()
    const [targetId, setTargetId] = useState<string>("")
    // const [payback, setPayback] = useState<number>(500)
    // const amountRef = useRef<HTMLInputElement | null>(null)
    // const inputRef = useRef<HTMLInputElement | null>(null)
    // const user: MemberProps | null = member;

    // useEffect(() => {
    //     (async () => {
    //         const { Stepper, initTE } = await require("tw-elements");

    //         initTE({ Stepper });
    //     })()
    // }, [])

    const handleConfirmation = () => {
        setTargetId(member?.id!)
        modalRef.current?.showModal()
    }

    const handleDelete = async() => {
        setLoading(true)
        try {
            const formData = new FormData()
            formData.append("deleteId", member?.id!)
            const res = await deleteAction(formData)
            if (res?.error) toast.error(res.message, { id: "86249", duration: 5000 })
            else {
                toast.success(res.message, { id: "86249", duration: 5000 })
                router.push("/dashboard/members")
            }
        } catch (error) {
            toast.error('Unable to complete request, please, check your network and try again', { id: "86249", duration: 5000 })
        }
        modalRef?.current?.close()
        setLoading(false)
    }



    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        try {
            const formData = new FormData(formRef?.current!)
            const res = await updateMemberProfile(formData)
            if (res?.error) toast.error(res.message, { id: "86249", duration: 5000 })
            else {
                toast.success(res.message, { id: "86249", duration: 5000 })
                router.refresh()
            }
        } catch (error) {
            toast.error('Unable to complete request, please, check your network and try again', { id: "86249", duration: 5000 })
        }
        setLoading(false)
    }


    return (
        <>
            <section className="relative">
                <div className="flex flex-col gap-6">
                    <div className="flex flex-col gap-4 p-4 pb-2 items-center">
                        {/* <h4 className="text-lg sm:text-2xl text-slate-700 text-center mb-2 font-bold opacity-80 relative after:bg-slate-300 after:-bottom-2 after:h-[.51px] after:w-11/12 after:left-1/2 after:-translate-x-1/2 after:absolute">{member?.firstname} {member?.middlename} {member?.lastname} Details</h4> */}
                        {/* <div className="flex gap-4 md:gap-6">
                            <div className="relative h-14 w-14 md:h-16 md:w-16 flex-shrink-0 rounded-full overflow-hidden cursor-pointer">
                                <Image src={member?.image || edimcs_bookkeeping} alt={`${member?.firstname} ${member?.middlename} ${member?.lastname}`} fill={true} className='object-cover' />
                            </div>
                            <div className="flex flex-col gap-1 w-max justify-center">
                                <div className="flex flex-col">
                                    <h3 className="text-sm text-primary">{member?.firstname} {member?.middlename} {member?.lastname}</h3>
                                    <p className="text-[.6rem] text-slate-500">{member?.accountDetails && member?.accountDetails[0]?.banker}</p>
                                    <p className="text-xs text-slate-500 font-semibold">{member?.accountDetails && member?.accountDetails[0]?.accountnumber}</p>
                                </div>
                            </div>
                        </div> */}
                    </div>
                    <div className="flex justify-center items-center">
                        <h4 className="text-lg sm:text-2xl text-slate-700 dark:text-slate-100 text-center font-bold opacity-80 relative">{member?.firstname} {member?.middlename} {member?.lastname} Details</h4>
                        <span className="text-[.6rem] bg-slate-200/50 dark:bg-slate-100 dark:text-slate-600 font-bold p-[.2rem] px-[.3rem] rounded-[2px] uppercase ml-2">{member?.type}</span>
                    </div>
                    <form ref={formRef} onSubmit={handleSubmit} className="px-5 mx-auto sm:px-0 w-full sm:w-10/12 grid sm:grid-cols-2 gap-4 sm:gap-y-6 sm:justify-center relative after:bg-slate-300 after:-top-4 after:h-[.51px] after:w-11/12 after:left-1/2 after:-translate-x-1/2 after:absolute">
                        <input type="hidden" name="id" defaultValue={member?.id} />
                        <input type="hidden" name="extra" defaultValue={user?.password} />
                        <TextInput disabled key={6255} id='memberId' name='memberId' label='Member ID' defaultValue={member?.memberId} minLength={10} required={true} containerClassName={'text-xs sm:col-span-2'} className='bg-slate-200' />
                        <div className={`flex flex-col gap-1`}>
                            <label htmlFor={"type"} className="text-gray-500 text-sm">Change Member Status</label>
                            <select name="status" id="status" defaultValue={member?.status} className="relative outline-none py-2 px-4 border border-gray-300 rounded-md text-gray-600 text-sm placeholder-opacity-70 focus-within:bg-transparent focus:bg-transparent">
                                {Object.keys(Status).map((memberStatus, i) => <option key={i.toString()} className='normal-text text-sm bg-white font-sans' defaultValue={memberStatus}>{memberStatus} </option>)}
                            </select>
                        </div>
                        <div className={`flex flex-col gap-1`}>
                            <label htmlFor={"type"} className="text-gray-500 text-sm">Change Member Type</label>
                            <select name="type" id="type" defaultValue={member?.type} className="relative outline-none py-2 px-4 border border-gray-300 rounded-md text-gray-600 text-sm placeholder-opacity-70 focus-within:bg-transparent focus:bg-transparent">
                                {Object.keys(MemberType).map((memberType, i) => <option key={i.toString()} className='normal-text text-sm bg-white font-sans' defaultValue={memberType}>{memberType} </option>)}
                            </select>
                        </div>
                        <div className={`flex flex-col gap-1`}>
                            <label htmlFor={"loanRating"} className="text-gray-500 text-sm">Member Loan Rating</label>
                            <select name="loanRating" id="loanRating" defaultValue={member?.loanRating} className="relative outline-none py-2 px-4 border border-gray-300 rounded-md text-gray-600 text-sm placeholder-opacity-70 focus-within:bg-transparent focus:bg-transparent">
                                {Object.keys(MemberRating).map((loanRating, i) => <option key={i.toString()} className='normal-text text-sm bg-white font-sans' defaultValue={loanRating}>{loanRating.replace("Plus", " Plus")} </option>)}
                            </select>
                        </div>
                        <div className={`flex flex-col gap-1`}>
                            <label htmlFor={'firstname'} className="text-gray-600 text-sm">First Name</label>
                            <input type="text" required name={'firstname'} defaultValue={member?.firstname} placeholder={'Enter First Name'} className='hover:border-primary/90 outline-none placeholder-opacity-70 text-slate-500 text-sm sm:text-md bg-white border border-zinc-200 rounded-[.25rem] py-2 px-4' />
                        </div>
                        <div className={`flex flex-col gap-1`}>
                            <label htmlFor={'middlename'} className="text-gray-600 text-sm">Middle Name</label>
                            <input type="text" name={'middlename'} defaultValue={member?.middlename!} placeholder={'Enter Middle Name (optional)'} className='hover:border-primary/90 outline-none placeholder-opacity-70 text-slate-500 text-sm sm:text-md bg-white border border-zinc-200 rounded-[.25rem] py-2 px-4' />
                        </div>
                        <div className={`flex flex-col gap-1`}>
                            <label htmlFor={'lastname'} className="text-gray-600 text-sm">Last Name</label>
                            <input type="text" required name={'lastname'} defaultValue={member?.lastname} placeholder={'Enter Last Name'} className='hover:border-primary/90 outline-none placeholder-opacity-70 text-slate-500 text-sm sm:text-md bg-white border border-zinc-200 rounded-[.25rem] py-2 px-4' />
                        </div>
                        <div className={`flex flex-col gap-1`}>
                            <label htmlFor={'email'} className="text-gray-600 text-sm">Email</label>
                            <input type="text" required name={'email'} defaultValue={member?.email!} placeholder={'Enter Email'} className='hover:border-primary/90 outline-none placeholder-opacity-70 text-slate-500 text-sm sm:text-md bg-white border border-zinc-200 rounded-[.25rem] py-2 px-4' />
                        </div>
                        <div className={`flex flex-col gap-1`}>
                            <label htmlFor={'phone'} className="text-gray-600 text-sm">Phone Number</label>
                            <input type="text" required name={'phone'} defaultValue={member?.phone!} placeholder={'Enter Last Name'} className='hover:border-primary/90 outline-none placeholder-opacity-70 text-slate-500 text-sm sm:text-md bg-white border border-zinc-200 rounded-[.25rem] py-2 px-4' />
                        </div>
                        <div className={`sm:col-span-2 flex flex-col gap-1`}>
                            <label htmlFor={'address'} className="text-gray-600 text-sm">Address</label>
                            <input type="text" name={'address'} defaultValue={member?.address!} placeholder={'Enter Your Address (optional)'} className='hover:border-primary/90 outline-none placeholder-opacity-70 text-slate-500 text-sm sm:text-md bg-white border border-zinc-200 rounded-[.25rem] py-2 px-4' />
                        </div>
                        {/* <h3 className="sm:col-span-2 py-4 border-y border-slate-400 dark:border-y-slate-200 bg-slate-100 text-center text-gray-600 text-lg sm:text-xl">Account Details</h3> */}
                        <h4 className="sm:col-span-2 py-4 border-b border-slate-400 dark:border-b-slate-200 text-lg sm:text-2xl text-slate-700 dark:text-slate-100 text-center font-bold opacity-80 relative">Account Details</h4>
                        <TextInput disabled key={6264} label='Account Name' defaultValue={`${member?.firstname} ${member?.middlename} ${member?.lastname}`} minLength={11} required={true} containerClassName={'text-xs sm:col-span-2'} className='bg-slate-200 dark:bg-slate-400' />
                        <TextInput disabled key={6265} label='Bank Name' defaultValue={member?.accountDetails && member?.accountDetails[0]?.banker} minLength={10} required={true} containerClassName={'text-xs'} className='bg-slate-200 dark:bg-slate-400' />
                        <TextInput disabled key={6266} label='Account Number' defaultValue={member?.accountDetails && member?.accountDetails[0]?.accountnumber} minLength={10} required={true} containerClassName={'text-xs'} className='bg-slate-200 dark:bg-slate-400' />
                        <div className={`flex flex-col gap-1`}>
                            <label htmlFor={"type"} className="text-gray-500 text-sm">Account Type</label>
                            <select name="type" id="type" disabled defaultValue={member?.accountDetails && member?.accountDetails[0]?.type} className="relative outline-none py-2 px-4 border border-gray-300 rounded-md text-gray-600 text-sm placeholder-opacity-70 focus-within:bg-transparent focus:bg-transparent bg-slate-200">
                                <option className='normal-text text-sm bg-white font-sans' defaultValue={"Savings"}>Savings </option>
                                <option className='normal-text text-sm bg-white font-sans' defaultValue={"Current"}>Current </option>
                                <option className='normal-text text-sm bg-white font-sans' defaultValue={"Fixed"}>Fixed </option>
                            </select>
                        </div>
                        <TextInput disabled key={6267} label='BVN' defaultValue={member?.accountDetails && member?.accountDetails[0]?.bvn} minLength={11} max={11} required={true} containerClassName={'text-xs'} className='bg-slate-200' />
                        <div className={`sm:col-span-2 flex flex-col gap-1`}>
                            <label htmlFor={'confirm-password'} className="text-gray-600 text-sm">Enter Your Password (to confirm any change you make to this user&apos;s profile)</label>
                            <input type="password" required name={'confirm-password'} id={'confirm-password'} placeholder={'Enter your Current Password'} className='hover:border-primary/90 outline-none placeholder-opacity-70 text-slate-500 text-sm sm:text-md bg-white border border-zinc-200 rounded-[.25rem] py-2 px-4' />
                        </div>
                        <div className="flex gap-4">
                            <button disabled={loading} type="submit" className="py-2 px-4 sm:px-8 bg-primary text-white text-[.6rem] text-xs rounded-md hover:bg-blue-600 cursor-pointer">{loading ? "Updating Profile..." : "Update Member Record"}</button>
                            <button onClick={handleConfirmation} disabled={loading} type="button" className="py-2 px-4 sm:px-8 bg-danger text-white text-[.6rem] text-xs rounded-md hover:bg-[#ed3869] hover:text-white cursor-pointer">Delete User</button>
                        </div>
                    </form>
                </div>
            </section>
            {/* <section className="relative flex-col">
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
                                <LoanList key={'171243'} user={member!} loansData={member?.loans!} />
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
                            <section className="relative p-4">
                                <SavingsList key={'171243'} user={member!} savingsData={member?.savings!} />
                            </section>
                        </div>
                    </li>

                    <li data-te-stepper-step-ref className="w-[4.5rem] flex-auto">
                        <div data-te-stepper-head-ref className="flex cursor-pointer items-center pr-2 leading-[1.3rem] no-underline before:mr-2 before:h-px before:w-full before:flex-1 before:bg-[#e0e0e0] before:content-[''] hover:bg-[#f9f9f9] focus:outline-none dark:before:bg-neutral-600 dark:after:bg-neutral-600 dark:hover:bg-[#3b3b3b]">
                            <span data-te-stepper-head-icon-ref className="my-6 mr-2 flex h-[1.938rem] w-[1.938rem] items-center justify-center rounded-full bg-[#ebedef] text-sm font-medium text-[#40464f]">
                                <IoClipboardOutline className='text-inherit ' />
                            </span>
                            <span data-te-stepper-head-text-ref className="text-neutral-500 text-xs after:flex after:text-xs after:content-[data-content] dark:text-neutral-300">Withdrawals
                            </span>
                        </div>
                        <div data-te-stepper-content-ref className="absolute left-0 w-full translate-x-[150%] p-4 transition-all duration-500 ease-in-out">
                            <WithdrawalList key={'171243'} user={member!} withdrawalData={member?.withdrawals!} /> 
                        </div>
                    </li>
                </ul>
            </section> */}
            <Modal modalRef={modalRef}>
                <div className='p-5 flex flex-col gap-4'>
                    <div className="w-full flex items-center gap-4">
                        <div className={`h-10 sm:h-14 w-10 sm:w-14 flex-shrink-0 flex justify-center items-center rounded-full overflow-hidden relative bg-danger dark:bg-slate-100 text-slate-100 dark:text-slate-600`}>
                            <IoTrashBinOutline className='text-lg sm:text-xl' />
                        </div>
                        <div className='flex-1 flex flex-col text-center w-full p-4'>
                            <div className="flex gap-4 text-slate-600 w-full">
                                <div className="flex flex-col justify-center text-center">
                                    <h5 className="text-lg sm:text-xl font-semibold leading-tight whitespace-nowrap flex items-center"> {`${member?.firstname} ${member?.middlename} ${member?.lastname}`}&apos;s Account </h5>
                                    <div className="text-xs bg-slate-200/50 dark:bg-slate-200 p-3 rounded-sm uppercase">Are you sure you want to delete</div>
                                </div>
                            </div>
                            <div className="flex gap-4 py-2 w-full">
                                <button onClick={() => modalRef?.current?.close()} disabled={loading} type="submit" className="py-2 px-4 sm:px-8 bg-success text-white text-[.6rem] text-xs rounded-md hover:bg-success/90 cursor-pointer">No! Cancel</button>
                                <button onClick={handleDelete} disabled={loading} type="button" className="py-2 px-4 sm:px-8 bg-danger text-white text-[.6rem] text-xs rounded-md hover:bg-[#ed3869] hover:text-white cursor-pointer">Yes! Delete</button>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>
        </>
    )
}
