"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown } from "lucide-react"

const faqs = [
  {
    question: "Como funciona a análise de viabilidade da marca?",
    answer:
      "Nossa ferramenta utiliza algoritmos avançados para comparar sua marca com um banco de dados abrangente de marcas registradas. Analisamos similaridades visuais, fonéticas e semânticas, além de considerar as diretrizes do INPI e a Lei de Propriedade Industrial do Brasil.",
  },
  {
    question: "Quanto tempo leva para receber os resultados da análise?",
    answer:
      "Os resultados são gerados em questão de segundos após a submissão da sua marca e descrição do produto/serviço. Nossa análise rápida permite que você tome decisões informadas rapidamente.",
  },
  {
    question: "A análise substitui a consulta a um advogado especializado?",
    answer:
      "Nossa ferramenta fornece uma análise preliminar valiosa, mas não substitui o aconselhamento jurídico profissional. Recomendamos usar nossos resultados como um ponto de partida e consultar um advogado especializado em propriedade intelectual para orientação específica.",
  },
  {
    question: "Como os créditos de análise funcionam?",
    answer:
      "Cada análise de marca consome um crédito. No plano gratuito, você recebe 2 créditos para testar nossa ferramenta. Os planos pagos oferecem mais créditos mensais ou análises ilimitadas, dependendo do nível escolhido.",
  },
  {
    question: "Posso usar os resultados da análise no processo de registro da minha marca?",
    answer:
      "Sim, você pode usar os resultados como parte da sua pesquisa prévia ao solicitar o registro da marca. No entanto, lembre-se de que o INPI realizará sua própria análise durante o processo de registro.",
  },
]

export function FAQ() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  return (
    <section className="py-24 px-4">
      <div className="max-w-3xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-3xl sm:text-4xl font-bold mb-16 text-center bg-gradient-to-r from-blue-300 to-cyan-200 bg-clip-text text-transparent"
        >
          Perguntas Frequentes
        </motion.h2>
        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-blue-950/50 border border-blue-500/20 rounded-lg overflow-hidden"
            >
              <button
                className="w-full p-6 text-left flex justify-between items-center text-blue-100 hover:bg-blue-900/50 transition-colors"
                onClick={() => setActiveIndex(activeIndex === index ? null : index)}
              >
                <span className="font-medium text-lg">{faq.question}</span>
                <ChevronDown
                  className={`w-6 h-6 transition-transform ${activeIndex === index ? "transform rotate-180" : ""}`}
                />
              </button>
              <AnimatePresence>
                {activeIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="px-6 pb-6"
                  >
                    <p className="text-blue-200">{faq.answer}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

