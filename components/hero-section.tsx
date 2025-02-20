"use client"

import type React from "react"
import { useEffect } from "react"
import { useRef } from "react"
import { motion, useScroll, useTransform, useMotionValue } from "framer-motion"
import { CTAButton } from "@/components/cta-button"

function CyberGrid({ mouseX, mouseY }: { mouseX: number; mouseY: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight

    const columns = 50
    const rows = 50

    const cellWidth = canvas.width / columns
    const cellHeight = canvas.height / rows

    const drawGrid = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      for (let i = 0; i < columns; i++) {
        for (let j = 0; j < rows; j++) {
          const x = i * cellWidth
          const y = j * cellHeight

          ctx.fillStyle = `rgba(59, 130, 246, ${Math.random() * 0.3})`
          ctx.fillRect(x, y, cellWidth - 1, cellHeight - 1)

          if (Math.random() < 0.03) {
            ctx.fillStyle = "rgba(59, 130, 246, 0.8)"
            ctx.fillRect(x, y, cellWidth - 1, cellHeight - 1)
          }
        }
      }
    }

    const animate = () => {
      drawGrid()
      requestAnimationFrame(animate)
    }

    animate()

    const handleResize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return (
    <motion.canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full opacity-30"
      style={{
        transform: `perspective(1000px) rotateX(${mouseY * 0.01}deg) rotateY(${mouseX * -0.01}deg)`,
      }}
    />
  )
}

export function HeroSection() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "25%"])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect()
    const x = event.clientX - rect.left - rect.width / 2
    const y = event.clientY - rect.top - rect.height / 2
    mouseX.set(x)
    mouseY.set(y)
  }

  return (
    <motion.section
      ref={ref}
      style={{ opacity }}
      className="relative min-h-screen flex items-center justify-center overflow-hidden py-40"
      onMouseMove={handleMouseMove}
    >
    
      <CyberGrid mouseX={mouseX.get()} mouseY={mouseY.get()} />
      <motion.div style={{ y }} className="container px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative z-10"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
              Proteja Sua Marca no Mundo Digital
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-12">
              Segurança cibernética de ponta para sua propriedade intelectual. Monitore, proteja e fortaleça sua marca
              contra ameaças digitais.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <CTAButton variant="primary" icon="arrow" size="lg">
                PROTEJA AGORA
              </CTAButton>
              <CTAButton variant="outline" icon="arrow" size="lg">
                AVALIAÇÃO GRATUITA
              </CTAButton>
            </div>
          </motion.div>
        </div>
      </motion.div>
      <style jsx global>{`
        .glass-hero-button {
          position: relative;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          overflow: hidden;
        }

        .glass-hero-button:hover {
          background: rgba(255, 255, 255, 0.1);
          border-color: rgba(255, 255, 255, 0.2);
        }

        .hero-light-dot {
          position: absolute;
          width: 4px;
          height: 4px;
          background: white;
          border-radius: 50%;
          filter: blur(2px);
          top: 0;
          left: 0;
          animation: moveHeroDot 3s linear infinite;
        }

        .hero-light-dot::after {
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

        @keyframes moveHeroDot {
          0% { transform: translate(0, 0); }
          25% { transform: translate(calc(100% - 4px), 0); }
          50% { transform: translate(calc(100% - 4px), calc(100% - 4px)); }
          75% { transform: translate(0, calc(100% - 4px)); }
          100% { transform: translate(0, 0); }
        }

        .hero-light-dot::before {
          content: '';
          position: absolute;
          width: 100%;
          height: 100%;
          background: white;
          border-radius: 50%;
          filter: blur(4px);
          opacity: 0.5;
          animation: fadeHeroTrail 3s linear infinite;
        }

        @keyframes fadeHeroTrail {
          0%, 100% {
            opacity: 0.5;
            transform: scale(1);
          }
          50% {
            opacity: 0;
            transform: scale(2);
          }
        }

        .animate-border-flow {
          position: absolute;
          inset: 0;
          border: 2px solid transparent;
          content: "";
          pointer-events: none;
        }

        .animate-border-flow::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
          animation: borderFlow 2s linear infinite;
        }

        @keyframes borderFlow {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
      `}</style>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-950/30 to-[#050C1A]" />
    </motion.section>
  )
}

