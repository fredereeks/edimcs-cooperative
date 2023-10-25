import { edimcs_calculator, edimcs_coins, edimcs_moneybox, edimcs_piggyvest } from '@/assets/images'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function page() {
  return (
    <main className="flex flex-col relative">
      <section className="py-20 px-4 bg-white relative">
        <div className="container mx-auto flex flex-col gap-6 md:flex-row py-10 md:py-20">
          <aside className="relative flex-1 flex justify-end">
            <div className="relative min-h-[200px] sm:h-full p-10 w-full overflow-hidden">
              <Image src={edimcs_calculator} alt='Money Saver Calculator' className='rounded-xl object-cover' fill={true} />
            </div>
          </aside>
          <aside className="py-10 md:py-20 flex flex-col gap-2 md:justify-between items-center">
            <h3 className="text-slate-700 text-4xl sm:text-5xl md:text-6xl leading-tight font-bold max-w-md sm:max-w-lg">Our Investment Pool.</h3>
            <p style={{ lineHeight: 1.9 }} className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm leading-loose font-light max-w-md sm:max-w-lg">Whether you are looking for a short-term savings plan, a medium or long-term savings plan. Hell, if you are looking for an investment pool, we got you covered on all sides.</p>
          </aside>
        </div>
        <div className="container mx-auto grid sm:grid-cols-2 md:grid-cols-3 gap-5 justify-center">
          {
            [
              [772506230, <Image src={edimcs_coins} alt='Savings Plan' fill={true} key={772506231} className="object-cover" />, "Silver Plan", "Never get penalized when decidiing it's not for you. We let you change your mind at an time", 10000, 5000000],
              [772506232, <Image src={edimcs_piggyvest} alt='Savings Plan' fill={true} key={772506233} className="object-cover" />, "Gold Plan", "We provide you with different options of savings and let you choose the one that best suites your needs.", 50000, 5000000],
              [772506234, <Image src={edimcs_moneybox} alt='Savings Plan' fill={true} key={772506235} className="object-cover" />, "Platinum Plan", "Our priority is keeping your money safe from multi-factor authentication to FDIC-insured accounts.", 100000, 10000000],
            ].map(([id, image, title, text, starting, goal]) => (
              <Link href={`/login`} key={id.toString()} className="flex flex-col text-slate-500 max-w-[20rem] mx-auto my-5 rounded-md overflow-hidden hover:shadow-lg transition-all">
                <span className="min-h-[150px] sm:h-[150px] md:h-[170px] relative">{image}</span>
                <div className="flex-1 flex flex-col justify-between gap-2 p-4">
                  <div className="flex-1 flex flex-col">
                    <h4 className="font-bold text-lg sm:text-xl text-red-500">{title}</h4>
                    <p className="font-medium leading-loose opacity-90 text-xs">{text}</p>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex flex-col">
                      <p className="text-xs font-light max-w-xs text-primary">Save Monthly</p>
                      <p className="leading-loose text-slate-600 text-sm font-bold">&#8358;{starting.toLocaleString()}</p>
                    </div>
                    <div className="flex flex-col">
                      <p className="text-xs font-light max-w-xs text-primary">To Take</p>
                      <p className="leading-loose text-slate-600 text-sm font-bold">&#8358;{goal.toLocaleString()}</p>
                    </div>
                  </div>
                </div>
              </Link>
            ))
          }
        </div>
      </section>
    </main>
  )
}
