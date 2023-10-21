import { edimcs_blackpeople } from '@/assets/images'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { AiFillCompass, AiOutlineIdcard, AiOutlineKey } from 'react-icons/ai'
import { IoArrowForward, IoArrowForwardOutline } from 'react-icons/io5'

export default function page() {
  return (
    <main className="flex flex-col relative">
      <section className="py-20 px-4 bg-white relative">
        <div className="container mx-auto flex flex-col gap-6 md:flex-row">
          <aside className="flex-1 flex flex-col justify-center gap-4 py-10 md:py-20">
            <h3 className="text-slate-700 text-4xl sm:text-5xl md:text-6xl leading-tight font-bold max-w-md sm:max-w-lg"><span className="text-red-500">Spend</span> less, <span className="text-primary">save</span> more.</h3>
            <p style={{lineHeight: 1.9}} className="text-slate-400 text-xs sm:text-sm leading-loose font-light max-w-md sm:max-w-lg">Put money away automatically while you live your life. Juse set a goal and watch your savings grow.</p>
            <Link href={'/about'} className='text-sm text-slate-600 font-semibold flex'>Learn More <IoArrowForward className="text-inherit text-xs font-extrabold m-1" /></Link>
          </aside>
          <aside className="relative flex-1 flex justify-end">
            <div className="relative min-h-[200px] sm:h-full p-10 w-3/4 overflow-hidden">
              <Image src={edimcs_blackpeople} alt='Money Saver Calculator' className='rounded-xl object-cover' fill={true} />
            </div>
          </aside>
        </div>
      </section>
      <section className="bg-gradient-to-tl from-slate-900 to-slate-800 rounded-[2rem] py-20 px-4">
        <div className="container mx-auto grid sm:grid-cols-2 md:grid-cols-3 gap-5 justify-center">
          {
            [
              [823497230, <AiOutlineIdcard key={823497231} className="text-inherit" />, "Flexible", "Never get penalized when decidiing it's not for you. We let you change your mind at an time" ],
              [823497232, <AiFillCompass key={823497233} className="text-inherit" />, "Diverse", "We provide you with different options of savings and let you choose the one that best suites your needs." ],
              [823497234, <AiOutlineKey key={823497235} className="text-inherit" />, "Secure", "Our priority is keeping your money safe from multi-factor authentication to FDIC-insured accounts." ],
            ].map(([id, icon, title, text]) => (
              <figure key={id.toString()} className="flex flex-col gap-6 text-white max-w-[20rem] mx-auto">
                <span className="text-3xl sm:text-4xl h-10 w-10">{icon}</span>
                <div className="flex flex-col gap-2">
                  <h4 className="font-bold text-lg sm:text-xl text-primary">{title}</h4>
                  <p className="font-medium leading-loose opacity-70 text-xs">{text}</p>
                </div>
              </figure>
            ))
          }
        </div>
      </section>
      <section className="py-20 px-4 bg-white relative">
        <div className="container mx-auto flex flex-col gap-6 md:flex-row">
          <div className="py-10 flex flex-col gap-2 md:justify-between items-center">
            <h3 className="text-slate-700 text-4xl sm:text-5xl md:text-6xl leading-tight font-bold max-w-md sm:max-w-lg">Our Saving Plans.</h3>
            <p style={{lineHeight: 1.9}} className="text-slate-400 text-xs sm:text-sm leading-loose font-light max-w-md sm:max-w-lg">Whether you are looking for a short-term savings plan, a medium or long-term savings plan. Hell, if you are looking for an investment pool, we got you covered on all sides.</p>

          </div>
          <aside className="flex-1 flex flex-col justify-center gap-4">
            <h3 className="text-slate-700 text-4xl sm:text-5xl md:text-6xl leading-tight font-bold max-w-md sm:max-w-lg">Our Saving Plans.</h3>
            <p style={{lineHeight: 1.9}} className="text-slate-400 text-xs sm:text-sm leading-loose font-light max-w-md sm:max-w-lg">Put money away automatically while you live your life. Just set a goal and watch your savings grow.</p>
            <Link href={'/about'} className='text-sm text-slate-600 font-semibold flex'>Learn More <IoArrowForward className="text-inherit text-xs font-extrabold m-1" /></Link>
          </aside>
          <aside className="relative flex-1 flex justify-end">
            <div className="relative min-h-[200px] sm:h-full p-10 w-3/4 overflow-hidden">
              <Image src={edimcs_blackpeople} alt='Money Saver Calculator' className='rounded-xl object-cover' fill={true} />
            </div>
          </aside>
        </div>
      </section>
    </main>
  )
}
