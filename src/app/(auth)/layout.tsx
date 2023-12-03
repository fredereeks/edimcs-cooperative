import { Inter } from 'next/font/google'
import '../globals.css'
import "tw-elements/dist/css/tw-elements.min.css";
import 'aos/dist/aos.css';

import DashLayout from '@/app/(auth)/ui/DashLayout'
import { authOptions } from '@/lib/authOptions';
import { redirect } from 'next/navigation'
// import SessionProvider from "@/components/SessionProvider"
import { getServerSession } from 'next-auth'



const inter = Inter({ subsets: ['latin'] })




export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const session = await getServerSession(authOptions);
  // console.log({session, user: session?.user, authOptions})

  if(!session || !session.user){
    redirect("/auth/login")
  }

  return (
    <html lang="en" data-theme="winter">
      <body className={`${inter.className} flex flex-col`}>
        {/* <SessionProvider session={session}> */}
          <DashLayout>
            {children}
          </DashLayout>
        {/* </SessionProvider> */}
      </body>
    </html>
  )
}
