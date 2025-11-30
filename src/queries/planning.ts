import { useQuery } from "@tanstack/react-query"
import { planningKeys } from "./keys"
import type { PlanningSumary } from "@/interfaces/planning.interface"
import planningService from "@/services/planningService"

// type PlanningPayload = { userId :string, investment :number }

export const usePlanning = (userId :string, investment :number) => {
    return useQuery<PlanningSumary>({
        queryKey: planningKeys.list(userId, investment),
        queryFn: ()=> planningService.getInfo(userId, investment),
        staleTime: 1000 * 60 * 5,
    })
}

// export const usePlanning = () => {
//     return useMutation<PlanningSumary, Error, PlanningPayload>({
//         mutationFn: ({ userId, investment }) => planningService.getInfo(userId, investment),
//         onSuccess: (planningInfo, planningPayload) => {
//             const { userId, investment } = planningPayload
//             if(!planningInfo) return

//             planningInfo && queryClient.setQueryData(planningKeys.list(userId, investment), planningInfo)
//             queryClient.invalidateQueries({ queryKey: planningKeys.all })
//         }
//     })
// }