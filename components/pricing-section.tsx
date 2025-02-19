"use client"

import { Check } from "lucide-react"
import { CTAButton } from "@/components/cta-button"

const pricingPlans = [
  {
    name: "Teste Grátis",
    price: "R$ 0",
    features: [
      "2 créditos de análise",
      "Acesso a todas as funcionalidades",
      "Resultados detalhados",
      "Suporte por email",
    ],
    cta: "Começar Agora",
    popular: false,
  },
  {
    name: "Profissional",
    price: "R$ 99/mês",
    features: [
      "50 créditos de análise por mês",
      "Acesso a todas as funcionalidades",
      "Resultados detalhados",
      "Suporte prioritário",
      "Relatórios exportáveis",
      "API de integração",
    ],
    cta: "Assinar Agora",
    popular: true,
  },
  {
    name: "Empresarial",
    price: "Personalizado",
    features: [
      "Créditos ilimitados",
      "Acesso a todas as funcionalidades",
      "Resultados detalhados",
      "Suporte dedicado 24/7",
      "Relatórios personalizados",
      "Treinamento e consultoria",
    ],
    cta: "Entre em Contato",
    popular: false,
  },
]

export function PricingSection() {
  return (
    <section className="py-24 px-4 bg-gradient-to-b from-transparent to-blue-900/30">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold mb-16 text-center bg-gradient-to-r from-blue-300 to-cyan-200 bg-clip-text text-transparent">
          Escolha o Plano Ideal para Você
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pricingPlans.map((plan, index) => (
            <div
              key={plan.name}
              className={`bg-blue-950/30 p-8 rounded-xl border ${
                plan.popular ? "border-blue-400" : "border-blue-500/20"
              } hover:border-blue-500/40 transition-all duration-300 flex flex-col`}
            >
              {plan.popular && (
                <span className="bg-blue-400 text-blue-900 text-xs font-semibold px-3 py-1 rounded-full self-start mb-4">
                  Mais Popular
                </span>
              )}
              <h3 className="text-2xl font-bold text-blue-100 mb-2">{plan.name}</h3>
              <p className="text-3xl font-bold text-blue-200 mb-6">{plan.price}</p>
              <ul className="space-y-4 mb-8 flex-grow">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center text-blue-300">
                    <Check className="w-5 h-5 mr-3 text-blue-400 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <CTAButton variant={plan.popular ? "primary" : "outline"} fullWidth>
                {plan.cta}
              </CTAButton>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

