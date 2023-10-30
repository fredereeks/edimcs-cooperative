import { edimcs_blackpeople } from '@/assets/images'
import { TextInput } from '@/components'
import Image from 'next/image'
import React from 'react'

export default function Profile() {
  return (
    <main className="flex flex-col">
      <section className="flex flex-col gap-4 sm:gap-10">
        <h2 className="text-lg sm:text-xl md:text-2xl">Account Settings</h2>
        <div className="flex flex-wrap gap-2 sm:gap-4">
          <label htmlFor="profileForm" className="cursor-pointer rounded-md text-thin text-xs text-slate-500  hover:text-primary border border-slate-300 hover:border-primary peer:checked/profile:border-primary py-2 px-4 sm:py-3 sm:px-6 w-max select-none">Personal Information</label>
          <label htmlFor="accountForm" className="cursor-pointer rounded-md text-thin text-xs text-slate-500  hover:text-primary border border-slate-300 hover:border-primary peer:checked:border-primary py-2 px-4 sm:py-3 sm:px-6 w-max select-none">Account Number</label>
        </div>
      </section>
      <input type="checkbox" name="profileForm" id="profileForm" className="hidden peer/profile" />
      <section className="flex flex-col pt-5 pb-10 peer-checked/profile:hidden">
        <div className="flex flex-col gap-6">
          <form action="" className="flex flex-col gap-4 p-4">
            <h4 className="text-xs text-slate-500 opacity-80">Your Profile Picture</h4>
            <div className="flex flex-wrap gap-4 md:gap-6">
              <label htmlFor="profilePicture" className="relative h-14 w-14 md:h-16 md:w-16 flex-shrink-0 rounded-full overflow-hidden cursor-pointer">
                <input type="file" name="" id="profilePicture" className="hidden" />
                <Image src={edimcs_blackpeople} alt="Mohammad Aturu" fill={true} className='object-cover' />
              </label>
              <div className="flex flex-col gap-1 w-max justify-center items-center">
                <div className="flex gap-4">
                  <button type="button" className="py-2 px-4 sm:px-6 bg-primary text-white text-xs rounded-md hover:bg-blue-600 cursor-pointer">Upload New</button>
                  <button type="button" className="py-2 px-4 sm:px-8 bg-slate-300/50 text-slate-700 text-xs rounded-md hover:bg-danger hover:text-white cursor-pointer">Delete Picture</button>
                </div>
                <p className="text-[.6rem] text-center text-slate-500">Your profile picture enables users recognize you on EDIMCS</p>
              </div>
            </div>
          </form>
          <form action="" className="w-10/12 scale-90 grid sm:grid-cols-2 gap-4 sm:gap-y-6 justify-center relative after:bg-slate-300 after:-top-4 after:h-[.51px] after:w-11/12 after:left-1/2 after:-translate-x-1/2 after:absolute">
            <TextInput key={6274} id='member-id' name='member-id' label='Your Member ID' disabled={true} value={'EDIMCS-18340'} minLength={3} required={true} containerClassName={'text-xs sm:col-span-2'} className='bg-slate-200 cursor-not-allowed' />
            <TextInput key={6274} id='firstname' name='firstname' label='First Name' value={'Abubakar'} minLength={3} required={true} containerClassName={'text-xs'} />
            <TextInput key={6274} id='lastname' name='lastname' label='Last Name' value={'Mutari'} minLength={3} required={true} containerClassName={'text-xs'} />
            <TextInput key={6274} id='email' name='email' label='Email' value={'abumutari@gmail.com'} minLength={3} required={true} containerClassName={'text-xs'} />
            <TextInput key={6274} id='phone' name='phone' label='Phone Number' value={'08141941985'} minLength={11} required={true} containerClassName={'text-xs'} />
            <TextInput key={6274} id='address' name='address' label='Address' value={'6, Sirakoro Street, Adjecent Kilimanjaro Eatery, Wuse II'} minLength={3} required={true} containerClassName={'text-xs sm:col-span-2'} />
            <button type='submit' className="cursor-pointer rounded-md text-thin text-xs text-white bg-primary hover:bg-blue-600 py-2 px-4 sm:py-3 sm:px-6 w-max select-none">Update Profile</button>

          </form>

        </div>
      </section>
    </main>
  )
}
