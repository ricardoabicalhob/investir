import type { AtivoPlanejadoConsolidado } from "@/interfaces/ativoPlanejadoConsolidado.interface";
import type { OrderPresenter } from "@/interfaces/order.interface";

export function removeTrailingF(assetName :string) {
    if(assetName.length === 0) {
        return assetName
    }

    const lastChar = assetName[assetName.length - 1]

    if(lastChar.toLowerCase() === 'f') {
        return assetName.slice(0, -1)
    }

    return assetName
}

//=====================================================================================================

export function converterValorDeCentavosParaReais(valorEmCentavos :number) {
    return valorEmCentavos / 100
}

export function formatarPercentualComVirgula(percentualSemVirgula :number) {
    return percentualSemVirgula / 100000
}

export function obterQuantidadeDeAcoesCompradasDeUmAtivo(listaDeOrdens :OrderPresenter[], userId :string, symbol :string) {
    return listaDeOrdens.filter(ordem => {
        return ordem.userId === userId && ordem.status === "ativa" && ordem.symbol === symbol && ordem.operationType === "compra"
    })
    .reduce((acumulado, ordemAtual) => {
        return acumulado += ordemAtual.amount
    }, 0)
}

export function obterQuantidadeDeAcoesVendidasDeUmAtivo(listaDeOrdens :OrderPresenter[], userId :string, symbol :string) {
    return listaDeOrdens.filter(ordem => {
        return ordem.userId === userId && ordem.status === "ativa" && ordem.symbol === symbol && ordem.operationType === "venda"
    })
    .reduce((acumulado, ordemAtual) => {
        return acumulado += ordemAtual.amount
    }, 0)
}

export function obterQuantidadeAtualDeAcoesDeUmAtivo(listaDeOrdens :OrderPresenter[], userId :string, symbol :string) {
    const quantidadeDeAcoesCompradas = obterQuantidadeDeAcoesCompradasDeUmAtivo(listaDeOrdens, userId, symbol)
    const quantidadeDeAcoesVendidas = obterQuantidadeDeAcoesVendidasDeUmAtivo(listaDeOrdens, userId, symbol)
    return quantidadeDeAcoesCompradas - quantidadeDeAcoesVendidas
}

export function obterPrecoMedioBrutoPagoNoAtivoEmCentavos(listaDeOrdens :OrderPresenter[], userId :string, symbol :string) {
    // preco médio bruto = (preco unitario * quantidade) + taxas de operação
    const totalPagoNoAtivoEmCentavos = listaDeOrdens.filter(ordem => {
        return ordem.userId === userId && ordem.status === "ativa" && ordem.symbol === symbol && ordem.operationType === "compra"
    })
    .reduce((acumulado, ordemAtual) => {
        return acumulado += (ordemAtual.amount * ordemAtual.unitPrice) + (ordemAtual.fees || 0)
    }, 0)

    const quantidadeDeAcoesCompradas = obterQuantidadeDeAcoesCompradasDeUmAtivo(listaDeOrdens, userId, symbol)

    if(quantidadeDeAcoesCompradas === 0) return 0
    
    return totalPagoNoAtivoEmCentavos / quantidadeDeAcoesCompradas
}









export interface DataChartAsset {
    assetSymbol :string
    assetWeight :string
}

export function dataChartMinhaCarteiraDeAtivos(ativosPlanejadosConsolidados :AtivoPlanejadoConsolidado[]) {
    const dataChartMyWallet :DataChartAsset[] = []
    ativosPlanejadosConsolidados.map(ativo => {
        dataChartMyWallet.push({ assetSymbol: ativo.symbol, assetWeight: ativo.percentualAtual })    
    })
    return dataChartMyWallet
}

export function dataChartMinhaCarteiraDeAtivosPlanejada(ativosPlanejadosConsolidados :AtivoPlanejadoConsolidado[]) {
    const dataChartMyWallet :DataChartAsset[] = []

    let espacoOcupado = 0

    ativosPlanejadosConsolidados.map(ativo => {
        dataChartMyWallet.push({ assetSymbol: ativo.symbol, assetWeight: ativo.percentualPlanjado })
        espacoOcupado += parseFloat(ativo.percentualPlanjado)
    })
    
    if(espacoOcupado < 100) {
        dataChartMyWallet.push({
            assetSymbol: "ESPAÇO DISPONÍVEL",
            assetWeight: (100 - espacoOcupado).toFixed(2) + "%"
        })
    }
    return dataChartMyWallet ?? []
}