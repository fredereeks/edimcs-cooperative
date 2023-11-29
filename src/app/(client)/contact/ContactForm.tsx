"use client"

import React, { useRef, useState } from 'react'
import { TextInput } from '@/components'
import toast from 'react-hot-toast'
import TextArea from '@/components/TextArea'
import { FaEnvelope } from 'react-icons/fa6'
import { LoginFormDataProps } from '@/types'


export default function ContactForm({ handleContact }: { handleContact: (formData: FormData) => Promise<LoginFormDataProps | null> }) {
    const [loading, setLoading] = useState<boolean>(false)
    const formRef = useRef<HTMLFormElement>(null)

    const handleSubmit = async (formData: FormData) => {
        setLoading(true)
        try {
            const data = await handleContact(formData)
            toast.success(`${data?.message}`, {id: "8206"})
        } catch (error) {
            toast.error(`Something went wrong. Due to ${error}`, {id: "8206"})
        } finally{
            setLoading(false)
        }
    }
    return (
        <>
            <form ref={formRef} action={handleSubmit} className="py-5 flex flex-col gap-3 sm:pr-4">
                <div data-aos-duration="1000" data-aos="fade-up-right"  className="grid sm:grid-cols-2 gap-3">
                    <TextInput data-aos-duration="1000" data-aos="fade-up-right"  label={'Firstname'} containerClassName={'text-slate-400'} key={823405} type='text' name='firstname' id='firstname' placeholder='First Name' required={true} />
                    <TextInput data-aos-duration="1000" data-aos="fade-up-right"  label={'Lastname'} containerClassName={'text-slate-400'} key={823406} type='text' name='lastname' id='lastname' placeholder='Last Name' required={true} />
                    <TextInput data-aos-duration="1000" data-aos="fade-up-right"  label={'Email'} containerClassName={'text-slate-400 sm:col-span-2'} key={823407} type='email' name='email' id='email' placeholder='Enter Email' required={true} />
                    <TextInput data-aos-duration="1000" data-aos="fade-up-right"  label={'Phone'} containerClassName={'text-slate-400 sm:col-span-2'} key={823408} type='phone' name='phone' id='phone' placeholder='Enter Email' required={false} />
                    <TextArea label={'Message'} containerClassName={'text-slate-400 sm:col-span-2'} key={823409} name='message' id='message' placeholder='Enter your Message here...' required={true} />
                </div>
                <button type="submit" disabled={loading} className="rounded-full py-2 px-5 md:px-8 w-max bg-red-500 shadow-lg shadow-red-500 text-white text-sm text-center flex-1 cursor-pointer flex items-center gap-2 mt-2"><FaEnvelope className="text-sm text-inherit" />{loading ? 'Processing...' : 'Send Message'}</button>
            </form>
        </>
    )
}
