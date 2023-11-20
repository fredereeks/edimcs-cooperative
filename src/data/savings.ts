import { SavingsProps } from "@/types"
import { memberData } from "."

export const savingsData: SavingsProps[] | [] = [
  {
    id: '1803434',
    amount: 450000,
    saverId: 8921142,
    saver: memberData.find(el => el.id === 8921142),
    status: 'Pending',
    createdAt: "01/04/2023",
    updatedAt: "01/04/2023",
  },
  {
    id: '1803435',
    amount: 330000,
    saverId: 8921144,
    saver: memberData.find(el => el.id === 8921144),
    status: 'Approved',
    createdAt: "09/04/2023",
    updatedAt: "09/04/2023",
  },
  {
    id: '1803436',
    amount: 65500,
    saverId: 8921143,
    saver: memberData.find(el => el.id === 8921143),
    status: 'Pending',
    createdAt: "26/01/2023",
    updatedAt: "26/01/2023",
  },
  {
    id: '1803437',
    amount: 172500,
    saverId: 8921140,
    saver: memberData.find(el => el.id === 8921140),
    status: 'Approved',
    createdAt: "11/08/2023",
    updatedAt: "11/08/2023",
  },
  {
    id: '1803441',
    amount: 90660,
    saverId: 8921141,
    saver: memberData.find(el => el.id === 8921141),
    status: 'Pending',
    createdAt: "03/11/2023",
    updatedAt: "03/11/2023",
  },
  {
    id: '1803442',
    amount: 180500,
    saverId: 8921142,
    saver: memberData.find(el => el.id === 8921142),
    status: 'Approved',
    createdAt: "18/07/2023",
    updatedAt: "18/07/2023",
  },
  {
    id: '1803443',
    amount: 75500,
    saverId: 8921144,
    saver: memberData.find(el => el.id === 8921144),
    status: 'Approved',
    createdAt: "18/06/2023",
    updatedAt: "18/06/2023",
  },
  {
    id: '1803444',
    amount: 5029462,
    saverId: 8921140,
    saver: memberData.find(el => el.id === 8921140),
    status: 'Approved',
    createdAt: "18/05/2023",
    updatedAt: "18/05/2023",
  },
  {
    id: '180345',
    amount: 5029462,
    saverId: 8921140,
    saver: memberData.find(el => el.id === 8921140),
    status: 'Rejected',
    createdAt: "11/08/2023",
    updatedAt: "11/08/2023",
  },{
    id: '1803446',
    amount: 724024,
    saverId: 8921143,
    saver: memberData.find(el => el.id === 8921143),
    status: 'Pending',
    createdAt: "26/01/2023",
    updatedAt: "26/01/2023",
  },
]