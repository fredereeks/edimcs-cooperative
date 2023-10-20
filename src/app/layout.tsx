import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import {  Footer, Header } from '@/components'
import { Toaster } from 'react-hot-toast'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'EDIMCS :: Cooperative Society',
  description: "EDIMCS stands for Enlightenment Drive Initiative Co-operative Society. We are the largest cooperative organization among cooperatives in Nigeria and in the world; with the goal of achieving a first-world Nigeria with empowerment and housing for low-income and small and medium enterprises as our primary goal",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} flex flex-col`}>
        <Header />
        <Toaster />
        {/* <AosProvider> */}
          {children}
        {/* </AosProvider> */}
        <Footer />
      </body>
    </html>
  )
}
