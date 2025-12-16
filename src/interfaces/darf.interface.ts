import type { TradeModality } from "./orderBreakdown.interface";

export interface DarfI {
    id :string,
    userId :string,
    modality :TradeModality,
    periodoApuracao :number,
    month :number,
    year :number,
    codReceita :number,
    dueDate :Date,
    valorDoPrincipal :number,
    valorDaMulta :number,
    valorJurosEncargos :number,
    valorTotal :number,
    paga :boolean,
    paymentDate :Date | null,
    abaixoDoLimiteMinimo :boolean,
    accumulatedDarfs :AnchoredDarf[] | null,
    accumulationDarfId :string | null,
    createdAt :Date,
    updatedAt :Date
}

export interface DarfToUpdateI {
    id :string,
    codReceita :number,
    dueDate :Date,
    valorDaMulta :number,
    valorJurosEncargos :number,
    paymentDate :Date | null
}

export interface AnchoredDarf {
    id :string,
    abaixoDoLimiteMinimo :boolean,
    modality :TradeModality,
    periodoApuracao :number,
    valorDaMulta :number,
    valorJurosEncargos :number,
    valorDoPrincipal :number,
    valorTotal :number
}