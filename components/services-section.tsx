"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Shield, Eye, Users, BarChart } from "lucide-react"

const services = [
  {
    icon: Shield,
    title: "Proteção de Marca Digital",
    description: "Monitoramento avançado e proteção contra uso não autorizado da sua marca no ambiente digital.",
  },
  {
    icon: Eye,
    title: "Vigilância Cibernética",
    description: "Detecção precoce de ameaças e vulnerabilidades em tempo real para prevenir ataques cibernéticos.",
  },
  {
    icon: Users,
    title: "Consultoria em Segurança Digital",
    description: "Orientação especializada para fortalecer sua presença online e proteger seus ativos digitais.",
  },
  {
    icon: BarChart,
    title: "Análise de Risco Digital",
    description: "Avaliação abrangente dos riscos cibernéticos e estratégias personalizadas de mitigação.",
  },
]

export function ServicesSection() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], ["50%", "-50%"])

  return (
    <section ref={ref} className="py-24 relative overflow-hidden">
    
      <motion.div style={{ y }} className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
            Soluções Avançadas em Segurança Digital
          </h2>
          <p className="text-xl text-blue-200 max-w-3xl mx-auto">
            Proteja sua marca e ativos digitais com nossa tecnologia de ponta. Oferecemos soluções integradas para
            enfrentar as ameaças cibernéticas modernas.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-blue-600/20 to-blue-900/20 rounded-xl blur-xl group-hover:blur-2xl transition-all duration-300 opacity-0 group-hover:opacity-100" />
              <div className="relative bg-blue-950/50 p-6 rounded-xl border border-blue-500/20 backdrop-blur-sm hover:border-blue-500/40 transition-colors duration-300">
                <service.icon className="w-12 h-12 text-blue-400 mb-4 group-hover:text-blue-300 transition-colors duration-300" />
                <h3 className="text-xl font-semibold mb-2 text-blue-100 group-hover:text-blue-50 transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-blue-300 group-hover:text-blue-200 transition-colors duration-300">
                  {service.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}

