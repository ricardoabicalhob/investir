import { useMutation, useQuery } from "@tanstack/react-query"
import { assetKeys, orderKeys, planningKeys, portifolioKeys, recommendedAssetKeys, taxesKeys } from "./keys"
import { queryClient } from "@/services/queryClient"
import type { OrderCreate, OrderPresenter, OrderToUpdate } from "@/interfaces/order.interface"
import orderService from "@/services/orderService"

export const useOrders = (userId :string, token :string | undefined) => {
    return useQuery<OrderPresenter[]>({
        queryKey: orderKeys.list(),
        queryFn: ()=> orderService.getOrders(userId, token),
        staleTime: 1000 * 60 * 5
    })
}

export const useOrdersListByMonth = (userId :string, year :number, month :number, token :string | undefined) => {
    return useQuery<OrderPresenter[]>({
        queryKey: orderKeys.listByMonth(userId, year, month),
        queryFn: () => orderService.listByMonth(userId, year, month, token),
        staleTime: 1000 * 60 * 5
    })
}

export const useCreateOrder = () => {

    type InputOrderCreate = { orderToCreate :OrderCreate, token :string | undefined }

    return useMutation<OrderCreate | undefined , Error, InputOrderCreate>({
        mutationFn: ({orderToCreate, token} :InputOrderCreate) => orderService.createOrder(orderToCreate, token),
        onSuccess: (createdOrder) => {
            queryClient.invalidateQueries({ queryKey: orderKeys.all })
            queryClient.invalidateQueries({ queryKey: assetKeys.all })
            queryClient.invalidateQueries({ queryKey: portifolioKeys.all })
            queryClient.invalidateQueries({ queryKey: planningKeys.all })
            queryClient.invalidateQueries({ queryKey: taxesKeys.all })
            queryClient.invalidateQueries({ queryKey: recommendedAssetKeys.all })
            createdOrder && queryClient.setQueryData(orderKeys.create(createdOrder), createdOrder)
        },
        onError: (error) => {
            console.error('Falha ao criar a ordem', error)
        },
        onSettled: () => {
            //isso é executado independente do sucesso ou falha
        }
    })
}


type InputOrderDelete = { id :string, token :string | undefined }

export const useDeleteOrder = () => {
    return useMutation<OrderPresenter | undefined, Error, InputOrderDelete>({
        mutationFn: ({id, token} :InputOrderDelete) => orderService.deleteOrder(id, token),
        onSuccess: (deletedOrder) => {
            queryClient.invalidateQueries({ queryKey: orderKeys.all })
            queryClient.invalidateQueries({ queryKey: assetKeys.all })
            queryClient.invalidateQueries({ queryKey: recommendedAssetKeys.all })
            queryClient.invalidateQueries({ queryKey: portifolioKeys.all })
            queryClient.invalidateQueries({ queryKey: planningKeys.all })
            queryClient.invalidateQueries({ queryKey: taxesKeys.all })
            deletedOrder && queryClient.setQueryData(orderKeys.delete(deletedOrder.id), deletedOrder)
        },
        onError: (error) => {
            console.error('Falha ao excluir a ordem', error)
        },
        onSettled: () => {
            //isso é executado independente do sucesso ou falha            
        }
    })
}

type InputOrderUpdate = { orderToUpdate :OrderToUpdate, token :string | undefined }

export const useUpdateOrder = () => {
    return useMutation<OrderPresenter | undefined, Error, InputOrderUpdate>({
        mutationFn: ({orderToUpdate, token} :InputOrderUpdate) => orderService.updateOrder(orderToUpdate, token),
        onSuccess: (updatedOrder) => {
            queryClient.invalidateQueries({ queryKey: orderKeys.all })
            queryClient.invalidateQueries({ queryKey: assetKeys.all })
            queryClient.invalidateQueries({ queryKey: recommendedAssetKeys.all })
            queryClient.invalidateQueries({ queryKey: portifolioKeys.all })
            queryClient.invalidateQueries({ queryKey: planningKeys.all })
            queryClient.invalidateQueries({ queryKey: taxesKeys.all })
            updatedOrder && queryClient.setQueryData(orderKeys.update(updatedOrder), updatedOrder)
        },
        onError: (error) => {
            console.error('Falha ao criar a ordem', error)
        },
        onSettled: () => {
            //isso é executado independente do sucesso ou falha
        } 
    })
}