"use client"
import { Star } from "lucide-react"

const testimonials = [
  {
    name: "Maria Silva",
    role: "Empreendedora",
    content:
      "Esta ferramenta me ajudou a economizar tempo e dinheiro no processo de registro da minha marca. Altamente recomendado!",
    rating: 5,
  },
  {
    name: "João Santos",
    role: "Advogado de PI",
    content:
      "Como profissional da área, posso afirmar que a análise fornecida é precisa e abrangente. Uma excelente ferramenta para clientes e advogados.",
    rating: 5,
  },
  {
    name: "Ana Oliveira",
    role: "Startup Founder",
    content:
      "Graças a esta ferramenta, conseguimos identificar potenciais conflitos antes de investir no registro. Salvou nosso negócio de dores de cabeça futuras.",
    rating: 4,
  },
]

export function TestimonialSection() {
  return (
    <section className="py-24 px-4 bg-blue-900/30">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold mb-16 text-center bg-gradient-to-r from-blue-300 to-cyan-200 bg-clip-text text-transparent">
          O que nossos usuários dizem
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-blue-950/30 p-8 rounded-xl border border-blue-500/20 hover:border-blue-500/40 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-blue-200 mb-6 text-lg">&quot;{testimonial.content}&quot;</p>
              </div>
              <div className="text-blue-300">
                <p className="font-semibold text-lg">{testimonial.name}</p>
                <p className="text-sm">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

