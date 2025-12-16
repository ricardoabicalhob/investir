import type { DarfI } from "@/interfaces/darf.interface"
import type { OrderPresenter } from "@/interfaces/order.interface"
import { formatPeriodoApuracaoToString } from "./formatters"

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

export function filtarListaDeDarfs(str :string, arr :DarfI[]) :DarfI[]{
    if(!str) {
        return arr
    }

    const modalities = {
        "swing_trade": "SWING TRADE",
        "day_trade": "DAY TRADE"
    }

    const termoBusca = str.toUpperCase()
    const termoBuscaSplit = termoBusca
        .split(",")
        .map(termo => termo.trim())
        .filter(termo => termo.length > 0)
    
    const arrFiltrado = arr.filter(item => {
        const modality = modalities[item.modality]
        const periodoApuracao = formatPeriodoApuracaoToString(item.periodoApuracao)
        const situacoes = item.paga
            ? ["PAGA"]
            : ["PENDENTE", "VEDADO"]
        const dueDate = new Date(item.dueDate).toLocaleDateString("pt-BR")
        const paymentDate = item.paymentDate ? new Date(item.paymentDate).toLocaleDateString("pt-BR") : ""

        return termoBuscaSplit.every(termo =>
            modality.includes(termo) ||
            periodoApuracao.includes(termo) ||
            situacoes.some(s => s.includes(termo)) ||
            dueDate.includes(termo) ||
            paymentDate.includes(termo)
        )
    })
    return arrFiltrado
}