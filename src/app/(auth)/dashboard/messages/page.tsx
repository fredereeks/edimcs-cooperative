export const revalidate = "60"
import React from 'react'
import MessageList from './MessageList'
import prisma from '@/lib/prisma';
import { Metadata } from 'next'
import nodeMailer from 'nodemailer'
import { revalidatePath } from 'next/cache';

export const metadata: Metadata = {
  title: 'CTTI e-learning Centre :: Messages',
  description: 'Contact Us at CTTI. We are an e-Learning Course Centre is an Online Platform devoted to bringing quality, standard and professional courses to your need wherever and whenever you need it',
}

const sendMessage = async (data: FormData) => {
  "use server"
  try {
    const firstname = data.get("firstname")?.valueOf()?.toString() || "";
    const middlename = data.get("middlename")?.valueOf()?.toString() || "";
    const lastname = data.get("lastname")?.valueOf()?.toString() || "";
    const email = data.get("email")?.valueOf()?.toString() || "";
    const phone = data.get("phone")?.valueOf()?.toString() || "";
    const country = data.get("country")?.valueOf()?.toString() || "";
    const state = data.get("state")?.valueOf()?.toString() || "";
    const message = data.get("message")?.valueOf()?.toString() || "";

    // Save to Database
    // const contactMessage = await prisma.contact.create({data: {
    //     firstname, lastname, email, phone: phone || null, message
    // }})
    await prisma.contact.create({
      data: {
          firstname, middlename, lastname, phone, country, state, message, email
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
      // from: `CTTI.com <brunomany1@gmail.com>`,
      from: `CTTI.ng <${process.env.MAIL_FROM}>`,
      to: ['CTTI Admin <adefredy1@gmail.com>'],
      bcc: 'CTTI Admin <adedejifrederickr@gmail.com>',
      replyTo: email?.toString(),
      subject: 'New Contact Message from CTTI',
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


const fetchMessages = async() => {
    const messages = await prisma.contact.findMany()
    return messages as MessageProps[]
}


export default async function Messages() {
  const messageData = await fetchMessages();
  return (
    <main className="flex flex-col gap-4 px-2 sm:px-0 pt-5 pb-10">
      <section className="relative flex flex-col gap-2 p-4 bg-white  dark:bg-[#dbf0f724] dark:shadow-black shadow-slate-200 shadow-md rounded-lg">
        <MessageList key={'92720'} sendMessage={sendMessage} messageData={messageData} />
      </section>
    </main>
  )
}
