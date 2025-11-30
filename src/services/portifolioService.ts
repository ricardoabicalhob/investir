import api from "./api"
import { AxiosError } from "axios"

const portifolioService = { 
    getInfo: async (userId :string) => {
        if(!userId) { throw new Error("Informe o ID do usuário") }
        try {
            const response = await api.get(`/portifolio?userId=${userId}`)
            
            return response.data
        } catch (error :unknown) {
            if(error instanceof AxiosError) {
                throw new Error(error.response?.data.error)
            }
        }
    }
}

export default portifolioService