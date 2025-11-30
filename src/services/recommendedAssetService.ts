import type { RecommendedAssetCreate, RecommendedAssetPresenter, RecommendedAssetUpdatePlannedPercentage } from "@/interfaces/recommendedAsset.interface"
import api from "./api"
import { AxiosError } from "axios"

const recommendedAssetService = { 
    createRecommendedAsset: async (recommendedAsset :RecommendedAssetCreate) => {
        if(!recommendedAsset) { throw new Error("Erro durante a criação do ativo recomendado") }
        try {
            const response = await api.post('/ativorecomendado', recommendedAsset)
            
            return response.data as RecommendedAssetPresenter
        } catch (error :unknown) {
            if(error instanceof AxiosError) {
                throw new Error(error.response?.data.error)
            }
        }
    },
    deleteRecommendedAsset: async (id :string) => {
        if(!id) { throw new Error("Erro ao deletar o ativo!") }
        try {
            const response = await api.delete(`/ativorecomendado?id=${id}`)

            return response.data
        } catch (error :unknown) {
            if(error instanceof AxiosError) {
                throw new Error(error.response?.data.error)
            }
        }
    },
    updatePlannedPercentage: async (recommendedAssetToUpdatePlannedPercentage :RecommendedAssetUpdatePlannedPercentage) => {
        if(!recommendedAssetToUpdatePlannedPercentage) { throw new Error("Erro ao atualizar o ativo recomendado!") }
        try {
            const response = await api.patch('/ativorecomendado', recommendedAssetToUpdatePlannedPercentage)
            
            return response.data as RecommendedAssetPresenter
        } catch (error :unknown) {
            if(error instanceof AxiosError) {
                throw new Error(error.response?.data.error)
            }
        }
    },
    getRecommendedAssets: async (userId :string) => {
        if(!userId) { throw new Error("Informe o ID do usuário") }
        try {
            const response = await api.get(`/ativorecomendado?userId=${userId}`)
            return response.data
        } catch (error :unknown) {
            if(error instanceof AxiosError) {
                throw new Error(error.response?.data.error)
            }
        }
    }
}

export default recommendedAssetService