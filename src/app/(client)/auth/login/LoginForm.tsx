"use client"

import React, { useEffect, useRef, useState } from 'react'
import { TextInput } from '@/components'
import Link from 'next/link'
import { FaMoneyCheck } from 'react-icons/fa'
import toast from 'react-hot-toast'
// import { redirect } from 'next/navigation';
import { useRouter } from 'next/navigation'
// import { LoginFormDataProps } from '@/types'
// import { signIn, useSession } from 'next-auth/react'
import axios from "axios"
import { signIn, useSession } from 'next-auth/react'
// import { authOptions } from '@/api/route'





export default function LoginForm() {
    const [loading, setLoading] = useState<boolean>(false)
    const [password, setPassword] = useState<string>('')
    const [memberId, setMemberId] = useState<string>('')
    const formRef = useRef<HTMLFormElement>(null)
    const router = useRouter()
    const { status } = useSession()

    useEffect(() => {
        if (status === "authenticated") {
            router.refresh()
            router.push('/dashboard', { scroll: false })
        }
        //eslint-disable-next-line
    }, [status])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true)
        // console.log({baseURL: process.env.BASE_URL})
        toast.loading(`Please wait while we attempt to log you in`, { id: "39274" })
        try {
            console.log("Attempting a Login")
            // toast.success(`Welcome Back, ${memberId}`, { id: "39274" })
            // const res = await fetch("http://localhost:6669/api/member/login", {
            //     method: "POST",
            //     headers: {
            //         "Content-Type": "application/json"
            //     },
            //     body: JSON.stringify({memberId, password})
            // })
            // const data = await res.json();
            // const data = await signIn("credentials", {memberId,password})
            // console.log({data})
            // if (data?.error) toast.error(data?.message, { id: "39274" })
            // else {
            //     toast.success(data?.message, { id: "39274" })
            //     router.push("/dashboard")
            // }
            const res = await signIn('credentials', { memberId, password, redirect: false })
            if (res?.ok) toast.success(`Welcome Back ${memberId}`, { id: "39274" })
            else {
                if(res?.error === "CredentialsSignin") toast.error("Invalid credentials supplied, please, try again", { id: "39274", duration: 4000 })
                else toast.error(res?.error || "Invalid credentials supplied, please, try again", { id: "39274" })
            }
            // server name is correct, go to server name and click on "browse", it will show you a list of options and find 'database engine', expand (if you have only one), select that and click 'ok' and try connecting, if multiple, try each.
            // SQL Server configuration Manager (from the start menu), click on 'SQL Server Services', the first one, not the one in the middle, the one in the left-navigation mgr.
            // Check that ms sql server, ensure it is saying 'running', if not, right-click and click 'start'
            // For importation, 'under task', use import wizard

        } catch (error) {
            toast.error(`Something went wrong. Due to ${error}`, { id: "39274" })
        } finally {
            setLoading(false)
        }
    }
    return (
        <>
            <form ref={formRef} onSubmit={handleSubmit} className="py-5 flex flex-col gap-3 px-4 sm:px-0">
                <div className="flex flex-col gap-2">
                    <TextInput onChange={e => setMemberId(e.currentTarget.value)} label={'Member ID/Phone No.'} containerClassName={'text-slate-400'} key={823406} type='text' name='memberId' id='memberId' value={memberId} placeholder='Enter Your Member ID' required={true} />
                    <TextInput onChange={e => setPassword(e.currentTarget.value)} label={'Password'} containerClassName={'text-slate-400'} key={823407} type='password' name='password' id='password' value={password} placeholder='********' minLength={6} required={true} />
                </div>
                <button type="submit" disabled={loading} className="rounded-full py-2 px-5 md:px-8 w-max bg-primary text-white text-sm text-center flex-1 cursor-pointer flex items-center gap-2 mt-2"><FaMoneyCheck className="text-sm text-inherit" />{loading ? <div className="flex gap-2"><span className="loading loading-spinner loading-xs"></span> Processing...</div> : 'Login'}</button>
            </form>
            {/* <Link download={'EDIMCS_APPLICATION_FORM-edimcs.com'} href={"/documents/EDIMCS-LOAN-APPLICATION-FORM.pdf"} className="text-center cursor-pointer mx-auto z-20 relative before:absolute before:w-1/6 before:top-1/2 before:-translate-y-1/2 before:right-full before:h-[1px] before:bg-slate-300 before:rounded-md before:z-10  after:absolute after:w-1/6 after:top-1/2 after:-translate-y-1/2 after:left-full after:h-[1px] after:bg-slate-300 after:rounded-md after:z-10 w-max bg-neutral-50 py-2 px-3 text-sm text-slate-400">Download the Member Account Form</Link> */}
            <Link href={"/auth/signup"} className="text-center cursor-pointer mx-auto z-20 relative before:absolute before:w-1/6 before:top-1/2 before:-translate-y-1/2 before:right-full before:h-[1px] before:bg-slate-300 before:rounded-md before:z-10  after:absolute after:w-1/6 after:top-1/2 after:-translate-y-1/2 after:left-full after:h-[1px] after:bg-slate-300 after:rounded-md after:z-10 w-max bg-neutral-50 py-2 px-3 text-sm text-slate-400">Don&apos;t have an account? Become a Member</Link>
        </>
    )
}
