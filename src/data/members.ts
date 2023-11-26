import { edimcs_blackpeople, edimcs_calculator, edimcs_cliff, edimcs_phonecalculator, edimcs_piggyvest, edimcs_silhouette } from "@/assets/images"
import { MemberProps } from "@/types"

export const memberData: MemberProps[] | [] = [
    {
      id: "8921140",
      image: edimcs_blackpeople,
      firstname: "Abubakar",
      middlename: '',
      lastname: "Suleiman",
      accountDetails: [
        {
          id: '89211409',
          accountName: "Abubakar  Suleiman",
          accountNo: "Member",
          type: "Savings",
          banker: 'Sterling Bank Plc',
        }
      ],
      memberId: "EDIMCS-8950",
      address: '130, Sporting Estate, Lugbe',
      email: "Abubakar@gmail.com",
      phone: "+2340828208950",
      status: 'Active',
      createdAt: "26/01/2023",
      savings: 5400,
      deposits: 32500,
      withdrawal: 15100,
      balance: 37900
    },
    {
      id: "8921141",
      image: edimcs_silhouette,
      firstname: "Dorcas",
      middlename: 'Omoh',
      lastname: "Kilbane",
      accountDetails: [
        {
          id: '89211419',
          accountName: "Dorcas Omoh Kilbane",
          accountNo: "0828250701",
          type: "Savings",
          banker: 'Sterling Bank Plc',
        }
      ],
      type: "Admin",
      memberId: "EDIMCS-0701",
      phone: "+234808250701",
      address: '6, Sirakoro Street, Adjecent Kilimanjaro Eatery, Wuse II',
      email: "Dorcas@gmail.com",
      createdAt: "11/03/2023",
      savings: 41500,
      deposits: 551000,
      withdrawal: 250000,
      balance: 956100
    },
    {
      id: "8921142",
      image: edimcs_cliff,
      firstname: "Oloruntoba",
      middlename: 'Sunday',
      lastname: "Samuel",
      accountDetails: [
        {
          id: '89211429',
          accountName: "Oloruntoba Sunday Samuel",
          accountNo: "0828321290",
          type: "Savings",
          banker: 'Sterling Bank Plc',
        }
      ],
      type: "Member",
      memberId: "EDIMCS-1290",
      phone: "+234808321290",
      address: '10, Garki Extension, Garki',
      email: "Oloruntoba@gmail.com",
      createdAt: "05/05/2023",
      savings: 32200,
      deposits: 85100,
      withdrawal: 32000,
      balance: 117300
    },
    {
      id: "8921143",
      image: edimcs_phonecalculator,
      firstname: "Benjamin",
      middlename: '',
      lastname: "Bright",
      accountDetails: [
        {
          id: '89211439',
          accountName: "Benjamin  Bright",
          accountNo: "0828782369",
          type: "Savings",
          banker: 'Sterling Bank Plc',
        }
      ],
      type: "Member",
      memberId: "EDIMCS-2369",
      phone: "+234808782369",
      address: '18, New Layout, Lokogoma Estate, Lokogoma',
      email: "Benjamin@gmail.com",
      createdAt: "14/09/2023",
      savings: 22000,
      deposits: 35100,
      withdrawal: 21500,
      balance: 57100
    },
    {
      id: "8921144",
      image: edimcs_piggyvest,
      firstname: "Kevin",
      middlename: 'Ojonugwa',
      lastname: "Gambari",
      accountDetails: [
        {
          id: '89211449',
          accountName: "Kevin Ojonugwa Gambari",
          accountNo: "0828709734",
          type: "Savings",
          banker: 'Sterling Bank Plc',
        }
      ],
      type: "Admin",
      memberId: "EDIMCS-9734",
      phone: "+234808709734",
      address: '32, Opposite Living Faith, Paso II, Gwagwalada',
      email: "Kevin@gmail.com",
      createdAt: "28/10/2023",
      savings: 19800,
      deposits: 70500,
      withdrawal: 12000,
      balance: 91300
    },
    {
      id: "8921145",
      image: edimcs_calculator,
      firstname: "Linda",
      middlename: '',
      lastname: "Ikagwu",
      accountDetails: [
        {
          id: '89211459',
          accountName: "Linda  Ikagwu",
          accountNo: "0828709734",
          type: "Savings",
          banker: 'Sterling Bank Plc',
        }
      ],
      type: "Admin",
      memberId: "EDIMCS-9734",
      phone: "+234808709734",
      address: '42, Federal Medical Center, Dawaki',
      email: "Linda@gmail.com",
      createdAt: "28/10/2023",
      savings: 19800,
      deposits: 70500,
      withdrawal: 12000,
      balance: 91300
    },
  ]