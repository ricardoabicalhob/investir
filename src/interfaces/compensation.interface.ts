import type { TradeModality } from "./orderBreakdown.interface";

export interface CompensationResponse {
    userId :string,
    modality :TradeModality,
    periodoApuracao :number,
    month :number,
    year :number,
    codReceita :number,
    valorTotal :number,
    id :string,
    createdAt :Date,
    updatedAt :Date
}