"use client"
import React, { useEffect, useMemo, useState } from 'react'
import { DashHeader, DashFooter, DashSideBar } from '@/app/(auth)/components';
import { Toaster } from 'react-hot-toast'
import axios, { AxiosError } from 'axios'
import { useRouter } from 'next/navigation';


export default function DashLayout({ children }: { children: React.ReactNode }) {
    const [darkMode, setDarkMode] = useState<boolean>(false)
    const [navShow, setNavShow] = useState<boolean>(false)
    const mode : string | null = localStorage.getItem("edimcs__theme") ?? 'light'
    const router = useRouter()

    const modal = useMemo(() => mode, [mode])

    console.log({modal})

    const handleClick = () => {
        setNavShow(prev => !prev)
    }

    const toggleDarkMode = () => {
        setDarkMode(prev => !prev)
        const modal = darkMode ? 'dark' : 'light'
        localStorage.setItem("edimcs__theme", modal)
    }

    async function handleLogOut(){
        try{
          const {data} = await axios.post("/api/auth/logout")
          if(!data.error) router.push("/")
          console.log({data})
        }catch(err){
          const error = err as AxiosError;
          console.log({error})
        }
      }
          // useEffect(() => {
        
    // },[darkMode])

    return (
        // <main className={`${darkMode === true ? 'dark' : 'light'}`}>
        <main className={`${modal}`}>
            <Toaster />
            <section className={`bg-slate-50 dark:bg-slate-900 min-h-screen flex py-2 gap-3 w-full`}>
                <DashSideBar navShow={navShow} />
                <div className="flex flex-col flex-1 py-4 sm:px-4 w-[50vw]">
                    <DashHeader handleLogOut={handleLogOut} handleClick={handleClick} darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
                    <div className="min-h-[calc(100vh-120px)]">
                        {children}
                    </div>
                    <DashFooter />
                </div>
            </section>
        </main>

    )
}
