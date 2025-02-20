"use client";

import * as Yup from "yup";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { useFormik } from "formik";

import { Popover, PopoverContent } from "./ui/popover";
import { PopoverTrigger } from "@radix-ui/react-popover";
import { InfoIcon } from "lucide-react";

const validationSchema = Yup.object({
	brandSearch: Yup.string().required("O nome da marca é obrigatório"),
	searchType: Yup.string().required("Você deve escolher um tipo de busca"),
});

export default function TradeMarkForm({ onSubmit }: any) {
	const formik = useFormik({
		initialValues: {
			brandSearch: "",
			searchType: "exact",
		},
		validationSchema: validationSchema,
		onSubmit: (values) => {
			if (onSubmit) onSubmit(values);
		},
	});

	return (
		<div className="max-width-[400px]">
			<fieldset>
				<div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-12 mt-5 md:mt-3">
					<div className="flex items-center gap-2 relative">
						<input
							type="radio"
							value="exact"
							id="exact"
							name="searchType"
							checked={formik.values.searchType === "exact"}
							onChange={() => formik.setFieldValue("searchType", "exact")}
							className="form-radio"
						/>
						<Label htmlFor="exact" className="text-slate-200 text-sm md:text-base">
							Buscar por nome exato
						</Label>
						<Popover>
							<PopoverTrigger className="text-gray-500 cursor-pointer">
								<InfoIcon size={15} />
							</PopoverTrigger>
							<PopoverContent className="p-2 md:p-3 bg-white shadow-lg text-gray-200 text-sm md:text-base">
								A busca por nome exato encontra registros com o nome exatamente
								igual ao que foi informado.
							</PopoverContent>
						</Popover>
					</div>
					<div className="flex items-center gap-2 relative">
						<input
							type="radio"
							value="radical"
							id="radical"
							name="searchType"
							checked={formik.values.searchType === "radical"}
							onChange={() => formik.setFieldValue("searchType", "radical")}
							className="form-radio"
						/>
						<Label htmlFor="radical" className="text-slate-200 text-sm md:text-base">
							Buscar nome por radical
						</Label>
						<Popover>
							<PopoverTrigger className="text-gray-500 cursor-pointer">
								<InfoIcon size={15} />
							</PopoverTrigger>
							<PopoverContent className="p-2 md:p-3 bg-white shadow-lg text-gray-200 text-sm md:text-base">
								A busca por radical considera variações do nome, encontrando
								registros que tenham raízes ou partes do nome informados.
							</PopoverContent>
						</Popover>
					</div>
				</div>
			</fieldset>

			<form
				onSubmit={formik.handleSubmit}
				className="flex flex-col sm:flex-row gap-3 mt-5 w-full"
				role="search"
			>
				<label htmlFor="brand-search" className="sr-only">
					Digite o nome da marca para consulta INPI
				</label>
				<Input
					id="brand-search"
					type="text"
					name="brandSearch"
					placeholder="Digite o nome da marca para consulta inpi"
					value={formik.values.brandSearch}
					onChange={formik.handleChange}
					className="w-full h-[50px] sm:h-[62px] bg-[#0D1117] border-[#30363D] text-slate-200 placeholder-slate-400 focus:border-[#2845EF] focus:ring-[#2845EF] shadow-none"
				/>

				<Button
					type="submit"
					className="bg-[#2845EF] shadow-none font-bold hover:bg-[#2845EF]/90 h-[50px] sm:h-[62px] cursor-pointer rounded-[12px] text-sm md:text-base w-full sm:w-[200px] whitespace-nowrap px-4 md:px-8"
				>
					Buscar Marca
				</Button>
			</form>
			{formik.errors.brandSearch && formik.touched.brandSearch && (
				<div className="flex font-medium items-center justify-start py-2 text-red-600 text-sm mt-1">
					{formik.errors.brandSearch}
				</div>
			)}
		</div>
	);
}
