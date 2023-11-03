import { FootLinkProps } from '@/types'
import { IoLogoFacebook, IoLogoInstagram, IoLogoTwitter } from 'react-icons/io'



export const footerLinks : FootLinkProps[] = [
    {
        id: 82347231,
        title: "EDIMCS",
        label: "EDIMCS is the largest cooperative organization among cooperatives in Nigeria and in the world; with the goal of achieving a first-world Nigeria with empowerment and housing for low-income and small and medium enterprises as our primary goal.",
        sublinks: []
    },
    {
        id: 82347232,
        title: "Quick Links",
        label: "",
        sublinks: [
            {
                id: 823472321,
                title: "Home",
                url: "/",
                icon: ""
            },
            {
                id: 823472322,
                title: "About",
                url: "/about",
                icon: ""
            },
            {
                id: 823472323,
                title: "Investment Pool",
                url: "/investment-pool",
                icon: ""
            },
            {
                id: 823472324,
                title: "Contact",
                url: "/contact",
                icon: ""
            },
        ]
    },
    {
        id: 82347233,
        title: "Social",
        label: "",
        sublinks: [
            {
                id: 823472331,
                title: "Facebook",
                url: "https://facebook.com/edimcs/",
                icon: <IoLogoFacebook className="text-inherit" />,
            },
            {
                id: 823472332,
                title: "Twitter",
                url: "https://twitter.com/edimcs/",
                icon: <IoLogoTwitter className="text-inherit" />
            },
            {
                id: 823472333,
                title: "Instagram",
                url: "https://instagram.com/edimcs/",
                icon: <IoLogoInstagram className="text-inherit" />
            },
            {
                id: 823472334,
                title: "Send a Mail",
                url: "mailto: admin@edimcs.com",
                icon: <IoLogoInstagram className="text-inherit" />
            },
        ]
    },
    {
        id: 82347234,
        title: "Legal & Sitemap",
        label: "",
        sublinks: [
            {
                id: 823472341,
                title: "Privacy Policy",
                url: "/privacy-policy",
                icon: ""
            },
            {
                id: 823472342,
                title: "Terms & Condition",
                url: "/terms-and-conditions",
                icon: ""
            },
            {
                id: 823472343,
                title: "Cookie Policy",
                url: "/cookie-policy",
                icon: ""
            },
            {
                id: 823472344,
                title: "Sitemap",
                url: "/site-map",
                icon: ""
            },
        ]
    },
    
    

]