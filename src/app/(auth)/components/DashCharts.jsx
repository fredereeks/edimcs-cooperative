"use client"

import React, { useRef } from 'react'
import { useEffect } from 'react';

export default function DashCharts({ savings, doughtnut, investment }) {
    // const canvasRef = useRef<HTMLCanvasElement | null>(null)
    
    
    useEffect(() => {
        (async()=>{
            const { Chart, initTE } = await require("tw-elements");
            initTE({ Chart });
        })()
        //eslint-disable-next-line
    }, []);

    // Chart


    return (
        <>
           <aside className="my-5 p-4 bg-white dark:bg-[#dbf0f724] dark:shadow-black shadow-slate-200 shadow-md rounded-lg relative grid gap-4">
            <div className="flex flex-wrap">
                {savings}
                <div className="w-2/5 sm:p-4 bg-success dark:bg-success/40 flex flex-col justify-center rounded-md">
                    <div className="stat place-items-center px-4">
                        <div className="stat-title text-sm text-slate-200">Savings</div>
                        <div className="stat-value text-xl sm:text-3xl md:text-2xl lg:text-3xl tracking-tighter text-slate-50 dark:text-slate-200">&#8358;220,027</div>
                        <div className="stat-desc text-xs dark:text-slate-200 text-slate-100 whitespace-pre-wrap text-center">From 35 Members</div>
                    </div>
                    <div className="py-5 mx-2 border-t border-t-slate-200/90 grid place-items-center">
                        <div className="stat-title text-sm text-slate-200">Total Savings</div>
                        <div className="stat-value text-xl sm:text-3xl md:text-2xl lg:text-3xl tracking-tighter text-slate-50 dark:text-slate-200">&#8358;68,820,027</div>
                    </div>
                </div>
            </div>
           </aside>
           <aside className="my-5 p-4 bg-white dark:bg-[#dbf0f724] dark:shadow-black shadow-slate-200 shadow-md rounded-lg relative grid gap-4">
            <div className="flex flex-wrap">
                <div className="w-2/5 sm:p-4 bg-danger dark:bg-danger/40 flex flex-col justify-center rounded-md">
                    <div className="stat place-items-center px-4">
                        <div className="stat-title text-sm text-slate-200">Loans</div>
                        <div className="stat-value text-xl sm:text-3xl md:text-2xl lg:text-3xl tracking-tighter text-slate-50 dark:text-slate-200">&#8358;34,450</div>
                        <div className="stat-desc text-xs dark:text-slate-200 text-slate-100 whitespace-pre-wrap text-center">From Last Month</div>
                    </div>
                    <div className="py-5 mx-2 border-t border-t-slate-200/50 grid place-items-center">
                        <div className="stat-title text-sm text-slate-200">Total Loans</div>
                        <div className="stat-value text-xl sm:text-3xl md:text-2xl lg:text-3xl tracking-tighter text-slate-50 dark:text-slate-200">&#8358;500,000</div>
                    </div>
                </div>
                {doughtnut}
            </div>
           </aside>
           <aside className="my-5 p-4 bg-white dark:bg-[#dbf0f724] dark:shadow-black shadow-slate-200 shadow-md rounded-lg relative grid gap-4">
            <div className="flex flex-wrap">
                {investment}
                <div className="w-2/5 sm:p-4 bg-primary dark:bg-primary/40 flex flex-col justify-center rounded-md">
                    <div className="stat place-items-center px-4">
                        <div className="stat-title text-sm text-slate-200">Investments</div>
                        <div className="stat-value text-xl sm:text-3xl md:text-2xl lg:text-3xl tracking-tighter text-slate-50 dark:text-slate-200">&#8358;1,450,500</div>
                        <div className="stat-desc text-xs dark:text-slate-200 text-slate-100 whitespace-pre-wrap text-center">Since last week</div>
                    </div>
                    <div className="py-5 mx-2 border-t border-t-slate-200/50 grid place-items-center">
                        <div className="stat-title text-sm text-slate-200">Total Investments</div>
                        <div className="stat-value text-xl sm:text-3xl md:text-2xl lg:text-3xl tracking-tighter text-slate-50 dark:text-slate-200">&#8358;45,323,000</div>
                    </div>
                </div>
            </div>
           </aside>
        </>
    )
}
