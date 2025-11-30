export interface RecommendedAssetCreate {
    recommendedAssetSymbol :string,
    plannedPercentage :number,
    amount :number,
    userId :string
}

export interface RecommendedAssetUpdatePlannedPercentage {
    id :string,
    plannedPercentage :number
}

export interface RecommendedAssetPresenter {
    id :string,
    recommendedAssetSymbol :string,
    plannedPercentage :number,
    amount :number,
    userId :string
}