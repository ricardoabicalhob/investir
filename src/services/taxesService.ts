import type { TradeModality } from "@/interfaces/orderBreakdown.interface"
import api from "./api"
import { AxiosError } from "axios"

const taxesService = { 
    getInfo: async (userId :string, year :number | undefined, month :number | undefined, modality :TradeModality) => {
        if(!userId || !year || !month) { throw new Error("Esperado um userId (string), um ano (number) e um mês (number)") }
        try {
            const response = await api.get(`/imposto?userId=${userId}&year=${year}&month=${month}&modality=${modality}`)
            return response.data
        } catch (error :unknown) {
            if(error instanceof AxiosError) {
                throw new Error(error.response?.data.error)
            }
        }
    }
}

export default taxesService