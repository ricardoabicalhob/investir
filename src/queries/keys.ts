import type { OrderCreate, OrderPresenter, OrderToUpdate } from "@/interfaces/order.interface"
import type { TradeModality } from "@/interfaces/orderBreakdown.interface"
import type { RecommendedAssetCreate, RecommendedAssetUpdatePlannedPercentage } from "@/interfaces/recommendedAsset.interface"

export const orderKeys = {
    all: ['orders'],
    list: () => [...orderKeys.all],
    listByMonth: (userId :string, year :number, month :number) => [...orderKeys.all, 'listByMonth', userId, year, month] as const,
    listAmountTradedByAsset: (userId :string) => [...orderKeys.all, 'listAmountTradedByAsset', userId] as const,
    create: (order :OrderCreate)=> [...orderKeys.all, "create", order.userId] as const,
    delete: (orderToDelete :OrderPresenter | undefined) => [...orderKeys.all, "delete", orderToDelete] as const,
    update: (orderToUpdate :OrderToUpdate)=> [...orderKeys.all, "update", orderToUpdate.id] as const
}

export const assetKeys = {
    all: ['assets'],
    list: () => [...assetKeys.all],
}

export const recommendedAssetKeys = {
    all: ['recommendedAssets'],
    list: () => [...recommendedAssetKeys.all],
    create: (recommendedAsset :RecommendedAssetCreate)=> [...recommendedAssetKeys.all, 'create', recommendedAsset.userId] as const,
    delete: (id :string) => [...recommendedAssetKeys.all, "delete", id] as const,
    updatePlannedPercentage: (recommendedAssetUpdatePlannedPercentage :RecommendedAssetUpdatePlannedPercentage) => [...recommendedAssetKeys.all, "updatePlannedPercentage", recommendedAssetUpdatePlannedPercentage.id] as const
}

export const portifolioKeys = {
    all: ["portifolio"],
    list: () => [...portifolioKeys.all]
}

export const taxesKeys = {
    all: ["taxes"],
    list: (userId :string, year :number | undefined, month :number | undefined, modality :TradeModality) => [...taxesKeys.all, "taxesInfo", [userId, year, month, modality]]
}

export const planningKeys = {
    all: ["planning"],
    list: (userId :string, investment :number) => [...planningKeys.all, "planningInfo", userId, investment]
}