import { edimcs_blackpeople, edimcs_calculator, edimcs_coins, edimcs_coinstack, edimcs_gathering } from '@/assets/images'
import { user } from '@/data/user'
import { LoanProps } from '@/types'
import Image, { StaticImageData } from 'next/image'
import React from 'react'
import { FaClock } from 'react-icons/fa'
import { IoClose } from 'react-icons/io5'



export default function page() {

  const loanData: LoanProps[] = [
    {
      id: 73495340,
      image: edimcs_coins,
      name: "Amaka Orlando",
      type: "Pay In",
      amount: 2000,
      date: "12:40pm",
      balance: 80000
    },
    {
      id: 73495341,
      image: edimcs_calculator,
      name: "Abubakar Suleiman",
      type: "Pay Out",
      amount: 250000,
      date: "08:37am",
      balance: 232200
    },
    {
      id: 73495342,
      image: edimcs_blackpeople,
      name: "Oloruntoba Samuel",
      type: "Pay Out",
      amount: 32000,
      date: "08:37am",
      balance: 51500
    },
    {
      id: 73495343,
      image: edimcs_gathering,
      name: "Benjamin Bright",
      type: "Pay In",
      amount: 22000,
      date: "11:51am",
      balance: 78000
    },
    {
      id: 73495344,
      image: edimcs_coinstack,
      name: "Benjamin Bright",
      type: "Pay Out",
      amount: 12000,
      date: "12:30pm",
      balance: 120000
    },
  ]

  return (
    <main className="flex flex-col gap-4 px-2 sm:px-0 pt-5 pb-10">
      <section className="relative flex flex-col gap-2 p-4 bg-white  dark:bg-[#dbf0f724] dark:shadow-black shadow-slate-200 shadow-md rounded-lg">
        <div className="w-full overflow-x-scroll pb-6 x-scrollbar">
          <table className="w-full text-slate-500 dark:text-slate-400 text-xs sm:text-sm min-w-[20rem]">
            <thead>
              <tr>
                <th colSpan={5}>
                  <div className='w-full flex justify-between items-center pb-2 mb-2 border-b border-b-slate-200'>
                    <h4 className="uppercase font-light text-slate-400 text-left">LOAN TRANSACTIONS</h4>
                    <label htmlFor='loan-form' className="text-white bg-primary px-4 py-2 rounded-md cursor-pointer text-xs font-light btn-primary">Apply for Loan</label>
                  </div>
                </th>
              </tr>
              <tr className='text-slate-400 py-2 border-b border-slate-200'>
                <th className='font-thin text-xs text-slate-400 text-left'>Member Details</th>
                <th className='font-thin text-xs text-slate-400 text-center'>Loan Amount</th>
                <th className='font-thin text-xs text-slate-400 text-center'>Loan Date</th>
                <th className='font-thin text-xs text-slate-400 text-center'>Balance at Date</th>
                <th className='font-thin text-xs text-slate-400 text-center'>Current Balance</th>
              </tr>
            </thead>
            <tbody className='w-full'>
              {
                loanData.map(loan => (
                  <tr key={loan.id}>
                    <td>
                      <div className="max-w-sm w-max flex items-center gap-2 cursor-pointer">
                        <div className="h-7 sm:h-8 w-7 sm:w-8 flex justify-center items-center rounded-full overflow-hidden relative bg-primary dark:bg-slate-600/50">
                          <Image src={loan.image} alt={loan.name} fill={true} className="absolute left-0 top-0 object-cover w-full h-full" />
                        </div>
                        <div>
                          <h5 className="text-xs font-medium leading-tight whitespace-nowrap">{loan.name}</h5>
                          <p className="text-xs font-thin opacity-70 leading-tight">{loan.type}</p>
                        </div>
                      </div>
                    </td>
                    <td className="align-middle">
                      <div className="flex justify-center items-center align-middle mx-auto whitespace-nowrap">
                        <div className={`${loan.type === "Pay Out" ? 'bg-red-100 text-red-500' : 'bg-sky-100 text-sky-500'} text-xs py-[.1rem] sm:py-1 px-3 rounded-sm font-medium`}>{loan.type === "Pay Out" ? '-' : ''}&#8358;{loan.amount.toLocaleString()}</div>
                      </div>
                    </td>
                    <td className="align-middle">
                      <div className="flex justify-center items-center gap-[.2rem] align-middle text-slate-400 text-xs py-[.1rem] sm:py-1">
                        <FaClock className="text-inherit mt-[.1rem]" /> <p className="">{loan.date}</p>
                      </div>
                    </td>
                    <td className="align-middle">
                      <h4 className="flex justify-center items-center gap-[.2rem] align-middle text-slate-400 text-xs py-[.1rem] sm:py-1">&#8358;{loan.balance.toLocaleString()}</h4>
                    </td>
                    <td className="align-middle">
                      <h4 className="flex justify-center items-center gap-[.2rem] align-middle text-slate-400 text-xs py-[.1rem] sm:py-1">&#8358;{loan.balance.toLocaleString()}</h4>
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
      </section>
      <input type="checkbox"  className="peer hidden" id="loan-form" />
      <form className="w-full max-w-3xl mx-auto rounded-md bg-white shadow-md flex flex-col relative peer-checked:max-h-[1000%] peer-checked:px-4 peer-checked:py-10 p-0 max-h-0 overflow-hidden">
        <label htmlFor='loan-form' className="cursor-pointer flex justify-center items-center absolute top-4 right-4 rounded-full h-6 w-6 bg-transparent hover:bg-slate-50"><IoClose className="text-slate-600 text-inherit" /></label>
        <div className="flex flex-col gap-2">
          <h2 className="text-default text-xl sm:text-2xl font-bold text-center">ENLIGHTENMENT DRIVE INITIATIVE MULTI-PURPOSE CO-OPERATIVE SOCIETY</h2>
          <h4 className="text-default text-sm sm:text-lg font-semibold text-center underline">LOAN APPLICATION FORM</h4>
          <p className="bg-default/90 max-w-xl mx-auto leading-loose rounded-md text-xs sm:text-sm text-slate-100 font-medium text-center p-2">NOTE: Application can be as much as twice your savings whereas the maximum loan grantable is subject to conditions in the cooperative society&apos;s bylaws interest rate per annum and the maximum repayment period allowed.</p>
          <article className="px-4 py-8 leading-loose text-sm text-justify">
            <p className='py-1 leading-loose'>
              I, <span className="border-b-2 border-default border-dotted">&nbsp;&nbsp; {user.lastname} {user.middlename} {user.firstname} &nbsp;&nbsp;</span> &nbsp;&nbsp;of&nbsp;&nbsp; <span className="border-b-2 border-default border-dotted">&nbsp;&nbsp; {user.address} &nbsp;&nbsp;</span>
            </p>
            <p className='py-1 leading-loose'>Apply for the sum of <span className="border-b-2 border-default border-dotted relative inline-block w-44 overflow-x-hidden">&nbsp;&nbsp;&#8358;<input type="number" placeholder={`Amount`} defaultValue={user.balance} max={user.balance * 2} className="outline-none absolute left-6 -bottom-1 w-full text-default bg-transparent" /></span> loan from EDIMCS limited for a repayment period of <span className="border-b-2 border-default border-dotted relative inline-block w-12 overflow-x-hidden">&nbsp;&nbsp;<input type="number" placeholder={`Amount`} defaultValue={6} min={1} max={12} maxLength={2} className="outline-none absolute left-6 -bottom-1 w-full text-default bg-transparent" /></span> Months and pledged prompt repayment of the loan through postdated cheques. I shall issue the agreed repayment plan made in favor of Enlightenment Drive Initiative Multi-Purpose Cooperative Society Limited (EDIMCS) between me and the Society until the loan plus interest is completely liquidated.</p>
            <p className='py-1 leading-loose'>Applicant&apos;s Place of Work: <span className="border-b-2 border-default border-dotted relative inline-block w-96 overflow-x-hidden">&nbsp;&nbsp;<input type="text" placeholder={`Enter your Current Place of Work`} className="outline-none absolute left-6 -bottom-1 w-full text-default bg-transparent" />&nbsp;&nbsp;</span></p>
            <p className='py-1 leading-loose'>Business: <span className="border-b-2 border-default border-dotted relative inline-block w-96 overflow-x-hidden">&nbsp;&nbsp;<input type="text" placeholder={`Enter your Current Place of Work`} className="outline-none absolute left-6 -bottom-1 w-full text-default bg-transparent" />&nbsp;&nbsp;</span></p>
            <p className='py-1 leading-loose'>NIN: <span className="border-b-2 border-default border-dotted relative inline-block w-[35%] overflow-x-hidden">&nbsp;&nbsp;<input type="number" max={10} placeholder={`Enter your 10-digits NIN`} className="outline-none absolute left-6 -bottom-1 w-full text-default bg-transparent" />&nbsp;&nbsp;</span> BVN: <span className="border-b-2 border-default border-dotted relative inline-block w-[35%] overflow-x-hidden">&nbsp;&nbsp;<input type="number" max={10} placeholder={`Enter your BVN Number`} className="outline-none absolute left-6 -bottom-1 w-full text-default bg-transparent" />&nbsp;&nbsp;</span></p>
            <p className='py-1 leading-loose'>Type of Loan: <span className="border-b-2 border-default border-dotted relative inline-block w-[35%] overflow-x-hidden">&nbsp;&nbsp;<input type="number" max={10} placeholder={`Enter your 10-digits NIN`} className="outline-none absolute left-6 -bottom-1 w-full text-default bg-transparent" />&nbsp;&nbsp;</span> Membership: <span className="border-b-2 border-default border-dotted relative inline-block w-[35%] overflow-x-hidden">&nbsp;&nbsp;<input type="number" max={10} placeholder={`Membership Number`} className="outline-none absolute left-6 -bottom-1 w-full text-default bg-transparent" />&nbsp;&nbsp;</span></p>
            <p className='py-1 leading-loose'>Phone Number of Applicant: <span className="border-b-2 border-default border-dotted relative inline-block w-[25%] overflow-x-hidden">&nbsp;&nbsp;<input type="number" max={15} placeholder={`Enter your Phone Number`} defaultValue={user.phone} className="outline-none absolute left-6 -bottom-1 w-full text-default bg-transparent" />&nbsp;&nbsp;</span> Email Address: <span className="border-b-2 border-default border-dotted relative inline-block w-[30%] overflow-x-hidden">&nbsp;&nbsp;<input type="email" placeholder={`Enter your Email Address`} defaultValue={user.email} className="outline-none absolute left-6 -bottom-1 w-full text-default bg-transparent" />&nbsp;&nbsp;</span></p>
            <h4 className="text-default text-sm sm:text-lg font-semibold underline pt-4">GUARANTORS</h4>
            <p className="py-1 leading-loose">(Guarantor contributions put together must be equal to what the applicant is taking as
              a loan in case of default).</p>
            <p className='py-1 leading-loose'>1. Guarantor Name: <span className="border-b-2 border-default border-dotted relative inline-block w-[30%] overflow-x-hidden">&nbsp;&nbsp;<input type="text" placeholder={`Name of Guarantor`} className="outline-none absolute left-6 -bottom-1 w-full text-default bg-transparent" />&nbsp;&nbsp;</span> Member ID No: <span className="border-b-2 border-default border-dotted relative inline-block w-[25%] overflow-x-hidden">&nbsp;&nbsp;<input type="text" placeholder={`Guarantor Member ID`} className="outline-none absolute left-6 -bottom-1 w-full text-default bg-transparent" />&nbsp;&nbsp;</span></p>
            <p className='py-1 leading-loose'>Address: <span className="border-b-2 border-default border-dotted relative inline-block w-[60%] overflow-x-hidden">&nbsp;&nbsp;<input type="text" placeholder={`Guarantor's Address`} className="outline-none absolute left-6 -bottom-1 w-full text-default bg-transparent" />&nbsp;&nbsp;</span></p>
            <p className='py-1 leading-loose'>Phone Number: <span className="border-b-2 border-default border-dotted relative inline-block w-[25%] overflow-x-hidden">&nbsp;&nbsp;<input type="text" placeholder={`Guarantor's Phone Number`} className="outline-none absolute left-6 -bottom-1 w-full text-default bg-transparent" />&nbsp;&nbsp;</span> Means of Identification: <span className="border-b-2 border-default border-dotted relative inline-block w-[25%] overflow-x-hidden">&nbsp;&nbsp;<input type="text" placeholder={`Guarantor's Means of Identification `} className="outline-none absolute left-6 -bottom-1 w-full text-default bg-transparent" />&nbsp;&nbsp;</span></p>
            <p className='py-1 leading-loose'>Account Name: <span className="border-b-2 border-default border-dotted relative inline-block w-[40%] overflow-x-hidden">&nbsp;&nbsp;<input type="text" placeholder={`Guarantor's Address`} className="outline-none absolute left-6 -bottom-1 w-full text-default bg-transparent" />&nbsp;&nbsp;</span></p>
            <p className='py-1 leading-loose'>Account Number: <span className="border-b-2 border-default border-dotted relative inline-block w-[25%] overflow-x-hidden">&nbsp;&nbsp;<input type="number" max={10} placeholder={`Guarantor's Phone Number`} className="outline-none absolute left-6 -bottom-1 w-full text-default bg-transparent" />&nbsp;&nbsp;</span> Bank: <span className="border-b-2 border-default border-dotted relative inline-block w-[25%] overflow-x-hidden">&nbsp;&nbsp;<input type="text" placeholder={`Guarantor's Bank Name`} className="outline-none absolute left-6 -bottom-1 w-full text-default bg-transparent" />&nbsp;&nbsp;</span></p>
            <p className='py-1 leading-loose'>BVN Number: <span className="border-b-2 border-default border-dotted relative inline-block w-[25%] overflow-x-hidden">&nbsp;&nbsp;<input type="text" max={10} placeholder={`Guarantor's BVN`} className="outline-none absolute left-6 -bottom-1 w-full text-default bg-transparent" />&nbsp;&nbsp;</span> NIN: <span className="border-b-2 border-default border-dotted relative inline-block w-[25%] overflow-x-hidden">&nbsp;&nbsp;<input type="text" max={10} placeholder={`Guarantor's NIN `} className="outline-none absolute left-6 -bottom-1 w-full text-default bg-transparent" />&nbsp;&nbsp;</span></p>
            <p className='py-1 leading-loose'>Signature: <span className="border-b-2 border-default border-dotted relative inline-block w-[25%] overflow-x-hidden">&nbsp;&nbsp;<input type="text" placeholder={`Guarantor's Signature`} className="outline-none absolute left-6 -bottom-1 w-full text-default bg-transparent" />&nbsp;&nbsp;</span> Date: <span className="border-b-2 border-default border-dotted relative inline-block w-[25%] overflow-x-hidden">&nbsp;&nbsp;<input type="date" placeholder={`Today's Date `} className="outline-none absolute left-6 -bottom-1 w-full text-default bg-transparent" />&nbsp;&nbsp;</span></p>
          </article>
          <button type='submit' className="cursor-pointer rounded-md ml-4 text-thin text-xs text-white bg-primary hover:bg-blue-600 py-2 px-4 sm:py-3 sm:px-6 w-max select-none">Submit Application</button>
        </div>
      </form>
    </main>
  )
}
