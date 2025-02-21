"use client"

import * as React from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuContent,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, Shield, ChevronDown, ArrowRight } from "lucide-react"

const navItems = [
  {
    name: "Home",
    href: "/",
    submenu: [],
  },
  {
    name: "Serviços",
    href: "#servicos",
    submenu: [
      { name: "Registro de Marca", href: "/servicos/registro-de-marca" },
      { name: "Monitoramento de Marca", href: "/servicos/monitoramento-de-marca" },
      { name: "Consultoria em PI", href: "/servicos/consultoria-em-pi" },
      { name: "Transferência de Tecnologia", href: "/servicos/transferencia-de-tecnologia" },
    ],
  },
  {
    name: "Sobre Nós",
    href: "/sobre-nos",
    submenu: [],
  },
  {
    name: "Blog",
    href: "/blog",
    submenu: [],
  },
  {
    name: "Contato",
    href: "/contato",
    submenu: [],
  },
]

export function SiteHeader() {
  const [isScrolled, setIsScrolled] = React.useState(false)
  const [openSubmenu, setOpenSubmenu] = React.useState<string | null>(null)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false)

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled ? "bg-blue-950/95 backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <div className="container flex h-20 items-center justify-between">
        <div className="mr-8 relative group">
          <Link href="/" className="flex items-center space-x-2">
            <Shield className="w-8 h-8 text-blue-400" />
            <span className="font-bold text-2xl tracking-tight text-white">PPPI</span>
          </Link>
          <div className="absolute -bottom-2 left-0 w-full h-0.5 bg-gradient-to-r from-blue-400 to-blue-300 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
        </div>

        {/* Mobile Menu */}
        <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
          <SheetTrigger asChild className="lg:hidden">
            <Button variant="ghost" size="icon" className="mr-2 text-blue-400 hover:text-blue-300">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="bg-blue-950/95 backdrop-blur-md border-r border-blue-800">
            <nav className="flex flex-col gap-4">
              {navItems.map((item) => (
                <div key={item.name} className="relative">
                  {item.submenu.length > 0 ? (
                    <>
                      <button
                        onClick={() => setOpenSubmenu(openSubmenu === item.name ? null : item.name)}
                        className="text-lg font-semibold text-blue-100 hover:text-blue-300 transition-colors relative group flex items-center justify-between w-full"
                      >
                        {item.name}
                        <ChevronDown
                          className={`h-4 w-4 transition-transform ${
                            openSubmenu === item.name ? "transform rotate-180" : ""
                          }`}
                        />
                      </button>
                      {openSubmenu === item.name && (
                        <div className="mt-2 ml-4 space-y-2">
                          {item.submenu.map((subItem) => (
                            <Link
                              key={subItem.name}
                              href={subItem.href}
                              className="block text-blue-200 hover:text-blue-300 transition-colors"
                              onClick={() => setIsMobileMenuOpen(false)}
                            >
                              {subItem.name}
                            </Link>
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    <Link
                      href={item.href}
                      className="text-lg font-semibold text-blue-100 hover:text-blue-300 transition-colors relative group"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  )}
                </div>
              ))}
            </nav>
            <div className="mt-6">
              <Link href="https://app.pppi.com.br/auth/login" className="glass-button group w-full justify-center">
                <span className="relative z-10 flex items-center gap-2">
                  <span>Login</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </span>
                <div className="light-dot" />
              </Link>
            </div>
          </SheetContent>
        </Sheet>

        {/* Desktop Menu */}
        <NavigationMenu className="hidden lg:flex">
          <NavigationMenuList>
            {navItems.map((item) => (
              <NavigationMenuItem key={item.name}>
                {item.submenu.length > 0 ? (
                  <NavigationMenuTrigger className="bg-transparent text-blue-100 hover:bg-blue-900/20 hover:text-blue-200 focus:bg-blue-900/20 focus:text-blue-200">
                    {item.name}
                  </NavigationMenuTrigger>
                ) : (
                  <Link href={item.href} legacyBehavior passHref>
                    <NavigationMenuLink className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium transition-colors hover:bg-blue-900/50 hover:text-blue-200 focus:bg-blue-900/50 focus:text-blue-200 focus:outline-none disabled:pointer-events-none disabled:opacity-50 relative text-blue-100">
                      {item.name}
                      <motion.span
                        className="absolute -bottom-1 left-0 w-full h-0.5 bg-blue-400"
                        initial={{ scaleX: 0 }}
                        whileHover={{ scaleX: 1 }}
                        transition={{ duration: 0.3 }}
                      />
                    </NavigationMenuLink>
                  </Link>
                )}
                {item.submenu.length > 0 && (
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] bg-blue-950/95 rounded-md">
                      {item.submenu.map((subItem) => (
                        <li key={subItem.name}>
                          <NavigationMenuLink asChild>
                            <a
                              href={subItem.href}
                              className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-blue-900/50 hover:text-blue-200 focus:bg-blue-900/50 focus:text-blue-200 text-blue-100"
                            >
                              <div className="text-sm font-medium leading-none">{subItem.name}</div>
                            </a>
                          </NavigationMenuLink>
                        </li>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                )}
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        <div className="flex items-center">
          <Link href="https://app.pppi.com.br/auth/login" className="glass-button group hidden sm:inline-flex">
            <span className="relative z-10 flex items-center gap-2">
              <span>Login</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </span>
            <div className="light-dot" />
          </Link>
        </div>
      </div>
      <style jsx global>{`
        .glass-button {
          position: relative;
          padding: 0.75rem 1.5rem;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 9999px;
          color: white;
          font-size: 0.875rem;
          font-weight: 500;
          overflow: hidden;
          transition: all 0.3s ease;
          backdrop-filter: blur(10px);
        }

        .glass-button:hover {
          background: rgba(255, 255, 255, 0.1);
          border-color: rgba(255, 255, 255, 0.2);
        }

        .light-dot {
          position: absolute;
          width: 4px;
          height: 4px;
          background: white;
          border-radius: 50%;
          filter: blur(2px);
          top: 0;
          left: 0;
          animation: moveDot 3s linear infinite;
        }

        .light-dot::after {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          width: 20px;
          height: 20px;
          background: radial-gradient(circle, rgba(255,255,255,0.8) 0%, transparent 70%);
          transform: translate(-50%, -50%);
          border-radius: 50%;
        }

        @keyframes moveDot {
          0% {
            transform: translate(0, 0);
          }
          25% {
            transform: translate(calc(100% - 4px), 0);
          }
          50% {
            transform: translate(calc(100% - 4px), calc(100% - 4px));
          }
          75% {
            transform: translate(0, calc(100% - 4px));
          }
          100% {
            transform: translate(0, 0);
          }
        }

        /* Add a trail effect */
        .light-dot::before {
          content: '';
          position: absolute;
          width: 100%;
          height: 100%;
          background: white;
          border-radius: 50%;
          filter: blur(4px);
          opacity: 0.5;
          animation: fadeTrail 3s linear infinite;
        }

        @keyframes fadeTrail {
          0%, 100% {
            opacity: 0.5;
            transform: scale(1);
          }
          50% {
            opacity: 0;
            transform: scale(2);
          }
        }

        /* Add this new style for the NavigationMenu dropdown arrow */
        .NavigationMenuTrigger[data-state="open"] > span:last-child {
          transform: rotate(180deg);
        }
        .NavigationMenuTrigger > span:last-child {
          transition: transform 0.2s;
          color: currentColor;
        }
      `}</style>
    </motion.header>
  )
}

