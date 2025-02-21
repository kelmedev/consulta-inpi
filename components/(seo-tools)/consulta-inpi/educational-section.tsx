"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { EbookFormModal } from "@/components/(seo-tools)/consulta-inpi/ebook-form-modal"

export function EducationalSection() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
              Por que buscar sua marca é crucial?
            </h2>
            <div className="space-y-4 text-blue-100">
              <p>
                Antes de iniciar o processo de registro de uma marca, é fundamental realizar uma busca prévia. Esta
                etapa pode economizar tempo, dinheiro e evitar problemas legais futuros. Aqui estão algumas razões
                importantes:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Evita conflitos com marcas existentes</li>
                <li>Reduz o risco de indeferimento do pedido de registro</li>
                <li>Ajuda a identificar possíveis infrações à sua marca</li>
                <li>Fornece insights para estratégias de branding</li>
                <li>Economiza recursos ao prevenir processos legais</li>
              </ul>
              <p>
                Lembre-se: uma marca bem pesquisada é o primeiro passo para construir uma identidade forte e protegida
                no mercado.
              </p>
            </div>
          </div>
          <div className="bg-blue-900/50 p-8 rounded-xl border border-blue-500/20 backdrop-blur-sm">
            <h3 className="text-2xl font-semibold mb-4 text-blue-200">Baixe nosso Ebook Gratuito</h3>
            <p className="text-blue-300 mb-6">
              "Guia Completo: Como Proteger Sua Marca no Brasil" - Aprenda tudo sobre busca e registro de marcas,
              estratégias de proteção e como evitar armadilhas comuns.
            </p>
            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
              <DialogTrigger asChild>
                <Button className="cta-button bg-green-600 hover:bg-green-700 text-lg w-full">
                  <Download className="mr-2 h-5 w-5" /> Baixar Ebook Grátis
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-blue-950/95 border border-blue-500/20 backdrop-blur-sm">
                <DialogHeader>
                  <DialogTitle className="text-2xl font-bold text-blue-100">Baixe o Ebook Gratuito</DialogTitle>
                </DialogHeader>
                <EbookFormModal onClose={() => setIsModalOpen(false)} />
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </section>
  )
}

