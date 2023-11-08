import Link from 'next/link'
import React from 'react'
import { IoGlobeOutline, IoHomeOutline, IoPhoneLandscape } from 'react-icons/io5'
import ContactForm from './ContactForm'

const handleContact = async(formData: FormData) => {
  "use server"
  try{
    const firstname = formData.get("firstname")?.valueOf();
    const lastname = formData.get("lastname")?.valueOf();
    const email = formData.get("email")?.valueOf();
    const message = formData.get("message")?.valueOf();
    console.log({message, lastname})
    return{
      error: false,
      message: `Thanks for reaching out ${firstname} ${lastname}; expect our response swiftly`
    }
  }catch(err){
    return{
      error: true,
      message: "Something went wrong, please, try again"
    }
  }
  return null;
}

export const metadata = {
  title: "EDIMCS :: Contact", 
  description: "EDIMCS money pool is a way Whether you are looking for a short-term savings plan, a medium or long-term savings plan. Hell, if you are looking for a money pool, we got you covered on all sides"
}

export default function page() {
  return (
    <main className="flex flex-col relative">
      <section className="flex flex-col relative before:hidden md:before:flex before-overlay before:bg-primary/20 after-overlay  after:bg-neutral-50 after:left-1/2">
        <div className="container mx-auto flex flex-col md:flex-row relative z-10">
          <aside className="py-20 flex flex-col justify-center flex-1">
            <h3 className="hidden md:flex text-slate-700 opacity-10 md:text-9xl leading-tight font-bold max-w-md sm:max-w-lg">ED<br />IM<br />CS.</h3>
          </aside>
          <aside className="py-20 md:pt-36 p-5 flex flex-col gap-4 flex-1 bg-neutral-50">
            <h3 className="text-slate-700 text-4xl sm:text-5xl md:text-6xl leading-tight font-bold max-w-md sm:max-w-xl">A <span className="text-primary">Trusted</span> Household Name<span className="text-red-500">.</span></h3>
            <p className="text-slate-500 dark:text-slate-400 text-sm leading-loose max-w-lg">We are committed to helping you achieve your financial goals through a secure, dedicated and consistent saving habit.</p>
          </aside>
        </div>
      </section>
      <section className="py-20 bg-slate-100 px-4">
        <div className="container mx-auto flex flex-col relative z-10 py-10">
          <div className="flex flex-col sm:flex-row gap-4">
            <p className="text-xs font-light max-w-xs text-primary">Contact</p>
            <h3 className="flex-1 sm:ml-11 text-slate-700 text-4xl sm:text-5xl leading-tight font-bold max-w-md sm:max-w-xl">We provide a <span className="text-primary">variety of ways</span> to contact us.</h3>
          </div>
          <div className="relative z-20 container mx-auto py-20 grid sm:grid-cols-2 text-white">
            <div className="flex-1 flex flex-col justify-center md:pr-4">
              <ContactForm handleContact={handleContact} />
            </div>
            <div className="grid sm:grid-cols-[repeat(auto-fit,minmax(256px,1fr))]">
              <aside className={`bg-neutral-800/10 p-7 flex flex-col gap-2`}>
                <span className={`text-2xl flex-shrink-0 pt-5 text-slate-800`}><IoPhoneLandscape key={8345802} className="text-inherit" /></span>
                <div className="py-5 flex flex-col gap-2">
                  <h3 className={`text-lg sm:text-xl font-medium sm:font-semibold max-w-lg leading-tight text-slate-800/90`}>Contact Lines</h3>
                  <div className="flex flex-col">
                    <Link href={`tel: +234820001000`} style={{ lineHeight: 2 }} className={`text-xs sm:text-sm font-thin leading-tight text-left text-slate-900`}>+234820001000.</Link>
                    <Link href={`tel: +234830001000`} style={{ lineHeight: 2 }} className={`text-xs sm:text-sm font-thin leading-tight text-left text-slate-900`}>+234830001000.</Link>
                  </div>
                </div>
              </aside>
              <aside className={`bg-neutral-800 p-7 flex flex-col gap-2`}>
                <span className={`text-2xl flex-shrink-0 pt-5 text-slate-300`}><IoHomeOutline key={8345800} className="text-inherit" /></span>
                <div className="py-5 flex flex-col gap-2">
                  <h3 className={`text-lg sm:text-xl font-medium sm:font-semibold max-w-lg leading-tight text-slate-200`}>Physical Address</h3>
                  <p style={{ lineHeight: 2 }} className={`text-xs sm:text-sm font-thin leading-loose text-left text-slate-200`}>8, Sirakoro Street, Off Blacktyre Boulevard, Wuse II, Abuja.</p>
                </div>
              </aside>
              <aside className={`bg-neutral-800/70 p-7 flex flex-col gap-2`}>
                <span className={`text-2xl flex-shrink-0 pt-5 text-slate-200`}><IoGlobeOutline key={8345801} className="text-inherit" /></span>
                <div className="py-5 flex flex-col gap-2">
                  <h3 className={`text-lg sm:text-xl font-medium sm:font-semibold max-w-lg leading-tight text-slate-100`}>Socials</h3>
                  <div className="flex flex-col">
                    <Link href={`https://www.facebook.com/edimcs`} referrerPolicy='no-referrer' target='_blank' style={{ lineHeight: 2 }} className={`text-xs sm:text-sm font-thin leading-tight text-left text-slate-100`}>Facebook</Link>
                    {/* <Link href={`https://www.twitter.com/edimcs`} referrerPolicy='no-referrer' target='_blank' style={{ lineHeight: 2 }} className={`text-xs sm:text-sm font-thin leading-tight text-left text-slate-100`}>Twitter</Link> */}
                    <Link href={`mailto: admin@edimcs.com`} referrerPolicy='no-referrer' target='_blank' style={{ lineHeight: 2 }} className={`text-xs sm:text-sm font-thin leading-tight text-left text-slate-100`}>admin@edimcs.com</Link>
                    <Link href={`mailto: help@edimcs.com`} referrerPolicy='no-referrer' target='_blank' style={{ lineHeight: 2 }} className={`text-xs sm:text-sm font-thin leading-tight text-left text-slate-100`}>help@edimcs.com</Link>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
