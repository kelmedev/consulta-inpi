"use client"

import { motion } from "framer-motion"
import { CTAButton } from "@/components/cta-button"

export function CallToAction() {
  return (
    <section className="py-24 px-4 bg-blue-900/30">
      <div className="max-w-4xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-3xl sm:text-4xl font-bold mb-8 bg-gradient-to-r from-blue-300 to-cyan-200 bg-clip-text text-transparent"
        >
          Pronto para proteger sua marca?
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
          className="text-xl text-blue-200 mb-12 max-w-2xl mx-auto"
        >
          Comece agora com 2 análises gratuitas e dê o primeiro passo para garantir a segurança da sua marca.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <CTAButton
            variant="primary"
            size="lg"
            onClick={() => document.getElementById("trademark-analysis-tool")?.scrollIntoView({ behavior: "smooth" })}
            className="px-8 py-4 text-lg"
          >
            Analisar Minha Marca Gratuitamente
          </CTAButton>
        </motion.div>
      </div>
    </section>
  )
}

