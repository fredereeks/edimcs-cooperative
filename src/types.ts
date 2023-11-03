import React, { ChangeEventHandler, HTMLInputTypeAttribute } from 'react'
import { StaticImageData } from "next/image"

export type MemberProps = {
    id: number; image: StaticImageData; firstname: string; middlename: string; lastname: string; email: string; status: string; phone: string | number; type: string; account_name: string; account_number: number | string; banker: string; address: string; memberId: number; date: string; savings: number; investment: number; withdrawal: number; balance: number
}
export interface ColorSchemeProp {
    color: string
    background: string
}

export interface LoginFormDataProps {
    error: boolean
    message: string
}

export interface LinkCardProps {
    title: string
    url: string
    fixed: boolean
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
    required?: boolean
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

export interface SubLinkProps {
    id: number;
    title: string;
    url: string;
    icon: JSX.Element | string;
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

export interface FootLinkProps {
    id: number;
    title: string;
    label: string;
    sublinks: SubLinkProps[] | []
}

export interface NavLinkProps {
    id: number
    title: string
    link: string
    element: JSX.Element
    icon: JSX.Element
}

export interface HeaderLinkProps {
    id: number;
    title: string;
    url: string;
}

export interface DashLayoutProps {
    children: React.ReactNode
}