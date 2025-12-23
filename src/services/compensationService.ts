import api from "./api"
import { AxiosError } from "axios"

const compensationService = { 
    getCompensations: async (userId :string) => {
        try {
            const response = await api.get(`/compensacao?userId=${userId}`)

            return response.data
        } catch (error :unknown) {
            if (error instanceof AxiosError) {
                const data = error.response?.data

                if (typeof data === 'string') {
                    throw new Error(data)
                }

                throw new Error(
                    data?.message ||
                    data?.error ||
                    'Erro ao consultar as compensações'
                )
            }

            throw new Error('Erro inesperado')
        }
    },

    getCompensationsByYear: async (userId :string, year :number) => {
        try {
            const response = await api.get(`/compensacao/ano?userId=${userId}&year=${year}`)

            return response.data
        } catch (error :unknown) {
            if (error instanceof AxiosError) {
                const data = error.response?.data

                if (typeof data === 'string') {
                    throw new Error(data)
                }

                throw new Error(
                    data?.message ||
                    data?.error ||
                    'Erro ao consultar as compensações'
                )
            }

            throw new Error('Erro inesperado')
        }
    },

    deleteCompensation: async (id :string) => {
        if(!id) { throw new Error("Erro ao deletar a DARF") }
        try {
            const response = await api.delete(`/compensacao?id=${id}`)

            return response.data
        } catch (error :unknown) {
            if (error instanceof AxiosError) {
                const data = error.response?.data

                if (typeof data === 'string') {
                    throw new Error(data)
                }

                throw new Error(
                    data?.message ||
                    data?.error ||
                    'Erro ao excluir compensação'
                )
            }

            throw new Error('Erro inesperado')
        }
    }
}

export default compensationService