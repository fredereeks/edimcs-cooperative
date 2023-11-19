"use client"

import React from 'react'
import { IoSearchOutline } from 'react-icons/io5'

export default function TableSearch({ handleSearch, inputRef }: { handleSearch: (e: React.FormEvent) => void, inputRef: React.MutableRefObject<HTMLInputElement | null> }) {

    return (
        <form onSubmit={handleSearch} className="flex items-center border border-slate-200 rounded-[5px] p-1 w-max max-w-sm text-slate-500 dark:text-slate-200 ml-auto">
            <input type="search" placeholder="Search Table..." id="search" className="px-2 bg-transparent outline-none flex-1 text-slate-500 dark:text-slate-200 text-sm" onChange={handleSearch} ref={inputRef} aria-label="Search" aria-roledescription='Search Table' />
            <IoSearchOutline className="text-inherit text-sm" />
        </form>
    )
}
