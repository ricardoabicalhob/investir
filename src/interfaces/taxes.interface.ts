import type { AtivoConsolidadoI } from "./ativoConsolidado.interface"

export interface TaxesI {
    receitaBrutaTotalComVendaEmCentavos :number
    receitaLiquidaOperacionalTotalComVendaEmCentavos :number
    receitaLiquidaContabilTotalComVendaEmCentavos :number
    custoDeAquisicaoTotalDosAtivosEmCentavos :number
    ganhoDeCapitalTotalComAVendaDosAtivosEmCentavos :number
    irrfTotalSobreOrdensDeVendaEmCentavos :number
    impostoDeRendaSobreGanhoDeCapitalEmCentavos :number
    ativosConsolidados :AtivoConsolidadoI[]
}