import type { OrderBreakdownResponse } from "./orderBreakdown.interface"

export type AssetType = "acao" | "fii" | "cripto"
export type OperationType = "compra" | "venda"
export type OrderStatus = "arquivada" | "ativa"

export interface OrderPresenter {
    id :string
    orderDate :Date
    assetType :AssetType
    symbol :string
    amount :number
    unitPrice :number
    fees :number
    taxes :number
    operationType :OperationType
    status :OrderStatus
    archivingOrderId :string | null
    userId :string
    averagePrice :number
    createdAt? :Date
    updatedAt? :Date
    grossValue :number
    netValue :number
    breakdowns :OrderBreakdownResponse[]
}

export interface OrderCreate {
    orderDate :Date,
    assetType :AssetType,
    symbol :string,
    amount :number,
    unitPrice :number,
    fees :number | null,
    taxes :number | null,
    operationType :OperationType,
    userId :string,
    averagePrice :number | null
}

export interface OrderToUpdate {
    amount :number,
    unitPrice :number,
    fees :number | null,
    taxes :number | null,
    id? :string,
    updatedAt? :Date,
}

export interface AmountTradedByAssetPresenter {
    sum :{
        amount :number,
        fees :number,
        taxes :number
    },
    symbol :string,
    operationType :OperationType
}