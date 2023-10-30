'use client'

import React from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { IoMailUnreadOutline, IoLogOutOutline, IoMenuOutline, IoSunnyOutline } from "react-icons/io5";
import { IoMoonOutline } from "react-icons/io5";

type handleClickProp = {
  handleClick: () => boolean | void
  darkMode: boolean | string
  toggleDarkMode: () => boolean | void, 
  handleLogOut: (data: FormData) => Promise<void>, 
}

export default function DashHeader({handleClick, darkMode, toggleDarkMode, handleLogOut}: handleClickProp ) {
    const location = usePathname();
    const pathname = location === "/dashboard" ? "Dashboard" : location.indexOf("/dashboard/user/") > -1 ? "User Details" : location.indexOf("/dashboard/admin/") > -1 ? "Admin Details" :  location.replace("/dashboard/", "");
    const page = pathname[0].toUpperCase() + pathname.slice(1);
    return (
        <header className="flex justify-between gap-2 p-2 items-center w-full flex-1">
            <div className="flex flex-col gap-1">
                <div className="text-slate-500 text-sm flex gap-1 items-center">
                    <Link href={"/dashboard"} className="text-xs text-slate-400">Dashboard</Link> /
                    <p className="dark-text text-sm font-semibold">{page}</p>
                </div>
                <p className="text-slate-600 text-lg sm:text-2xl font-bold">{page}</p>
            </div>
            <div className="flex items-center gap-1 w-max">
                <Link href="/dashboard/messages" className="text-sm md:text-base text-slate-400 p-1 relative flex">
                    {/* <ToolTip text={'Check Notifications'} direction='bottom' /> */}
                    <IoMailUnreadOutline size={16} className='text-inherit' />
                </Link>
                <form action={handleLogOut} className="text-sm md:text-base text-slate-400 p-1 relative flex">
                    <button type="submit" className='bg-transparent inline'>
                        <IoLogOutOutline size={16} className='text-inherit' />
                    </button>
                </form>
                <button onClick={handleClick} className="cursor-pointer md:hidden text-base md:text-base text-slate-400 p-1"><IoMenuOutline size={22} className='text-inherit' /></button>
                <button onClick={toggleDarkMode} className="cursor-pointer -scale-x-[1] text-sm text-slate-400 p-1">
                    {darkMode ?
                        <IoSunnyOutline className='text-inherit' /> :
                        <IoMoonOutline className='text-inherit' />
                    }
                </button>
            </div>
        </header>
    )
}
