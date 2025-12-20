import { useMutation, useQuery } from "@tanstack/react-query"
import { darfKeys } from "./keys"
import type { TradeModality } from "@/interfaces/orderBreakdown.interface"
import darfService from "@/services/darfService"
import { queryClient } from "@/services/queryClient"
import type { DarfI, DarfToUpdateI } from "@/interfaces/darf.interface"


export const getDarfs = (userId :string, token :string | undefined) => {
    return useQuery<DarfI[]>({
        queryKey: darfKeys.list(userId),
        queryFn: () => darfService.getDarfs(userId, token),
        staleTime: 1000 * 60 * 5
    })
}

type InputCreateDarf = { userId :string, selectedYear :number, selectedMonth :number, tradeModality :TradeModality, token :string }

export const useCreateDarf = () => {
    return useMutation<DarfI , Error, InputCreateDarf>({
        mutationFn: ({ userId, selectedYear, selectedMonth: month, tradeModality: modality, token } :InputCreateDarf) => darfService.createDarf(userId, selectedYear, month, modality, token),
        onSuccess: (createdDarf, {userId, selectedYear, selectedMonth, tradeModality}) => {
            queryClient.invalidateQueries({ queryKey: darfKeys.all })
            createdDarf && queryClient.setQueryData(darfKeys.create(userId, selectedYear, selectedMonth, tradeModality), createdDarf)
        },
        onError: (error) => {
            console.error('Falha ao criar a Darf!', error)
        },
        onSettled: () => {
            //isso é executado independente do sucesso ou falha
        }
    })
}

type InputDeleteDarf = {id :string, token :string}

export const useDeleteDarf = () => {
    return useMutation<DarfI, Error, InputDeleteDarf>({
        mutationFn: (input :InputDeleteDarf) => darfService.deleteDarf(input.id, input.token),
        onSuccess: (deletedDarf, {id}) => {
            queryClient.invalidateQueries({ queryKey: darfKeys.all })
            deletedDarf && queryClient.setQueryData(darfKeys.delete(id), deletedDarf)
        },
        onError: (error) => {
            console.error('Falha ao excluir a DARF', error)
        },
        onSettled: () => {
            //isso é executado independente do sucesso ou falha            
        }
    })
}


type InputUpdateDarf = { darfToUpdate :DarfToUpdateI, token :string | undefined }

export const useUpdateDarf = () => {
    return useMutation<DarfI | undefined, Error, InputUpdateDarf>({
        mutationFn: ({ darfToUpdate, token } :InputUpdateDarf) => darfService.updateDarf(darfToUpdate, token),
        onSuccess: (updatedDarf) => {
            queryClient.invalidateQueries({ queryKey: darfKeys.all })
            updatedDarf && queryClient.setQueryData(darfKeys.update(updatedDarf), updatedDarf)
        },
        onError: (error) => {
            console.error('Falha ao atualizar a DARF', error)
        },
        onSettled: () => {
            //isso é executado independente do sucesso ou falha
        } 
    })
}

type InputCancelPagamentoDarf = { id :string, token :string | undefined }

export const useCancelPagamentoDarf = () => {
    return useMutation<DarfI | undefined, Error, InputCancelPagamentoDarf>({
        mutationFn: ({ id, token } :InputCancelPagamentoDarf) => darfService.cancelPagamento(id, token),
        onSuccess: (updatedDarf) => {
            queryClient.invalidateQueries({ queryKey: darfKeys.all })
            updatedDarf && queryClient.setQueryData(darfKeys.update(updatedDarf), updatedDarf)
        },
        onError: (error) => {
            console.error('Falha ao cancelar o pagamento da DARF', error)
        },
        onSettled: () => {
            //isso é executado independente do sucesso ou falha
        } 
    })
}