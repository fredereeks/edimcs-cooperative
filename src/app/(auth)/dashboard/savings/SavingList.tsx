"use client"

import React, { ChangeEvent, useEffect, useMemo, useRef, useState } from 'react'
import { edimcs_blackpeople, edimcs_bookkeeping } from '@/assets/images'
import Image, { StaticImageData } from 'next/image'
import { FaCalendarAlt } from 'react-icons/fa'
import { user } from '@/data/user'
import { TextInput } from '@/components'
import { MemberProps } from '@/types'
import Modal from '../../components/Modal'

interface DataProp {
    columns: (string | {
        label: string;
        field: string;
    })[];
    rows: string[][] | MemberProps[];
}
interface SavingsProp {
    columns: { label: string; field: string; }[];
    rows: MemberProps[];
}

export default function SavingList({ memberData, children }: { memberData: MemberProps[], children: React.ReactNode | React.ReactNode[] }) {
    const modalRef = useRef<HTMLDialogElement | null>(null)
    const dataTableRef = useRef<HTMLDivElement | null>(null)
    const dataTableFormRef = useRef<HTMLFormElement | null>(null)
    const [search, setSearch] = useState<string>('')
    const advancedSearchInputRef = useRef<HTMLInputElement | null>(null)
    const advancedSearchButtonRef = useRef<HTMLButtonElement | null>(null)
    const instanceRef = useRef<any>(null)
    const counterRef = useRef<number>(0)
    const [allTableData, setAllTableData] = useState<MemberProps[] | []>(memberData)
    const [tableData, setTableData] = useState<MemberProps[] | []>(memberData)

    const [data, setData] = useState<DataProp>({
        columns: [
            {
                label: 'Name',
                field: 'name'
            },
            'Position',
            'Office',
            'Age',
            'Start date',
            'Salary',
        ],
        rows: [
            ["Tiger Nixon", "System Architect", "Edinburgh", "61", "2011/04/25", "$320,800"],
            ["Garrett Winters", "Accountant", "Tokyo", "63", "2011/07/25", "$170,750"],
            ["Ashton Cox", "Junior Technical Author", "San Francisco", "66", "2009/01/12", "$86,000"],
            ["Cedric Kelly", "Senior Javascript Developer", "Edinburgh", "22", "2012/03/29", "$433,060"],
            ["Airi Satou", "Accountant", "Tokyo", "33", "2008/11/28", "$162,700"],
            ["Brielle Williamson", "Integration Specialist", "New York", "61", "2012/12/02", "$372,000"],
            ["Herrod Chandler", "Sales Assistant", "San Francisco", "59", "2012/08/06", "$137,500"],
            ["Rhona Davidson", "Integration Specialist", "Tokyo", "55", "2010/10/14", "$327,900"],
            ["Colleen Hurst", "Javascript Developer", "San Francisco", "39", "2009/09/15", "$205,500"],
            ["Sonya Frost", "Software Engineer", "Edinburgh", "23", "2008/12/13", "$103,600"],
            ["Jena Gaines", "Office Manager", "London", "30", "2008/12/19", "$90,560"],
            ["Quinn Flynn", "Support Lead", "Edinburgh", "22", "2013/03/03", "$342,000"],
            ["Charde Marshall", "Regional Director", "San Francisco", "36", "2008/10/16", "$470,600"],
            ["Haley Kennedy", "Senior Marketing Designer", "London", "43", "2012/12/18", "$313,500"]
        ],
    })
    const [savingsData, setSavingsData] = useState<SavingsProp>({
        columns: [
            { label: "Member Details", field: "Member Details" },
            { label: "Date Registered", field: "Date Registered" },
            { label: "Total Savings", field: "Total Savings" },
            { label: "Total Investment", field: "Total Investment" },
            { label: "Total Withdrawals", field: "Total Withdrawals" },
            { label: "Current Balance", field: "Current Balance" },
        ],
        rows: memberData
    })

    // const searchRef = useRef<HTMLInputElement | null>(null)
    const [selectedMember, setSelectedMember] = useState<MemberProps>({
        memberId: "memberId",
        firstname: "firstname",
        middlename: "middlename",
        lastname: "lastname",
        email: "email",
        phone: "phone",
        address: "address",
        // accountDetails: [{
        //     id: '8234234',
        //     accountName: 'Belkins Jones',
        //     accountNo: '1823406234',
        //     banker: 'Sterling Bank Plc',
        //     type: 'Savings'
        // }],
        id: 8122934,
    })

    const inputs: { [key: string]: string | number | undefined } = useMemo(() => ({
        "memberId": selectedMember.memberId,
        "firstname": selectedMember.firstname,
        "middlename": selectedMember.middlename,
        "lastname": selectedMember.lastname,
        "email": selectedMember.email,
        "phone": selectedMember.phone,
        "address": selectedMember.address,
    }), [selectedMember.memberId, selectedMember.firstname, selectedMember.middlename, selectedMember.lastname, selectedMember.email, selectedMember.phone, selectedMember.address,])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const myKey: string = e.currentTarget.name;
        const value: string | number = e.currentTarget.value;
        const getKeyValue = <T extends object, U extends keyof T>(key: U) => (obj: T) => obj[key]
        inputs[myKey as keyof MemberProps] = value
        // console.log({ myKey, value, inputs })
    }

    const handleClick = (id: number) => {
        try {
            // make request to get user details
            const targetMember = memberData?.find(member => member.id === id)
            if (targetMember) {
                setSelectedMember(prev => ({ ...targetMember }))
            }
            modalRef.current?.showModal()
        }
        catch (err) {
            console.log({ err })
        }
    }

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault()
        // setSearch(prev => e.target.value)
        let keyword = search.toLowerCase() || ''
        console.log({ keyword })
        if (!keyword || keyword === '') {
            setTableData(prev => [...allTableData])
        }
        else {
            const result = savingsData.rows.filter(el => el.firstname.toLowerCase().includes(keyword) || el.middlename.toLowerCase().includes(keyword) || el.lastname.toLowerCase().includes(keyword) || el.memberId.toString().toLowerCase().includes(keyword) || el.createdAt?.toString().toLowerCase().includes(keyword) || el.email.toLowerCase().includes(keyword) || el.phone.toString().toLowerCase().includes(keyword) || el.address?.toLowerCase().includes(keyword) || el.type?.toLowerCase().includes(keyword))
            console.log({ result })
            // setTableData(prev => [...result])
            setSavingsData(prev => ({...prev, rows: result}))
            // instanceRef.current.search(dataTableRef.current, savingsData)
        }
        console.log({ tableData, totalResult: tableData.length })
    }

    useEffect(() => {
        // Initialization for ES Users
        (async () => {
            const { Datatable, initTE } = await require("tw-elements");
            initTE({ Datatable });



            const makeSearch = () => {
                // let phrase: string = '', columns: string[] | string = [''];
                const [phrase, columns] = search.split(" in:").map((str) => str.trim());
                console.log({ phrase, columns })

                let sortedColumn: string[] | string
                // if (columns) {
                //     // sortedColumn = columns.split(",").map((str) => str.toLowerCase().trim());
                //     console.log({phrase, columns})
                //     columns = columns.split(",").map((str) => str.toLowerCase().trim());
                //     instance.search(phrase, columns);
                // }

            };

            // instanceRef.current = new Datatable(dataTableRef.current, savingsData)
            console.log({ counterRef: counterRef.current })
            if (counterRef.current === 0) {
                instanceRef.current = new Datatable(dataTableRef.current, savingsData)
                counterRef.current += 1;
                console.log({ counterRef: counterRef.current })
            }
            console.log({ counterRef: counterRef.current })
        })()
        //eslint-disable-next-line
    }, [savingsData.rows])

    // const makeSearch = () => {
    //     let phrase: string = '', columns: string[] | string = [''];
    //     [phrase, columns] = search.split(" in:").map((str) => str.trim());
    //     console.log({phrase, columns, datatable: instanceRef.current})

    //     if (columns) {
    //         // sortedColumn = columns.split(",").map((str) => str.toLowerCase().trim());
    //         console.log({phrase, columns})
    //         columns = columns.split(",").map((str) => str.toLowerCase().trim());
    //         instanceRef.current.search(phrase, columns);
    //     }

    // };

    console.log({ datatable: instanceRef.current })

    return (
        <>
            <section className="relative flex flex-col gap-2 p-4 bg-white  dark:bg-[#dbf0f724] shadow-slate-200 dark:shadow-black shadow-md rounded-lg">
            <div className="mb-3">
                    <form onSubmit={handleSearch} ref={dataTableFormRef} className="relative mb-4 max-w-xs ml-auto flex items-stretch">
                        <input ref={advancedSearchInputRef}
                            id="advanced-search-input"
                            onChange={(e) => setSearch(e.target.value)}
                            type="search"
                            className="relative m-0 -mr-0.5 block w-[1px] min-w-0 flex-auto rounded-l border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary"
                            placeholder="Search"
                            aria-label="Search"
                            aria-describedby="button-addon1" />

                        {/* <!--Search button--> */}
                        <button
                            className="relative z-[2] flex items-center rounded-r bg-primary px-6 py-2.5 text-xs font-medium uppercase leading-tight text-white shadow-md transition duration-150 ease-in-out hover:bg-primary-700 hover:shadow-lg focus:bg-primary-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-primary-800 active:shadow-lg"
                            type="button"
                            ref={advancedSearchButtonRef}
                            id="advanced-search-button"
                            data-te-ripple-init
                            data-te-ripple-color="light">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                className="h-5 w-5">
                                <path
                                    fillRule="evenodd"
                                    d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                                    clipRule="evenodd" />
                            </svg>
                        </button>
                    </form>
                </div>
                <div ref={dataTableRef} className="w-full overflow-x-scroll pb-6 x-scrollbar">
                    <table className="w-full text-slate-500 dark:text-slate-200 text-xs sm:text-sm min-w-[20rem]">
                        <thead className='pb-2 border-b border-b-slate-200 dark:border-b-slate-500'>
                            {/* <tr>
                                <th colSpan={6}>
                                    <h4 className="uppercase font-semibold text-slate-400 text-left pb-2 mb-2 border-b border-b-slate-200 dark:border-b-slate-500">SAVINGS {user.type === "Admin" ? 'LIST' : 'RECORDS'}</h4>
                                </th>
                            </tr> */}
                            <tr className='text-slate-600 dark:text-slate-50'>
                                <th className='whitespace-nowrap px-4 font-light text-xs text-left'>Member Details</th>
                                <th className='whitespace-nowrap px-4 font-light text-xs text-center'>Date Registered</th>
                                <th className='whitespace-nowrap px-2 font-light text-xs text-center'>Total Savings</th>
                                <th className='whitespace-nowrap px-2 font-light text-xs text-center'>Total Investment</th>
                                <th className='whitespace-nowrap px-2 font-light text-xs text-center'>Total Withdrawals</th>
                                <th className='whitespace-nowrap px-2 font-light text-xs text-center'>Current Balance</th>
                            </tr>
                        </thead>
                        <tbody className='w-full'>
                            {
                                memberData.map(member => (
                                    <tr key={member?.id} className='hover:bg-slate-50 dark:hover:bg-slate-900/30'>
                                        <td>
                                            <div className="max-w-sm w-max flex items-center gap-2 cursor-pointer text-slate-700 dark:text-slate-50">
                                                <div className="h-7 sm:h-8 w-7 sm:w-8 flex justify-center items-center rounded-full overflow-hidden relative bg-primary dark:bg-slate-600">
                                                    <Image src={member?.image || edimcs_bookkeeping} alt={`${member?.firstname} ${member?.firstname} ${member?.lastname}`} fill={true} className="absolute left-0 top-0 object-cover w-full h-full" />
                                                </div>
                                                <div>
                                                    <h5 className="text-xs font-medium leading-tight whitespace-nowrap flex items-center">{member?.firstname} {member?.middlename} {member?.lastname} <span className="text-[.4rem] bg-slate-200/50 p-[.2rem] px-[.3rem] rounded-[2px] uppercase ml-2">{member?.type}</span></h5>
                                                    <p className="text-[.6rem] font-medium opacity-70 leading-tight">EDIMCS-{member?.memberId}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="align-middle">
                                            <div className="flex justify-center items-center gap-[.2rem] align-middle text-slate-600 dark:text-slate-50 text-[.6rem] py-[.1rem] sm:py-1">
                                                <FaCalendarAlt className="text-inherit mt-[.1rem]" /> <p className="">{member?.createdAt}</p>
                                            </div>
                                        </td>
                                        <td className="align-middle">
                                            <div className="flex justify-center items-center align-middle mx-auto">
                                                <div className={`bg-teal-100 dark:bg-slate-50 text-teal-600 text-[.6rem] py-[.1rem] sm:py-1 px-3 rounded-sm font-medium`}>&#8358;{member?.savings}</div>
                                            </div>
                                        </td>
                                        <td className="align-middle">
                                            <div className="flex justify-center items-center align-middle mx-auto">
                                                <div className={`bg-sky-100 dark:bg-slate-50 text-sky-600 text-[.6rem] py-[.1rem] sm:py-1 px-3 rounded-sm font-medium`}>&#8358;{member?.investment}</div>
                                            </div>
                                        </td>
                                        <td className="align-middle">
                                            <div className="flex justify-center items-center align-middle mx-auto">
                                                <div className={`bg-red-100 dark:bg-slate-50 text-red-600 text-[.6rem] py-[.1rem] sm:py-1 px-3 rounded-sm font-medium whitespace-nowrap`}>-&#8358;{member?.withdrawal}</div>
                                            </div>
                                        </td>
                                        <td className="align-middle">
                                            <h4 className="flex justify-center items-center gap-[.2rem] align-middle text-slate-500 dark:text-slate-50 text-[.6rem] py-[.1rem] sm:py-1">&#8358;{member?.balance}</h4>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </section>
            <Modal modalRef={modalRef}>
                <div className="flex flex-col gap-6">
                    <div className="flex flex-col gap-4 p-4 pb-2 items-center">
                        <h4 className="text-lg sm:text-2xl text-slate-700 text-center mb-2 font-bold opacity-80 relative after:bg-slate-300 after:-bottom-2 after:h-[.51px] after:w-11/12 after:left-1/2 after:-translate-x-1/2 after:absolute">{selectedMember?.firstname} {selectedMember?.middlename} {selectedMember?.lastname} Details</h4>
                        <div className="flex gap-4 md:gap-6">
                            <div className="relative h-14 w-14 md:h-16 md:w-16 flex-shrink-0 rounded-full overflow-hidden cursor-pointer">
                                <Image src={selectedMember?.image || edimcs_bookkeeping} alt={`${selectedMember?.firstname} ${selectedMember?.middlename} ${selectedMember?.lastname}`} fill={true} className='object-cover' />
                            </div>
                            <div className="flex flex-col gap-1 w-max justify-center">
                                <div className="flex flex-col">
                                    <h3 className="text-sm text-primary">{selectedMember?.firstname} {selectedMember?.middlename} {selectedMember?.lastname}</h3>
                                    <p className="text-[.6rem] text-slate-500">{selectedMember?.accountDetails && selectedMember?.accountDetails[0]?.banker}</p>
                                    <p className="text-xs text-slate-500 font-semibold">{selectedMember?.accountDetails && selectedMember?.accountDetails[0].accountNo}</p>
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
            </Modal>
            <section className="relative">
                
                <div id="datatable"></div>
            </section>
        </>
    )
}
