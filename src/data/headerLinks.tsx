import { HeaderLinkProps } from '@/types'
import { IoLogoFacebook, IoLogoInstagram, IoLogoTwitter } from 'react-icons/io'




export const headerLinks : HeaderLinkProps[] = [
    {
        id: 15927348770,
        title: 'Home',
        url: '/',
        sublinks: []
    },
    {
        id: 15927348771,
        title: 'About',
        url: '/about',
        sublinks: []
    },
    // {
    //     id: 15927348772,
    //     title: 'Save',
    //     url: '/save',
    // },
    // {
    //     id: 15927348773,
    //     title: 'Loan',
    //     url: '/loan',
    // },
    {
        id: 15927348774,
        title: 'Contact',
        url: '/contact',
        sublinks: []
    },
    {
        id: 15927348775,
        title: 'Transactions',
        url: '#',
        sublinks: [
            {
                id: 159273487750,
                title: "Money Pool",
                url: "/money-pool"
            },
            {
                id: 159273487752,
                title: "Savings",
                url: "/dashboard/savings"
            },
            {
                id: 159273487753,
                title: "Deposit",
                url: "/dashboard/deposits"
            },
            {
                id: 159273487754,
                title: "Loan",
                url: "/dashboard/loans"
            },
            {
                id: 159273487755,
                title: "Withdrawals",
                url: "/dashboard/withdrawals"
            },
        ]
    },
]