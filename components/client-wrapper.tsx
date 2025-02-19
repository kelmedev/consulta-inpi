"use client"

import { useEffect, type ReactNode } from "react"

interface ClientWrapperProps {
  children: ReactNode
}

export function ClientWrapper({ children }: ClientWrapperProps) {
  useEffect(() => {
    const element = document.getElementById("main-content")
    console.log("Main content element:", element)
  }, [])

  return <>{children}</>
}

