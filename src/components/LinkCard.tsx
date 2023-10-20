"use client"
import React, {useEffect, useState} from 'react'
import Link from 'next/link'
import { usePathname } from "next/navigation";

// interface SubLinkProps {
//     id: string
//     title: string
//     url: string
// }

interface LinkProps {
    title: string
    url: string
    // sublinks: SubLinkProps[] | []
    fixed: boolean
}

const LinkCard = ({title, url, fixed} : LinkProps) => {
    const location = usePathname();
    const [activeLink, setActiveLink] = useState(false);
    useEffect(() => {
        location === url ? setActiveLink(true) : setActiveLink(false);
        // console.log({location, url, title, activeLink})
        return () => {
            setActiveLink(false);
        } 
    },[location, url, title]);

    return (<Link href={url} className={`overflow-hidden relative w-full md:w-max hover:before:transiton-all before:md:duration-300 before:md:absolute before:md:bottom-0 before:md:-left-full before:md:h-[2px] before:md:-rounded[2rem] before:md:bg-primary before:md:w-0 before:md:-translate-x-1/2 hover:md:before:w-[30%] hover:md:before:left-1/2 ${activeLink ? 'text-primary' : 'text-slate-400 border-b-white'} bg-white ${fixed ? 'text-primary' : 'text-slate-400 border-b-white'} md:bg-transparent py-2 px-5 md:px-4 hover:text-primary text-sm`}>{title}</Link>)
}

export default LinkCard