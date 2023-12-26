"use client"

import React from 'react'
import { IoSearchOutline } from 'react-icons/io5'

export default function TableSearch({ handleSearch, inputRef, title, children }: { handleSearch: (e: React.FormEvent) => void, inputRef: React.MutableRefObject<HTMLInputElement | null>, title: string, children?: React.ReactNode | React.ReactNode[] }) {

    return (
        <div className='w-full flex justify-between items-center pb-3 mb-2 border-b border-b-slate-200 dark:border-b-slate-500'>
            <div className="flex items-center gap-3">
                <h4 className="uppercase text-lg font-semibold text-slate-600 dark:text-slate-300 text-left">{title}</h4>
                {children}
            </div>
            <form onSubmit={handleSearch} className="flex items-center border border-slate-200 dark:border-slate-400/50 rounded-[5px] p-1 w-max max-w-sm text-slate-500 dark:text-slate-200 font-normal ml-auto">
                <input required type="search" placeholder="Search Table..." id="search" className="px-2 bg-transparent outline-none flex-1 text-slate-500 dark:text-slate-400 font-normal text-xs sm:text-sm placeholder:text-xs  placeholder:text-slate-500 dark:placeholder:text-slate-400" onInput={handleSearch} ref={inputRef} aria-label="Search" aria-roledescription='Search Table' />
                <button className="p-1 cursor-pointer bg-transparent inline">
                    <IoSearchOutline className="text-inherit text-sm cursor-pointer" />
                </button>
            </form>
        </div>
    )
}
