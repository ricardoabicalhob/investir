import type { AssetPresenter } from "@/interfaces/asset.interface"
import api from "./api"
import { AxiosError } from "axios"

const assetService = { 
    getAssets: async (userId :string) => {
        if(!userId) { throw new Error("Informe o ID do usuário") }
        try {
            const response = await api.get(`/ativo?userId=${userId}`)
            if(!response || !response.data) {
                return [] as AssetPresenter[]
            }
            return response.data
        } catch (error :unknown) {
            if(error instanceof AxiosError) {
                throw new Error(error.response?.data.error)
            }
        }
    }
}

export default assetService