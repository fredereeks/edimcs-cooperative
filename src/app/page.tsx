import { edimcs_coinstack, edimcs_piggyvest } from '@/assets/images'
import Image from 'next/image'
import Link from 'next/link'
import { IoAirplaneOutline, IoKeyOutline, IoMailUnreadSharp, IoPeopleOutline, IoScaleOutline, IoTelescopeOutline } from 'react-icons/io5'
import { AiOutlineAccountBook, AiOutlineBank } from 'react-icons/ai'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <section className="relative py-20 px-4 bg-slate-600 after:bg-gradient-t-b after:from-slate-500 after:to-primary after-overlay">
        <Image src={edimcs_piggyvest} alt='Edimcs Money Calculator Image' fill={true} className="grayscale absolute w-1/2 left-1/2 top-0 opacity-50 object-cover" />
        <div className="backdrop-blur-md relative z-20 container mx-auto py-20 h-screen max-h-screen grid sm:grid-cols-2 gap-4 text-white">
          <aside className="flex flex-col gap-2 justify-center">
            <h2 className="text-3xl sm:text-4xl font-semibold max-w-md sm:max-w-lg leading-tight">Saving you Money before you know it. Literally!</h2>
            <p className="text-base sm:text-lg opacity-80 font-medium max-w-lg leading-loose text-justify py-2">We are a smart saving cooperative company that helps you set your money apart for future use. We provide guaranteed withdrawal, real-time tracking and incredible potential for your financial life.</p>
            <div className="py-3 flex gap-2 sm:gap-4 items-center">
              <Link href="/signup" className="bg-primary w-max rounded-full py-2 px-5 text-white shadow-blue-900">Get Started</Link>
              <Link href="/about" className="w-max hover:bg-slate-700 bg-sky-50 text-sky-500 rounded-full hover:text-white text-sm font-bold flex items-center py-3 px-9">Learn More</Link>
            </div>
          </aside>
          <aside className="relative h-full hidden sm:flex">
            <Image src={edimcs_piggyvest} alt='Edimcs Money Calculator Image' fill={true} className="overlay left-0 top-0 object-cover" />
          </aside>
        </div>
      </section>
      <section className="relative py-20 px-4 bg-slate-50">
        <div className="relative z-20 container mx-auto flex flex-col gap-5 py-20">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-medium sm:font-semibold max-w-lg mx-auto leading-tight text-primary">What we <span className="border-b-4 border-red-500">Stand</span> For</h2>
          <div className="relative z-20 container mx-auto py-5 grid sm:grid-cols-2 md:grid-cols-3 text-white">
            {
              [
                [8345830, 'Our Vision', "To be the largest cooperative organization among cooperatives in Nigeria and in the world; with the goal of achieving a first-world Nigeria with empowerment and housing for low-income and small and medium enterprises as our primary goal.", <IoTelescopeOutline key={8345800} className="text-inherit" />],
                [8345831, 'Our Mission', "To empower people and organizations toward optimum productivity and efficiency through cooperation and upholding and spreading a mindset and culture of abundance within the industry", <IoAirplaneOutline key={8345801} className="text-inherit" />],
                [8345832, 'Our Values', "To uphold the oriented cooperative value in business of fairness, integrity, Honesty, Hard Work and Teamwork, operating on processes involved around maintaining a balance between business and people’s and service above profile.", <IoScaleOutline key={8345802} className="text-inherit" />],
              ].map((([id, title, text, icon], i) => (
                <aside key={id.toString()} className={`${i === 0 ? 'bg-slate-700 sm:col-span-2 md:col-span-1' : i === 1 ? 'bg-slate-700/70' : 'bg-slate-700/20'} p-7 flex flex-col gap-2`}>
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
      <section className='py-20 px-4'>
        <div className="relative z-20 container mx-auto flex flex-col gap-5 py-20">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-medium sm:font-semibold max-w-lg mx-auto leading-tight text-sky-500">Our Values Propositions</h2>
          <div className="relative z-20 container mx-auto py-5 grid sm:grid-cols-2 gap-7">
            <aside className="relative rounded-md drop-shadow-[0_0_16px_2px_#0000004] overflow-hidden h-full min-h-[20rem]">
              <Image src={edimcs_coinstack} alt='Edimcs Money Calculator Image' fill={true} className="overlay left-0 top-0 object-cover" />
            </aside>
            <aside className="relative flex flex-col gap-4 py-5 sm:p-4">
              {
                [
                  {id: 28791, title: "Fairness",  text: "balancing the interest of members by bridging the gap in communications concerning our activities", icon: <AiOutlineBank className="text-inherit" />},
                  {id: 28792, title: "Integrity",  text: "upholding professionalism to its highest standards", icon: <AiOutlineAccountBook className="text-inherit" />},
                  {id: 28793, title: "Honesty",  text: "ensuring responsive communication and genuine service in all business delivery’", icon: <IoScaleOutline className="text-inherit" />},
                  {id: 28794, title: "Hard work", text: "capitalizing on excellent work performance", icon: <IoMailUnreadSharp className="text-inherit" />},
                  {id: 28795, title: "Teamwork",  text: "together, everybody, achieves miracles", icon: <IoPeopleOutline className="text-inherit" />},
                ].map((value) => (
                  <aside key={value.id} className="flex items-center gap-2">
                    <div className="flex flex-col gap-1 items-center w-[5rem] text-center">
                      <div className="border-2 border-sky-500 text-sky-500 rounded-full grid place-items-center h-9 w-9 sm:h-10 sm:w-10">
                        {value.icon}
                      </div>
                      <h5 className="text-slate-400 text-sm font-semibold">{value.title}</h5>
                    </div>
                    <div className="flex-1 flex flex-col justify-center h-full sm:p-2 border-b-2 border-b-slate-200">
                      <p className="text-slate-400 text-sm leading-snug">{value.text}</p>
                    </div>
                  </aside>
                ))
              }

            </aside>
          </div>
        </div>
      </section>

    </main>
  )
}
