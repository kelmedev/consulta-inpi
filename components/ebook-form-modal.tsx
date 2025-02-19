"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface EbookFormModalProps {
  onClose: () => void
}

export function EbookFormModal({ onClose }: EbookFormModalProps) {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the data to your server
    console.log("Submitted:", { name, email })
    // Close the modal and maybe show a success message
    onClose()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="name" className="text-blue-200">
          Nome
        </Label>
        <Input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="bg-blue-900/50 border-blue-500/30 text-blue-100 placeholder-blue-400/50 focus:border-blue-400 focus:ring-blue-400"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="email" className="text-blue-200">
          Email
        </Label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="bg-blue-900/50 border-blue-500/30 text-blue-100 placeholder-blue-400/50 focus:border-blue-400 focus:ring-blue-400"
        />
      </div>
      <Button
        type="submit"
        className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white font-semibold py-2 px-4 rounded-md transition duration-300 ease-in-out transform hover:scale-105"
      >
        Enviar e Baixar Ebook
      </Button>
      <p className="text-blue-300 text-sm text-center mt-4">
        Ao se inscrever, você concorda em receber atualizações sobre proteção de marcas e propriedade intelectual.
      </p>
    </form>
  )
}

