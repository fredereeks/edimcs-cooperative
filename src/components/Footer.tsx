import { edimcs_calculator } from '@/assets/images'
import { footerLinks } from '@/data'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function Footer() {
  return (
    <footer className="py-10 px-4 flex flex-col relative after-overlay after:bg-slate-900/95">
      <Image src={edimcs_calculator} alt='Edimcs Money Calculator Image' fill={true} className="overlay left-0 top-0 object-cover" />
      <div className="container mx-auto py-4 grid sm:grid-cols-3 md:grid-cols-4 gap-4 relative z-20">
        {footerLinks.map((footer,i) => (
          <aside key={footer.id} className={`flex flex-col gap-3 ${i === 0 ? 'col-span-3 md:col-span-1' : 'col-span-1 md:pl-5'}`}>
            <h2 className="text-slate-300 font-bold text-base sm:text-xl md:text-2xl">{footer.title}</h2>
            {i === 0 ? <p className="text-xs md:text-sm font-light leading-loose text-slate-400 text-justify">{footer.label}</p> : ""}
            <div className="flex flex-col gap-2 py-2">
              {
                footer?.sublinks.map(sublink => (
                  <Link href={sublink.url} key={sublink.id} className="text-xs sm:text-sm flex gap-1 items-center text-slate-400 hover:text-slate-200">{sublink.icon} <span>{sublink.title}</span></Link>
                ))
              }
            </div>
          </aside>
        ))}
      </div>
      <small className="py-2 absolute z-20 bottom-4 w-full text-center text-slate-400">&copy; Copyright. {new Date().getFullYear()} EDIMCS. All rights reserved.</small>
    </footer>
  )
}
