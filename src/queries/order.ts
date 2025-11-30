import { useMutation, useQuery } from "@tanstack/react-query"
import { assetKeys, orderKeys, planningKeys, portifolioKeys, recommendedAssetKeys, taxesKeys } from "./keys"
import { queryClient } from "@/services/queryClient"
import type { AmountTradedByAssetPresenter, OrderCreate, OrderPresenter, OrderToUpdate } from "@/interfaces/order.interface"
import orderService from "@/services/orderService"

export const useOrders = (userId :string) => {
    return useQuery<OrderPresenter[]>({
        queryKey: orderKeys.list(),
        queryFn: ()=> orderService.getOrders(userId),
        staleTime: 1000 * 60 * 5
    })
}

export const useOrdersListAmountTradedByAsset = (userId :string) => {
    return useQuery<AmountTradedByAssetPresenter[]>({
        queryKey: orderKeys.listAmountTradedByAsset(userId),
        queryFn: () => orderService.listAmountTradedByAsset(userId),
        staleTime: 1000 * 60 * 5
    })
}

export const useOrdersListByMonth = (userId :string, year :number, month :number) => {
    return useQuery<OrderPresenter[]>({
        queryKey: orderKeys.listByMonth(userId, year, month),
        queryFn: () => orderService.listByMonth(userId, year, month),
        staleTime: 1000 * 60 * 5
    })
}

export const useCreateOrder = () => {
    return useMutation<OrderCreate | undefined , Error, OrderCreate>({
        mutationFn: (newOrder :OrderCreate) => orderService.createOrder(newOrder),
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

export const useDeleteOrder = () => {
    return useMutation<OrderPresenter | undefined, Error, OrderPresenter>({
        mutationFn: (orderToDelete :OrderPresenter) => orderService.deleteOrder(orderToDelete),
        onSuccess: (deletedOrder) => {
            queryClient.invalidateQueries({ queryKey: orderKeys.all })
            queryClient.invalidateQueries({ queryKey: assetKeys.all })
            queryClient.invalidateQueries({ queryKey: recommendedAssetKeys.all })
            queryClient.invalidateQueries({ queryKey: portifolioKeys.all })
            queryClient.invalidateQueries({ queryKey: planningKeys.all })
            queryClient.invalidateQueries({ queryKey: taxesKeys.all })
            deletedOrder && queryClient.setQueryData(orderKeys.delete(deletedOrder), deletedOrder)
        },
        onError: (error) => {
            console.error('Falha ao excluir a ordem', error)
        },
        onSettled: () => {
            //isso é executado independente do sucesso ou falha            
        }
    })
}

export const useUpdateOrder = () => {
    return useMutation<OrderPresenter | undefined, Error, OrderToUpdate>({
        mutationFn: (orderToUpdate :OrderToUpdate) => orderService.updateOrder(orderToUpdate),
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