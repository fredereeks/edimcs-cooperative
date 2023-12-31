"use client"

import React, { useEffect, useRef, useState } from 'react'
import { TextInput } from '@/components'
import Link from 'next/link'
import { FaMoneyCheck } from 'react-icons/fa'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import { signIn, useSession } from 'next-auth/react'
import { edimcs_logo } from '@/assets/images'
import Image from 'next/image'
import { handleReset } from '@/actions'



export default function LoginForm() {
    const [loading, setLoading] = useState<boolean>(false)
    const [password, setPassword] = useState<string>('')
    const [memberId, setMemberId] = useState<string>('')
    const formRef = useRef<HTMLFormElement | null>(null)
    const resetEmailRef = useRef<HTMLInputElement | null>(null)
    const [showResetForm, setShowResetForm] = useState<boolean>(false)
    const router = useRouter()
    const { status } = useSession()

    useEffect(() => {
        if (status === "authenticated") {
            router.refresh()
            router.push('/dashboard', { scroll: false })
        }
        //eslint-disable-next-line
    }, [status])

    
    const handlePasswordReset = async (e: React.FormEvent) => {
        e.preventDefault();
        toast.loading('Please wait while we send a reset link to your email', { id: "86249" })
        setLoading(true)
        try {
            const email = resetEmailRef?.current?.value as string
            const res = await handleReset(email)
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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true)
        toast.loading(`Please wait while we attempt to log you in`, { id: "39274" })
        try {
            const res = await signIn('credentials', { memberId, password, redirect: false, callbackUrl:  `${window.location.origin}/dashboard/` })
            console.log({ res })
            if (res?.ok) toast.success(`Welcome Back Esteem Member.\nYou will be redirected in a few seconds`, { id: "39274" })
            else {
                if (res?.error === "CredentialsSignin") toast.error("Invalid credentials supplied, please, try again", { id: "39274", duration: 4000 })
                else toast.error(res?.error || "Invalid credentials supplied, please, try again", { id: "39274" })
            }
            // server name is correct, go to server name and click on "browse", it will show you a list of options and find 'database engine', expand (if you have only one), select that and click 'ok' and try connecting, if multiple, try each.
            // SQL Server configuration Manager (from the start menu), click on 'SQL Server Services', the first one, not the one in the middle, the one in the left-navigation mgr.
            // Check that ms sql server, ensure it is saying 'running', if not, right-click and click 'start'
            // For importation, 'under task', use import wizard
        } catch (error) {
            console.log({error})
            toast.error(`Something went wrong. Due to ${error}`, { id: "39274" })
        } finally {
            setLoading(false)
        }
    }


    return (
        <>
            {
                showResetForm ?
                    <form action="" onSubmit={handlePasswordReset} ref={formRef} className="form w-full max-w-sm md:max-w-md relative mx-auto flex flex-col gap-1 p-4">
                        <div className="flex flex-col items-center">
                            {/* <div className="relative">
                                <Image src={edimcs_logo} alt="EDIMCS Official Logo" height={90} width={90} className='object-cover w-auto h-auto' />
                            </div> */}
                            <p className="heading text-lg text-center py-4 mt-4 border-y border-y-slate-200">Enter your Email to reset your Password</p>
                        </div>
                        <div className={`flex flex-col gap-1 py-1`}>
                            <label htmlFor={'resetEmail'} className="text-gray-600 text-sm">Email</label>
                            <input type="email" required ref={resetEmailRef} id='resetEmail' name={'resetEmail'} placeholder={'Enter your Account Email'} className='hover:border-primary/90 outline-none placeholder-opacity-70 text-slate-500 text-sm sm:text-md bg-transparent border border-zinc-200 rounded-[.25rem] py-2 px-4' />
                        </div>
                        <p onClick={() => setShowResetForm(!showResetForm)} className="cursor-pointer underline underline-offset-2 text-primary text-sm">Have an Account? Login</p>
                        <button type="submit" disabled={loading} className="rounded-full py-2 px-5 md:px-8 w-max bg-primary text-white text-sm text-center flex-1 cursor-pointer flex items-center gap-2 mt-2">{loading ? <div className="flex gap-2 items-center"><span className="loading loading-spinner loading-xs"></span> Processing...</div> : <div className="flex gap-2 items-center"><FaMoneyCheck className="text-sm text-inherit" /> Reset Password</div>}</button>

                    </form>
                    :
                    <>
                        <form ref={formRef} onSubmit={handleSubmit} className="py-5 flex flex-col gap-3 px-4 sm:px-0">
                            <div className="flex flex-col gap-2">
                                <TextInput onChange={e => setMemberId(e.currentTarget.value)} label={'Member ID/Phone No.'} containerClassName={'text-slate-400'} key={823406} type='text' name='memberId' id='memberId' value={memberId} placeholder='Enter Your Member ID' required={true} />
                                <TextInput onChange={e => setPassword(e.currentTarget.value)} label={'Password'} containerClassName={'text-slate-400'} key={823407} type='password' name='password' id='password' value={password} placeholder='********' minLength={6} required={true} />
                                <p onClick={() => setShowResetForm(!showResetForm)} className="cursor-pointer underline underline-offset-2 -mb-2 text-primary text-sm">Forgot Password</p>
                            </div>
                            <button type="submit" disabled={loading} className="rounded-full py-2 px-5 md:px-8 w-max bg-primary text-white text-sm text-center flex-1 cursor-pointer flex items-center gap-2 mt-2"><FaMoneyCheck className="text-sm text-inherit" />{loading ? <div className="flex gap-2 items-center"><span className="loading loading-spinner loading-xs"></span> Processing...</div> : 'Login'}</button>
                        </form>
                        <Link href={"/auth/signup"} className="text-center cursor-pointer mx-auto z-20 relative before:absolute before:w-1/6 before:top-1/2 before:-translate-y-1/2 before:right-full before:h-[1px] before:bg-slate-300 before:rounded-md before:z-10  after:absolute after:w-1/6 after:top-1/2 after:-translate-y-1/2 after:left-full after:h-[1px] after:bg-slate-300 after:rounded-md after:z-10 w-max bg-neutral-50 py-2 px-3 text-sm text-slate-400">Don&apos;t have an account? Become a Member</Link>
                    </>}
        </>
    )
}
