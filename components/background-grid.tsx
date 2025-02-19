"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"

export function BackgroundGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    const gridSize = 50
    const lineWidth = 1
    const lineColor = "rgba(59, 130, 246, 0.1)" // Blue-500 with low opacity

    let frame: number

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Calculate grid offset based on time
      const time = Date.now() * 0.001
      const offsetX = Math.sin(time * 0.5) * 10
      const offsetY = Math.cos(time * 0.5) * 10

      // Draw vertical lines
      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath()
        ctx.moveTo(x + offsetX, 0)
        ctx.lineTo(x + offsetX, canvas.height)
        ctx.strokeStyle = lineColor
        ctx.lineWidth = lineWidth
        ctx.stroke()
      }

      // Draw horizontal lines
      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath()
        ctx.moveTo(0, y + offsetY)
        ctx.lineTo(canvas.width, y + offsetY)
        ctx.strokeStyle = lineColor
        ctx.lineWidth = lineWidth
        ctx.stroke()
      }

      // Add glow effect
      ctx.shadowBlur = 20
      ctx.shadowColor = "rgba(59, 130, 246, 0.1)"

      frame = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <>
      <canvas
        ref={canvasRef}
        className="fixed inset-0 w-full h-full pointer-events-none opacity-50"
        style={{ filter: "blur(1px)" }}
      />
      <motion.div
        className="fixed inset-0 bg-gradient-radial from-blue-500/5 via-transparent to-transparent pointer-events-none"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.4, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
      />
    </>
  )
}

