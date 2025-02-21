import { motion } from "framer-motion";
import TradeMarkList from "./trade-mark-list";
import type { Metadata } from "next";
import TradeMarkTable from "@/components/seo-tools/trade-mark-table";

export const metadata: Metadata = {
	title: "Buscador de Marcas INPI | Proteja sua marca com facilidade",
	description:
		"Ferramenta gratuita para buscar e verificar disponibilidade de marcas no INPI. Proteja sua propriedade intelectual e evite conflitos de marca.",
	openGraph: {
		title: "Buscador de Marcas INPI | Proteja sua marca com facilidade",
		description:
			"Ferramenta gratuita para buscar e verificar disponibilidade de marcas no INPI. Proteja sua propriedade intelectual e evite conflitos de marca.",
		images: [{ url: "/images/og-image.jpg" }],
	},
};

export function Hero() {
	return (
		<section className="min-h-[100vh] flex flex-col items-center justify-center py-20 px-4 relative bg-slate-900/50 backdrop-blur-sm ">
			<motion.h1
				initial={{ opacity: 0, y: -20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
				className="text-5xl sm:text-6xl md:text-7xl font-bold mb-8 text-center bg-gradient-to-r from-[#8AB4F8] to-[#C2E7FF] bg-clip-text text-transparent max-w-4xl mx-auto"
			>
				Consulta INPI
			</motion.h1>
			<motion.p
				initial={{ opacity: 0, y: -20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5, delay: 0.2 }}
				className="text-lg sm:text-xl mb-12 text-blue-200 text-center max-w-2xl mx-auto"
			>
				Faça sua consulta no INPI com nossa ferramenta de pesquisa avançada com
				IA.
			</motion.p>
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5, delay: 0.4 }}
			>
				<TradeMarkList />
			</motion.div>
		</section>
	);
}
