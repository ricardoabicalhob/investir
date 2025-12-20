import type { TradeModality } from "@/interfaces/orderBreakdown.interface"
import api from "./api"
import { AxiosError } from "axios"
import type { DarfI, DarfToUpdateI } from "@/interfaces/darf.interface"

const darfService = { 
    getDarfs: async (userId :string, token :string | undefined) => {
        try {
            const response = await api.get(`/darf?userId=${userId}`, {
                headers: {
                    Authorization: `Bearer ${ token }`
                }
            })

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
                    'Erro ao consultar as DARFs'
                )
            }

            throw new Error('Erro inesperado')
        }
    },

    createDarf: async (userId :string, year :number, month :number, modality :TradeModality, token :string) => {
        if(!userId || !year || !month || !modality) { throw new Error("Esperado um userId (string), month (number), year (number) e modality(day_trade | swing_trade)") }
        try {
            const response = await api.post(`/darf`, {
                userId,
                year,
                month,
                modality
            },
            {
                headers: {
                    Authorization: `Bearer ${ token }`
                }
            }
        )
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
                    'Erro ao criar DARF'
                )
            }

            throw new Error('Erro inesperado')
        }
    },

    deleteDarf: async (id :string, token :string) => {
        if(!id) { throw new Error("Erro ao deletar a DARF") }
        try {
            const response = await api.delete(`/darf?id=${id}`, {
                headers: {
                    Authorization: `Bearer ${ token }`
                }
            })

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
                    'Erro ao deletar DARF'
                )
            }

            throw new Error('Erro inesperado')
        }
    },

    updateDarf: async (darfToUpdate :DarfToUpdateI, token :string | undefined) => {
        if(!darfToUpdate) { throw new Error("Erro ao atualizar a DARF") }
        try {
            const response = await api.patch('/darf', darfToUpdate, {
                headers: {
                    Authorization: `Bearer ${ token }`
                }
            })
            
            return response.data as DarfI
        } catch (error :unknown) {
            if (error instanceof AxiosError) {
                const data = error.response?.data

                if (typeof data === 'string') {
                    throw new Error(data)
                }

                throw new Error(
                    data?.message ||
                    data?.error ||
                    'Erro ao atualizar DARF'
                )
            }

            throw new Error('Erro inesperado')
        }
    },

    cancelPagamento: async (id :string, token :string | undefined) => {
        if(!id) { throw new Error("Erro ao cancelar o pagamento da DARF") }
        try {
            const response = await api.patch('/darf/desfazerpagamento', { id }, {
                headers: {
                    Authorization: `Bearer ${ token }`
                }
            })
            
            return response.data as DarfI
        } catch (error :unknown) {
            if (error instanceof AxiosError) {
                const data = error.response?.data

                if (typeof data === 'string') {
                    throw new Error(data)
                }

                throw new Error(
                    data?.message ||
                    data?.error ||
                    'Erro ao desfazer o registro de pagamento.'
                )
            }

            throw new Error('Erro inesperado')
        }
    }
}

export default darfService