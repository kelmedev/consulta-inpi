export interface AnalysisResult {
  similarBrands: string[]
  compliance: {
    inpi: boolean
    iso: boolean
    legal: boolean
  }
  riskScore: number
  recommendation: string
}

export interface AnalysisError {
  message: string
  code?: number
}

