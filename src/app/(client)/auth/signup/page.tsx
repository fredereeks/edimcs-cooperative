import React from 'react'
import SignupForm from './SignupForm'
import bcryptjs from 'bcryptjs'
// import { MAX_AGE, SECRET } from '@/constants'
import prisma from '@/utils/prisma'
import Image from 'next/image'
import { edimcs_bookkeeping } from '@/assets/images'

const handleLogin = async (formData: FormData) => {
  "use server"
  try {
    const memberId = formData.get("memberId")?.valueOf() || ""
    const firstname = formData.get("firstname")?.valueOf() || ""
    const lastname = formData.get("lastname")?.valueOf() || ""
    const email = formData.get("email")?.valueOf() || ""
    const middlename = formData.get("middlename")?.valueOf() || ""
    const password = formData.get("password")?.valueOf() || ""
    // const randomToken = Buffer.from(crypto.randomUUID()).toString('base64')
    const user = await prisma.member.findFirst({
      where: {
        email, memberId
      }
    })
    if (user) {
      if (user.email) {
        return {
          error: true,
          message: "A user with this email already exists"
        }
      }
      else {
        return {
          error: true,
          message: "A user with that Member ID already exists. If this is you, login instead."
        }
      }
    }
    if (typeof memberId === 'string' && typeof firstname === 'string' && typeof lastname === 'string' && typeof middlename === 'string' && typeof password === 'string' && typeof email === 'string') {
      const salt = bcryptjs.genSaltSync(10), hashPassword = bcryptjs.hashSync(password, salt)
      const newUser = await prisma.member.create({
        data: {
          memberId: memberId.toUpperCase(),
          firstname,
          middlename,
          lastname,
          password : hashPassword,
          email: email.toLowerCase(),
        }
      })
      console.log({ newUser })
    }

    return {
      error: false,
      message: `Welcome, ${firstname} ${middlename} ${lastname}. Glad to have you join our team!`
    }
  } catch (err) {
    // const error = err as AxiosError;
    return {
      error: true,
      message: "Something went wrong, please, try again"
    }
  }
}


export const metadata = {
  title: "EDIMCS :: Signup",
  description: "Become a Member of EDIMCS. Whether you are looking for a short-term savings plan, a medium or long-term savings plan. Hell, if you are looking for a money pool, we got you covered on all sides"
}

export default async function page() {
  return (
    <main className="flex flex-col relative">
      <section className="shadow-lg shadow-slate-950 flex flex-col relative before:hidden md:before:flex before-overlay before:bg-neutral-50 after-overlay  after:bg-white after:left-1/2">
        <div className="container mx-auto flex flex-col-reverse md:flex-row relative z-10">
          <aside className="py-5 sm:py-20 flex flex-col justify-center flex-1 realtive overflow-hidden">
            <div className="max-w-md mx-auto w-full flex flex-col justify-center py-5 sm:px-5">
              <SignupForm key={8347704} handleLogin={handleLogin} />
            </div>
          </aside>
          <aside className="relative py-20 pt-36 p-5 flex flex-col justify-center gap-4 flex-1 bg-danger/50">
            <Image src={edimcs_bookkeeping} alt='edimcs loan page' fill={true} className='overlay left-0 top-0 object-cover opacity-40 blur-sm'/>
            <h3 className="relative text-slate-50 text-4xl sm:text-5xl md:text-6xl leading-tight font-bold max-w-md sm:max-w-xl">Welcome Back <span className="relative text-danger">Esteem</span> Member<span className="text-red-500">.</span></h3>
            <p className="relative text-slate-50 text-sm leading-loose max-w-lg">.</p>
          </aside>
        </div>
      </section>
    </main>
  )
}
