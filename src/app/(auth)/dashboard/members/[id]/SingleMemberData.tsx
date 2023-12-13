"use client"

import React, { useEffect, useMemo, useRef, useState } from 'react'
import { edimcs_bookkeeping } from '@/assets/images'
import Image from 'next/image'
import { FaPiggyBank } from 'react-icons/fa'
import { TextInput } from '@/components'
import { MemberProps } from '@/types'
// import Link from 'next/link'
import { FaSackDollar } from 'react-icons/fa6'
import { IoClipboardOutline } from 'react-icons/io5'
import SavingsList from '../../savings/SavingsList'
import LoanList from '../../loans/LoanList'
import WithdrawalList from '../../withdrawal/WithdrawalList'
import { useRouter } from 'next/navigation'
import { updateProfile } from '@/actions'
import toast from 'react-hot-toast'
// import { useRouter } from 'next/navigation'
// import toast from 'react-hot-toast'
// import { TableSearch } from '@/app/(auth)/ui'
// import moment from 'moment'


export default function SingleMemberData({ member }: { member: MemberProps | undefined }) {
    // const modalRef = useRef<HTMLDialogElement | null>(null)
    // const reviewRef = useRef<HTMLDialogElement | null>(null)
    // const previewRef = useRef<HTMLDialogElement | null>(null)
    const formRef = useRef<HTMLFormElement | null>(null)
    const [loading, setLoading] = useState<boolean>(false)
    const router = useRouter()
    // const [interest, setInterest] = useState<number>(1)
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


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const myKey: string | number | null = e.currentTarget.name;
        const value: string | number = e.currentTarget.value;
        const getKeyValue = <T extends object, U extends keyof T>(key: U) => (obj: T) => obj[key]
        // inputs[myKey as keyof MemberProps] = value
        // console.log({ myKey, value, inputs })
    }


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        try {
            const formData = new FormData(formRef?.current!)
            const res = await updateProfile(formData)
            if (res?.error) toast.error(res.message, { id: "86249", duration: 5000 })
            else {
                toast.success(res.message, { id: "86249", duration: 5000 })
                router.refresh()
            }
        } catch (error) {
            toast.error('Unable to complete request, please, check your network and try again ' + error, { id: "86249", duration: 5000 })
        }
        setLoading(false)
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
                                    <p className="text-xs text-slate-500 font-semibold">{member?.accountDetails && member?.accountDetails[0]?.accountnumber}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <form ref={formRef} onSubmit={handleSubmit} className="px-4 sm:px-0 w-full sm:w-10/12 sm:scale-90 grid sm:grid-cols-2 gap-4 sm:gap-y-6 sm:justify-center relative after:bg-slate-300 after:-top-4 after:h-[.51px] after:w-11/12 after:left-1/2 after:-translate-x-1/2 after:absolute">
                        <input type="hidden" name="id" defaultValue={member?.id} />
                        <input type="hidden" name="extra" defaultValue={member?.password} />
                        <div className={`flex flex-col gap-1`}>
                            <label htmlFor={'firstname'} className="text-gray-600 text-sm">First Name</label>
                            <input type="text" required name={'firstname'} defaultValue={member?.firstname} placeholder={'Enter First Name'} className='hover:border-primary/90 outline-none placeholder-opacity-70 text-slate-500 text-sm sm:text-md bg-transparent border border-zinc-200 rounded-[.25rem] py-2 px-4' />
                        </div>
                        <div className={`flex flex-col gap-1`}>
                            <label htmlFor={'middlename'} className="text-gray-600 text-sm">Middle Name</label>
                            <input type="text" name={'middlename'} defaultValue={member?.middlename!} placeholder={'Enter Middle Name (optional)'} className='hover:border-primary/90 outline-none placeholder-opacity-70 text-slate-500 text-sm sm:text-md bg-transparent border border-zinc-200 rounded-[.25rem] py-2 px-4' />
                        </div>
                        <div className={`flex flex-col gap-1`}>
                            <label htmlFor={'lastname'} className="text-gray-600 text-sm">Last Name</label>
                            <input type="text" required name={'lastname'} defaultValue={member?.lastname} placeholder={'Enter Last Name'} className='hover:border-primary/90 outline-none placeholder-opacity-70 text-slate-500 text-sm sm:text-md bg-transparent border border-zinc-200 rounded-[.25rem] py-2 px-4' />
                        </div>
                        <div className={`flex flex-col gap-1`}>
                            <label htmlFor={'email'} className="text-gray-600 text-sm">Email</label>
                            <input type="text" required name={'email'} defaultValue={member?.email} placeholder={'Enter Email'} className='hover:border-primary/90 outline-none placeholder-opacity-70 text-slate-500 text-sm sm:text-md bg-transparent border border-zinc-200 rounded-[.25rem] py-2 px-4' />
                        </div>
                        <div className={`flex flex-col gap-1`}>
                            <label htmlFor={'password'} className="text-gray-600 text-sm">Change Password <small className="opacity-70 text-xs">(leave empty to keep your current password)</small></label>
                            <input type="text" name={'password'} placeholder={'Enter a New Password'} className='hover:border-primary/90 outline-none placeholder-opacity-70 text-slate-500 text-sm sm:text-md bg-transparent border border-zinc-200 rounded-[.25rem] py-2 px-4' />
                        </div>
                        <div className={`flex flex-col gap-1`}>
                            <label htmlFor={'phone'} className="text-gray-600 text-sm">Phone Number</label>
                            <input type="text" required name={'phone'} defaultValue={member?.phone!} placeholder={'Enter Last Name'} className='hover:border-primary/90 outline-none placeholder-opacity-70 text-slate-500 text-sm sm:text-md bg-transparent border border-zinc-200 rounded-[.25rem] py-2 px-4' />
                        </div>
                        <div className={`sm:col-span-2 flex flex-col gap-1`}>
                            <label htmlFor={'address'} className="text-gray-600 text-sm">Address</label>
                            <input type="text" name={'address'} defaultValue={member?.address!} placeholder={'Enter Your Address (optional)'} className='hover:border-primary/90 outline-none placeholder-opacity-70 text-slate-500 text-sm sm:text-md bg-transparent border border-zinc-200 rounded-[.25rem] py-2 px-4' />
                        </div>
                        <div className={`sm:col-span-2 flex flex-col gap-1`}>
                            <label htmlFor={'confirm-password'} className="text-gray-600 text-sm">Confirm Password (to save change)</label>
                            <input type="password" required name={'confirm-password'} id={'confirm-password'} placeholder={'Enter your Current Password'} className='hover:border-primary/90 outline-none placeholder-opacity-70 text-slate-500 text-sm sm:text-md bg-transparent border border-zinc-200 rounded-[.25rem] py-2 px-4' />
                        </div>
                        <button disabled={loading} type='submit' className="sm:col-span-2 cursor-pointer rounded-md text-thin text-xs text-white bg-primary hover:bg-primary/90 py-2 px-4 sm:py-3 sm:px-6 w-max select-none">{loading ? "Updating Profile..." : "Update Profile"}</button>
                        <div className="flex gap-4">
                            <button disabled={loading}  type="submit" className="py-2 px-4 sm:px-8 bg-primary text-white text-[.6rem] text-xs rounded-md hover:bg-blue-600 cursor-pointer">{loading ? "Updating Profile..." : "Update Member Record"}</button>
                            <button disabled={loading}  type="button" className="py-2 px-4 sm:px-8 bg-danger text-white text-[.6rem] text-xs rounded-md hover:bg-[#ed3869] hover:text-white cursor-pointer">Delete User</button>
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
        </>
    )
}
