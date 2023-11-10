import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../globals.css'
import { AosProvider, Footer, Header } from '@/components'
import { Toaster } from 'react-hot-toast'
// import { Provider } from '@/components/Provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'EDIMCS :: Cooperative Society',
  description: "EDIMCS stands for Enlightenment Drive Initiative Co-operative Society. We are the largest cooperative organization among cooperatives in Nigeria and in the world; with the goal of achieving a first-world Nigeria with empowerment and housing for low-income and small and medium enterprises as our primary goal",
  viewport: "width=device-width, initial-scale=1.0"
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} flex flex-col`}>
        {/* <Provider> */}
          <Toaster />
          <Header />
          <AosProvider>
            <>
              {children}
            </>
          </AosProvider>
          <Footer />
        {/* </Provider> */}
      </body>
    </html>
  )
}
