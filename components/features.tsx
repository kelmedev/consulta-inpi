"use client"

import { motion } from "framer-motion"
import { Search, Clock, Shield, Award } from "lucide-react"

const features = [
  {
    icon: Search,
    title: "Busca Abrangente",
    description: "Acesso a toda base de dados do INPI para uma verificação completa.",
  },
  {
    icon: Clock,
    title: "Resultados Rápidos",
    description: "Obtenha informações sobre sua marca em questão de segundos.",
  },
  {
    icon: Shield,
    title: "Proteção Preventiva",
    description: "Identifique possíveis conflitos antes de iniciar o processo de registro.",
  },
  {
    icon: Award,
    title: "Confiabilidade",
    description: "Dados atualizados e precisos diretamente da fonte oficial.",
  },
]

export function Features() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-4xl sm:text-5xl font-bold mb-16 text-center bg-gradient-to-r from-[#8AB4F8] to-[#C2E7FF] bg-clip-text text-transparent"
        >
          Por que usar nosso Buscador de Marcas?
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-[#1a1f3e]/50 backdrop-blur-sm border border-blue-500/20 rounded-xl p-6 hover:border-blue-500/40 transition-colors"
            >
              <feature.icon className="w-12 h-12 text-[#8AB4F8] mb-4" />
              <h3 className="text-xl font-semibold mb-3 text-white">{feature.title}</h3>
              <p className="text-gray-300">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

