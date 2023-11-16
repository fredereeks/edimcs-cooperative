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
import SignupForm from './SignupForm'
import bcryptjs from 'bcryptjs'
import prisma from '@/utils/prisma'
import Image from 'next/image'
import { edimcs_bookkeeping } from '@/assets/images'







export default function LoginForm({setShowSignUp} : {setShowSignUp: React.Dispatch<React.SetStateAction<boolean>>}) {
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
        toast.loading(`Please wait while we log you in`, { id: "8206" })
        try {
            console.log("Attempting a Login")
            toast.success(`Welcome Back, ${memberId}`, { id: "8206" })
            // const res = await signIn('credentials', { email, password, redirect: false, callbackUrl: '/auth/login' })
            // if (!res || res.ok !== true) {
            //     toast.error(`You have supplied an invalid Member ID and Password`, { id: "8206" })
            // }
            // else {
            //     router.refresh();
            // }
            // server name is correct, go to server name and click on "browse", it will show you a list of options and find 'database engine', expand (if you have only one), select that and click 'ok' and try connecting, if multiple, try each.
            // SQL Server configuration Manager (from the start menu), click on 'SQL Server Services', the first one, not the one in the middle, the one in the left-navigation mgr.
            // Check that ms sql server, ensure it is saying 'running', if not, right-click and click 'start'
            // For importation, 'under task', use import wizard

            router.push("/dashboard")
        } catch (error) {
            toast.error(`Something went wrong. Due to ${error}`, { id: "8206" })
        } finally {
            setLoading(false)
        }
    }
    return (
        <>
            <main className="flex flex-col relative">
                <section className="shadow-lg shadow-slate-950 flex flex-col relative before:hidden md:before:flex before-overlay before:bg-neutral-50 after-overlay  after:bg-white after:left-1/2">
                    <div className="container mx-auto flex flex-col-reverse md:flex-row relative z-10">
                        <aside className="py-5 sm:py-20 flex flex-col justify-center flex-1 realtive overflow-hidden">
                            <div className="max-w-md mx-auto w-full flex flex-col justify-center py-5 sm:px-5">
                                <form ref={formRef} onSubmit={handleSubmit} className="py-5 flex flex-col gap-3 px-4 sm:px-0">
                                    <div className="flex flex-col gap-2">
                                        <TextInput onChange={e => setMemberId(e.currentTarget.value)} label={'Member ID'} containerClassName={'text-slate-400'} key={823406} type='text' name='memberId' id='memberId' value={memberId} placeholder='Enter Your Member ID' required={true} />
                                        <TextInput onChange={e => setPassword(e.currentTarget.value)} label={'Password'} containerClassName={'text-slate-400'} key={823407} type='password' name='password' id='password' value={password} placeholder='********' minLength={6} required={true} />
                                    </div>
                                    <button type="submit" disabled={loading} className="rounded-full py-2 px-5 md:px-8 w-max bg-primary text-white text-sm text-center flex-1 cursor-pointer flex items-center gap-2 mt-2"><FaMoneyCheck className="text-sm text-inherit" />{loading ? <div className="flex gap-2"><span className="loading loading-spinner loading-xs"></span> Processing...</div> : 'Login'}</button>
                                </form>
                                {/* <Link download={'EDIMCS_APPLICATION_FORM-edimcs.com'} href={"/documents/EDIMCS-LOAN-APPLICATION-FORM.pdf"} className="text-center cursor-pointer mx-auto z-20 relative before:absolute before:w-1/6 before:top-1/2 before:-translate-y-1/2 before:right-full before:h-[1px] before:bg-slate-300 before:rounded-md before:z-10  after:absolute after:w-1/6 after:top-1/2 after:-translate-y-1/2 after:left-full after:h-[1px] after:bg-slate-300 after:rounded-md after:z-10 w-max bg-neutral-50 py-2 px-3 text-sm text-slate-400">Download the Member Account Form</Link> */}
                                <button onClick={() => setShowSignUp(true)} className="cursor-pointer text-center mx-auto z-20 relative before:absolute before:w-1/6 before:top-1/2 before:-translate-y-1/2 before:right-full before:h-[1px] before:bg-slate-300 before:rounded-md before:z-10  after:absolute after:w-1/6 after:top-1/2 after:-translate-y-1/2 after:left-full after:h-[1px] after:bg-slate-300 after:rounded-md after:z-10 w-max bg-neutral-50 py-2 px-3 text-sm text-slate-400">Don&apos;t have an account? Become a Member</button>
                            </div>
                        </aside>
                        <aside className="py-20 pt-36 p-5 flex flex-col gap-4 flex-1 bg-primary/50">
                            <h3 className="text-slate-50 text-4xl sm:text-5xl md:text-6xl leading-tight font-bold max-w-md sm:max-w-xl">Welcome Back <span className="text-primary">Esteem</span> Member<span className="text-red-500">.</span></h3>
                            <p className="text-slate-50 text-sm leading-loose max-w-lg">.</p>
                        </aside>
                    </div>
                </section>
            </main>

        </>
    )
}
