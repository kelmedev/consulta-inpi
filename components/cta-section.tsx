"use client"

import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export function CTASection() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 text-center relative z-10 bg-blue-900/30 backdrop-blur-sm">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-4xl sm:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
          Não perca tempo! Registre sua marca agora
        </h2>
        <p className="text-xl mb-8 text-blue-200">
          Você já fez a busca, mas lembre-se: mais de 500 marcas são registradas por dia no Brasil. Uma delas pode ser
          semelhante à sua. Proteja seu negócio agora mesmo!
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            size="lg"
            className="cta-button bg-gradient-to-r from-blue-400 to-blue-600 hover:from-blue-500 hover:to-blue-700 text-white text-lg px-8 py-4 w-full sm:w-auto relative overflow-hidden group animate-pulse"
          >
            <span className="relative z-10 flex items-center justify-center">
              Registrar Minha Marca <ArrowRight className="ml-2 h-5 w-5" />
            </span>
            <span className="absolute inset-0 overflow-hidden">
              <span className="cta-highlight" />
            </span>
          </Button>
          <p className="text-blue-300 text-sm">Garanta a proteção da sua marca antes que seja tarde!</p>
        </div>
      </div>
      <style jsx>{`
        .cta-highlight {
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(59, 130, 246, 0.3),
            transparent
          );
          animation: highlight 3s linear infinite;
        }

        @keyframes highlight {
          0% {
            left: -100%;
          }
          100% {
            left: 100%;
          }
        }
      `}</style>
    </section>
  )
}

