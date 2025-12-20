import { useQuery } from "@tanstack/react-query"
import { portifolioKeys } from "./keys"
import portifolioService from "@/services/portifolioService"
import type { PortifolioSummary } from "@/interfaces/portifolio.interface"

export const usePortifolio = (userId :string, token :string | undefined) => {
    return useQuery<PortifolioSummary>({
        queryKey: portifolioKeys.list(),
        queryFn: ()=> portifolioService.getInfo(userId, token),
        staleTime: 1000 * 60 * 5
    })
}