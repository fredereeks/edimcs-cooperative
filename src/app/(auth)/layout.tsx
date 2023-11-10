import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../globals.css'
import DashLayout from '@/app/(auth)/components/DashLayout'
import { redirect } from 'next/navigation'
// import {Provider} from "@/components/Provider"
// import { authOptions } from '../api/auth/(nextauth)/route'
// import { getServerSession } from 'next-auth'



const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'EDIMCS :: Dashboard',
  description: "EDIMCS stands for Enlightenment Drive Initiative Co-operative Society. We are the largest cooperative organization among cooperatives in Nigeria and in the world; with the goal of achieving a first-world Nigeria with empowerment and housing for low-income and small and medium enterprises as our primary goal",
  viewport: "width=device-width, initial-scale=1.0"
}



export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  // const session = await getServerSession(authOptions);
  // console.log({session, user: session?.user})

  // if(!session || !session.user){
  //   redirect("/auth/login")
  // }

  return (
    <html lang="en">
      <body className={`${inter.className} flex flex-col`}>
        {/* <Provider session={session}> */}
          <DashLayout>
            {children}
          </DashLayout>
        {/* </Provider> */}
      </body>
    </html>
  )
}
