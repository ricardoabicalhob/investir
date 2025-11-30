import type { OrderPresenter } from "@/interfaces/order.interface";

export function calcularGanhoDeCapitalDaOrdemVendaEmCentavos(ordemDeVenda :OrderPresenter) :number{
    // ganhoDeCapital = ((valorDaVenda * quantidadeVendida) - custosDeVenda) - (precoMedio * quantidadeVendida)
        const custoDeAquisicao = (ordemDeVenda.averagePrice * ordemDeVenda.amount)
        const valorDaOrdem = ordemDeVenda.unitPrice * ordemDeVenda.amount
        const ganhoDeCapitalAcumulado :number = valorDaOrdem - (ordemDeVenda.fees || 0) - custoDeAquisicao
        return ganhoDeCapitalAcumulado
}

export function calcularReceitaBrutaDaOrdemDeVendaEmCentavos(ordemDeVenda :OrderPresenter) :number{
    // receita bruta = quantidade * preço unitário
    return ordemDeVenda.amount * ordemDeVenda.unitPrice
}

export function calcularReceitaLiquidaDaOrdemDeVendaEmCentavos(ordemDeVenda :OrderPresenter) :number{
    // receita líquida = receita bruta - taxas operacionais
    const receitaBrutaEmCentavos = calcularReceitaBrutaDaOrdemDeVendaEmCentavos(ordemDeVenda)
    return receitaBrutaEmCentavos - (ordemDeVenda.fees || 0)
}

export function calcularIRRFsobreOrdemDeVendaEmCentavos(amount :number, unitPriceEmReais :number) {
    // IRRF da Ordem de Venda = (Preço de Venda * Quantidade Vendida) * 0,005%
    const unitPriceEmCentavos = unitPriceEmReais * 100
    const valorTotalDaVendaEmCentavos = unitPriceEmCentavos * amount
    const irrfEmCentavos = Math.round((valorTotalDaVendaEmCentavos * 5) / 100_000) //Math.round() - arredonda para o número inteiro mais próximo
    return irrfEmCentavos
}

export function somarIRRFSobreOrdensDeVendaEmCentavos(listaDeOrdensDeVenda :OrderPresenter[]) :number{
    return listaDeOrdensDeVenda.reduce((acumulado, ordemAtual) => {
        return acumulado += ordemAtual.taxes || 0
    }, 0)
}

export type AtivoConsolidado = {
    symbol :string,
    quantidadeTotal :number,
    totalDeTaxasEmCentavos :number,
    totalIRRFEmCentavos :number,
    custoDeAquisicaoTotalEmCentavos :number,
    receitaBrutaTotalEmCentavos :number,
    receitaLiquidaOperacionalTotalEmCentavos :number,
    receitaLiquidaContabilTotalEmCentavos :number,
    ganhoDeCapitalTotalEmCentavos :number
}

export function calcularGanhoDeCapitalDosAtivosEmCentavos(listaDeOrdensDeVenda :OrderPresenter[]) :AtivoConsolidado[]{
    // ativo, código, quantidade, taxas, IR, preço médio de aquisição, total + taxas (receita), custo de aquisição, ganho de capital
    const consolidadoPorAtivo = listaDeOrdensDeVenda.reduce((acumulado, ordemAtual) => {
        const { symbol, amount, fees, taxes, unitPrice, averagePrice } = ordemAtual

        const custoDeAquisicaoEmCentavos = averagePrice * amount
        const receitaBrutaEmCentavos = unitPrice * amount
        const receitaLiquidaOperacionalEmCentavos = (unitPrice * amount) - (fees || 0)
        const receitaLiquidaContabilEmCentavos = (unitPrice * amount) - (fees || 0) - (taxes || 0)
        const ganhoDeCapitalEmCentavos = receitaLiquidaOperacionalEmCentavos - custoDeAquisicaoEmCentavos

            if(!acumulado[symbol]) {
                acumulado[symbol] = {
                    symbol,
                    quantidadeTotal: 0,
                    totalDeTaxasEmCentavos: 0,
                    totalIRRFEmCentavos: 0,
                    custoDeAquisicaoTotalEmCentavos: 0,
                    receitaBrutaTotalEmCentavos: 0,
                    receitaLiquidaOperacionalTotalEmCentavos: 0,
                    receitaLiquidaContabilTotalEmCentavos: 0,
                    ganhoDeCapitalTotalEmCentavos: 0
                }
            }

            acumulado[symbol].quantidadeTotal += amount
            acumulado[symbol].totalDeTaxasEmCentavos += fees || 0
            acumulado[symbol].totalIRRFEmCentavos += taxes || 0
            acumulado[symbol].custoDeAquisicaoTotalEmCentavos += custoDeAquisicaoEmCentavos
            acumulado[symbol].receitaBrutaTotalEmCentavos += receitaBrutaEmCentavos
            acumulado[symbol].receitaLiquidaOperacionalTotalEmCentavos += receitaLiquidaOperacionalEmCentavos
            acumulado[symbol].receitaLiquidaContabilTotalEmCentavos += receitaLiquidaContabilEmCentavos
            acumulado[symbol].ganhoDeCapitalTotalEmCentavos += ganhoDeCapitalEmCentavos

            return acumulado
    }, {} as { [key: string]: AtivoConsolidado })

    return Object.values(consolidadoPorAtivo)
}

export function calcularReceitaBrutaTotalComAVendaDosAtivosEmCentavos(ativosConsolidados :AtivoConsolidado[]) :number{
    return ativosConsolidados.reduce((acumulado, ativoAtual) => {
        return acumulado += ativoAtual.receitaBrutaTotalEmCentavos
    }, 0)
}

