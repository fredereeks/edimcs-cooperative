import React from 'react'
import LoginForm from './LoginForm'
import {cookies} from 'next/headers'
import jwt from 'jsonwebtoken'
import { MAX_AGE, SECRET } from '@/constants'

// const handleLogin = async(formData: FormData) => {
//   "use server"
//   try{
//     const memberId = formData.get("memberId")?.valueOf()
//     const password = formData.get("password")?.valueOf()
//     // const cookieToken = process.env.JWT || 'EZLepwiqKxKaBIjnn4ISeKxHEbp1UM8vmvA6hRbFICSMLuDtGO'
//     console.log({memberId, password, user})
//       const token = jwt.sign(user, SECRET, {expiresIn: MAX_AGE})
//       cookies().set('x-access-token', token, {httpOnly: true, secure: process.env.NODE_ENV === 'production', maxAge: MAX_AGE, path: "/", domain: "localhost"})
//       return{
//         error: false,
//         message: `Welcome back ${memberId}. Glad to have you back!`
//       }
//   }catch(err){
//     return{
//       error: true,
//       message: "Something went wrong, please, try again"
//     }
//   }
// }


export const metadata = {
  title: "EDIMCS :: Login", 
  description: "EDIMCS money pool is a way Whether you are looking for a short-term savings plan, a medium or long-term savings plan. Hell, if you are looking for a money pool, we got you covered on all sides"
}

export default async function page() {
  return (
    <main className="flex flex-col relative">
      <section className="shadow-lg shadow-slate-950 flex flex-col relative before:hidden md:before:flex before-overlay before:bg-neutral-50 after-overlay  after:bg-white after:left-1/2">
        <div className="container mx-auto flex flex-col-reverse md:flex-row relative z-10">
          <aside className="py-5 sm:py-20 flex flex-col justify-center flex-1 realtive overflow-hidden">
            <div className="max-w-md mx-auto w-full flex flex-col justify-center py-5 sm:px-5">
              <LoginForm key={8347704} />
            </div>
          </aside>
          <aside className="py-20 pt-36 p-5 flex flex-col gap-4 flex-1 bg-primary/50">
            <h3 className="text-slate-50 text-4xl sm:text-5xl md:text-6xl leading-tight font-bold max-w-md sm:max-w-xl">Welcome Back <span className="text-primary">Esteem</span> Member<span className="text-red-500">.</span></h3>
            <p className="text-slate-50 text-sm leading-loose max-w-lg">.</p>
          </aside>
        </div>
      </section>
    </main>
  )
}
