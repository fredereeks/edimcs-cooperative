"use server"

import prisma from "@/lib/prisma"
import { revalidatePath } from "next/cache";
import nodeMailer from 'nodemailer'
import bcryptjs from 'bcryptjs'
import db from "@/lib/db"

export const makeSaving = async (data: FormData) => {
  try {
    const amount = Number(data.get("amount")?.valueOf());
    const saverId = data.get("saverId")?.valueOf().toString();
    const savings = await prisma.saving.create({
      data: {
        amount, saverId: saverId!
      }
    })
  } catch (error) {
    return {
      error: true,
      message: "Unable to process your savings request."
    }
  }
}

// export const acceptSaving = async()

export const handleContact = async (data: FormData) => {
  "use server"
  try {
    const firstname = data.get("firstname")?.valueOf()?.toString() || "";
    const middlename = data.get("middlename")?.valueOf()?.toString() || "";
    const lastname = data.get("lastname")?.valueOf()?.toString() || "";
    const email = data.get("email")?.valueOf()?.toString() || "";
    const phone = data.get("phone")?.valueOf()?.toString() || "";
    const message = data.get("message")?.valueOf()?.toString() || "";

    // Save to Database
    // const contactMessage = await prisma.contact.create({data: {
    //     firstname, lastname, email, phone: phone || null, message
    // }})
    await prisma.contact.create({
      data: {
        firstname, lastname, phone, message, email
      }
    })
    // console.log({contactMessage})
    // console.log({ firstname, lastname, email, phone, message })
    const html = `
                <section className="flex flex-col">
                    <h2 style="color: rgb(51,65,85); text-align: center; font-weight: bold; font-size: 1.125rem; line-height: 1.6rem; border-bottom: 1px solid #eee; margin: .5rem; padding-bottom: .5rem;" className="text-slate-700 text-center">New Contact Message!</h2>
                    <div className="flex gap-1">
                    div style="background: rgb(33, 150, 243); color: white; text-align: center; border-radius: 5px;" className="h-10 w-10 rounded-full bg-primary flex-shrink-0">Contact Details</div>
                        <div className="flex flex-col flex-1">
                            <h4 style="color: #848484; font-weight: bold; font-size: 1.125rem; line-height: 1.6rem;" className="font-bold text-slate-600 text-lg">${firstname} ${middlename} ${lastname}</h4>
                            <p style="color: rgb(100,116,139); font-size: 0.75rem; line-height: 1rem;" className="text-xs text-slate-500">Email: ${email}</p>
                            <p style="color: rgb(100,116,139); font-size: 0.75rem; line-height: 1rem;" className="text-xs text-slate-500">Phone Number: ${phone}</p>
                        </div>
                        <p style="color: rgb(100,116,139); font-size: 0.875rem; line-height: 1.25rem;" className="text-sm text-slate-700 text-justify">${message}</p>
                    </div>
                </section>
            `;
    const transport = nodeMailer.createTransport({
      // host: 'smtp.gmail.com',
      host: process.env.MAIL_HOST,
      port: 465,
      secure: true,
      auth: {
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD
      }
    })

    // const userMail = typeof(email) === 'string' ? email.toString() || "invalidmail@gmail.com"

    const info = transport.sendMail({
      // from: `EDIMCS.com <brunomany1@gmail.com>`,
      from: `EDIMCS.com <${process.env.MAIL_FROM}>`,
      to: ['EDIMCS Admin <adefredy1@gmail.com>'],
      bcc: 'EDIMCS Admin <adedejifrederickr@gmail.com>',
      replyTo: email?.toString(),
      subject: 'New Contact Message from EDIMCS',
      html
    }, (err, info) => {
      if (err) {
        return { error: true, message: `Something went wrong. We could not send the mail...Please, try again` };
      }
      console.log(`Message sent: ${info?.messageId}`)
    })
    // console.log({ info })
    revalidatePath("/contact")
    return { error: false, message: `Thank you for reaching our to us ${firstname} ${lastname}. Expect our reply soonest.` };


  } catch (error) {
    console.log({ error })
    return { error: true, message: `Something went wrong. We could not send the mail...Please, try again` };
  }
}

export const handleSignup = async (formData: FormData) => {
  "use server"
  try {
    const firstname = formData.get("firstname")?.valueOf() as string
    const lastname = formData.get("lastname")?.valueOf() as string
    const email = formData.get("email")?.valueOf() as string
    const middlename = formData.get("middlename")?.valueOf() as string
    const password = formData.get("password")?.valueOf() as string
    const phone = formData.get("phone")?.valueOf() as string
    const loanRating = formData.get("loanRating")?.valueOf() as string
    const memberId = `EDIMCS-${Math.random().toString().slice(4, 8)}${Date.now().toString().slice(8, 10)}`
    // const randomToken = Buffer.from(crypto.randomUUID()).toString('base64')
    const user = await prisma.member.findFirst({
      where: {
        email
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
    const salt = bcryptjs.genSaltSync(10), hashPassword = bcryptjs.hashSync(password, salt)
    const newUser = await prisma.member.create({
      data: {
        memberId: memberId.toUpperCase(),
        firstname,
        middlename,
        lastname,
        phone,
        loanRating: loanRating === "Basic" ? "Basic" : loanRating === "Standard" ? "Standard" : loanRating === "Standard Plus" ? "StandardPlus" : "Premium",
        password: hashPassword,
        email: email.toLowerCase(),
      }
    })
    if (newUser) {
      return {
        error: false,
        message: `Welcome, ${firstname} ${middlename} ${lastname}. Glad to have you join our team!`
      }
    }
    else {
      return {
        error: true,
        message: "Something went wrong. We could not create your account. Please, try again"
      }
    }

  } catch (err) {
    // const error = err as AxiosError;
    return {
      error: true,
      message: "Something went wrong, please, try again. " + err
    }
  }
}

export const fetchMember = async() => {
  const members = await db.query(`SELECT * FROM member mb JOIN accountNumber ac ON ac.`)
}