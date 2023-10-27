"use client"

import React, { useRef, useState } from 'react'
import { TextInput } from '@/components'
import Link from 'next/link'
import { FaMoneyCheck } from 'react-icons/fa'
import toast from 'react-hot-toast'
// import { redirect } from 'next/navigation';
import { useRouter } from 'next/navigation'



interface FormDataProps {
    error: boolean
    message: string
}

export default function LoginForm({ handleLogin }: { handleLogin: (formData: FormData) => Promise<FormDataProps | null> }) {
    const [loading, setLoading] = useState<boolean>(false)
    const formRef = useRef<HTMLFormElement>(null)
    const router = useRouter()

    const handleSubmit = async (formData: FormData) => {
        setLoading(true)
        try {
            const data = await handleLogin(formData)
            console.log({ data })
            toast.success(`${data?.message}`, { id: "8206" })
            // useRouter
            router.push('/dashboard', { scroll: false })
        } catch (error) {
            toast.error(`Something went wrong. Due to ${error}`, { id: "8206" })
        } finally {
            setLoading(false)
        }
    }
    return (
        <>
            <form ref={formRef} action={handleSubmit} className="py-5 flex flex-col gap-3 px-4 sm:px-0">
                <div className="flex flex-col gap-2">
                    <TextInput label={'Member ID'} containerClassName={'text-slate-400'} key={823406} type='text' name='username' id='username' placeholder='Enter Member ID' required={true} />
                    <TextInput label={'Password'} containerClassName={'text-slate-400'} key={823407} type='password' name='password' id='password' placeholder='Enter Password' required={true} />
                </div>
                <button type="submit" disabled={loading} className="rounded-full py-2 px-5 md:px-8 w-max bg-primary text-white text-sm text-center flex-1 cursor-pointer flex items-center gap-2 mt-2"><FaMoneyCheck className="text-sm text-inherit" />{loading ? 'Processing...' : 'Login'}</button>
            </form>
            <Link download={'EDIMCS_APPLICATION_FORM-edimcs.com'} href={"/documents/EDIMCS-LOAN-APPLICATION-FORM.pdf"} className="text-center cursor-pointer mx-auto z-20 relative before:absolute before:w-1/6 before:top-1/2 before:-translate-y-1/2 before:right-full before:h-[1px] before:bg-slate-300 before:rounded-md before:z-10  after:absolute after:w-1/6 after:top-1/2 after:-translate-y-1/2 after:left-full after:h-[1px] after:bg-slate-300 after:rounded-md after:z-10 w-max bg-neutral-50 py-2 px-3 text-sm text-slate-400">Download the Member Account Form</Link>
        </>
    )
}
