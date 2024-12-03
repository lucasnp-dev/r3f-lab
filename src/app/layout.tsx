import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
})
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
})

export const metadata: Metadata = {
  title: 'React Three Fiber Demos',
  description:
    'React Three Fiber Demos it´s a material of studies of React Three Fiber. Have a many examples of React Three Fiber inspired in contents´ internet.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="p-4 flex flex-col items-center min-h-screen">
          <header>
            <h1 className="text-lg font-medium">React Three Fiber Demos</h1>
          </header>
          <main className="flex-1 my-8">{children}</main>
          <footer>
            <p className="text-sm font-light">Made by Lucas Nunes.</p>
          </footer>
        </div>
      </body>
    </html>
  )
}
