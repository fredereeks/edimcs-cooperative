import React, { ChangeEventHandler, HTMLInputTypeAttribute } from 'react'
import { StaticImageData } from "next/image"


export interface ColorSchemeProp {
    color: string
    background: string
}

export interface DashLayoutProps {
    children: React.ReactNode
}

export type DepositProps = {
    id: string
    amount: number
    depositorId: string
    depositor?: MemberProps | undefined
    status: "Pending" | "Completed" | "Rejected"
    verdict: "Pending" | "Accepted" | "Rejected"
    createdAt: string
    updatedAt: string
}

export interface FootLinkProps {
    id: number
    title: string
    label: string
    sublinks: SubLinkProps[] | []
}

export type handleClickProp = {
    handleClick: () => boolean | void
    darkMode: boolean | string
    toggleDarkMode: () => boolean | void,
    //   handleLogOut: (data: FormData) => Promise<void>, 
}

export interface HeaderLinkProps {
    id: number
    title: string
    url: string
}

export interface LinkCardProps {
    title: string
    url: string
    fixed: boolean
}

// export type LoanProps = {
//     id: string
//     amount: number
//     loanerId: string
//     loaner?: MemberProps | undefined
//     status: "Pending" | "Running" | "Completed" | "Rejected"
//     verdict: "Pending" | "Granted" | "Rejected" | "Cancelled"
//     interest: number
//     payback?: number
//     createdAt: string
//     updatedAt: string
//   }

export type LoanProps = {
    id: string
    amount: number
    interest: number
    payback?: number
    loaner?: MemberProps | undefined
    loanerId: string | number
    status: "Pending" | "Running" | "Completed" | "Rejected"
    verdict: "Pending" | "Granted" | "Rejected" | "Cancelled"
    createdAt: string
    updatedAt: string
    updatedBy?: string
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

export type InvestmentProps = {
    id: string
    type: "Silver" | "Gold" | "Premium"
    status: "Pending" | "Running" | "Completed" | "Suspended"
    investor: MemberProps
    investorId: string
    beneficiary?: MemberProps
    beneficiaryId?: string
    nextDueDate?: string
    createdAt?: string
    updatedAt?: string
}


export type MemberProps = {
    id: string; image?: StaticImageData | string; firstname: string; middlename: string; lastname: string; email: string; status?: string; phone?: string | number; type?: "Admin" | "Member";
    accountDetails?: AccountDetailsProps[] | undefined
    address?: string | undefined; memberId: number | string; createdAt?: string; savings?: number; deposits?: number; withdrawal?: number; balance?: number
}

export type MemberProp = {
    id: string
    firstname: string
    middlename: string
    lastname: string
    email: string
    memberId: string
    password: string
    image: string
    phone?: string
    address?: string
    type?: "User" | "Admin"
    status?: "Pending" | "Active" | "Pending"
    token?: string
    createdAt?: string
    updatedAt?: string
    updatedBy?: string
    loanRating?: "Basic" | "Standard" | "Standard Plus" | "Premium"
    accountDetails?: AccountDetailsProps[]
    loans?: LoanProps[]
    savings?: SavingsProps[]
    sentMessages?: MessageProps[]
    receivedMessages?: MessageProps[]
    investments?: InvestmentProps[]
    beneficiary?: InvestmentProps[]
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

export type SavingsProps = {
    id: string
    amount: number
    interest?: number
    saver?: MemberProps | undefined
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

export type WithdrawalProps = {
    id: string
    amount: number
    interest?: number
    withdrawerId: string
    withdrawer?: MemberProps | undefined
    status: "Pending" | "Completed" | "Rejected"
    verdict: "Pending" | "Accepted" | "Rejected"
    createdAt: string
    updatedAt: string
    updatedBy?: string
}