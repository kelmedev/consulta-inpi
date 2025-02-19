"use client"
import { Search, CheckCircle, Shield, Zap } from "lucide-react"

const features = [
  {
    icon: Search,
    title: "Busca Abrangente",
    description: "Pesquisa em extensos bancos de dados de marcas registradas.",
  },
  {
    icon: CheckCircle,
    title: "Análise de Viabilidade",
    description: "Avaliação baseada em ISO, manual do INPI e lei de propriedade industrial.",
  },
  {
    icon: Shield,
    title: "Conformidade Legal",
    description: "Garante que sua marca atenda aos requisitos legais para registro.",
  },
  {
    icon: Zap,
    title: "Resultados Rápidos",
    description: "Obtenha uma análise completa em questão de segundos.",
  },
]

const featureVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
    },
  }),
}

export function FeaturesList() {
  return (
    <section className="py-24 px-4 bg-gradient-to-b from-blue-900/30 to-transparent">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold mb-16 text-center bg-gradient-to-r from-[#8AB4F8] to-[#C2E7FF] bg-clip-text text-transparent">
          Recursos Poderosos para Análise de Marca
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="bg-blue-900/30 border border-blue-500/20 rounded-xl p-8 hover:border-blue-500/40 transition-all duration-300 flex flex-col items-center text-center"
            >
              <feature.icon className="w-16 h-16 text-blue-400 mb-6" />
              <h3 className="text-xl font-semibold mb-4 text-blue-100">{feature.title}</h3>
              <p className="text-blue-300">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

