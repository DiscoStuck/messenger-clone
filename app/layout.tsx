import ToasterContext from './context/ToasterContext'
import './globals.css'
import { Inter } from 'next/font/google'

export const metadata = {
  title: 'Messenger Clone',
  description: 'Messenger',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body >
        <ToasterContext />
        {children}
      </body>
    </html>
  )
}
