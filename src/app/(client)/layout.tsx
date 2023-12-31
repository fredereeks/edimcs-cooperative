// import type { Metadata } from 'next'
import { Mulish } from 'next/font/google'
import '../globals.css'
import { AosProvider, Footer, Header } from '@/components'
import { Toaster } from 'react-hot-toast'
import { Provider } from '@/provider'
import { EdgeStoreProvider } from '@/lib/edgestore'

const mulish = Mulish({ weight: ["200", "300", "400", "500", "600", "700", "800", "900"], subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${mulish.className} flex flex-col`}>
        <Provider>
          <Toaster />
          <Header />
          <AosProvider>
            <EdgeStoreProvider>
              <>
                {children}
              </>
            </EdgeStoreProvider>
          </AosProvider>
          <Footer />
        </Provider>
      </body>
    </html>
  )
}
