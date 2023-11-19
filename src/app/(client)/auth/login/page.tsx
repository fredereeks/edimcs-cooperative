import React from 'react'
import AccountForm from './AccountForm'
import prisma from '@/libs/prisma'
import bcryptjs from 'bcryptjs'
// import SignupForm from './SignupForm'
// import AccountForm from './AccountForm'

export const metadata = {
  title: "EDIMCS :: Account Login/Signup", 
  description: "EDIMCS money pool is a way Whether you are looking for a short-term savings plan, a medium or long-term savings plan. Hell, if you are looking for a money pool, we got you covered on all sides"
}

const handleSignup = async (formData: FormData) => {
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
                  password: hashPassword,
                  email: email.toLowerCase(),
              }
          })
      }

      return {
          error: false,
          message: `Welcome, ${firstname} ${middlename} ${lastname}. Glad to have you join our team!`
      }
  } catch (err) {
      // const error = err as AxiosError;
      return {
          error: true,
          message: "Something went wrong, please, try again. Due to "+ err
      }
  }
}

export default async function page() {
  return (
    <section className='relative'>
      <AccountForm key={'934507345'} handleSignup={handleSignup} />
    </section>
  )
}
