"use client"

import { Hero } from "@/components/hero"
import { Features } from "@/components/features"
import { HowItWorks } from "@/components/how-it-works"
import { EducationalSection } from "@/components/educational-section"
import { Testimonials } from "@/components/testimonials"
import { CTASection } from "@/components/cta-section"
import { BackgroundVideo } from "@/components/background-video"
import { motion } from "framer-motion"

const sectionVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
}

export default function Home() {
  return (
		<motion.main
			className="min-h-screen relative overflow-hidden"
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 0.5 }}
		>
			<BackgroundVideo />
			<div className="relative z-10">
				<Hero />
				<motion.div
					variants={sectionVariants}
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true, amount: 0.2 }}
				>
					<Features />
				</motion.div>
				<motion.div
					variants={sectionVariants}
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true, amount: 0.2 }}
				>
					<HowItWorks />
				</motion.div>
				<motion.div
					variants={sectionVariants}
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true, amount: 0.2 }}
				>
					<EducationalSection />
				</motion.div>
				<motion.div
					variants={sectionVariants}
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true, amount: 0.2 }}
				>
					<Testimonials />
				</motion.div>
				<motion.div
					variants={sectionVariants}
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true, amount: 0.2 }}
				>
					<CTASection />
				</motion.div>
			</div>
		</motion.main>
	);
}

