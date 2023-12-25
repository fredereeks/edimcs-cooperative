"use client"

import React, { useEffect, useMemo, useState } from 'react'
import { DashHeader, DashFooter, DashSideBar } from '@/app/(auth)/ui';
import { Toaster } from 'react-hot-toast'
import 'aos/dist/aos.css';
import { MemberProps } from '@/types';

export default function DashLayout({ children, user }: { children: React.ReactNode, user: MemberProps }) {
    const [darkMode, setDarkMode] = useState<boolean>(false)
    const [navShow, setNavShow] = useState<boolean>(false)

    useEffect(() => {
        const currentMode = localStorage.getItem("edimcs__theme") || 'light'
        setDarkMode(currentMode === 'dark' ? true : false)
    },[])

    useEffect(() => {
        let modal = darkMode ? 'dark' : 'light'
        localStorage.setItem("edimcs__theme", modal)
    }, [darkMode])

    const handleClick = () => {
        setNavShow(prev => !prev)
    }

    const toggleDarkMode = () => {
        setDarkMode(prev => !prev)
    }
    
    return (
        // <main className={`${darkMode === true ? 'dark' : 'light'}`}>
        <main className={`${darkMode ? 'dark' : 'light'}`}>
            <Toaster />
            <section className={`bg-slate-50 dark:bg-slate-900 min-h-screen flex py-2 gap-3 w-full`}>
                <DashSideBar user={user} navShow={navShow} setNavShow={setNavShow}/>
                <div className="flex flex-col flex-1 py-4 sm:px-4 w-[50vw]">
                    <DashHeader user={user} handleClick={handleClick} darkMode={darkMode} toggleDarkMode={(toggleDarkMode)} />
                    <div className="min-h-[calc(100vh-120px)]">
                        {children}
                    </div>
                    <DashFooter />
                </div>
            </section>
        </main>

    )
}
