"use client"

import { motion } from "framer-motion"

const steps = [
  {
    title: "Digite o Nome",
    description: "Insira o nome da marca que você deseja verificar em nossa ferramenta de busca.",
  },
  {
    title: "Realize a Busca",
    description: "Clique em 'Buscar' e nossa ferramenta irá consultar a base de dados do INPI.",
  },
  {
    title: "Analise os Resultados",
    description: "Receba um relatório detalhado sobre a disponibilidade e status da marca pesquisada.",
  },
  {
    title: "Tome Decisões Informadas",
    description: "Use as informações obtidas para decidir sobre o registro ou alterações na sua marca.",
  },
]

export function HowItWorks() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold mb-12 text-center bg-gradient-to-r from-blue-300 to-cyan-200 bg-clip-text text-transparent">
          Como Funciona
        </h2>
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-0.5 bg-blue-500/20 transform -translate-x-1/2"></div>

          {steps.map((step, index) => (
            <motion.div
              key={index}
              className="mb-8 flex items-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <div className={`flex items-center ${index % 2 === 0 ? "sm:flex-row-reverse" : ""} w-full`}>
                {/* Timeline dot */}
                <div className="absolute left-4 sm:left-1/2 w-8 h-8 bg-blue-600 rounded-full border-4 border-blue-950 transform -translate-x-1/2 flex items-center justify-center">
                  <span className="text-white font-bold">{index + 1}</span>
                </div>

                {/* Content */}
                <div
                  className={`bg-blue-950/50 p-6 rounded-xl border border-blue-500/20 backdrop-blur-sm w-full sm:w-[calc(50%-2rem)] ${index % 2 === 0 ? "sm:ml-auto" : "sm:mr-auto"}`}
                >
                  <h3 className="text-xl font-semibold mb-2 text-blue-100">{step.title}</h3>
                  <p className="text-blue-300">{step.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

