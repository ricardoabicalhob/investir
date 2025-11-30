import type { AtivoPlanejadoConsolidado } from "./ativoPlanejadoConsolidado.interface"

export interface PlanningSumary {
  posicaoAtualDaCarteiraEmCentavos: number
  ativosPlanejadosConsolidados :AtivoPlanejadoConsolidado[]
}