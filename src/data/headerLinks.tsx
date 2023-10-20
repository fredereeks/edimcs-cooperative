import { IoLogoFacebook, IoLogoInstagram, IoLogoTwitter } from 'react-icons/io'

// interface SubLinkProps {
//     id: number;
//     title: string;
//     url: string;
//     icon: JSX.Element | string;
// }

interface HeaderLinkProps {
    id: number;
    title: string;
    url: string;
    // sublinks: SubLinkProps[] | []
}

export const headerLinks : HeaderLinkProps[] = [
    {
        id: 15927348770,
        title: 'Home',
        url: '/',
    },
    {
        id: 15927348771,
        title: 'About',
        url: '/about',
    },
    {
        id: 15927348772,
        title: 'Contact',
        url: '/contact',
    },
    {
        id: 15927348773,
        title: 'Investment Pool',
        url: '/investment-pool',
    },
]