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
    interest: number
    payback?: number
    depositorId: string | null
    depositor?: MemberProps | null
    total?: string | number | null
    status: "Pending" | "Running" | "Completed" | "Suspended"
    verdict: "Pending" | "Granted" | "Rejected" | "Cancelled"
    createdAt: string | Date
    updatedAt: string | Date
    updatedBy?: string | null
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
//     loaner?: MemberProps | null
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
    loaner?: MemberProps | null
    loanerId: string | null
    total?: string | number | null
    status: "Pending" | "Running" | "Completed" | "Suspended"
    verdict: "Pending" | "Granted" | "Rejected" | "Cancelled"
    createdAt: string | Date
    updatedAt: string | Date
    updatedBy?: string | null
}

export interface LoginFormDataProps {
    error: boolean
    message: string
}

export type MessageProps = {
    id: string
    firstname: string
    middlename: string
    lastname: string
    email: string
    phone: string
    message: string
    status: "Read" | "Unread"
    createdAt?: string | Date 
    updatedAt?: string | Date 
    updatedBy?: string
}

export type AccountDetailsProps = {
    id: string
    banker: string
    accountnumber: string
    bvn: number
    type: "Savings" | "Current" | "Fixed"
    owner?: MemberProps[]
    memberId?: string | null
}

// export type InvestmentProps = {
//     id: string
//     type: "Silver" | "Gold" | "Premium"
//     amount: number
//     interest: number
//     payback?: number
//     nextDueDate?: Date | null | string
//     investor?: MemberProps | null
//     investorId?: string | null
//     beneficiary?: MemberProps | null
//     beneficiaryId: string | null
//     status: "Pending" | "Running" | "Completed" | "Suspended"
//     verdict: "Pending" | "Granted" | "Rejected" | "Cancelled"
//     createdAt: string | Date
//     updatedAt: string | Date
//     updatedBy?: string | null
// }

export type InvestmentProps = {
    id: string
    type: "Silver" | "Gold" | "Premium"
    amount: number
    interest: number
    payback?: number
    investor: MemberProps
    investorId: string
    beneficiary?: MemberProps | null
    beneficiaryId?: string
    status: "Pending" | "Running" | "Completed" | "Suspended"
    verdict: "Pending" | "Granted" | "Rejected" | "Cancelled"
    nextDueDate?: string | Date
    createdAt: string | Date
    updatedAt: string | Date
    updatedBy?: string | Date
  }

// export type MembersProp = {
//     id: string; image?: StaticImageData | string; firstname: string; middlename: string; lastname: string; email: string; status?: string; phone?: string | number; type?: "Admin" | "Member";
//     accountDetails?: AccountDetailsProps[] | undefined
//     address?: string | undefined; memberId: number | string; createdAt?: string; savings?: SavingsProps[]; deposits?: DepositProps[];  loans?: LoanProps[]; withdrawals?: WithdrawalProps[]; balance?: number
// }

export type MemberProps = {
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
    type?: "Member" | "Admin"
    status?: "Pending" | "Active" | "Pending"
    token?: string
    createdAt?: string | Date
    updatedAt?: string | Date
    updatedBy?: string | Date
    loanRating?: "Basic" | "Standard" | "StandardPlus" | "Premium"
    accountDetails?: AccountDetailsProps[]
    loans?: LoanProps[]
    savings?: SavingsProps[]
    sentMessages?: MessageProps[]
    receivedMessages?: MessageProps[]
    investments?: InvestmentProps[]
    beneficiary?: InvestmentProps[]
    deposits?: DepositProps[] 
    withdrawals?: WithdrawalProps[]
    balance?: number
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
    interest?: number | null
    saver?: MemberProps | null
    saverId: string | null
    total?: string | number | null
    status: "Pending" | "Running" | "Completed" | "Suspended"
    verdict: "Pending" | "Granted" | "Rejected" | "Cancelled"
    createdAt: string | Date
    updatedAt: string | Date
    updatedBy?: string | null
}

export interface TextAreaProps {
    containerClassName?: string | undefined | boolean
    label?: string | undefined | boolean
    required?: boolean
    disabled?: boolean | undefined
    className?: string | undefined
    placeholder?: string | undefined
    maxLength?: number | undefined
    defaultValue?: string | number
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
    defaultValue?: string | number
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
    interest?: number | null
    withdrawer?: MemberProps | null
    withdrawerId: string | null
    total?: string | number | null
    status: "Pending" | "Running" | "Completed" | "Suspended"
    verdict: "Pending" | "Granted" | "Rejected" | "Cancelled"
    createdAt: string | Date
    updatedAt: string | Date
    updatedBy?: string | null
}

export type UserProps = {
    id: string;
    firstname: string;
    middlename: string | null;
    lastname: string;
    email: string;
    address: string | null;
    password?: string;
    phone?: string | null;
    loanRating?: "Basic" | "Standard" | "StandardPlus" | "Premium"
    balance: number;
    type: "Member" | "Admin";
    accountDetails: {
        id: string;
        banker: string;
        accountnumber: string;
        type: "Savings" | "Current" | "Fixed";
        memberId: string | null;
    }[];
}