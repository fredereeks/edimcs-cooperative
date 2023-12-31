import Link from 'next/link'
import React from 'react'
import { IoGlobeOutline, IoHomeOutline, IoMailOpenOutline, IoPhoneLandscape } from 'react-icons/io5'
import 'aos/dist/aos.css';
import ContactForm from './ContactForm'
import { Metadata } from 'next';
import Image from 'next/image';
import { edimcs_staff_lineup } from '@/assets/images';
import { FaFacebook, FaInstagram, FaWhatsapp } from 'react-icons/fa';


export const metadata: Metadata = {
  title: "EDIMCS :: Contact", 
  description: "EDIMCS is one of the largest cooperative organizations in Nigeria and in the world, with the goal of achieving a first-world Nigeria with empowerment and housing for low-income and small and medium enterprises as our primary goal."
}

export default function page() {
  return (
    <main className="flex flex-col relative">
      <section className="flex flex-col relative before:hidden md:before:flex before-overlay before:bg-neutral-50 after-overlay  after:bg-neutral-50 after:left-1/2">
      <Image src={edimcs_staff_lineup} alt='Money Saver Calculator' className='rounded-xl object-contain object-left-bottom' fill={true} />
        <div data-aos-duration="1000" data-aos="fade-up-right" className="container mx-auto flex flex-col md:flex-row relative z-10">
          <aside className="py-20 flex flex-col justify-center flex-1">
            <h3 style={{textShadow: '0 0 14px #0004'}} className="hidden md:flex text-slate-200 opacity-10 md:text-9xl leading-tight font-bold max-w-md sm:max-w-lg" data-aos-duration="1000" data-aos="fade-down-right">ED<br data-aos-duration="1000" data-aos="fade-up" data-aos-delay="1000" />IM<br data-aos-duration="1000" data-aos="fade-down-left" data-aos-delay="1000"  />CS.</h3>
          </aside>
          <aside className="py-20 md:pt-36 p-5 flex flex-col gap-4 flex-1 bg-neutral-50">
            <h3 className="text-slate-700 text-4xl sm:text-5xl md:text-6xl leading-tight font-bold max-w-md sm:max-w-xl">We are a <span data-aos-duration="1000" data-aos="fade-up-right" data-aos-delay="1000" className="text-primary">Trusted</span> Household Name<span className="text-red-500">.</span></h3>
            <p style={{lineHeight: 2}} data-aos-duration="1000" data-aos="fade-up" data-aos-delay="1000" className="text-slate-500 dark:text-slate-400 text-justify text-sm sm:text-base leading-loose max-w-lg">We are committed to helping you achieve your financial goals through a secure, dedicated and consistent saving habit. Our staff are always happy to help you make the right financial decision every step of the way.</p>
          </aside>
        </div>
      </section>
      <section className="py-20 bg-slate-100 px-4">
        <div className="container mx-auto flex flex-col relative z-10 py-10">
          <div className="flex flex-col sm:flex-row gap-4">
            <p data-aos-duration="1000" data-aos="zoom-in-right"  className="text-xs font-light max-w-xs text-primary">Contact</p>
            <h3 data-aos-duration="1000" data-aos="fade-down-right" data-aos-delay="1000" className="flex-1 sm:ml-11 text-slate-700 text-4xl sm:text-5xl leading-tight font-bold max-w-md sm:max-w-xl">We provide a <span className="text-primary">variety of ways</span> to contact us.</h3>
          </div>
          <div className="relative z-20 container mx-auto py-20 grid lg:grid-cols-2 text-white">
            <div className="flex-1 flex flex-col justify-center md:pr-4">
              <ContactForm  />
            </div>
            {/* <div className="grid sm:grid-cols-[repeat(auto-fit,minmax(256px,1fr))]"> */}
            <div className="grid grid-cols-1 xs:grid-cols-1 sm:grid-cols-2">
              <aside className={`bg-neutral-800/10 p-7 flex flex-col gap-2`}>
                <span className={`text-2xl flex-shrink-0 pt-5 text-slate-800`}><IoPhoneLandscape key={8345802} className="text-inherit" /></span>
                <div className="py-5 flex flex-col gap-2">
                  <h3 data-aos-duration="1000" data-aos="fade-down-right" data-aos-delay="1000"  className={`text-lg sm:text-xl font-medium sm:font-semibold max-w-lg leading-tight text-slate-800/90`}>Contact Lines</h3>
                  <div className="flex flex-col">
                    <Link data-aos-duration="1000" data-aos="fade-down-right"  href={`tel: +2349068405778`} style={{ lineHeight: 2 }} className={`text-xs sm:text-sm font-light leading-tight text-left text-slate-900`}>+2349068405778.</Link>
                    <Link data-aos-duration="1000" data-aos="zoom-in-right"  href={`tel: +2349027888965`} style={{ lineHeight: 2 }} className={`text-xs sm:text-sm font-light leading-tight text-left text-slate-900`}>+2349027888965.</Link>
                  </div>
                </div>
              </aside>
              <aside className={`bg-neutral-800 p-7 flex flex-col gap-2`}>
                <span className={`text-2xl flex-shrink-0 pt-5 text-slate-300`}><IoHomeOutline key={8345800} className="text-inherit" /></span>
                <div className="py-5 flex flex-col gap-2">
                  <h3 data-aos-duration="1000" data-aos="fade-left" data-aos-delay="1000"  className={`text-lg sm:text-xl font-medium sm:font-semibold max-w-lg leading-tight text-slate-200`}>Physical Address</h3>
                  <p data-aos-duration="1000" data-aos="zoom-left" data-aos-delay="1000" style={{ lineHeight: 2 }} className={`text-xs sm:text-sm font-light leading-loose text-left text-slate-200`}>Block 21F, Sabondele Plaza, Jabi, Abuja.</p>
                </div>
              </aside>
              <aside data-aos-duration="1000" data-aos="zoom-in-right" data-aos-delay="1000" className={`bg-neutral-800/70 p-7 flex flex-col gap-2`}>
                <span className={`text-2xl flex-shrink-0 pt-5 text-slate-200`}><IoGlobeOutline key={8345801} className="text-inherit" /></span>
                <div className="py-5 flex flex-col gap-2">
                  <h3 className={`text-lg sm:text-xl font-medium sm:font-semibold max-w-lg leading-tight text-slate-100`}>Socials</h3>
                  <div className="flex flex-col">
                    <div className="flex flex-wrap gap-3 pb-3">
                      <Link href={`https://www.facebook.com/profile.php?id=61553709279648&mibextid=ZbWKwL`} referrerPolicy='no-referrer' target='_blank' style={{ lineHeight: 2 }} className={`-ml-2 p-2 text-base sm:text-lg font-light leading-tight text-left text-slate-100`}><FaFacebook className="text-inherit" /></Link>
                      <Link href={`https://instagram.com/edimcs_ng?igshid=OGQ5ZDc2ODk2ZA`} referrerPolicy='no-referrer' target='_blank' style={{ lineHeight: 2 }} className={`p-2 text-base sm:text-lg font-light leading-tight text-left text-slate-100`}><FaInstagram className="text-inherit" /></Link>
                      <Link href={`https://wa.link/t01thy`} referrerPolicy='no-referrer' target='_blank' style={{ lineHeight: 2 }} className={`p-2 text-base sm:text-lg font-light leading-tight text-left text-slate-100`}><FaWhatsapp className="text-inherit" /></Link>
                    </div>
                  </div>
                </div>
              </aside>
              <aside className={`bg-slate-50 p-7 flex flex-col gap-2`}>
                <span className={`text-2xl flex-shrink-0 pt-5 text-slate-800`}><IoMailOpenOutline key={8345800} className="text-inherit" /></span>
                <div className="py-5 flex flex-col gap-2">
                  <h3 data-aos-duration="1000" data-aos="fade-left" data-aos-delay="1000"  className={`text-lg sm:text-xl font-medium sm:font-semibold max-w-lg leading-tight text-slate-800`}>Email Address</h3>
                    <Link href={`mailto: admin@edimcs.com`} referrerPolicy='no-referrer' target='_blank' data-aos-duration="1000" data-aos="zoom-left" data-aos-delay="1000" style={{ lineHeight: 2 }} className={`text-xs sm:text-sm font-light leading-tight text-left text-slate-800`}>admin@edimcs.com</Link>
                    <Link href={`mailto: info@edimcs.com`} referrerPolicy='no-referrer' target='_blank' data-aos-duration="1000" data-aos="zoom-left" data-aos-delay="1000" style={{ lineHeight: 2 }} className={`text-xs sm:text-sm font-light leading-tight text-left text-slate-800`}>info@edimcs.com</Link>
                </div>
              </aside>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
