"use client"

import React, { useRef, useState } from 'react'
import { TextInput } from '@/components'
import { FaMoneyCheck } from 'react-icons/fa'
import toast from 'react-hot-toast'
import PhoneInput from 'react-phone-number-input'
import flags from 'react-phone-number-input/flags';
import 'react-phone-number-input/style.css'
// import { redirect } from 'next/navigation';
import { useRouter } from 'next/navigation'
import Link from 'next/link'


export default function SignupForm({ handleSignup }: { handleSignup: (formData: FormData) => Promise<{ error: boolean, message: string }> }) {
    const [loading, setLoading] = useState<boolean>(false)
    const formRef = useRef<HTMLFormElement | null>(null)
    const router = useRouter()
    const [password, setPassword] = useState<string>('')
    const [phone, setPhone] = useState<string | undefined>('')
    const [confirmPassword, setConfirmPassword] = useState<string>('')
    const loanRatingRef = useRef<HTMLSelectElement | null>(null)
    const loanRatings = {
        "Basic": "between ₦50,000 to ₦100,000 loan",
        "BasicPlus": "between ₦150,000 to ₦200,000 loan",
        "Standard": "between ₦250,000 to ₦300,000 loan",
        "StandardPlus": "as high as ₦500,000 and above (less than 1 Million) loan",
        "Premium": "a whooping ₦1,000,000 or more in loan",
    }
    const [loanRating, setLoanRating] = useState<string>(loanRatings.Basic)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        toast.loading(`Please wait while your account is being created`, { id: "8206" })
        if (password !== confirmPassword) {
            toast.error(`Passwords Do NOT Match!`, { id: "8206" })
            return;
        }
        setLoading(true)
        try {
            const formData = new FormData(formRef?.current!)
            const data = await handleSignup(formData)
            if (data?.error) toast.error(data?.message, { id: "8206" })
            else {
                toast.success(data?.message!, { id: "8206" })
                router.push("/dashboard")
            }
            toast.success(`${data?.message}`, { id: "8206" })
            router.push('/auth/login', { scroll: false })
        } catch (error) {
            toast.error(`Something went wrong. Due to ${error}`, { id: "8206" })
        } finally {
            setLoading(false)
        }
    }

    const handleLoanRatingChange = (e: React.ChangeEvent) => {
        const loan = loanRatingRef?.current?.value!
        setLoanRating(loanRatings[loan as keyof typeof loanRatings])
    }

    return (
        <>
            <form ref={formRef} onSubmit={handleSubmit} className="py-5 flex flex-col gap-3 px-4 sm:px-0">
                <div className="grid md:grid-cols-2 gap-2">
                    <TextInput label={'First Name'} containerClassName={'text-slate-600'} key={823401} type='text' name='firstname' id='firstname' placeholder='Enter First Name' required={true} />
                    <TextInput label={'Middle Name'} containerClassName={'text-slate-600'} key={823402} type='text' name='middlename' id='middlename' placeholder='Enter Middle Name' required={false} />
                    <TextInput label={'Last Name'} containerClassName={'text-slate-600'} key={823403} type='text' name='lastname' id='lastname' placeholder='Enter Last Name' required={true} />
                    <TextInput label={'Email'} containerClassName={'text-slate-600'} key={823404} type='email' name='email' id='email' placeholder='Enter Your Email' required={false} />
                    <div className={`flex flex-col gap-1`}>
                        <label htmlFor={'phone'} className="text-gray-600 text-sm">Phone</label>
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
                                name="phone"
                                flags={flags}
                                limitMaxLength={true}
                                smartCaret={false}
                                className='w-full hover:border-primary/90 outline-none placeholder-opacity-70 text-sitetext/80 bg-transparent rounded-md px-4 flex-1'
                            />
                        </div>
                    </div>
                    <TextInput onChange={e => setPassword(e.currentTarget.value)} value={password} label={'Password'} containerClassName={'text-slate-600'} key={823405} type='password' name='password' id='password' minLength={6} placeholder='Enter Your Password' required={true} />
                    <TextInput onChange={e => setConfirmPassword(e.currentTarget.value)} value={confirmPassword} label={'Confirm Password'} containerClassName={'text-slate-600'} key={823406} type='password' name='password' id='confirm-password' minLength={6} placeholder='Confirm Password' required={true} />
                    <div className={`flex flex-col gap-1`}>
                        <label htmlFor={"loanRating"} className="text-gray-500 text-sm">Member Type (Fee)</label>
                        <select ref={loanRatingRef} onChange={handleLoanRatingChange} name="loanRating" id="loanRating" className="relative outline-none py-2 px-4 border border-gray-300 rounded-md text-gray-600 text-sm placeholder-opacity-70 bg-transparent focus-within:bg-transparent focus:bg-transparent">
                            <option className='normal-text text-sm bg-white font-sans' value={"Basic"}>Basic (&#8358;3,000)</option>
                            <option className='normal-text text-sm bg-white font-sans' value={"BasicPlus"}>Basic Plus (&#8358;5,000)</option>
                            <option className='normal-text text-sm bg-white font-sans' value={"Standard"}>Standard (&#8358;10,000)</option>
                            <option className='normal-text text-sm bg-white font-sans' value={"StandardPlus"}>Standard Plus  (&#8358;20,000)</option>
                            <option className='normal-text text-sm bg-white font-sans' value={"Premium"}>Premium (&#8358;50,000)</option>
                        </select>
                    </div>
                    <div className="px-5 py-2 text-center text-xs md:text-sm text-sky-500 bg-sky-100 rounded-md md:col-span-2">As a {loanRatingRef?.current?.value} Member, you are entitled to {loanRatings[loanRatingRef?.current?.value! as keyof typeof loanRatings]}</div>
                    <button type="submit" disabled={loading} className="md:col-span-2 rounded-full py-2 px-5 md:px-8 w-full bg-primary shadow-primary shadow-md text-white text-sm text-center flex-1 cursor-pointer flex items-center justify-center gap-2 mt-2"><FaMoneyCheck className="text-sm text-inherit" />{loading ? 'Processing...' : 'Signup'}</button>
                </div>
            </form>
            <Link href={"/auth/login"} className="text-center cursor-pointer mx-auto z-20 relative before:absolute before:w-1/6 before:top-1/2 before:-translate-y-1/2 before:right-full before:h-[1px] before:bg-slate-300 before:rounded-md before:z-10  after:absolute after:w-1/6 after:top-1/2 after:-translate-y-1/2 after:left-full after:h-[1px] after:bg-slate-300 after:rounded-md after:z-10 w-max bg-neutral-50 py-2 px-3 text-sm text-slate-400">Already a Member? Login</Link>

        </>
    )
}
