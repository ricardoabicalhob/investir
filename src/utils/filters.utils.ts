import type { OrderPresenter } from "@/interfaces/order.interface"

export function filtarListaDeOrdens(str :string, arr :OrderPresenter[]) :OrderPresenter[]{
    if(!str) {
        return arr
    }

    const termoBusca = str.toUpperCase()
    const termoBuscaSplit = termoBusca
        .split(",")
        .map(termo => termo.trim())
        .filter(termo => termo.length > 0)
    
    const arrFiltrado = arr.filter(item => {
        const orderDate = new Date(item.orderDate).toLocaleDateString("pt-BR")
        const assetSymbol = item.symbol
        const operationType = item.operationType.toUpperCase()
        const assetType = item.assetType.toUpperCase()

        return termoBuscaSplit.every(termo =>
            assetSymbol.includes(termo) ||
            orderDate.includes(termo) ||
            assetType.includes(termo) ||
            operationType.includes(termo)
        )
    })
    return arrFiltrado
}