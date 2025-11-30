export type TradeModality = "day_trade" | "swing_trade"

export interface OrderBreakdownResponse {
    orderId :string,
    modality :TradeModality,
    amount :number,
    averagePurchasePrice? :number,
    netProfitFromDayTrading? :number,
    fees? :number,
    taxes? :number,
    id? :string
}