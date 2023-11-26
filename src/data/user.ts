import { edimcs_piggyvest } from "@/assets/images";
import { MemberProps } from "@/types";

export const user: MemberProps = {
  id: "8921144",
  image: edimcs_piggyvest,
  firstname: "Kevin",
  middlename: 'Ojonugwa',
  lastname: "Gambari",
  accountDetails: [
    {
      id: '1823498',
      banker: 'Sterling Bank Plc',
      type: "Savings",
      accountName: "Kevin Ojonugwa Gambari",
      accountNo: "0828709734",
    }
  ],
  type: "Admin",
  status: "Active",
  memberId: 709734,
  phone: "+234808709734",
  address: '32, Opposite Living Faith, Paso II, Gwagwalada',
  email: "Kevin@gmail.com",
  createdAt: "28/10/2023",
  savings: 19800,
  deposits: 70500,
  withdrawal: 12000,
  balance: 91300
}