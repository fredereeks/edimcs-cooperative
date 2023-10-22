import { edimcs_blackpeople } from '@/assets/images'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { AiFillCompass, AiOutlineIdcard, AiOutlineKey } from 'react-icons/ai'
import { IoAirplaneOutline, IoArrowForward, IoScaleOutline, IoTelescopeOutline } from 'react-icons/io5'

export default function page() {
  return (
    <main className="flex flex-col relative">
      <section className="py-20 px-4 bg-white relative">
        <div className="container mx-auto flex flex-col gap-6 md:flex-row">
          <aside className="flex-1 flex flex-col justify-center gap-4 py-10 md:py-20">
            <h3 className="text-slate-700 text-4xl sm:text-5xl md:text-6xl leading-tight font-bold max-w-md sm:max-w-lg"><span className="text-red-500">Spend</span> less, <span className="text-primary">save</span> more.</h3>
            <p style={{ lineHeight: 1.9 }} className="text-slate-400 text-xs sm:text-sm leading-loose font-light max-w-md sm:max-w-lg">Put money away automatically while you live your life. Juse set a goal and watch your savings grow.</p>
            <Link href={'/about'} className='text-sm text-slate-600 font-semibold flex'>Learn More <IoArrowForward className="text-inherit text-xs font-extrabold m-1" /></Link>
          </aside>
          <aside className="relative flex-1 flex justify-end">
            <div className="relative min-h-[200px] sm:h-full p-10 w-3/4 overflow-hidden">
              <Image src={edimcs_blackpeople} alt='Money Saver Calculator' className='rounded-xl object-cover' fill={true} />
            </div>
          </aside>
        </div>
      </section>
      <section className="bg-gradient-to-tl from-slate-900 to-slate-800 rounded-[1rem] sm:rounded-[2rem] py-20 px-4">
        <div className="container mx-auto grid sm:grid-cols-2 md:grid-cols-3 gap-5 justify-center">
          {
            [
              [823497230, <AiOutlineIdcard key={823497231} className="text-inherit" />, "Flexible", "Never get penalized when deciding it's not for you. We let you change your mind at any time in the savings stream."],
              [823497232, <AiFillCompass key={823497233} className="text-inherit" />, "Diverse", "We provide you with different options of savings and let you choose the one that best suites your needs."],
              [823497234, <AiOutlineKey key={823497235} className="text-inherit" />, "Secure", "Our priority is keeping your money safe from multi-factor authentication to FDIC-insured accounts."],
            ].map(([id, icon, title, text]) => (
              <figure key={id.toString()} className="flex flex-col gap-3 text-white max-w-[20rem] mx-auto my-5">
                <span className="text-3xl sm:text-4xl h-10 w-10">{icon}</span>
                <div className="flex flex-col gap-2">
                  <h4 className="font-bold text-lg sm:text-xl text-primary">{title}</h4>
                  <p className="font-medium leading-loose opacity-70 text-xs md:pr-10">{text}</p>
                </div>
              </figure>
            ))
          }
        </div>
      </section>
      <section className="relative py-20 px-4 bg-slate-50">
        <div className="relative z-20 container mx-auto flex flex-col gap-5 py-20">
          {/* <h2 className="text-2xl sm:text-3xl md:text-4xl font-medium sm:font-semibold max-w-lg mx-auto leading-tight text-slate-700">What we <span className="border-b-4 border-red-500">Stand</span> For</h2> */}
          <h2 className="text-slate-700 text-4xl sm:text-5xl md:text-6xl leading-snug font-bold max-w-md sm:max-w-xl mx-auto">What we <span className="text-primary">Stand</span> For<span className="text-red-500">.</span></h2>
          <div className="relative z-20 container mx-auto py-5 grid sm:grid-cols-2 md:grid-cols-3 text-white">
            {
              [
                [8345830, 'Our Vision', "To be the largest cooperative organization among cooperatives in Nigeria and in the world; with the goal of achieving a first-world Nigeria with empowerment and housing for low-income and small and medium enterprises as our primary goal.", <IoTelescopeOutline key={8345800} className="text-inherit" />],
                [8345831, 'Our Mission', "To empower people and organizations toward optimum productivity and efficiency through cooperation and upholding and spreading a mindset and culture of abundance within the industry", <IoAirplaneOutline key={8345801} className="text-inherit" />],
                [8345832, 'Our Values', "To uphold the oriented cooperative value in business of fairness, integrity, Honesty, Hard Work and Teamwork, operating on processes involved around maintaining a balance between business and people’s and service above profile.", <IoScaleOutline key={8345802} className="text-inherit" />],
              ].map((([id, title, text, icon], i) => (
                <aside key={id.toString()} className={`${i === 0 ? 'bg-zinc-800 sm:col-span-2 md:col-span-1' : i === 1 ? 'bg-zinc-800/80' : 'bg-zinc-800/10'} p-7 flex flex-col gap-2`}>
                  <span className={`text-3xl sm:text-4xl flex-shrink-0 pt-5 ${i === 0 ? 'text-slate-100' : i === 1 ? 'text-slate-300' : 'text-slate-700'}`}>{icon}</span>
                  <div className="py-5 flex flex-col gap-2">
                    <h3 className={`text-lg sm:text-xl font-medium sm:font-semibold max-w-lg leading-tight ${i === 0 ? 'text-slate-100' : i === 1 ? 'text-slate-300' : 'text-slate-700'}`}>{title}</h3>
                    <p style={{ lineHeight: 2 }} className={`text-xs sm:text-sm font-thin leading-loose text-justify ${i === 0 ? 'text-slate-100' : i === 1 ? 'text-slate-300' : 'text-slate-700'}`}>{text}</p>
                  </div>
                </aside>
              )))
            }
          </div>
        </div>
      </section>
      <section className="py-20 bg-slate-100 px-4">
        <div className="container mx-auto flex flex-col relative z-10 py-10">
          <div className="flex flex-col sm:flex-row gap-4">
            <p className="text-xs font-light max-w-xs text-slate-700">More on Mission</p>
            <h3 className="flex-1 sm:ml-11 text-slate-700 text-4xl sm:text-5xl leading-tight font-bold max-w-md sm:max-w-2xl">Here&apos;s more on our <span className="text-primary"> mission</span> towards our members.</h3>
          </div>
          <div className="relative z-20 container mx-auto py-20 grid sm:grid-cols-2 md:grid-cols-3 text-white">
            {/* 1. To empower people and organizations toward optimum productivity and efficiency through cooperation and upholding and spreading a mindset and culture of abundance
            within the industry.
            2. Establishing the cooperative in all 36 states and the Federal Capital Territory- Abuja in the first year through partnership with relevant organizations.
            3. To target and register members with a membership fee of #5,000.00 per individual and &#8358;50,000 corporate or currency equivalence in each of the states/ FCT-Abuja of Nigeria
            and worldwide through inter-personal marketing and e-commerce marketing (social media, website, etc. In the first year of operation our target is 200,000 members after the
            first year, 800,000 members in two years and 3,200,000 members in three.
            4. All registered members must meet management membership recruit targets as periodically awarded by the State/National President or Vice-President at National
            management committee levels.
            5. Marketing/ Networking models shall be either as employed ad-hoc staff or paid volunteerism with a commission of 20% of every registered member in all category
            based on registered fee and shall be paid through chaque or electronic transfer and must be reciepted and signed by the beneficiary. Maketers must be put on target not less
            than 100 members in a month and defulters will only be given 60 days grace to make up or will be sacked or replaced. Our focus is to generate funds through our thrift /savings of
            at least five hundred million naira (N500,000,000.00) within the first year of operation in each of the cooperative branches in the 36 states and Abuja through aggressive
            marketing using all possible media and strategies plfor example, engaging voluntary and employed paid ad-hoc staff as marketers).
            6. Will shall be focusing on establishing at least one EDIMCS Microfinance Bank(s) in all
            major cities/ recommended towns of all states and Abuja within 10 years of operations.
            7. Establishing at least one agro-based farm(s) in all major cities/ recommended towns of
            all states and Abuja within 5 years of operation.
            8. We will partner with insurance company to register our members under health insurance
            within two years of operation in the 36 states and Abuja.
            9. Diversifying into other enterprises like oil and gas, educational institutions/ services, etc.
            within three years of operation in the 36 states and Abuja.
            10. Establishing (a) national/ sub-national conference(s) that shall once annually bring
            together all branches of the Cooperative in Nigeria for cross-fertilization on principles
            and practices of our Cooperative system and a means to strengthen weaker branches
            and award achievers.
            11. Establishing EDIMCS Nigeria Limited within the first year of operation to formally and
            corporativly package all our financial activities to enable international trajectory, with
            activities including financial consultancy, investments etc.As Edimcs grow, we shall
            diversify into business that will benefit our members.
            12. All the above activities of the cooperative shall be conducted with the aim of assisting the
            government by supporting the SME and ultimately contributing to the Gross Domestic
            Product (GDP) in Nigeria. */}

          </div>
        </div>

      </section>

    </main>
  )
}
