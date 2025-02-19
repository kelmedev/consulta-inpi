import Link from "next/link"
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react"

export function Footer() {
  return (
    <footer className="py-12 overflow-hidden bg-transparent">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 border-t border-blue-800/30 pt-8">
        <div>
          <h3 className="text-xl font-semibold mb-4 text-blue-300">CyberShield</h3>
          <p className="text-sm text-blue-200/80">Protegendo sua marca no mundo digital.</p>
        </div>
        <div>
          <h4 className="text-lg font-semibold mb-4 text-blue-300">Links Rápidos</h4>
          <ul className="space-y-2">
            <li>
              <Link href="/" className="text-blue-200/80 hover:text-blue-100 transition-colors">
                Home
              </Link>
            </li>
            <li>
              <Link href="/servicos" className="text-blue-200/80 hover:text-blue-100 transition-colors">
                Serviços
              </Link>
            </li>
            <li>
              <Link href="/sobre-nos" className="text-blue-200/80 hover:text-blue-100 transition-colors">
                Sobre Nós
              </Link>
            </li>
            <li>
              <Link href="/contato" className="text-blue-200/80 hover:text-blue-100 transition-colors">
                Contato
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="text-lg font-semibold mb-4 text-blue-300">Contato</h4>
          <p className="text-sm text-blue-200/80">Email: contato@pppi.com.br</p>
          <p className="text-sm text-blue-200/80">Telefone: (11) 1234-5678</p>
        </div>
        <div>
          <h4 className="text-lg font-semibold mb-4 text-blue-300">Redes Sociais</h4>
          <div className="flex space-x-4">
            <a href="#" className="text-blue-300 hover:text-blue-100 transition-colors">
              <Facebook size={20} />
            </a>
            <a href="#" className="text-blue-300 hover:text-blue-100 transition-colors">
              <Twitter size={20} />
            </a>
            <a href="#" className="text-blue-300 hover:text-blue-100 transition-colors">
              <Instagram size={20} />
            </a>
            <a href="#" className="text-blue-300 hover:text-blue-100 transition-colors">
              <Linkedin size={20} />
            </a>
          </div>
        </div>
      </div>
      <div className="mt-8 pt-8 border-t border-blue-800/30 text-center text-sm text-blue-200/60">
        <p>&copy; 2025 CyberShield. Todos os direitos reservados.</p>
      </div>
    </footer>
  )
}

