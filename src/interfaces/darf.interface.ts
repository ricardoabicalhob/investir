import type { TradeModality } from "./orderBreakdown.interface";

export interface DarfI {
    id :string,
    userId :string,
    modality :TradeModality,
    periodoApuracao :string,
    month :number,
    year :number,
    codReceita :number,
    dueDate :Date,
    valorDoPrincipal :number,
    valorDaMulta :number,
    valorJurosEncargos :number,
    valorTotal :number,
    paga :boolean,
    createdAt :Date,
    updatedAt :Date
}

export interface DarfToUpdateI {
    id :string,
    codReceita :number,
    dueDate :Date,
    valorDaMulta :number,
    valorJurosEncargos :number,
}