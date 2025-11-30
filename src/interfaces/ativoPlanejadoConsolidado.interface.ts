export interface AtivoPlanejadoConsolidado {
  id :string
  shortName :string
  logoUrl: string
  symbol: string
  percentualAtual: string
  posicaoAtualEmCentavos: number
  percentualPlanjado: string
  posicaoPlajadaEmCentavos :number
  valorDeAjusteEmCentavos :number
  recomendacaoDe :"compra" | "venda" | "neutro"
}