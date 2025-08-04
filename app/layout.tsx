import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'online movie',
  description: 'Created with v0',
  generator: 'v0.dev',
    icons: {
    icon: '/favicon.ico', // Path to your logo or favicon
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
