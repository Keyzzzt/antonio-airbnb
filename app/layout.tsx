import { RegisterModal } from './components/MultiPurpose/Modals/RegisterModal/RegisterModal'
import { Navbar } from './components/Navbar/Navbar'
import './globals.css'
import { Nunito } from 'next/font/google'

const font = Nunito({ subsets: ['latin'] })

export const metadata = {
  title: 'Markee',
  description: 'New life to start...',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={font.className}>
        <RegisterModal  />
        <Navbar/>
        {children}</body>
    </html>
  )
}
