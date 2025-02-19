"use client"

import React from "react"

import { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { AlertTriangle, CheckCircle, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export function CopywritingSection() {
  const [step, setStep] = useState(0)
  const [isInView, setIsInView] = useState(false)
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setIsInView(entry.isIntersecting), { threshold: 0.5 })
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    let interval
    if (isInView) {
      interval = setInterval(() => {
        setStep((prevStep) => (prevStep + 1) % copyContent.length)
      }, 20000)
    }
    return () => clearInterval(interval)
  }, [isInView])

  const copyContent = [
    {
      title: "Você sabia que 70% das marcas enviadas ao INPI são negadas?",
      content:
        "Imagine investir tempo e dinheiro na criação da sua marca, apenas para descobrir que ela não pode ser registrada. Isso acontece com 7 em cada 10 empreendedores que tentam registrar suas marcas no INPI.",
      icon: AlertTriangle,
    },
    {
      title: "O custo de uma marca rejeitada vai além do financeiro",
      content:
        "Além das taxas perdidas, você enfrenta atrasos no lançamento do seu negócio, possíveis problemas legais e a necessidade de rebranding. Tudo isso pode custar muito mais do que você imagina, tanto em dinheiro quanto em oportunidades perdidas.",
      icon: AlertTriangle,
    },
    {
      title: "Existe uma solução: Análise prévia inteligente",
      content:
        "Nossa ferramenta de análise de marcas utiliza inteligência artificial para avaliar a viabilidade do seu registro antes mesmo de você submeter ao INPI. Com ela, você aumenta significativamente suas chances de aprovação, economizando tempo e dinheiro.",
      icon: CheckCircle,
    },
  ]

  return (
    <section ref={sectionRef} className="py-24 px-4 bg-gradient-to-b from-blue-900/30 to-blue-950/50">
      <div className="max-w-4xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl sm:text-4xl font-bold mb-12 text-center bg-gradient-to-r from-blue-300 to-cyan-200 bg-clip-text text-transparent"
        >
          Proteja sua marca desde o início
        </motion.h2>
        <div className="bg-blue-900/50 rounded-xl p-8 border border-blue-500/30 backdrop-blur-sm">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div className="flex items-start space-x-4">
                {React.createElement(copyContent[step].icon, { className: "w-8 h-8 text-blue-400 flex-shrink-0 mt-1" })}
                <div>
                  <h3 className="text-xl font-semibold text-blue-100 mb-2">{copyContent[step].title}</h3>
                  <p className="text-blue-200">{copyContent[step].content}</p>
                </div>
              </div>
              <div className="flex justify-between items-center pt-4">
                <div className="space-x-2">
                  {copyContent.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setStep(index)}
                      className={`w-3 h-3 rounded-full ${
                        index === step ? "bg-blue-400" : "bg-blue-700"
                      } transition-colors`}
                    />
                  ))}
                </div>
                {step < copyContent.length - 1 ? (
                  <Button onClick={() => setStep(step + 1)} variant="ghost" className="text-blue-300">
                    Próximo <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                ) : (
                  <Button
                    onClick={() => {
                      document.getElementById("trademark-analysis-tool")?.scrollIntoView({ behavior: "smooth" })
                    }}
                    variant="primary"
                    className="bg-blue-500 hover:bg-blue-600 text-white"
                  >
                    Analisar minha marca
                  </Button>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}

