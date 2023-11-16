"use client"

import React, { useRef, useState } from 'react'
import { TextInput } from '@/components'
import { FaMoneyCheck } from 'react-icons/fa'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import { LoginFormDataProps } from '@/types'
import Link from 'next/link'
import { edimcs_bookkeeping } from '@/assets/images'
import Image from 'next/image'


export default function SignupForm({ handleSignup, setShowSignUp }: { handleSignup: (formData: FormData) => Promise<LoginFormDataProps | null>, setShowSignUp: React.Dispatch<React.SetStateAction<boolean>> }) {
    const [loading, setLoading] = useState<boolean>(false)
    const formRef = useRef<HTMLFormElement>(null)
    const router = useRouter()
    const [password, setPassword] = useState<string>('')
    const [confirmPassword, setConfirmPassword] = useState<string>('')

    const handleSubmit = async (formData: FormData) => {
        console.log({ password, confirmPassword })
        toast.loading(`Please wait while your account is being created`, { id: "8206" })
        if (password !== confirmPassword) {
            toast.error(`Passwords Do NOT Match!`, { id: "8206" })
            return;
        }
        setLoading(true)
        try {
            const data = await handleSignup(formData)
            toast.success(`${data?.message}`, { id: "8206" })
            router.push('/auth/login', { scroll: false })
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
                                <form ref={formRef} action={handleSubmit} className="py-5 flex flex-col gap-3 px-4 sm:px-0">
                                    <div className="flex flex-col gap-2">
                                        <TextInput label={'Member ID'} containerClassName={'text-slate-600'} key={823401} type='text' name='memberId' id='memberId' placeholder='Enter Member ID' required={true} />
                                        <TextInput label={'First Name'} containerClassName={'text-slate-600'} key={823402} type='text' name='firstname' id='firstname' placeholder='Enter First Name' required={true} />
                                        <TextInput label={'Middle Name'} containerClassName={'text-slate-600'} key={823402} type='text' name='middlename' id='middlename' placeholder='Enter Middle Name' required={false} />
                                        <TextInput label={'Last Name'} containerClassName={'text-slate-600'} key={823403} type='text' name='lastname' id='lastname' placeholder='Enter Last Name' required={true} />
                                        <TextInput label={'Email'} containerClassName={'text-slate-600'} key={823404} type='email' name='email' id='email' placeholder='Enter Your Email' required={true} />
                                        <TextInput onChange={e => setPassword(e.currentTarget.value)} value={password} label={'Password'} containerClassName={'text-slate-600'} key={823405} type='password' name='password' id='password' minLength={6} placeholder='Enter Your Password' required={true} />
                                        <TextInput onChange={e => setConfirmPassword(e.currentTarget.value)} value={confirmPassword} label={'Confirm Password'} containerClassName={'text-slate-600'} key={823406} type='password' name='password' id='confirm-password' minLength={6} placeholder='Confirm Password' required={true} />
                                    </div>
                                    <button type="submit" disabled={loading} className="rounded-full py-2 px-5 md:px-8 w-max bg-primary text-white text-sm text-center flex-1 cursor-pointer flex items-center gap-2 mt-2"><FaMoneyCheck className="text-sm text-inherit" />{loading ? 'Processing...' : 'Signup'}</button>
                                </form>
                                <button onClick={() => setShowSignUp(false)} className="text-center cursor-pointer mx-auto z-20 relative before:absolute before:w-1/6 before:top-1/2 before:-translate-y-1/2 before:right-full before:h-[1px] before:bg-slate-300 before:rounded-md before:z-10  after:absolute after:w-1/6 after:top-1/2 after:-translate-y-1/2 after:left-full after:h-[1px] after:bg-slate-300 after:rounded-md after:z-10 w-max bg-neutral-50 py-2 px-3 text-sm text-slate-400">Already a Member? Login</button>
                            </div>
                        </aside>
                        <aside className="relative py-20 pt-36 p-5 flex flex-col justify-center gap-4 flex-1 bg-success/20">
                            <Image src={edimcs_bookkeeping} alt='edimcs loan page' fill={true} className='overlay left-0 top-0 object-cover opacity-40 blur-sm' />
                            <h3 className="relative shadow-md text-slate-50 text-4xl sm:text-5xl md:text-6xl leading-tight font-bold max-w-md sm:max-w-xl">Welcome Back <span className="relative text-primary">Esteem</span> Member<span className="text-primary">.</span></h3>
                            <p className="relative text-slate-50 text-sm leading-loose max-w-lg">.</p>
                        </aside>
                    </div>
                </section>
            </main>


        </>
    )
}
