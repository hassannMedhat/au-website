import '../styles/globals.css'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Head from 'next/head'

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        <title>Arab Universe</title>
        <link rel="shortcut icon" href="/images/AU_Logo.png" type="image/png" />
      </Head>
      <body className="bg-gray-100 text-gray-900">
        <Navbar />
        <main className="container mx-auto p-4">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
