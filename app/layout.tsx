import './globals.css'
import { ReactNode } from 'react'
import Navbar from '@/components/layout/Navbar'
import Providers from '@/components/Providers'

export const metadata = {
  title: 'GDSC Blog',
  description: 'Blog platform for GDSC recruitment task'
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50 text-gray-900">
        <Providers>
          <Navbar />
          <main className="max-w-4xl mx-auto p-4">{children}</main>
        </Providers>
      </body>
    </html>
  )
}

