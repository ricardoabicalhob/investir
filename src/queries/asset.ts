import { useQuery } from "@tanstack/react-query"
import { assetKeys } from "./keys"
import type { AssetPresenter } from "@/interfaces/asset.interface"
import assetService from "@/services/assetService"

export const useAssets = (userId :string, token :string | undefined) => {
    return useQuery<AssetPresenter[]>({
        queryKey: assetKeys.list(),
        queryFn: ()=> assetService.getAssets(userId, token),
        staleTime: 1000 * 60 * 5
    })
}