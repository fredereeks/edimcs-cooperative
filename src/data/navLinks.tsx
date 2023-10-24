import {  IoClipboardOutline, IoHomeOutline, IoMailUnreadOutline, IoNewspaperOutline, IoPeopleOutline, IoPersonOutline, IoReceiptOutline } from 'react-icons/io5'

interface NavLinkProps {
    id: number
    title: string
    link: string
    icon: JSX.Element
}

export const navLinks : NavLinkProps[] = [
    {
        id: 282340,
        title: 'Dashboard',
        link: '/',
        icon: <IoNewspaperOutline className='text-inherit text-xs ' />
    },
    {
        id: 282341,
        title: 'Admins',
        link: '/dashboard/admins',
        icon: <IoPersonOutline className='text-inherit text-xs ' />
    },
    {
        id: 282342,
        title: 'Users',
        link: '/dashboard/users',
        icon: <IoPeopleOutline className='text-inherit text-xs ' />
    },
    {
        id: 282343,
        title: 'Hotels',
        link: '/dashboard/hotels',
        icon: <IoHomeOutline className='text-inherit text-xs ' />
    },
    {
        id: 282344,
        title: 'Blogs',
        link: '/dashboard/blogs',
        icon: <IoReceiptOutline className='text-inherit text-xs ' />
    },
    // {
    //     id: 282345,
    //     title: 'Bookings',
    //     link: '/dashboard/bookings',
    //     icon: <IoReceiptOutline className='text-inherit text-xs ' />
    // },
    {
        id: 282346,
        title: 'Messages',
        link: '/dashboard/messages',
        icon: <IoMailUnreadOutline className='text-inherit text-xs ' />
    },
    {
        id: 282347,
        title: 'Profile',
        link: '/dashboard/profile',
        icon: <IoClipboardOutline className='text-inherit text-xs ' />
    },
]