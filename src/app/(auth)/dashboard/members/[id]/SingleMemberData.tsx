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
// import { useRouter } from 'next/navigation'
// import toast from 'react-hot-toast'
// import { TableSearch } from '@/app/(auth)/ui'
// import moment from 'moment'


export default function SingleMemberData({ member }: { member: MemberProps | undefined }) {
    // const [selectedLoan, setSelectedLoan] = useState<LoanProps>()
    // const modalRef = useRef<HTMLDialogElement | null>(null)
    // const reviewRef = useRef<HTMLDialogElement | null>(null)
    // const previewRef = useRef<HTMLDialogElement | null>(null)
    // const formRef = useRef<HTMLFormElement | null>(null)
    // const [interest, setInterest] = useState<number>(1)
    // const [payback, setPayback] = useState<number>(500)
    // const amountRef = useRef<HTMLInputElement | null>(null)
    // const inputRef = useRef<HTMLInputElement | null>(null)
    // const [loading, setLoading] = useState<boolean>(false)
    // const router = useRouter()
    // const user: MemberProps | null = member;

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


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const myKey: string = e.currentTarget.name;
        const value: string | number = e.currentTarget.value;
        const getKeyValue = <T extends object, U extends keyof T>(key: U) => (obj: T) => obj[key]
        inputs[myKey as keyof MemberProps] = value
        // console.log({ myKey, value, inputs })
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
            </section>
        </>
    )
}
