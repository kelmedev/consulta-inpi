import type React from "react"
import "./globals.css"
import { Inter } from "next/font/google"
import "@/styles/reset.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: import('next').Metadata = {
  title: "Consulta INPI - PPPI",
  description: "Consulta INPI",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-br">
      <body className={inter.className}>{children}</body>
    </html>
  )
}