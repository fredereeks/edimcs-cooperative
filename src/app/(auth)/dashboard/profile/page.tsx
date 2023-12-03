import { edimcs_blackpeople, edimcs_moneybox, edimcs_piggyvest } from '@/assets/images'
import { TextInput } from '@/components'
import { user } from '@/data';
import { authOptions } from '@/lib/authOptions';
import prisma from '@/lib/prisma';
import { AccountDetailsProps } from '@/types';
import { getServerSession } from 'next-auth';
import { signOut } from 'next-auth/react';
import Image from 'next/image'
import { redirect } from 'next/navigation';
import React from 'react'


const fetchUser = async(email: string) => {
  const member = await prisma.member.findUnique({
    where: { email }
  })
  if(!member) {
    signOut()
    redirect("/auth/signin");
  }
  return member 
}

export default async function Profile() {
  const session = await getServerSession(authOptions)
  const member = await fetchUser(session?.user?.email as string)
  
  // const accountDetails: AccountDetailsProps[] = member?.loanRating ? member.loanRating : [{
  const accountDetails: AccountDetailsProps[] =  [{
    accountName: 'Not Set',
    accountNo: '00000000',
    accountOwner: 'An Important Member',
    banker: 'Sterling Bank Plc',
    id: '823498234',
    type: 'Savings',
  }]

  return (
    <main className="flex flex-col px-2">
      <section className="flex flex-col gap-4 sm:gap-10">
        {/* <h2 className="text-lg sm:text-xl md:text-2xl">Account Settings</h2> */}
        <div className="flex flex-wrap gap-2 sm:gap-4">
          <label htmlFor="profileForm" className="cursor-pointer rounded-md text-thin text-xs text-slate-500  hover:text-primary dark:text-slate-400 dark:hover:border-slate-400 border border-slate-300 hover:border-primary peer-checked/profile:border-primary py-2 px-4 sm:py-3 sm:px-6 w-max select-none">Personal Information</label>
          <label htmlFor="accountForm" className="cursor-pointer rounded-md text-thin text-xs text-slate-500  hover:text-primary dark:text-slate-400 dark:hover:border-slate-400 border border-slate-300 hover:border-primary peer-checked/account:border-primary py-2 px-4 sm:py-3 sm:px-6 w-max select-none">Account Details</label>
        </div>
      </section>
      <input type="radio" defaultChecked name="form-peer" id="profileForm" className="hidden peer/profile" />
      <input type="radio" name="form-peer" id="accountForm" className="hidden peer/account" />
      <section className="hidden peer/account:hidden flex-col pt-5 pb-10 peer-checked/profile:flex">
        <div className="flex flex-col gap-6">
          <form action="" className="flex flex-col gap-4 p-4">
            <h4 className="text-xs text-slate-500 opacity-80">Your Profile Picture</h4>
            <div className="flex gap-4 md:gap-6">
              <label htmlFor="profilePicture" className="relative h-14 w-14 md:h-16 md:w-16 flex-shrink-0 rounded-full overflow-hidden cursor-pointer">
                <input type="file" name="" id="profilePicture" className="hidden" />
                <Image src={user?.image || edimcs_moneybox} alt={`${user?.firstname} ${user?.middlename} ${user?.lastname}`} fill={true} className='object-cover' />
              </label>
              <div className="flex flex-col gap-1 w-max justify-center sm:items-center">
                <div className="flex gap-4">
                  <button type="button" className="py-2 px-4 sm:px-8 bg-primary text-white text-[.6rem] text-xs rounded-md hover:bg-blue-600 cursor-pointer">Upload New</button>
                  <button type="button" className="py-2 px-4 sm:px-8 bg-slate-300/50 dark:bg-slate-100 dark:hover:text-slate-900 text-slate-700 text-[.6rem] text-xs rounded-md hover:bg-danger hover:text-white cursor-pointer">Delete Picture</button>
                </div>
                <p className="text-[.6rem] text-center text-slate-500">Your profile picture enables users recognize you on EDIMCS</p>
              </div>
            </div>
          </form>
          <form action="" className="px-4 sm:px-0 w-full sm:w-10/12 sm:scale-90 grid sm:grid-cols-2 gap-4 sm:gap-y-6 sm:justify-center relative after:bg-slate-300 after:-top-4 after:h-[.51px] after:w-11/12 after:left-1/2 after:-translate-x-1/2 after:absolute">
            <TextInput key={6274} id='member-id' name='member-id' label='Your Member ID' disabled={true} value={user?.id} minLength={3} required={true} containerClassName={'text-xs sm:col-span-2'} className='bg-slate-200 cursor-not-allowed' />
            <TextInput key={6275} id='firstname' name='firstname' label='First Name' value={user?.firstname} minLength={3} required={true} containerClassName={'text-xs'} />
            <TextInput key={6275} id='middlename' name='middlename' label='Middle Name' value={user?.middlename} minLength={3} required={false} containerClassName={'text-xs'} />
            <TextInput key={6276} id='lastname' name='lastname' label='Last Name' value={user?.lastname} minLength={3} required={true} containerClassName={'text-xs'} />
            <TextInput key={6277} id='email' name='email' label='Email' value={user?.email} minLength={3} required={true} containerClassName={'text-xs'} />
            <TextInput key={6278} id='phone' name='phone' label='Phone Number' value={user?.phone} minLength={11} required={true} containerClassName={'text-xs'} />
            <TextInput key={6279} id='address' name='address' label='Address' value={user?.address} minLength={3} required={true} containerClassName={'text-xs'} />
            <TextInput key={6267} id='conf-password' name='password' label='Confirm Password' placeholder={'Enter Password to Confirm Changes'} minLength={3} required={true} containerClassName={'text-xs sm:col-span-2'} />
            <button type='submit' className="cursor-pointer rounded-md text-thin text-xs text-white bg-primary hover:bg-blue-600 py-2 px-4 sm:py-3 sm:px-6 w-max select-none">Update Profile</button>
          </form>

        </div>
      </section>
      <section className="hidden peer/profile:hidden flex-col pt-5 pb-10 peer-checked/account:flex">
        <div className="flex flex-col gap-6">
          <aside className="flex flex-col gap-4 p-4">
            <h4 className="text-xs text-slate-500 opacity-80">Your Account Details</h4>
            <div className="flex gap-4 md:gap-6">
              <div className="relative h-14 w-14 md:h-16 md:w-16 flex-shrink-0 rounded-full overflow-hidden cursor-pointer">
                <Image src={user?.image || edimcs_piggyvest} alt={`${user?.firstname} ${user?.middlename} ${user?.lastname}`} fill={true} className='object-cover' />
              </div>
              <div className="flex flex-col gap-1 w-max justify-center">
                <div className="flex flex-col">
                <h3 className="text-sm text-primary">{accountDetails[0]?.accountName}</h3>
                <p className="text-[.6rem] text-slate-500">{accountDetails[0]?.banker}</p>
                <p className="text-xs text-slate-500 font-semibold">{accountDetails[0]?.accountNo}</p>
                </div>
              </div>
            </div>
          </aside>
          <form action="" className="px-4 sm:px-0 w-full sm:w-10/12 sm:scale-90 grid sm:grid-cols-2 gap-4 sm:gap-y-6 sm:justify-center relative after:bg-slate-300 after:-top-4 after:h-[.51px] after:w-11/12 after:left-1/2 after:-translate-x-1/2 after:absolute">
            <TextInput key={6264} id='account-name' name='account-name' label='Account Name' value={accountDetails[0]?.accountName} minLength={11} required={true} containerClassName={'text-xs sm:col-span-2'} />
            <TextInput key={6265} id='banker' name='banker' label='Bank Name' value={accountDetails[0]?.banker} minLength={10} required={true} containerClassName={'text-xs'} />
            <TextInput key={6266} id='account-no' name='account-no' label='Account Number' value={accountDetails[0]?.accountNo} minLength={10} required={true} containerClassName={'text-xs'} />
            <TextInput key={6267} id='password' name='password' label='Confirm Password' placeholder={'Enter Password to Confirm Changes'} minLength={3} required={true} containerClassName={'text-xs sm:col-span-2'} />
            {/* <TextInput key={6268} id='address' name='address' label='Address' value={user?.'6, Sirakoro Street, Adjecent Kilimanjaro Eatery, Wuse II'} minLength={3} required={true} containerClassName={'text-xs sm:col-span-2'} /> */}
            <button type='submit' className="cursor-pointer rounded-md text-thin text-xs text-white bg-primary hover:bg-blue-600 py-2 px-4 sm:py-3 sm:px-6 w-max select-none">Update Account Details</button>

          </form>

        </div>
      </section>
    </main>
  )
}
