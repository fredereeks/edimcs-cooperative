import { StaticImageData } from "next/image"

export type MemberProps = {
    id: number; image: StaticImageData; firstname: string; middlename: string; lastname: string; email: string; status: string; phone: string | number; type: string; account_name: string; account_number: number | string; banker: string; address: string; memberId: number; date: string; savings: number; investment: number; withdrawal: number; balance: number
  }