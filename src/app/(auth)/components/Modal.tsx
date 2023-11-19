"use client"

import React from 'react'
import { IoClose } from 'react-icons/io5'

export default function Modal({ children, modalRef }: { children: React.ReactNode | React.ReactNode[], modalRef: React.MutableRefObject<HTMLDialogElement | null> }) {
    return (
        <>
            <dialog ref={modalRef} className={`w-full min-h-screen fixed top-0 left-0 rounded-md pt-10 bg-[#214e6f70] dark:bg-[#072840b0]`}>
                <div onClick={() => modalRef.current?.close()} className="overlay bg-transparent"></div>
                <aside className="modalRef relative w-full max-w-xl translate-y-4 shadow-2xl shadow-[#0007] z-50 flex-col opacity-1">
                    <button onClick={() => modalRef.current?.close()} className="cursor-pointer flex justify-center items-center absolute z-40 top-4 right-4 rounded-full h-6 w-6 bg-transparent hover:bg-slate-50"><IoClose className="text-slate-600 text-inherit" /></button>
                    <>
                        {children}
                    </>
                </aside>
            </dialog>
        </>
    )
}
