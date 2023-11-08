import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../globals.css'
import DashLayout from '@/app/(auth)/components/DashLayout'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
// import { UserProvider } from '@auth0/nextjs-auth0/client';



const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'EDIMCS :: Dashboard',
  description: "EDIMCS stands for Enlightenment Drive Initiative Co-operative Society. We are the largest cooperative organization among cooperatives in Nigeria and in the world; with the goal of achieving a first-world Nigeria with empowerment and housing for low-income and small and medium enterprises as our primary goal",
  viewport: "width=device-width, initial-scale=1.0"
}



export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  if (!cookies().has("x-access-token") && cookies().get("x-access-token") != null) {
    const user = cookies()?.get("x-access-token");
    console.log("Checking cookies or redirect", { user, cookie: cookies().get("x-access-token") })
    redirect("/login")
  }
  else {
    const user = cookies()?.get("x-access-token");
    // console.log({hasCookiesInAuthElse: cookies().has("x-access-token")})
  }

  return (
    <html lang="en">
      {/* <UserProvider> */}
        <body className={`${inter.className} flex flex-col`}>
          <DashLayout>
            {children}
          </DashLayout>
        </body>
      {/* </UserProvider> */}
    </html>
  )
}
