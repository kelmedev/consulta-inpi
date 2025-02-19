"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"

interface MouseInteractionProps {
  children: React.ReactNode
}

export function MouseInteraction({ children }: MouseInteractionProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  return (
    <motion.div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      animate={{
        scale: isHovered ? 1.05 : 1,
        boxShadow: isHovered ? "0 0 20px rgba(59, 130, 246, 0.5)" : "0 0 0 rgba(59, 130, 246, 0)",
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      style={{
        position: "relative",
        transformStyle: "preserve-3d",
        perspective: "1000px",
      }}
    >
      {children}
      {isHovered && (
        <motion.div
          className="absolute inset-0 bg-blue-400/10 rounded-xl pointer-events-none"
          animate={{
            rotateY: (mousePosition.x - window.innerWidth / 2) * 0.01,
            rotateX: (window.innerHeight / 2 - mousePosition.y) * 0.01,
          }}
          transition={{ type: "spring", stiffness: 100, damping: 10 }}
        />
      )}
    </motion.div>
  )
}

