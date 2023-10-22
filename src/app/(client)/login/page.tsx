import { TextInput } from '@/components'
import Link from 'next/link'
import React from 'react'
import { FaMoneyCheck } from 'react-icons/fa'

const handleLogin = async(data: FormData) => {
  "use server"
  try{
    const username = data.get("username")?.valueOf();
    const password = data.get("password")?.valueOf();
    console.log({username, password})
    return{
      error: false,
      message: `Welcome back ${username}, so glad to have you back`
    }
  }catch(err){
    return{
      error: true,
      message: "Something went wrong, please, try again"
    }
  }finally{

  }
  return null;
}

export default function page() {
  return (
    <main className="flex flex-col relative">
      {/* <Image src={edimcs_cliff} alt='Edimcs Money Calculator Image' fill={true} className="overlay left-0 top-0 object-cover" /> */}
      <section className="shadow-lg shadow-slate-950 flex flex-col relative before:hidden md:before:flex before-overlay before:bg-neutral-50 after-overlay  after:bg-white after:left-1/2 px-4 ">

        <div className="container mx-auto flex flex-col-reverse md:flex-row relative z-10">
          <aside className="py-5 sm:py-20 flex flex-col justify-center flex-1 realtive overflow-hidden">
            <div className="max-w-md mx-auto w-full flex flex-col justify-center py-5 sm:px-5">
              <form action={handleLogin} className="py-5 flex flex-col gap-3">
                <div className="flex flex-col gap-2">
                  <TextInput label={'Member ID'} containerClassName={'text-slate-400'} key={823406} type='text' name='username' id='username' placeholder='Enter Member ID' required={true} />
                  <TextInput label={'Password'} containerClassName={'text-slate-400'} key={823407} type='password' name='password' id='password' placeholder='Enter Password' required={true} />
                </div>
                <button type="submit" className="rounded-full py-2 px-5 md:px-8 w-max bg-primary text-white text-sm text-center flex-1 cursor-pointer flex items-center gap-2 mt-2"><FaMoneyCheck className="text-sm text-inherit" />Login</button>
              </form>
              <Link download={'EDIMCS_APPLICATION_FORM-edimcs.com'} href={"/documents/EDIMCS-LOAN-APPLICATION-FORM.pdf"} className="text-center cursor-pointer mx-auto z-20 relative before:absolute before:w-1/6 before:top-1/2 before:-translate-y-1/2 before:right-full before:h-[1px] before:bg-slate-300 before:rounded-md before:z-10  after:absolute after:w-1/6 after:top-1/2 after:-translate-y-1/2 after:left-full after:h-[1px] after:bg-slate-300 after:rounded-md after:z-10 w-max bg-neutral-50 py-2 px-3 text-sm text-slate-400">Download the Member Account Form</Link>
            </div>
          </aside>
          <aside className="py-20 md:pt-36 p-5 flex flex-col gap-4 flex-1 bg-primary/50">
            <h3 className="text-slate-50 text-4xl sm:text-5xl md:text-6xl leading-tight font-bold max-w-md sm:max-w-xl">Welcome Back <span className="text-primary">Esteem</span> Member<span className="text-red-500">.</span></h3>
            <p className="text-slate-50 text-sm leading-loose max-w-lg">.</p>
          </aside>
        </div>
      </section>
      <section className="py-20 bg-slate-100 px-4 relative z-50">

      </section>
    </main>
  )
}