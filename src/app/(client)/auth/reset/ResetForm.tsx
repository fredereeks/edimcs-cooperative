"use client"

import React, { useRef, useState } from 'react'
import toast from 'react-hot-toast'
import Image from 'next/image'
import { logo } from '@/assets/images'
import { useRouter } from "next/navigation"
import { handlePasswordReset } from '@/actions'



export default function ResetForm({email} : {email: string}) {
    const [loading, setLoading] = useState<boolean>(false)
    const formRef = useRef<HTMLFormElement | null>(null);
    const passwordRef = useRef<HTMLInputElement | null>(null)
    const confirmPasswordRef = useRef<HTMLInputElement | null>(null)
    const router = useRouter()


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if ((passwordRef?.current?.value)?.trim() !== (confirmPasswordRef?.current?.value)?.trim()) {
            toast.error('Passwords do NOT Match!', { id: "86249", duration: 5000 }) 
        }
        toast.loading('Please wait while we send your request', { id: "86249", duration: 5000 }) 
        setLoading(true)
        try {
            const formData = new FormData(formRef?.current!)
            formData.append("email", email)
            const res = await handlePasswordReset(formData)
            if (res?.error) toast.error(res.message, { id: "86249", duration: 5000 }) 
            else {
                toast.success(res.message, { id: "86249", duration: 5000 }) 
                router.refresh()
                router.push('/dashboard', { scroll: false })
            }
        } catch (error) {
            toast.error('Unable to complete request, please, check your network and try again', { id: "86249", duration: 5000 }) 
        }
        setLoading(false)
    }


    return (
        <form action="" onSubmit={handleSubmit} ref={formRef} className="form w-full max-w-sm sm:max-w-md md:max-w-lg relative mx-auto grid lg:grid-cols-2 gap-3 p-4">
            <div className="lg:col-span-2 flex flex-col items-center py-2 pb-4 mb-4 border-b border-b-slate-200 ">
                <div className="relative">
                    <Image src={logo} alt="CTTI Official Logo" height={90} width={90} className='object-cover' />
                </div>
                <h3 className="pt-4 mt-4 border-t border-t-slate-200 text-sm md:text-base text-slate-500 text-center font-light">Reset your Password</h3>
                <p className="heading text-2xl text-center font-bold">Enter your new password</p>
            </div>
            <div className={`flex flex-col gap-1`}>
                <label htmlFor={'password'} className="text-gray-600 text-sm">Password</label>
                <input ref={passwordRef} type="password" required id='password' name={'password'} min={6} placeholder={'******'} className='hover:border-primary/90 outline-none placeholder-opacity-70 text-slate-500 text-sm sm:text-md bg-transparent border border-zinc-200 rounded-[.25rem] py-2 px-4' />
            </div>
            <div className={`flex flex-col gap-1`}>
                <label htmlFor={'confirm-password'} className="text-gray-600 text-sm">Confirm Password</label>
                <input ref={confirmPasswordRef} type="password" required id='confirm-password' name={'confirm-password'} min={6} placeholder={'******'} className='hover:border-primary/90 outline-none placeholder-opacity-70 text-slate-500 text-sm sm:text-md bg-transparent border border-zinc-200 rounded-[.25rem] py-2 px-4' />
            </div>
            <button type="submit" disabled={loading} className="rounded-full py-2 px-5 md:px-8 w-max bg-primary text-white text-sm text-center flex-1 cursor-pointer flex items-center gap-2 mt-2">{loading ? 'Processing...' : 'Login'}</button>
        </form>
    )
}