export function calcularReceitaLiquidaOperacionalTotalComAVendaDosAtivosEmCentavos(ativosConsolidados :AtivoConsolidado[]) :number{
    return ativosConsolidados.reduce((acumulado, ativoAtual) => {
        return acumulado += ativoAtual.receitaLiquidaOperacionalTotalEmCentavos
    }, 0)
}

export function calcularReceitaLiquidaContabilTotalComAVendaDosAtivosEmCentavos(ativosConsolidados :AtivoConsolidado[]) :number{
    return ativosConsolidados.reduce((acumulado, ativoAtual) => {
        return acumulado += ativoAtual.receitaLiquidaContabilTotalEmCentavos
    }, 0)
}

export function calcularCustoDeAquisicaoTotalDosAtivosEmCentavos(ativosConsolidados :AtivoConsolidado[]) :number{
    return ativosConsolidados.reduce((acumulado, ativoAtual) => {
        return acumulado += ativoAtual.custoDeAquisicaoTotalEmCentavos
    }, 0)
}

export function calcularGanhoDeCapitalTotalComAVendaDosAtivosEmCentavos(ativosConsolidados :AtivoConsolidado[]) :number{
    return ativosConsolidados.reduce((acumulado, ativoAtual) => {
        return acumulado += ativoAtual.ganhoDeCapitalTotalEmCentavos
    }, 0)
}

export function calcularIRSobreGanhoDeCapitalEmCentavos(
    receitaBrutaTotalEmCentavos :number, 
    ganhoDeCapitalTotalEmCentavos :number, 
    limiteIsencaoIrEmCentavos :number,
    tipoDeAtivo :"Ações" | "Futuros" | "ETFs" | "FIIs" | "Opcões",
    tipoDeOperacao :"Day Trade" | "Swing Trade" 
) {    
    // Imposto a Pagar (DARF) = (Resultado Líquido do Mês * 15%) - somatória(IRRF Retido em Todas as Ordens de Venda do Mês)
    if(receitaBrutaTotalEmCentavos <= limiteIsencaoIrEmCentavos) { return 0 }
    //15% = 0,15
    
    // Considerando apenas para operações swing-trade
    const aliquotasPorTipoDeOperacao = new Map([
        ["Ações",      new Map([["Day Trade", 20], ["Swing Trade", 15]])],
        ["Futuros",    new Map([["Day Trade", 20], ["Swing Trade", 15]])],
        ["ETFs",       new Map([["Day Trade", 20], ["Swing Trade", 15]])],
        ["FIIs",       new Map([["Day Trade", 20], ["Swing Trade", 20]])],
        ["Opções",     new Map([["Day Trade", 20], ["Swing Trade", 15]])],
    ]) 

    const aliquota = aliquotasPorTipoDeOperacao.get(tipoDeAtivo)?.get(tipoDeOperacao) ?? 0

    const impostoDevidoEmCentavos = Math.floor(ganhoDeCapitalTotalEmCentavos * aliquota) / 100
    return impostoDevidoEmCentavos
}

// const LIMITE_ISENCAO_CENTAVOS = 2000000; // R$ 20.000,00 * 100

// const ALIQUOTA_IR = 0.15;

// export function calcularImpostoDevidoEmCentavos(ativosConsolidados: AtivoConsolidado[]): number {
//     // 1. Consolida os totais do mês (Receita Bruta, Lucro/Prejuízo, IRRF Retido)
//     const totaisMensais = ativosConsolidados.reduce((acumulado, ativoAtual) => {
//         acumulado.receitaBrutaTotal += ativoAtual.grosslRevenue
//         acumulado.ganhoDeCapitalTotal += ativoAtual.totalCapitalGain
//         acumulado.irrfRetidoTotal += ativoAtual.totalTaxes
//         return acumulado
//     }, {
//         receitaBrutaTotal: 0,
//         ganhoDeCapitalTotal: 0,
//         irrfRetidoTotal: 0,
//     })

//     const { receitaBrutaTotal, ganhoDeCapitalTotal, irrfRetidoTotal } = totaisMensais

//     let impostoDevidoBruto = 0

//     if (receitaBrutaTotal <= LIMITE_ISENCAO_CENTAVOS) {
        
//         if (ganhoDeCapitalTotal > 0) {
//             impostoDevidoBruto = 0;
//         } else if (ganhoDeCapitalTotal < 0) {
//             impostoDevidoBruto = 0;
//         }

//     } else {

//         if (ganhoDeCapitalTotal > 0) {
//             impostoDevidoBruto = Math.floor(ganhoDeCapitalTotal * ALIQUOTA_IR)
//         } else if (ganhoDeCapitalTotal < 0) {
//             impostoDevidoBruto = 0
//         }
//     }
        
//     const impostoAPagar = impostoDevidoBruto - irrfRetidoTotal;

//     const VALOR_MINIMO_DARF_CENTAVOS = 1000 // R$ 10,00

//     if (impostoAPagar > 0 && impostoAPagar < VALOR_MINIMO_DARF_CENTAVOS) {
//         // Se o valor a pagar for menor que R$ 10,00, ele não deve ser pago neste mês.
//         // O valor deve ser acumulado para o próximo mês em que o total atinja ou ultrapasse R$ 10,00.
//         // O tratamento para esse acúmulo deve ser feito fora desta função.
//         return 0
//     }
    
//     return impostoAPagar
// }