"use client"

import React, { useEffect, useRef, useState } from 'react'
import { TextInput } from '@/components'
import Link from 'next/link'
import { FaMoneyCheck } from 'react-icons/fa'
import toast from 'react-hot-toast'
// import { redirect } from 'next/navigation';
import { useRouter } from 'next/navigation'
// import { LoginFormDataProps } from '@/types'
import { signIn, useSession } from 'next-auth/react'





export default function LoginForm() {
    const [loading, setLoading] = useState<boolean>(false)
    const [password, setPassword] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const formRef = useRef<HTMLFormElement>(null)
    const router = useRouter()
    const {status} = useSession()

    // useEffect(() => {
    //     if(status === "authenticated"){
    //         router.refresh()
    //         router.push('/dashboard', { scroll: false })
    //     }
    //     //eslint-disable-next-line
    // }, [status])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true)
        toast.loading(`Please wait while we log you in`, { id: "8206" })
        try {
                toast.success(`Welcome Back, ${email}`, { id: "8206" })
            // const res = await signIn('credentials', {email, password, redirect: false})
            // if(!res || res.ok !== true){
            //     toast.error(`You have supplied an invalid Member ID and Password`, { id: "8206" })
            // }
            // else {
            //         router.refresh();
            // }
            router.push("/dashboard")
        } catch (error) {
            toast.error(`Something went wrong. Due to ${error}`, { id: "8206" })
        } finally {
            setLoading(false)
        }
    }
    return (
        <>
            <form ref={formRef} onSubmit={handleSubmit} className="py-5 flex flex-col gap-3 px-4 sm:px-0">
                <div className="flex flex-col gap-2">
                    <TextInput onChange={e => setEmail(e.currentTarget.value)} label={'Email'} containerClassName={'text-slate-400'} key={823406} type='email' name='email' id='email' value={email} placeholder='Enter Your Email' required={true} />
                    <TextInput onChange={e => setPassword(e.currentTarget.value)} label={'Password'} containerClassName={'text-slate-400'} key={823407} type='password' name='password' id='password' value={password} placeholder='********' minLength={6} required={true} />
                </div>
                <button type="submit" disabled={loading} className="rounded-full py-2 px-5 md:px-8 w-max bg-primary text-white text-sm text-center flex-1 cursor-pointer flex items-center gap-2 mt-2"><FaMoneyCheck className="text-sm text-inherit" />{loading ? 'Processing...' : 'Login'}</button>
            </form>
            {/* <Link download={'EDIMCS_APPLICATION_FORM-edimcs.com'} href={"/documents/EDIMCS-LOAN-APPLICATION-FORM.pdf"} className="text-center cursor-pointer mx-auto z-20 relative before:absolute before:w-1/6 before:top-1/2 before:-translate-y-1/2 before:right-full before:h-[1px] before:bg-slate-300 before:rounded-md before:z-10  after:absolute after:w-1/6 after:top-1/2 after:-translate-y-1/2 after:left-full after:h-[1px] after:bg-slate-300 after:rounded-md after:z-10 w-max bg-neutral-50 py-2 px-3 text-sm text-slate-400">Download the Member Account Form</Link> */}
            <Link href={"/auth/signup"} className="text-center cursor-pointer mx-auto z-20 relative before:absolute before:w-1/6 before:top-1/2 before:-translate-y-1/2 before:right-full before:h-[1px] before:bg-slate-300 before:rounded-md before:z-10  after:absolute after:w-1/6 after:top-1/2 after:-translate-y-1/2 after:left-full after:h-[1px] after:bg-slate-300 after:rounded-md after:z-10 w-max bg-neutral-50 py-2 px-3 text-sm text-slate-400">Don&apos;t have an account? Become a Member</Link>
        </>
    )
}
