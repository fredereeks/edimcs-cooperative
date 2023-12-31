import { edimcs_boss_staff, edimcs_calculation, edimcs_calculator, edimcs_cardholder, edimcs_coinstack, edimcs_director, edimcs_dollarbills, edimcs_gathering, edimcs_happy_bunch, edimcs_laptop_holder, edimcs_moneycount, edimcs_phonecalculator, edimcs_piggyvest, edimcs_staff_laptop } from '@/assets/images'
import Image from 'next/image'
import Link from 'next/link'
import { IoAirplaneOutline, IoKeyOutline, IoMailUnreadSharp, IoPeopleOutline, IoScaleOutline, IoTelescopeOutline } from 'react-icons/io5'
import { AiOutlineAccountBook, AiOutlineBank } from 'react-icons/ai'
import 'aos/dist/aos.css';

// data-aos-duration="1000" data-aos-delay="1000" data-aos="fade-left"
// data-aos-duration="1000" data-aos-delay="1000" data-aos="fade-up-right"
// data-aos-duration="1000" data-aos-delay="1000" data-aos="fade-down-left"
// data-aos-duration="1000" data-aos-delay="1000" data-aos="fade-down-right"
// data-aos-duration="1000" data-aos-delay="1000" data-aos="zoom-in-up"
// data-aos-duration="1000" data-aos-delay="1000" data-aos="zoom-out-up"
// data-aos-easing="ease-in-sine" data-aos-duration="1000" data-aos="zoom-out-up"
// data-aos-duration="1000" data-aos-delay="1000" data-aos="fade-up"
// data-aos-duration="1000" data-aos-delay="1000" data-aos="fade-down"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <article className="relative py-20 px-4 bg-slate-600 after:bg-gradient-t-b after:from-slate-500 after:to-primary after-overlay">
        <Image src={edimcs_boss_staff} alt='Edimcs Money Calculator Image' fill={true} className="absolute w-1/2 left-1/2 top-0 object-cover grayscale opacity-25" />
        <div className="backdrop-blur-md relative z-20 container mx-auto py-20 h-screen max-h-screen grid sm:grid-cols-2 gap-4 text-white">
          <div className="flex flex-col gap-2 justify-center">
            <h2 data-aos-duration="2000" data-aos-delay="1000" data-aos="zoom-in-down" className="text-3xl sm:text-4xl font-semibold max-w-md sm:max-w-lg leading-tight">Saving you Money before you know it. Literally!</h2>
            <p data-aos-duration="2000" data-aos-delay="1000" data-aos="zoom-in-left" className="text-base sm:text-lg opacity-80 font-medium max-w-lg leading-loose text-justify py-2">We are a smart saving cooperative company that helps you set your money apart for future use. We provide guaranteed withdrawal, real-time tracking and incredible potential for your financial life.</p>
            <div data-aos-duration="2000" data-aos-delay="1000" data-aos="zoom-in-up" className="py-3 flex gap-2 sm:gap-4 items-center">
              <Link href="/auth/signup" className="bg-slate-800 w-max rounded-full py-3 px-5 md:px-8 text-white shadow-blue-900">Get Started</Link>
              <Link href="/about" className="w-max hover:bg-slate-700 bg-sky-50 text-slate-700 rounded-full hover:text-white text-sm font-bold flex items-center py-3 px-9">Learn More</Link>
            </div>
          </div>
          <div data-aos-duration="2000" data-aos-delay="1000" data-aos="fade-left" className="relative h-full hidden sm:flex">
            <Image src={edimcs_cardholder} alt='Edimcs Money Calculator Image' fill={true} className="overlay left-0 top-0 object-cover" />
          </div>
        </div>
      </article>
      <section className="py-20 px-4 bg-white relative">
        <div className="container mx-auto flex flex-col gap-6 md:flex-row py-10 md:py-20">
          <div className="relative flex-1 flex justify-end">
            <div data-aos-duration="2000" data-aos="zoom-down-right" className="relative min-h-[250px] sm:h-[300px] md:h-full p-10 w-full overflow-hidden">
              <Image src={edimcs_boss_staff} alt='Money Saver Calculator' className='rounded-xl object-cover' fill={true} />
            </div>
          </div>
          <div data-aos-duration="2000" data-aos="zoom-in-up"  className="py-0 md:py-20 flex-1 flex flex-col gap-2 sm:justify-center text-justify">
            <h3 className="text-slate-700 text-4xl sm:text-5xl lg:text-6xl text-left leading-snug font-bold max-w-md sm:max-w-lg w-full relative left-1/2 -translate-x-1/2 pb-4">A <span className="text-red-500">Cooperative</span> with a Pedigree.</h3>
            <p  style={{ lineHeight: 1.9 }} className="text-slate-700 text-base sm:text-lg leading-loose font-light max-w-md sm:max-w-lg w-full relative left-1/2 -translate-x-1/2">Enlightenment Drive Initiative Co-operative Society (EDIMCS) is one of the largest cooperative organizations in Nigeria and in the world, with the goal of achieving a first-world Nigeria with empowerment and housing for low-income and small and medium enterprises as our primary goal.</p>
            <p style={{ lineHeight: 1.9 }} className="text-slate-700 text-base sm:text-lg leading-loose font-light max-w-md sm:max-w-lg w-full relative left-1/2 -translate-x-1/2">Our aim at EDIMCS is to level up the playing field in the cooperative industry through the power of team, cooperation, and networking.</p>
          </div>
        </div>
      </section>
      <section  data-aos-duration="1000" data-aos="zoom-out-up"  className="relative py-20 px-4 bg-slate-50">
        <div className="relative z-20 container mx-auto flex flex-col gap-5 py-20">
          {/* <h2 className="text-2xl sm:text-3xl md:text-4xl font-medium sm:font-semibold max-w-lg mx-auto leading-tight text-slate-700">What we <span className="border-b-4 border-red-500">Stand</span> For</h2> */}
          <h2 data-aos-easing="ease-in-sine" data-aos-duration="1000" data-aos="zoom-out-up" className="text-slate-700 text-4xl sm:text-5xl md:text-6xl leading-snug font-bold max-w-md sm:max-w-xl mx-auto">What we <span className="text-primary">Stand</span> For<span className="text-red-500">.</span></h2>
          <div data-aos-easing="ease-in-sine" data-aos-duration="1000" data-aos="zoom-out-up" className="relative z-20 container mx-auto py-5 grid sm:grid-cols-2 md:grid-cols-3 text-white">
            {
              [
                [8345830, 'Our Vision', "To be the largest cooperative organization among cooperatives in Nigeria and in the world; with the goal of achieving a first-world Nigeria with empowerment and housing for low-income and small and medium enterprises as our primary goal.", <IoTelescopeOutline key={8345800} className="text-inherit" />],
                [8345831, 'Our Mission', "To empower people and organizations toward optimum productivity and efficiency through cooperation and upholding and spreading a mindset and culture of abundance within the industry", <IoAirplaneOutline key={8345801} className="text-inherit" />],
                [8345832, 'Our Values', "To uphold the oriented cooperative value in business of fairness, integrity, Honesty, Hard Work and Teamwork, operating on processes involved around maintaining a balance between business and people’s and service above profile.", <IoScaleOutline key={8345802} className="text-inherit" />],
              ].map((([id, title, text, icon], i) => (
                <div data-aos-duration="3000" data-aos-delay={`${i} === 0 ? '1000' : ${i} === 1 ? '2000' : '3000'`} data-aos={`${i} === 0 ? 'fade-left' : ${i} === 1 ? 'fade-up' : 'fade-right'`} key={id.toString()} className={`${i === 0 ? 'bg-zinc-800 sm:col-span-2 md:col-span-1' : i === 1 ? 'bg-zinc-800/80' : 'bg-zinc-800/10'} p-7 flex flex-col gap-2`}>
                  <span data-aos-duration="1000" data-aos="fade-up" className={`text-3xl sm:text-4xl flex-shrink-0 pt-5 ${i === 0 ? 'text-slate-100' : i === 1 ? 'text-slate-300' : 'text-slate-700'}`}>{icon}</span>
                  <div className="py-5 flex flex-col gap-2">
                    <h3 data-aos-duration="1000" data-aos="fade-down" className={`text-lg sm:text-xl font-medium sm:font-semibold max-w-lg leading-tight ${i === 0 ? 'text-slate-100' : i === 1 ? 'text-slate-300' : 'text-slate-700'}`}>{title}</h3>
                    <p data-aos-duration="1000" data-aos="zoom-out-right" style={{ lineHeight: 2 }} className={`text-xs sm:text-sm font-light leading-loose text-justify ${i === 0 ? 'text-slate-100' : i === 1 ? 'text-slate-300' : 'text-slate-700'}`}>{text}</p>
                  </div>
                </div>
              )))
            }
          </div>
        </div>
      </section>
      <section  data-aos-duration="1000" data-aos="zoom-out-up"  className='py-20 px-4'>
        <div className="relative z-20 container mx-auto flex flex-col gap-5 py-20">
          {/* <h2 className="text-2xl sm:text-3xl md:text-4xl font-medium sm:font-semibold max-w-lg mx-auto leading-tight text-sky-500">Our Values Propositions</h2> */}
          <h3 className="text-slate-700 text-4xl sm:text-5xl md:text-6xl leading-snug font-bold max-w-md sm:max-w-lg">Our Values Propositions<span className="text-red-500">.</span></h3>
          <div className="relative z-20 container mx-auto py-5 grid sm:grid-cols-2 gap-7">
            <div className="relative rounded-md drop-shadow-[0_0_16px_2px_#0000004] overflow-hidden h-full min-h-[20rem]">
              <Image src={edimcs_staff_laptop} alt='Edimcs Money Calculator Image' fill={true} className="overlay left-0 top-0 object-cover object-top" />
            </div>
            <div className="relative flex flex-col gap-6 py-5 sm:p-4">
              {
                [
                  { id: 28791, title: "Fairness", text: "balancing the interest of members by bridging the gap in communications concerning our activities", icon: <AiOutlineBank className="text-inherit" /> },
                  { id: 28792, title: "Integrity", text: "upholding professionalism to its highest standards", icon: <AiOutlineAccountBook className="text-inherit" /> },
                  { id: 28793, title: "Honesty", text: "ensuring responsive communication and genuine service in all business delivery’", icon: <IoScaleOutline className="text-inherit" /> },
                  { id: 28794, title: "Hard work", text: "capitalizing on excellent work performance", icon: <IoMailUnreadSharp className="text-inherit" /> },
                  { id: 28795, title: "Teamwork", text: "together, everybody, achieves miracles", icon: <IoPeopleOutline className="text-inherit" /> },
                ].map((value) => (
                  <div data-aos-easing="ease-in-sine" data-aos-duration="1000" data-aos="zoom-out-down" key={value.id} className="flex items-center gap-2">
                    <div className="flex flex-col gap-1 items-center w-[5rem] text-center">
                      <div data-aos-duration="1000" data-aos-delay="1000" data-aos="zoom-up-right" className="border-2 border-red-500 text-slate-500 rounded-full grid place-items-center h-9 w-9 sm:h-10 sm:w-10">
                        {value.icon}
                      </div>
                      <h5 data-aos-duration="1000" data-aos-delay="1000" data-aos="fade-up-right" className="text-slate-600 text-sm font-semibold">{value.title}</h5>
                    </div>
                    <div className="flex-1 flex flex-col justify-center h-full sm:p-2 border-b-2 border-b-slate-100">
                      <p data-aos-duration="1000" data-aos-delay="1000" data-aos="zoom-down-right" className="text-slate-500 text-sm leading-snug">{value.text}</p>
                    </div>
                  </div>
                ))
              }

            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
