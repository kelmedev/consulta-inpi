"use client"

import { Hero } from "@/components/hero"
import { FeaturesList } from "@/components/features-list"
import { TestimonialSection } from "@/components/testimonial-section"
import { PricingSection } from "@/components/pricing-section"
import { FAQ } from "@/components/faq"
import { CallToAction } from "@/components/call-to-action"
import { Footer } from "@/components/footer"
import { BackgroundVideo } from "@/components/background-video"
import { SiteHeader } from "@/components/site-header"
import { CopywritingSection } from "@/components/copywriting-section"
import { motion } from "framer-motion"
import TradeMarkList from "@/components/trade-mark-list"
import TrademarkTable from "@/components/trade-mark-table"

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
				<SiteHeader />
				<Hero />

				<motion.div
					variants={sectionVariants}
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true, amount: 0.2 }}
				>
				
				</motion.div>
				<motion.div
					variants={sectionVariants}
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true, amount: 0.2 }}
				></motion.div>
				<motion.div
					variants={sectionVariants}
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true, amount: 0.2 }}
				>
					<FeaturesList />
				</motion.div>
				<motion.div
					variants={sectionVariants}
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true, amount: 0.2 }}
				>
					<TestimonialSection />
				</motion.div>
				<motion.div
					variants={sectionVariants}
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true, amount: 0.2 }}
				>
					<PricingSection />
				</motion.div>
				<motion.div
					variants={sectionVariants}
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true, amount: 0.2 }}
				>
					<FAQ />
				</motion.div>
				<motion.div
					variants={sectionVariants}
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true, amount: 0.2 }}
				>
					<CallToAction />
				</motion.div>
				<Footer />
			</div>
		</motion.main>
	);
}

