import type { OrderCreate, OrderPresenter, OrderToUpdate } from "@/interfaces/order.interface"
import api from "./api"
import { AxiosError } from "axios"

const orderService = { 
    createOrder: async (order :OrderCreate) => {
        if(!order) { throw new Error("Erro durante a criação da ordem") }
        try {
            const response = await api.post('/ordem', order)
            
            return response.data as OrderPresenter
        } catch (error :unknown) {
            if(error instanceof AxiosError) {
                throw new Error(error.response?.data.error)
            }
        }
    },
    deleteOrder: async (orderToDelete :OrderPresenter | undefined) => {
        if(!orderToDelete) { throw new Error("Erro ao deletar a ordem") }
        try {
            const response = await api.delete(`/ordem`, { data: orderToDelete })

            return response.data
        } catch (error :unknown) {
            if(error instanceof AxiosError) {
                throw new Error(error.response?.data.error)
            }
        }
    },
    updateOrder: async (orderToUpdate :OrderToUpdate) => {
        if(!orderToUpdate) { throw new Error("Erro ao atualizar a ordem") }
        try {
            const response = await api.patch('/ordem', orderToUpdate)
            
            return response.data as OrderPresenter
        } catch (error :unknown) {
            if(error instanceof AxiosError) {
                throw new Error(error.response?.data.error)
            }
        }
    },
    listAmountTradedByAsset: async (userId :string) => {
        if(!userId) { throw new Error("Informe o ID do usuário") }
        try {
            const response = await api.get(`/ordem/totalnegociado?userId=${userId}`)

            return response.data
        } catch (error :unknown) {
            if(error instanceof AxiosError) {
                throw new Error(error.response?.data.error)
            }
        }
    },
    listByMonth: async (userId :string, year :number, month :number) => {
        if(!userId || year === undefined || month === undefined) { throw new Error("ID do usuário, mês ou ano inválidos.") }
        try {
            const response = await api.get(`/ordem/mes?userId=${userId}&year=${year}&month=${month}`)

            return response.data
        } catch (error :unknown) {
            if(error instanceof AxiosError) {
                throw new Error(error.response?.data.error)
            }
        }
    },
    getOrders: async (userId :string) => {
        if(!userId) { throw new Error("Informe o ID do usuário") }
        try {
            const response = await api.get(`/ordem?userId=${userId}`)
            return response.data || null
        } catch (error :unknown) {
            if(error instanceof AxiosError) {
                throw new Error(error.response?.data.error)
            }
        }
    }
}

export default orderService