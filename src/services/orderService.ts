import type { OrderCreate, OrderPresenter, OrderToUpdate } from "@/interfaces/order.interface"
import api from "./api"
import { AxiosError } from "axios"

const orderService = { 
    createOrder: async (orderToCreate :OrderCreate, token :string | undefined) => {
        if(!orderToCreate) { throw new Error("Erro durante a criação da ordem") }
        try {
            const response = await api.post('/ordem', orderToCreate, {
                headers: {
                    Authorization: `Bearer ${ token }`
                }
            })
            
            return response.data as OrderPresenter
        } catch (error :unknown) {
             if (error instanceof AxiosError) {
                const data = error.response?.data

                if (typeof data === 'string') {
                    throw new Error(data)
                }

                throw new Error(
                    data?.message ||
                    data?.error ||
                    'Erro ao criar a ordem'
                )
            }

            throw new Error('Erro inesperado')
        }
    },
    deleteOrder: async (id :string | undefined, token :string | undefined) => {
        if(!id) { throw new Error("Erro ao deletar a ordem") }
        
        try {
            const response = await api.delete(`/ordem?id=${id}`, {
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
                    'Erro ao excluir a ordem'
                )
            }

            throw new Error('Erro inesperado')
        }
    },
    updateOrder: async (orderToUpdate :OrderToUpdate, token :string | undefined) => {
        if(!orderToUpdate) { throw new Error("Erro ao atualizar a ordem") }
        try {
            const response = await api.patch('/ordem', orderToUpdate, {
                headers: {
                    Authorization: `Bearer ${ token }`
                }
            })
            
            return response.data as OrderPresenter
        } catch (error :unknown) {
            if (error instanceof AxiosError) {
                const data = error.response?.data

                if (typeof data === 'string') {
                    throw new Error(data)
                }

                throw new Error(
                    data?.message ||
                    data?.error ||
                    'Erro ao atualizar a ordem'
                )
            }

            throw new Error('Erro inesperado')
        }
    },
    listByMonth: async (userId :string, year :number, month :number, token :string | undefined) => {
        if(!userId || year === undefined || month === undefined) { throw new Error("ID do usuário, mês ou ano inválidos.") }
        try {
            const response = await api.get(`/ordem/mes?userId=${userId}&year=${year}&month=${month}`, {
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
                    'Erro ao listar as ordens'
                )
            }

            throw new Error('Erro inesperado')
        }
    },
    getOrders: async (userId :string, token :string | undefined) => {
        if(!userId) { throw new Error("Informe o ID do usuário") }
        try {
            const response = await api.get(`/ordem?userId=${userId}`, {
                headers: {
                    Authorization: `Bearer ${ token }`
                }
            })
            return response.data || null
        } catch (error :unknown) {
            if (error instanceof AxiosError) {
                const data = error.response?.data

                if (typeof data === 'string') {
                    throw new Error(data)
                }

                throw new Error(
                    data?.message ||
                    data?.error ||
                    'Erro ao listar as ordens'
                )
            }

            throw new Error('Erro inesperado')
        }
    }
}

export default orderService