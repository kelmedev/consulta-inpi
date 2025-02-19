export function InfoSection() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center text-blue-900">Como Funciona</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <h3 className="text-xl font-semibold mb-4 text-blue-800">1. Insira os Dados</h3>
            <p className="text-gray-600">
              Preencha o formulário com o nome da sua marca e a descrição do produto ou serviço.
            </p>
          </div>
          <div className="text-center">
            <h3 className="text-xl font-semibold mb-4 text-blue-800">2. Análise Instantânea</h3>
            <p className="text-gray-600">
              Nossa ferramenta realiza uma busca completa e analisa a viabilidade do registro da sua marca.
            </p>
          </div>
          <div className="text-center">
            <h3 className="text-xl font-semibold mb-4 text-blue-800">3. Resultados Detalhados</h3>
            <p className="text-gray-600">
              Receba um relatório com marcas similares, análise de viabilidade e recomendações personalizadas.
            </p>
          </div>
        </div>
        <div className="mt-12 text-center">
          <h3 className="text-2xl font-bold mb-4 text-blue-900">Teste Gratuito</h3>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Cada usuário recebe 2 créditos gratuitos para realizar análises completas. Aproveite esta oportunidade para
            verificar a disponibilidade da sua marca e obter insights valiosos para o processo de registro.
          </p>
        </div>
      </div>
    </section>
  )
}

