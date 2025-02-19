"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Loader2 } from "lucide-react"

interface TrademarkResult {
  similarMarks: string[]
  viability: "high" | "medium" | "low"
  recommendations: string[]
}

export function TrademarkForm() {
  const [brandName, setBrandName] = useState("")
  const [description, setDescription] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [result, setResult] = useState<TrademarkResult | null>(null)
  const [creditsLeft, setCreditsLeft] = useState(2)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (creditsLeft === 0) {
      setError("Você não tem mais créditos disponíveis.")
      return
    }
    setIsLoading(true)
    setError(null)
    setResult(null)

    try {
      // Simulating API call
      await new Promise((resolve) => setTimeout(resolve, 2000))
      const mockResult: TrademarkResult = {
        similarMarks: ["BrandX", "BrandY"],
        viability: "medium",
        recommendations: [
          "Considere modificar ligeiramente o nome da marca",
          "Verifique se há conflitos em outras classes de produtos/serviços",
        ],
      }
      setResult(mockResult)
      setCreditsLeft((prev) => prev - 1)
    } catch (err) {
      setError("Ocorreu um erro ao processar sua solicitação. Por favor, tente novamente.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section className="py-16 bg-blue-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center text-blue-900">Análise de Marca</h2>
        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-6">
          <div>
            <label htmlFor="brandName" className="block text-sm font-medium text-blue-900 mb-1">
              Nome da Marca
            </label>
            <Input
              id="brandName"
              value={brandName}
              onChange={(e) => setBrandName(e.target.value)}
              required
              className="w-full"
              placeholder="Digite o nome da sua marca"
            />
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-blue-900 mb-1">
              Descrição do Produto/Serviço
            </label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="w-full"
              placeholder="Descreva seu produto ou serviço"
              rows={4}
            />
          </div>
          <Button type="submit" loading={isLoading} disabled={isLoading} variant="default" className="w-full">
            {isLoading ? (
              <div className="flex items-center justify-center">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                <span>Analisando...</span>
              </div>
            ) : (
              "Analisar Marca"
            )}
          </Button>
          <p className="text-sm text-blue-600 text-center">Créditos restantes: {creditsLeft}</p>
        </form>

        {error && (
          <Alert variant="destructive" className="mt-6 max-w-2xl mx-auto">
            <AlertTitle>Erro</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {result && (
          <div className="mt-12 max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-2xl font-bold mb-4 text-blue-900">Resultado da Análise</h3>
            <div className="space-y-4">
              <div>
                <h4 className="text-lg font-semibold text-blue-800">Marcas Similares Encontradas:</h4>
                <ul className="list-disc pl-5">
                  {result.similarMarks.map((mark, index) => (
                    <li key={index}>{mark}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-blue-800">Viabilidade de Registro:</h4>
                <p
                  className={`font-bold ${
                    result.viability === "high"
                      ? "text-green-600"
                      : result.viability === "medium"
                        ? "text-yellow-600"
                        : "text-red-600"
                  }`}
                >
                  {result.viability === "high" ? "Alta" : result.viability === "medium" ? "Média" : "Baixa"}
                </p>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-blue-800">Recomendações:</h4>
                <ul className="list-disc pl-5">
                  {result.recommendations.map((rec, index) => (
                    <li key={index}>{rec}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

