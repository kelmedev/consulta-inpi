import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Dialog, DialogClose, DialogContent, DialogFooter } from "@/components/ui/dialog";
import { CheckCircle, Loader2, X } from "lucide-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import api from "@/config/api";
import { toast } from "react-toastify";

interface TradeMarkModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  searchData: any;
  setData: any;
}

export default function TradeMarkModal({
  isOpen,
  setIsOpen,
  searchData,
  setData,
}: TradeMarkModalProps) {
  const [timeLeft, setTimeLeft] = useState(300);
  const [loading, setLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("");
  const [isDisabled, setIsDisabled] = useState(false); 
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!loading) {
      setProgress(0);
      return;
    }

    const startTime = Date.now();
    const duration = 60000; 
    const thirtySeconds = 30000;

    const updateProgress = () => {
      const elapsed = Date.now() - startTime;
      if (elapsed >= duration) {
        setProgress(100);
        return;
      }

      if (elapsed >= thirtySeconds) {
        // Calculate progress between 90% and 99% for the remaining 15 seconds
        const remainingTime = duration - thirtySeconds; // 15 seconds
        const elapsedAfterThirty = elapsed - thirtySeconds;
        const additionalProgress = Math.min(9, (elapsedAfterThirty / remainingTime) * 9);
        setProgress(Math.round(90 + additionalProgress));
      } else {
        const calculatedProgress = Math.min(90, (elapsed / thirtySeconds) * 90);
        setProgress(Math.round(calculatedProgress));
      }

      requestAnimationFrame(updateProgress);
    };

    const animation = requestAnimationFrame(updateProgress);
    return () => cancelAnimationFrame(animation);
  }, [loading]);

  useEffect(() => {
    if (!loading && progress > 0) {
      setProgress(100);
    }
  }, [loading]);

  useEffect(() => {
    if (!isOpen) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, [isOpen]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  const handleGetBrandResult = async (data: any) => {
    try {
      setLoading(true);
      setIsDisabled(true);
      setLoadingMessage("Preparando a consulta...");

      await new Promise(resolve => setTimeout(resolve, 1500));
      setLoadingMessage("Acessando INPI...");

      await new Promise(resolve => setTimeout(resolve, 3000));
      setLoadingMessage("Consultando base de dados...");

      await new Promise(resolve => setTimeout(resolve, 2000));
      setLoadingMessage("Só mais um pouquinho...");

      const response = await api.post(
        `/brand/public-brand-find/${searchData.brand}`,
        {
          name: data.name,
          email: data.email,
          radical: searchData.isRadical,
        }
      );

      setLoadingMessage("Gerando resultado...");
      await new Promise(resolve => setTimeout(resolve, 1500));

      if (response.data.raws && Array.isArray(response.data.raws)) {
        const allResults = response.data.raws;
        if (allResults.length > 0) {
          toast.success(`Marca ${searchData.brand} consultada com sucesso. ${allResults.length} resultados encontrados.`);
        } else {
          toast.error(`Marca ${searchData.brand} não encontrada`);
        }
        setData({ ...response.data, raws: allResults });
      } else {
        toast.error("Formato de resposta inválido da API");
      }
      setData(response.data);
    } catch (error) {
      toast.error("Falha em consultar base do INPI");
    } finally {
      setLoading(false);
      setIsDisabled(false);
      setIsOpen(false);
      setLoadingMessage("");
    }
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Nome é obrigatório"),
      email: Yup.string()
        .email("E-mail inválido")
        .required("E-mail é obrigatório"),
    }),
    onSubmit: (values) => {
      handleGetBrandResult(values);
    },
  });

  const handleClose = () => {
    if (!loading) {
      setIsOpen(false);
    }
  };

  return (
		<Dialog open={isOpen} onOpenChange={handleClose}>
			<DialogContent className="sm:max-w-2xl md:max-w-3xl border-2 rounded-xl bg-slate-900">
				<DialogClose className="absolute right-4 top-4 stroke-white text-white hover:text-white focus:text-white hover:opacity-90 focus:opacity-90 focus:ring-0 focus:outline-none z-50">
					<X className="h-4 w-4 border-white text-white stroke-white hover:text-white focus:text-white" />
					<span className="sr-only">Close</span>
				</DialogClose>
				<div className="p-4 md:p-5">
					<div className="flex flex-col gap-4 text-center">
						<h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white whitespace-normal break-words">
							Resultado: {searchData.brand}
						</h1>
						<p className="text-white font-medium text-sm md:text-base lg:text-lg whitespace-normal">
							O resultado da sua consulta INPI expira em
							<span className="inline-block bg-orange-600 text-white px-2 md:px-3 py-1 rounded-full mx-2">
								{minutes}:{seconds < 10 ? `0${seconds}` : seconds} minutos
							</span>
							para visualizar. Digite seu e-mail abaixo para que possamos enviar
							também por lá.
						</p>

						<form
							onSubmit={formik.handleSubmit}
							className="flex flex-col gap-4 mt-2"
						>
							<div className="flex flex-col gap-2">
								<Label className="text-start text-white">Nome</Label>
								<input
									type="text"
									name="name"
									placeholder="Seu nome"
									className="w-full p-2 md:p-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									value={formik.values.name}
								/>
								{formik.touched.name && formik.errors.name ? (
									<span className="text-start text-red-500 text-sm">
										{formik.errors.name}
									</span>
								) : null}
							</div>
							<div className="flex flex-col gap-2">
								<Label className="text-start text-white">E-mail</Label>
								<input
									type="email"
									name="email"
									placeholder="Seu e-mail"
									className="w-full p-2 md:p-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									value={formik.values.email}
								/>
								{formik.touched.email && formik.errors.email ? (
									<span className="text-start text-red-500 text-sm">
										{formik.errors.email}
									</span>
								) : null}
							</div>
							<DialogFooter className="flex flex-col w-full mt-2">
								{loading ? (
									<div className="space-y-2 w-full">
										<Button
											className="bg-blue-600 gap-2 text-white font-bold py-2 md:py-3 px-3 md:px-4 rounded-lg w-full text-sm md:text-base h-10 md:h-12 flex items-center justify-center"
											disabled
											loading
										>
											<Loader2 className="animate-spin h-4 md:h-5 w-4 md:w-5" />
											<span className="whitespace-nowrap">
												{loadingMessage}
											</span>
										</Button>
										<div className="flex flex-row items-center justify-between w-full gap-1">
											<div className="flex-1 bg-slate-700 rounded-full h-2 overflow-hidden">
												<div
													className="h-full w-full bg-blue-500 transition-all duration-1000 ease-linear"
													style={{ width: `${progress}%` }}
												/>
											</div>
											<p className="text-blue-400 text-sm min-w-[40px] text-right">
												{progress}%
											</p>
										</div>
									</div>
								) : (
									<Button
										type="submit"
										className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 md:py-3 px-3 md:px-4 rounded-lg w-full text-sm md:text-base h-10 md:h-12"
									>
										Visualizar consulta
									</Button>
								)}
							</DialogFooter>
						</form>
					</div>
				</div>
				<div className="px-4 md:px-5 pb-4 md:pb-5">
					<div className="relative w-full border-2 border-slate-700 bg-slate-800 rounded-lg overflow-hidden">
						<div className="p-3 md:p-4 space-y-3">
							<h2 className="text-lg md:text-xl font-bold text-white text-center">
								Oferta Especial: Tenha um relatório de marca profissional
							</h2>
							<p className="text-slate-200 text-sm md:text-base">
								<span className="text-red-500 font-bold">
									🚀 PRESENTE ESPECIAL:{" "}
								</span>
								Descubra se sua marca está dentro das diretrizes de registro!
								Com nosso
								<span className="font-bold"> Relatório Profissional</span>, você
								recebe uma análise completa de viabilidade e brand-fit para
								evitar problemas no futuro.
							</p>
							<Button className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 md:py-3 h-10 md:h-12 rounded-lg flex items-center justify-center gap-2">
								<CheckCircle className="h-4 md:h-5 w-4 md:w-5" />
								<span className="whitespace-nowrap text-sm md:text-base">
									Desbloquear Agora por Apenas R$ 29,90!
								</span>
							</Button>
						</div>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
}
