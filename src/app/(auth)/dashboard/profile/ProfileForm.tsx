"use client"

import { deleteAction, handleUpload, updateAccountDetails, updateProfile, updateProfileDetails } from '@/actions';
import { MemberProps } from '@/types';
import { useRouter } from 'next/navigation';
import React, { useState, useRef } from 'react'
import toast from 'react-hot-toast';
import { edimcs_logo } from '@/assets/images'
import { TextInput } from '@/components'
import Image from 'next/image'
import { imageUploader } from '@/lib/imageUploader';
import { IoTrashBinOutline } from 'react-icons/io5';
import { Modal } from '../../ui';
import { Gender, RelationshipStatus } from '@prisma/client';
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector'
import PhoneInput from 'react-phone-number-input'
import flags from 'react-phone-number-input/flags';
import 'react-phone-number-input/style.css'


export default function ProfileForm({ user }: { user: MemberProps }) {
    const [loading, setLoading] = useState<boolean>(false)
    const [uploadLoading, setUploadLoading] = useState<boolean>(false)
    const [formToShow, setFormToShow] = useState<string>("Profile")
    const formRef = useRef<HTMLFormElement | null>(null);
    const infoFormRef = useRef<HTMLFormElement | null>(null);
    const uploadFormRef = useRef<HTMLFormElement | null>(null);
    const accountFormRef = useRef<HTMLFormElement | null>(null);
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const modalRef = useRef<HTMLDialogElement | null>(null)
    const [relStatus, setRelStatus] = useState<string>(user?.MemberInfo?.relationshipStatus!)
    const [country, setCountry] = useState(user?.MemberInfo?.country || 'Nigeria')
    const [region, setRegion] = useState(user?.MemberInfo?.stateOfOrigin || 'Abuja Federal Capital Territory')
    const [phone, setPhone] = useState<string | undefined>(user?.MemberInfo?.nextOfKinPhone)
    const router = useRouter()

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
    const handleAccountSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        try {
            const formData = new FormData(accountFormRef?.current!)
            const res = await updateAccountDetails(formData)
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
    const handleInformationSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        try {
            const formData = new FormData(infoFormRef?.current!)
            const res = await updateProfileDetails(formData)
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

    const handleDelete = async () => {
        setLoading(true)
        try {
            const formData = new FormData()
            formData.append("deleteId", user?.id!)
            formData.append("type", user?.type as unknown as string)
            const res = await deleteAction(formData)
            if (res?.error) toast.error(res.message, { id: "86249", duration: 5000 })
            else {
                toast.success(res.message, { id: "86249", duration: 5000 })
                router.push("/auth/login")
            }
        } catch (error) {
            toast.error('Unable to complete request, please, check your network and try again', { id: "86249", duration: 5000 })
        }
        modalRef?.current?.close()
        setLoading(false)
    }

    const handleFormUpload = async (e: React.FormEvent) => {
        e.preventDefault()
        setUploadLoading(true)
        const fileInput = (fileInputRef?.current?.files?.[0]!) as File
        if (fileInput.size > 100000) {
            toast.error(`Image size is larger than 100kb. Resize or use another image`, { id: "86249", duration: 5000 })
            setUploadLoading(false)
            return;
        }
        try {
            const image = await imageUploader(fileInput)
            const formData = new FormData()
            formData.append("id", user?.id)
            formData.append("file", image as string)
            const res = await handleUpload(formData)
            if (res?.error) toast.error(res.message, { id: "86249", duration: 5000 })
            else {
                toast.success(res.message, { id: "86249", duration: 5000 })
                router.refresh()
            }
        } catch (error) {
            toast.error('Unable to complete request, please, check your network and try again ' + error, { id: "86249", duration: 5000 })
        }
        setUploadLoading(false)
    }

    return (
        <>
            <section className="flex flex-col gap-4 sm:gap-10">
                <div className="flex flex-wrap gap-2 sm:gap-4">
                    <button onClick={() => setFormToShow("Profile")} className={`cursor-pointer rounded-md text-thin text-xs hover:text-primary border ${formToShow === "Profile" ? 'text-primary  border-primary dark:text-primary dark:hover:border-primary' : 'text-slate-500  border-slate-300 dark:text-slate-400 dark:hover:border-slate-400'} hover:border-primary py-2 px-4 sm:py-3 sm:px-6 w-max select-none`}>Account Information</button>
                    <button onClick={() => setFormToShow("Information")} className={`cursor-pointer rounded-md text-thin text-xs hover:text-primary border ${formToShow === "Information" ? 'text-primary  border-primary dark:text-primary dark:hover:border-primary' : 'text-slate-500  border-slate-300 dark:text-slate-400 dark:hover:border-slate-400'} hover:border-primary py-2 px-4 sm:py-3 sm:px-6 w-max select-none`}>Personal Information</button>
                    <button onClick={() => setFormToShow("Account")} className={`cursor-pointer rounded-md text-thin text-xs hover:text-primary border ${formToShow === "Account" ? 'text-primary  border-primary dark:text-primary dark:hover:border-primary' : 'text-slate-500  border-slate-300 dark:text-slate-400 dark:hover:border-slate-400'} hover:border-primary py-2 px-4 sm:py-3 sm:px-6 w-max select-none`}>Account Details</button>
                </div>
            </section>
            <section className={`flex-col pt-5 pb-10 ${formToShow === "Profile" ? 'flex' : 'hidden'}`}>
                <div className="flex flex-col gap-6">
                    <form ref={uploadFormRef} onSubmit={handleFormUpload} className="flex flex-col gap-4 p-4">
                        <input type="hidden" name="id" defaultValue={user?.id} />
                        <h4 className="text-xs text-slate-500 opacity-80">Your Profile Picture</h4>
                        <div className="flex gap-4 md:gap-6">
                            <label htmlFor="profilePicture" className="relative h-14 w-14 md:h-16 md:w-16 flex-shrink-0 rounded-full overflow-hidden cursor-pointer">
                                <input type="file" ref={fileInputRef} name="file" id="profilePicture" className="hidden" />
                                <Image src={user?.image || edimcs_logo} alt={`${user?.firstname} ${user?.middlename} ${user?.lastname}`} fill={true} className='object-cover' />
                            </label>
                            <div className="flex flex-col gap-1 w-max justify-center sm:items-center">
                                <div className="flex gap-4">
                                    <button disabled={uploadLoading} type="submit" className="py-2 px-4 sm:px-8 bg-primary text-white text-[.6rem] text-xs rounded-md hover:bg-blue-600 cursor-pointer">{uploadLoading ? 'Uploading...' : 'Upload New'}</button>
                                    <button disabled={uploadLoading} type="button" className="py-2 px-4 sm:px-8 bg-slate-300/50 dark:bg-slate-100 dark:hover:text-slate-900 text-slate-700 text-[.6rem] text-xs rounded-md hover:bg-danger hover:text-white cursor-pointer">Delete Picture</button>
                                </div>
                                <p className="text-[.65rem] text-center text-slate-500">Your profile picture enables users recognize you on EDIMCS</p>
                            </div>
                        </div>
                    </form>
                    <form ref={formRef} onSubmit={handleSubmit} className="px-4 sm:px-0 w-full sm:w-10/12 sm:scale-90 grid sm:grid-cols-2 gap-4 sm:gap-y-6 sm:justify-center relative after:bg-slate-300 after:-top-4 after:h-[.51px] after:w-11/12 after:left-1/2 after:-translate-x-1/2 after:absolute">
                        <input type="hidden" name="id" defaultValue={user?.id} />
                        <input type="hidden" name="extra" defaultValue={user?.password} />
                        <TextInput disabled key={6254} id='memberId' name='memberId' label='Member ID' defaultValue={user?.memberId} minLength={10} required={true} containerClassName={'text-xs text-slate-700'} className='bg-slate-200' />
                        <TextInput disabled key={6255} id='loanRating' name='loanRating' label='Loan Rating' defaultValue={user?.loanRating} minLength={10} required={true} containerClassName={'text-xs text-slate-700'} className='bg-slate-200' />
                        <div className={`flex flex-col gap-1`}>
                            <label htmlFor={'firstname'} className="text-gray-600 text-sm">First Name</label>
                            <input type="text" required name={'firstname'} defaultValue={user?.firstname} placeholder={'Enter First Name'} className='hover:border-primary/90 outline-none placeholder-opacity-70 text-slate-500 text-sm sm:text-md bg-transparent border border-zinc-200 rounded-[.25rem] py-2 px-4' />
                        </div>
                        <div className={`flex flex-col gap-1`}>
                            <label htmlFor={'middlename'} className="text-gray-600 text-sm">Middle Name</label>
                            <input type="text" name={'middlename'} defaultValue={user?.middlename!} placeholder={'Enter Middle Name (optional)'} className='hover:border-primary/90 outline-none placeholder-opacity-70 text-slate-500 text-sm sm:text-md bg-transparent border border-zinc-200 rounded-[.25rem] py-2 px-4' />
                        </div>
                        <div className={`flex flex-col gap-1`}>
                            <label htmlFor={'lastname'} className="text-gray-600 text-sm">Last Name</label>
                            <input type="text" required name={'lastname'} defaultValue={user?.lastname} placeholder={'Enter Last Name'} className='hover:border-primary/90 outline-none placeholder-opacity-70 text-slate-500 text-sm sm:text-md bg-transparent border border-zinc-200 rounded-[.25rem] py-2 px-4' />
                        </div>
                        <div className={`flex flex-col gap-1`}>
                            <label htmlFor={'email'} className="text-gray-600 text-sm">Email</label>
                            <input type="text" required name={'email'} defaultValue={user?.email} placeholder={'Enter Email'} className='hover:border-primary/90 outline-none placeholder-opacity-70 text-slate-500 text-sm sm:text-md bg-transparent border border-zinc-200 rounded-[.25rem] py-2 px-4' />
                        </div>
                        <div className={`flex flex-col gap-1`}>
                            <label htmlFor={'password'} className="text-gray-600 text-sm">Change Password <small className="opacity-70 text-xs">(leave empty to keep your current password)</small></label>
                            <input type="text" name={'password'} placeholder={'Enter a New Password'} className='hover:border-primary/90 outline-none placeholder-opacity-70 text-slate-500 text-sm sm:text-md bg-transparent border border-zinc-200 rounded-[.25rem] py-2 px-4' />
                        </div>
                        <div className={`flex flex-col gap-1`}>
                            <label htmlFor={'phone'} className="text-gray-600 text-sm">Phone Number</label>
                            <input type="text" required name={'phone'} defaultValue={user?.phone!} placeholder={'Enter Last Name'} className='hover:border-primary/90 outline-none placeholder-opacity-70 text-slate-500 text-sm sm:text-md bg-transparent border border-zinc-200 rounded-[.25rem] py-2 px-4' />
                        </div>
                        <div className={`sm:col-span-2 flex flex-col gap-1`}>
                            <label htmlFor={'address'} className="text-gray-600 text-sm">Address</label>
                            <input type="text" name={'address'} defaultValue={user?.address!} placeholder={'Enter Your Address (optional)'} className='hover:border-primary/90 outline-none placeholder-opacity-70 text-slate-500 text-sm sm:text-md bg-transparent border border-zinc-200 rounded-[.25rem] py-2 px-4' />
                        </div>
                        <div className={`sm:col-span-2 flex flex-col gap-1`}>
                            <label htmlFor={'confirm-password'} className="text-gray-600 text-sm">Confirm Password (to save change)</label>
                            <input type="password" required name={'confirm-password'} id={'confirm-password'} placeholder={'Enter your Current Password'} className='hover:border-primary/90 outline-none placeholder-opacity-70 text-slate-500 text-sm sm:text-md bg-transparent border border-zinc-200 rounded-[.25rem] py-2 px-4' />
                        </div>
                        <div className="flex gap-4 sm:col-span-2">
                            <button disabled={loading} type='submit' className="sm:col-span-2 cursor-pointer rounded-md text-thin text-xs text-white bg-primary hover:bg-primary/90 py-2 px-4 sm:py-3 sm:px-6 w-max select-none">{loading ? "Updating Profile..." : "Update Profile"}</button>
                            <button onClick={() => modalRef.current?.showModal()} disabled={loading} type="button" className="py-2 px-4 sm:px-8 bg-danger text-white text-[.6rem] text-xs rounded-md hover:bg-[#ed3869] hover:text-white cursor-pointer">Delete Your Account</button>
                        </div>
                    </form>
                </div>
            </section>
            <section className={`flex-col pt-5 pb-10 ${formToShow === "Information" ? 'flex' : 'hidden'}`}>
                <div className="flex flex-col gap-6">
                    <form ref={infoFormRef} onSubmit={handleInformationSubmit} className="px-4 sm:px-0 w-full sm:w-10/12 mx-auto sm:scale-90 grid sm:grid-cols-2 gap-4 sm:justify-center relative after:bg-slate-300 after:-top-4 after:h-[.51px] after:w-11/12 after:left-1/2 after:-translate-x-1/2 after:absolute">
                        <input type="hidden" name="id" defaultValue={user?.id} />
                        <input type="hidden" name="extra" defaultValue={user?.password} />
                        <TextInput key={917260} id='nin' name='nin' label='Means of Identification (NIN)' defaultValue={user?.MemberInfo?.nin} type='number' minLength={10} required={true} containerClassName={'text-sm sm:col-span-2'} />
                        <div className={`flex flex-col gap-1`}>
                            <label htmlFor={"gender"} className="text-gray-500 text-sm">Gender </label>
                            <select name="gender" defaultValue={user?.MemberInfo?.gender} id="gender" className="relative outline-none py-2 px-4 border border-gray-300 rounded-md text-gray-600 text-sm placeholder-opacity-70 bg-transparent focus-within:bg-transparent focus:bg-transparent">
                                {Object.keys(Gender).map((gender, i) => <option key={i} className='normal-text text-sm bg-white font-sans' defaultValue={gender}>{gender}</option>)}
                            </select>
                        </div>
                        <div className={`flex flex-col gap-1`}>
                            <label htmlFor={"relationshipStatus"} className="text-gray-500 text-sm">Relationship Status</label>
                            <select onChange={(e) => setRelStatus(e.currentTarget.value)} name="relationshipStatus" id="relationshipStatus" defaultValue={user?.MemberInfo?.relationshipStatus} className="relative outline-none py-2 px-4 border border-gray-300 rounded-md text-gray-600 text-sm placeholder-opacity-70 bg-transparent focus-within:bg-transparent focus:bg-transparent">
                                {Object.keys(RelationshipStatus).map((status, i) => <option key={i} className='normal-text text-sm bg-white font-sans' defaultValue={status}>{status}</option>)}
                            </select>
                        </div>
                        <div className="sm:col-span-2">
                            {
                                relStatus === "Married" || relStatus === "Divorced" ? <TextInput key={917264} id='nameOfSpouse' name='nameOfSpouse' label='Name of Spouse' defaultValue={`${user?.MemberInfo?.nameOfSpouse || ""}`} required={true} containerClassName={'text-sm'} className='text-sm sm:col-span-2' /> : ""
                            }
                        </div>
                        <TextInput key={917261} id='occupation' name='occupation' label='Occupation' defaultValue={user?.MemberInfo?.occupation || ""} required={true} containerClassName={'text-sm'} />
                        <TextInput key={917262} id='jobStatus' placeholder='e.g. Employed, Retired, Unemployed' name='jobStatus' label='Job Status' defaultValue={`${user?.MemberInfo?.jobStatus || ""}`} required={true} containerClassName={'text-sm'} className='text-sm' />
                        <div className={`flex flex-col gap-1`}>
                            <label htmlFor={'country'} className="text-gray-600 text-sm">Country</label>
                            <CountryDropdown value={country} id='country' onChange={value => setCountry(value)} name='country' key={917263} classes='hover:border-primary/90 outline-none py-2 px-4 border border-gray-300 rounded-md text-gray-600 text-sm bg-transparent focus-within:bg-transparent focus:bg-transparent placeholder-opacity-70' />
                        </div>
                        <div className={`flex flex-col gap-1`}>
                            <label htmlFor={'stateOfResidence'} className="text-gray-600 text-sm">State of Residence</label>
                            <RegionDropdown country={country} disableWhenEmpty={true} value={region} onChange={value => setRegion(value)} name='stateOfResidence' key={917264} id='stateOfResidence' classes='hover:border-primary/90 outline-none py-2 px-4 border border-gray-300 rounded-md text-gray-600 text-sm bg-transparent focus-within:bg-transparent focus:bg-transparent placeholder-opacity-70' />
                        </div>
                        <TextInput key={917265} id='stateOfOrigin' name='stateOfOrigin' label='State of Origin' defaultValue={`${user?.MemberInfo?.stateOfOrigin || ""}`} required={true} containerClassName={'text-sm'} className='text-sm' />
                        <TextInput key={917266} id='lga' name='lga' label='Local Government Area' defaultValue={`${user?.MemberInfo?.lga || ""}`} required={true} containerClassName={'text-sm'} className='text-sm' />
                        <div className="sm:col-span-2 text-gray-600 text-xs pb-2 border-b">Next of Kin</div>
                        <TextInput key={917267} id='nextOfKin' name='nextOfKin' label='Name of Next of Kin' defaultValue={`${user?.MemberInfo?.nextOfKin || ""}`} required={true} containerClassName={'text-sm sm:col-span-2'} className='text-sm' />
                        <TextInput key={917268} id='nextOfKinRelationship' name='nextOfKinRelationship' label='Relationship with Next of Kin' defaultValue={`${user?.MemberInfo?.nextOfKinRelationship || ""}`} required={true} containerClassName={'text-sm'} className='text-sm' />
                        {/* <TextInput key={917269} id='nextOfKinPhone' name='nextOfKinPhone' label='Phone Number of Next of Kin' defaultValue={`${user?.MemberInfo?.nextOfKinPhone || ""}`} required={true} containerClassName={'text-sm'} className='text-sm' /> */}
                        <div className={`flex flex-col gap-1`}>
                            <label htmlFor={'phone'} className="text-gray-600 text-sm">Phone Number of Next of Kin</label>
                            <div className="flex w-full gap-1 py-2 border border-zinc-200 bg-transparent rounded-md overflow-hidden">
                                <PhoneInput
                                    onChange={(value) => setPhone(value)}
                                    placeholder={"Enter Phone Number"}
                                    international
                                    withCountryCallingCode={true}
                                    key={234}
                                    defaultCountry='NG'
                                    style={{ outline: 0, width: '108%' }}
                                    countryCallingCodeEditable={false}
                                    value={phone}
                                    name="nextOfKinPhone"
                                    flags={flags}
                                    limitMaxLength={true}
                                    smartCaret={false}
                                    className='w-full hover:border-primary/90 outline-none placeholder-opacity-70 text-gray-600 text-sm bg-transparent rounded-md px-4 flex-1'
                                />
                            </div>
                        </div>
                        {/* <div className="sm:col-span-2 text-gray-600 text-xs pb-2 border-b">Confirmation</div> */}
                        <TextInput key={9172610} id='confirm-password' type='password' name='confirm-password' label='Confirm Password' placeholder={'Enter Password to Confirm Changes'} minLength={3} required={true} containerClassName={'text-xs sm:col-span-2'} />
                        <button type='submit' className="cursor-pointer rounded-md text-thin text-xs text-white bg-primary hover:bg-blue-600 py-2 px-4 sm:py-3 sm:px-6 w-max select-none">Update Personal Information</button>
                    </form>

                </div>
            </section>
            <section className={`flex-col pt-5 pb-10 ${formToShow === "Account" ? 'flex' : 'hidden'}`}>
                <div className="flex flex-col gap-6">
                    <aside className="flex flex-col gap-4 p-4">
                        <h4 className="text-xs text-slate-500 opacity-80">Your Account Details</h4>
                        <div className="flex gap-4 md:gap-6">
                            <div className="flex flex-col gap-1 w-max justify-center">
                                <div className="flex flex-col">
                                    <h3 className="text-sm text-primary">{user?.firstname} {user?.middlename} {user?.lastname}</h3>
                                    <p className="text-[.6rem] text-slate-500">{user?.accountDetails && user?.accountDetails[0]?.banker}</p>
                                    <p className="text-xs text-slate-500 font-semibold">{user?.accountDetails && user?.accountDetails[0]?.accountnumber}</p>
                                </div>
                            </div>
                        </div>
                    </aside>
                    <form ref={accountFormRef} onSubmit={handleAccountSubmit} className="px-4 sm:px-0 w-full sm:w-10/12 sm:scale-90 grid sm:grid-cols-2 gap-4 sm:gap-y-6 sm:justify-center relative after:bg-slate-300 after:-top-4 after:h-[.51px] after:w-11/12 after:left-1/2 after:-translate-x-1/2 after:absolute">
                        <input type="hidden" name="id" defaultValue={user?.id} />
                        <input type="hidden" name="extra" defaultValue={user?.password} />
                        <TextInput disabled key={6264} id='account' name='account' label='Account Name' defaultValue={`${user?.firstname} ${user?.middlename} ${user?.lastname}`} minLength={11} required={true} containerClassName={'text-xs sm:col-span-2'} className='bg-slate-200' />
                        <TextInput key={6265} id='banker' name='banker' label='Bank Name' defaultValue={user?.accountDetails && user?.accountDetails[0]?.banker} minLength={10} required={true} containerClassName={'text-xs'} />
                        <TextInput key={6266} id='accountnumber' name='accountnumber' label='Account Number' defaultValue={user?.accountDetails && user?.accountDetails[0]?.accountnumber} minLength={10} required={true} containerClassName={'text-xs'} />
                        <div className={`flex flex-col gap-1`}>
                            <label htmlFor={"type"} className="text-gray-500 text-sm">Account Type</label>
                            <select name="type" id="type" className="relative outline-none py-2 px-4 border border-gray-300 rounded-md text-gray-600 text-sm placeholder-opacity-70 bg-transparent focus-within:bg-transparent focus:bg-transparent">
                                <option className='normal-text text-sm bg-white font-sans' defaultValue={"Savings"}>Savings </option>
                                <option className='normal-text text-sm bg-white font-sans' defaultValue={"Current"}>Current </option>
                                <option className='normal-text text-sm bg-white font-sans' defaultValue={"Fixed"}>Fixed </option>
                            </select>
                        </div>
                        <TextInput key={6267} id='bvn' name='bvn' label='BVN' defaultValue={user?.accountDetails && user?.accountDetails[0]?.bvn} minLength={11} max={11} required={false} containerClassName={'text-xs'} />
                        <TextInput key={6268} id='confirm-password' type='password' name='confirm-password' label='Confirm Password' placeholder={'Enter Password to Confirm Changes'} minLength={3} required={true} containerClassName={'text-xs sm:col-span-2'} />
                        {/* <TextInput key={6268} id='address' name='address' label='Address' defaultValue={user?.'6, Sirakoro Street, Adjecent Kilimanjaro Eatery, Wuse II'} minLength={3} required={true} containerClassName={'text-xs sm:col-span-2'} /> */}
                        <button type='submit' className="cursor-pointer rounded-md text-thin text-xs text-white bg-primary hover:bg-blue-600 py-2 px-4 sm:py-3 sm:px-6 w-max select-none">Update Account Details</button>
                    </form>

                </div>
            </section>
            <Modal modalRef={modalRef}>
                <div className='p-5 flex flex-col gap-4'>
                    <div className="w-full flex items-center gap-4">
                        <div className={`h-10 sm:h-14 w-10 sm:w-14 flex-shrink-0 flex justify-center items-center rounded-full overflow-hidden relative bg-danger dark:bg-slate-100 text-slate-100 dark:text-slate-600`}>
                            <IoTrashBinOutline className='text-lg sm:text-xl' />
                        </div>
                        <div className='flex-1 flex flex-col text-center w-full p-4'>
                            <div className="flex gap-4 text-slate-600 w-full">
                                <div className="flex flex-col justify-center text-center">
                                    <h5 className="text-lg sm:text-xl font-semibold leading-tight whitespace-nowrap flex items-center"> {`${user?.firstname} ${user?.middlename} ${user?.lastname}`}&apos;s Account </h5>
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
