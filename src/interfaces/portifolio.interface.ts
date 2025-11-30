export interface PortifolioSummary {
  totalInvestidoNaCarteiraEmCentavos: number
  posicaoAtualDaCarteiraEmCentavos: number
  resultadoDaCarteiraEmCentavos: number
  resultadoDaCarteiraEmPercentual: string
  participacaoPercentualPorAtivo: Record<string, string>
  valorPlanejadoPorAtivoRecomendadoEmCentavos :Record<string, number>
  posicaoAtualPorAtivoEmCentavos :Record<string, number>
  logourlPorAtivos :Record<string, string>
  shortNamePorAtivos :Record<string, string>
  valorDeAjusteRecomendadoPorAtivoEmCentavos :Record<string, number>
  atoRecomendadoPorAtivo :Record<string, "compra" | "venda" | "neutro">
}
