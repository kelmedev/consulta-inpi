import { motion } from "framer-motion";
import TradeMarkList from "./trade-mark-list";
import type { Metadata } from "next";
import { useEffect, useRef } from "react";

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

function MatrixRain() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

    
        const latin = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const nums = '0123456789';
        const alphabet =   latin + nums;

        const fontSize = 16;
        const columns = canvas.width / fontSize;

        const rainDrops: number[] = [];

        for (let x = 0; x < columns; x++) {
            rainDrops[x] = 1;
        }

        const draw = () => {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.fillStyle = '#8AB4F8';
            ctx.font = fontSize + 'px monospace';

            for (let i = 0; i < rainDrops.length; i++) {
                const text = alphabet.charAt(Math.floor(Math.random() * alphabet.length));
                ctx.fillText(text, i * fontSize, rainDrops[i] * fontSize);

                if (rainDrops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                    rainDrops[i] = 0;
                }
                rainDrops[i]++;
            }
        };

        const interval = setInterval(draw, 30);

        const handleResize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        window.addEventListener('resize', handleResize);

        return () => {
            clearInterval(interval);
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full opacity-[0.12]"
            style={{ mixBlendMode: 'screen' }}
        />
    );
}

export function Hero() {
	const handleMouseMove = (e: React.MouseEvent) => {
		const root = document.documentElement;
		root.style.setProperty('--posX', (e.clientX / window.innerWidth).toString());
		root.style.setProperty('--posY', (e.clientY / window.innerHeight).toString());
	};

	return (
		<>
			<section
				className="min-h-[100vh] flex flex-col items-center justify-center py-20 px-4 relative bg-gradient-animate backdrop-blur-sm"
				onMouseMove={handleMouseMove}
			>
				<MatrixRain />
				<motion.h1
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5 }}
					className="text-5xl sm:text-6xl md:text-7xl font-bold mb-8 text-center bg-gradient-to-r from-[#8AB4F8] to-[#C2E7FF] bg-clip-text text-transparent max-w-4xl mx-auto animate-gradient bg-[length:200%_auto]"
				>
					Consulta INPI
				</motion.h1>
				<motion.p
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5, delay: 0.2 }}
					className="text-lg sm:text-xl mb-12 text-blue-200 text-center max-w-2xl mx-auto"
				>
					Ferramenta gratuita para buscar e verificar disponibilidade de marcas
					no INPI. Proteja sua propriedade intelectual e evite conflitos de
					marca.
				</motion.p>
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5, delay: 0.4 }}
				>
					<TradeMarkList />
				</motion.div>
			</section>
			<style jsx global>{`
        .bg-gradient-animate {
            height: 100vh;
            margin: 0;
            background-image: 
                linear-gradient(115deg, rgba(0, 0, 0, 0.7), rgba(0, 24, 48, 0.9)),
                radial-gradient(circle at var(--x, 60%) var(--y, 50%), rgba(147, 197, 253, 0.3), rgba(0, 0, 0, 0.9) 50%),
                radial-gradient(circle at calc(100% - var(--x, 50%)) var(--y, 50%), rgba(96, 165, 250, 0.6), rgba(29, 78, 216, 0.9) 70%),
            background-blend-mode: overlay, screen, multiply, color-dodge, normal;
            background-size: 200% 200%;
            position: relative;
            transition: background-position 0.3s ease-out;
        }

        @keyframes gradient {
            0% {
                background-position: 0% 50%;
            }
            50% {
                background-position: 100% 50%;
            }
            100% {
                background-position: 0% 50%;
            }
        }

        .animate-gradient {
            animation: gradient 3s ease infinite;
            text-shadow: 
                0 0 1px rgba(138, 180, 248, 0.1),
                0 0 2px rgba(138, 180, 248, 0.1),
                0 0 4px rgba(138, 180, 248, 0.1),
                0 0 8px rgba(138, 180, 248, 0.15),
                0 0 12px rgba(138, 180, 248, 0.1);
            animation: gradient 3s ease infinite, glow 1.5s ease-in-out infinite alternate;
        }

        @keyframes glow {
            from {
                text-shadow: 
                    0 0 1px rgba(138, 180, 248, 0.1),
                    0 0 2px rgba(138, 180, 248, 0.1),
                    0 0 4px rgba(138, 180, 248, 0.1),
                    0 0 8px rgba(138, 180, 248, 0.15),
                    0 0 12px rgba(138, 180, 248, 0.1);
            }
            to {
                text-shadow: 
                    0 0 2px rgba(138, 180, 248, 0.15),
                    0 0 3px rgba(138, 180, 248, 0.15),
                    0 0 6px rgba(138, 180, 248, 0.15),
                    0 0 9px rgba(138, 180, 248, 0.2),
                    0 0 14px rgba(138, 180, 248, 0.15);
            }
        }

        @keyframes gradientFlow {
            0% {
                background-position: 0% 0%, 0% 0%, 0% 0%, 0% 0%, 0% 0%;
            }
            25% {
                background-position: 100% 100%, 50% 50%, 100% 0%, 0% 100%, 50% 50%;
            }
            50% {
                background-position: 200% 200%, 100% 100%, 200% 0%, 0% 200%, 100% 100%;
            }
            75% {
                background-position: 100% 100%, 50% 50%, 100% 0%, 0% 100%, 50% 50%;
            }
            100% {
                background-position: 0% 0%, 0% 0%, 0% 0%, 0% 0%, 0% 0%;
            }
        }

        .bg-gradient-animate::after {
            content: '';
            position: absolute;
            inset: 0;
            background: radial-gradient(circle at 50% 50%, rgba(147, 197, 253, 0.1) 0%, transparent 70%);
            opacity: 0.5;
            filter: blur(40px);
            animation: pulseGlow 4s ease-in-out infinite;
        }

        @keyframes pulseGlow {
            0%, 100% {
                opacity: 0.5;
                transform: scale(1);
            }
            50% {
                opacity: 0.7;
                transform: scale(1.1);
            }
        }
    `}</style>
		</>
	);
}
