
import React from 'react'
import LoginForm from './LoginForm'

const handleLogin = async(formData: FormData) => {
  "use server"
  try{
    const username = formData.get("username")?.valueOf();
    const password = formData.get("password")?.valueOf();
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
  }
  return null;
}

export default function page() {
  return (
    <main className="flex flex-col relative">
      {/* <Image src={edimcs_cliff} alt='Edimcs Money Calculator Image' fill={true} className="overlay left-0 top-0 object-cover" /> */}
      <section className="shadow-lg shadow-slate-950 flex flex-col relative before:hidden md:before:flex before-overlay before:bg-neutral-50 after-overlay  after:bg-white after:left-1/2">

        <div className="container mx-auto flex flex-col-reverse md:flex-row relative z-10">
          <aside className="py-5 sm:py-20 flex flex-col justify-center flex-1 realtive overflow-hidden">
            <div className="max-w-md mx-auto w-full flex flex-col justify-center py-5 sm:px-5">
              <LoginForm key={8347704} handleLogin={handleLogin} />
            </div>
          </aside>
          <aside className="py-20 pt-36 p-5 flex flex-col gap-4 flex-1 bg-primary/50">
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
