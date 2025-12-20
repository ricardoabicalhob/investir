import { useQuery } from "@tanstack/react-query"
import { planningKeys } from "./keys"
import type { PlanningSumary } from "@/interfaces/planning.interface"
import planningService from "@/services/planningService"

// type PlanningPayload = { userId :string, investment :number }

export const usePlanning = (userId :string, investment :number, token :string | undefined) => {
    return useQuery<PlanningSumary>({
        queryKey: planningKeys.list(userId, investment),
        queryFn: ()=> planningService.getInfo(userId, investment, token),
        staleTime: 1000 * 60 * 5,
    })
}