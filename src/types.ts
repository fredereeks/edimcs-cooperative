import React, { ChangeEventHandler, HTMLInputTypeAttribute } from 'react'
import { StaticImageData } from "next/image"


export interface ColorSchemeProp {
    color: string
    background: string
}

export interface DashLayoutProps {
    children: React.ReactNode
}

export interface FootLinkProps {
    id: number;
    title: string;
    label: string;
    sublinks: SubLinkProps[] | []
}

export type handleClickProp = {
    handleClick: () => boolean | void
    darkMode: boolean | string
    toggleDarkMode: () => boolean | void,
    //   handleLogOut: (data: FormData) => Promise<void>, 
}

export interface HeaderLinkProps {
    id: number;
    title: string;
    url: string;
}

export interface LinkCardProps {
    title: string
    url: string
    fixed: boolean
}

export type LoanProps = {
    id: number
    image: StaticImageData
    name: string
    amount: number
    verdict: "Pending" | "Granted" | "Rejected"
    status: "Pending" | "Running" | "Defaulted" | "Completed"
    payback: number
    createdAt: string
    balance: number
}

export interface LoginFormDataProps {
    error: boolean
    message: string
}

export type MessageProps = {
    id: number
    text: string
    sender: string
    senderStatus: string
    receiver: string
    receiverStatus: string
    date: string
    status: string
    type: string
}

export type AccountDetailsProps = {
    id: string
    banker: string
    accountName: string
    accountNo: string
    type: "Savings" | "Current" | "Fixed"
    owner?: MemberProps[]
    accountOwner?: string
}

export type MemberProps = {
    id: number; image?: StaticImageData | string; firstname: string; middlename: string; lastname: string; email: string; status?: string; phone?: string | number; type?: "Admin" | "Member";
    accountDetails?: AccountDetailsProps[] | undefined
    address?: string | undefined; memberId: number | string; createdAt?: string; savings?: number; investment?: number; withdrawal?: number; balance?: number
}

export interface NavLinkProps {
    id: number
    title: string
    link: string
    element: JSX.Element
    icon: JSX.Element
}

export interface SubLinkProps {
    id: number;
    title: string;
    url: string;
    icon: JSX.Element | string;
}

export interface SavingsProps{
    id: string | number
    amount: number
    saver?: MemberProps
    saverId: string | number
    status: "Pending" | "Approved" | "Rejected"
    createdAt: string
    updatedAt: string
    updatedBy?: string
}

export interface TextAreaProps {
    containerClassName?: string | undefined | boolean
    label?: string | undefined | boolean
    required?: boolean
    disabled?: boolean | undefined
    className?: string | undefined
    placeholder?: string | undefined
    maxLength?: number | undefined
    name?: string | undefined
    id?: string | undefined
    onChange?: ChangeEventHandler<HTMLTextAreaElement> | undefined
}

export interface TextInputProps {
    containerClassName?: string | undefined | boolean
    label?: string | undefined | boolean
    required: boolean
    disabled?: boolean | undefined
    className?: string | undefined
    placeholder?: string | undefined
    type?: HTMLInputTypeAttribute | undefined
    min?: string | number | undefined
    minLength?: number | undefined
    max?: string | number | undefined
    value?: string | number
    name?: string | undefined
    id?: string | undefined
    onChange?: ChangeEventHandler<HTMLInputElement> | undefined
}

export interface TransactionProps {
    id: string | number
    image: StaticImageData | string
    firstname: string
    middlename: string | null
    lastname: string
    memberId: string
    type: string
    amount: number
    createdAt: string
    balance: number
    approvedBy: string
}