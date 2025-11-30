import api from "./api"
import { AxiosError } from "axios"

const planningService = { 
    getInfo: async (userId :string, investment :number) => {
        if(!userId) { throw new Error("Esperado um userId (string)") }
        try {
            const response = await api.get(`/planejamento?userId=${userId}&investment=${investment}`)
            return response.data
        } catch (error :unknown) {
            if(error instanceof AxiosError) {
                throw new Error(error.response?.data.error)
            }
        }
    }
}

export default planningService