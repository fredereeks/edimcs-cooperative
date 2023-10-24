"use client"

import React from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { navLinks } from '@/data'
import { edimcs_silhouette } from '@/assets/images'
import Image from 'next/image'
import { IoFileTrayStackedSharp } from 'react-icons/io5'

interface ColorSchemeProp {
    color: string
    background: string
}

export default function DashSideBar({ navShow }: { navShow: boolean }) {
    const location = usePathname();
    const pathname = location === "/" ? "Dashboard" : location.replace("/dashboard/", "");
    const page = pathname[0].toUpperCase() + pathname.slice(1);
    const colorScheme : ColorSchemeProp[] = [
        {
            background: 'bg-sky-200/30',
            color: 'text-sky-500'
        },
        {
            background: 'bg-indigo-200/30',
            color: 'text-indigo-500'
        },
        {
            background: 'bg-red-200/30',
            color: 'text-red-500'
        },
        {
            background: 'bg-primary/10',
            color: 'text-primary'
        },
        {
            background: 'bg-orange-200/30',
            color: 'text-orange-500'
        },
        {
            background: 'bg-teal-200/30',
            color: 'text-teal-500'
        },
    ] 
    return (
        <nav className={`${navShow ? 'left-3 fixed md:relative' : '-left-full md:left-3 fixed md:relative'} z-[100] rounded-xl p-5 flex flex-col h-[calc(100vh-35px)] mt-[10px] mb-[20px] bg-transparent max-w-xs sm:min-w-[12rem] md:min-w-[14rem] transition-all duration-300`}>
            <section className={`${navShow ? 'left-3 fixed' : '-left-full md:left-3 fixed'} z-[100] rounded-xl p-5 flex flex-col h-[calc(100vh-35px)] top-[20px] mb-[20px] bg-white dark:bg-slate-700 shadow-md max-w-xs sm:min-w-[12rem] md:min-w-[14rem] transition-all duration-300`}>
                <div className="flex items-center gap-2 py-5 px-2 relative after:absolute after:left-1/2 after:-translate-x-1/2 after:top-full after:w-full after:h-[1px] after:bg-gradient-to-r after:from-slate-50 after:to-slate-50 after:via-slate-200">
                    <div className="h-8 w-8 flex justify-center items-center rounded-full overflow-hidden relative bg-primary dark:bg-slate-600/50">
                        {/* <Image src={edimcs_silhouette} alt={`Frederick Jones`} fill={true} className="absolute left-0 top-0 object-cover w-full h-full" /> */}
                        <IoFileTrayStackedSharp key={82346} className="text-sm text-white" />
                    </div>
                    <div className="flex flex-col flex-1">
                        <h3 className="text-slate-800 dark:text-white text-sm font-semibold whitespace-nowrap">Frederick Jones</h3>
                        <p className="text-slate-700 dark:text-white text-xs opacity-50 font-medium">@freddyjoe</p>
                    </div>
                </div>
                <div className="flex flex-col gap-2 py-5 px-2 overflow-y-auto">
                    <div className="flex flex-col gap-2">
                        <h3 className="text-slate-400 text-[.6rem] font-semibold whitespace-nowrap uppercase">Account</h3>
                        <aside className={`bg-primary/10 rounded-sm flex items-center gap-2 p-2 transition-all duration-300`}>
                            <div className="h-full w-10 rounded-md bg-slate-800"></div>
                            <div className="flex flex-col justify-center">
                                <h4 className="text-primary font-semibold text-xs text-[.7rem] dark:opacity-80">United Bank Plc</h4>
                                <p className="text-slate-500 text-xs opacity-60 dark:opacity-90 font-thin">&#8358;20,000</p>
                            </div>
                        </aside>
                    </div>
                    <div className="flex flex-col gap-2 py-5 overflow-y-auto">
                        {
                            navLinks?.map((navLink,i) => {
                                const active = (navLink.title === page) ? 'bg-slate-200/30' : 'bg-white hover:bg-slate-200/30'
                                return (<Link href={`${navLink.link}`} key={navLink.id} className={`flex gap-2 p-2 transition-all duration-300 rounded-md ${active}`}>
                                    <div className={`${colorScheme[i].background} ${colorScheme[i].color} grid place-items-center w-7 h-7 rounded-full`}>{navLink.icon}</div>
                                    <div className="flex flex-col justify-center">
                                        <h4 className="text-slate-500 text-[.7rem] sm:text-xs dark:opacity-80">{navLink.title}</h4>
                                        {/* <p className="text-slate-500 text-[.6rem] opacity-60 dark:opacity-90 font-thin">&#8358;12,000</p> */}
                                    </div>
                                </Link>)
                            })
                        }
                    </div>
                </div>
            </section>
        </nav>
    )
}
