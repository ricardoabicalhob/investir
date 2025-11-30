import MonthYearPicker from "@/components/calendar-impostos"
import { Display, DisplayBody, DisplayContent, DisplayItem, DisplayHeader, DisplayTitle } from "@/components/display"
import { LoadingSpinner } from "@/components/loading-spinner"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { AuthContext } from "@/contexts/auth.context"
import type { StockResult } from "@/interfaces/quote.interface"
import { cn } from "@/lib/utils"
import { useOrdersListByMonth } from "@/queries/orders"
import { useListQuoteBrapiByOrders } from "@/queries/quoteBrapi"
import { converterValorDeCentavosParaReais } from "@/utils/assets.utils"
import { calcularCustoDeAquisicaoTotalDosAtivosEmCentavos, calcularGanhoDeCapitalDaOrdemVendaEmCentavos, calcularGanhoDeCapitalDosAtivosEmCentavos, calcularGanhoDeCapitalTotalComAVendaDosAtivosEmCentavos, calcularIRSobreGanhoDeCapitalEmCentavos, calcularReceitaBrutaTotalComAVendaDosAtivosEmCentavos, somarIRRFSobreOrdensDeVendaEmCentavos } from "@/utils/taxes.utils"
import { useContext, useState } from "react"

export default function Impostos() {

    const { loginResponse } = useContext(AuthContext)
    const userId = loginResponse?.objetoResposta.id || ""

    const testeNovaTabela = true

    const [ selectedDate, setSelectedDate ] = useState<Date | undefined>(new Date())
    const selectedMonth = selectedDate ? selectedDate.getMonth() : undefined
    const selectedYear = selectedDate ? selectedDate.getFullYear() : undefined

    const { data: ordens } = useOrdersListByMonth(userId, selectedYear || 0, selectedMonth || 0)
    
    const { data: listaDeOrdensCotacaoBrapi, isLoading: isLoadingListaDeOrdensCotacaoBrapi, isError: isErrorListaDeOrdensCotacaoBrapi } = useListQuoteBrapiByOrders(ordens || [])

    const ordensVenda = ordens?.filter(ordem => ordem.operationType === "venda") || []
    const ganhosConsolidados = calcularGanhoDeCapitalDosAtivosEmCentavos(ordensVenda)

    const receitaBrutaTotalEmCentavos = calcularReceitaBrutaTotalComAVendaDosAtivosEmCentavos(ganhosConsolidados)
    const custoAquisicaoTotalEmCentavos = calcularCustoDeAquisicaoTotalDosAtivosEmCentavos(ganhosConsolidados)
    const ganhoCapitalTotalEmCentavos = calcularGanhoDeCapitalTotalComAVendaDosAtivosEmCentavos(ganhosConsolidados)
    const irDevidoEmCentavos = calcularIRSobreGanhoDeCapitalEmCentavos(receitaBrutaTotalEmCentavos, ganhoCapitalTotalEmCentavos, 2_000_000, "Ações", "Swing Trade")
    const irrfSomadoEmCentavos = somarIRRFSobreOrdensDeVendaEmCentavos(ordensVenda)

    const isPrejuizo = ganhoCapitalTotalEmCentavos < 0

    const displayCards = [
        {
            title: "Total de vendas",
            valueInCentavos: receitaBrutaTotalEmCentavos,
            valueClassName: "text-my-foreground-secondary text-right"
        },
        {
            title: "Custo de aquisição total",
            valueInCentavos: custoAquisicaoTotalEmCentavos,
            valueClassName: "text-my-foreground !text-lg text-right"
        },
        {
            title: isPrejuizo ? "Prejuízo a compensar" : "Ganho de capital",
            valueInCentavos: ganhoCapitalTotalEmCentavos,
            valueClassName: cn("!text-lg text-right text-my-foreground", isPrejuizo ? "text-red-destructive font-bold" : "text-lime-base/50 font-bold")
        },
        {
            title: isPrejuizo ? "IRRF (Crédito)" : `Imposto de renda (15% - IRRF)`,
            valueInCentavos:irDevidoEmCentavos === 0 
                ? (isPrejuizo 
                    ? irrfSomadoEmCentavos 
                    : 0) 
                : (irDevidoEmCentavos - irrfSomadoEmCentavos),
            valueClassName: cn("!text-lg text-right text-my-foreground", isPrejuizo ? "text-lime-base/50" : (irDevidoEmCentavos > 0 ? "text-yellow-500/50" : "text-my-foreground"))
        }
    ]

    const isLoading = isLoadingListaDeOrdensCotacaoBrapi
    const isError = isErrorListaDeOrdensCotacaoBrapi

    if(isError) return <p className="text-my-foreground-secondary p-6">Erro durante o carregamento!</p>

    if(testeNovaTabela) {
        return(
            <div className="flex gap-3 flex-1 w-full h-full text-my-foreground-secondary p-3">
                <LoadingSpinner isLoading={isLoading} message="Carregando ordens de venda..." size="xl" className="text-lime-base/50" />
                <div className="flex flex-col gap-3">

                <MonthYearPicker 
                    date={selectedDate} 
                    setDate={setSelectedDate} 
                    startYear={2020}
                />

                {
                    displayCards.map(card => (
                        <Display key={card.title}>
                            <DisplayHeader>
                                <DisplayTitle>{card.title}</DisplayTitle>
                            </DisplayHeader>
                            <DisplayBody>
                                <DisplayContent>
                                    <DisplayItem className={card.valueClassName}>
                                        {
                                            converterValorDeCentavosParaReais(
                                                card.valueInCentavos
                                            ).toLocaleString('pt-BR', {style: "currency", currency: "BRL"}) || "R$ 0,00"
                                        }
                                    </DisplayItem>
                                </DisplayContent>
                            </DisplayBody>
                        </Display>
                    ))
                }
                {
                    ganhoCapitalTotalEmCentavos > 0 &&
                    <Display>
                        <DisplayHeader>
                            <DisplayTitle>IRRF (Imposto Retido na Fonte)</DisplayTitle>
                        </DisplayHeader>
                        <DisplayBody>
                            <DisplayContent>
                                <DisplayItem className="text-my-foreground !text-lg text-right">
                                    {
                                        converterValorDeCentavosParaReais(irrfSomadoEmCentavos).toLocaleString('pt-BR', {style: "currency", currency: "BRL"}) || "R$ 0,00"
                                    }
                                </DisplayItem>
                            </DisplayContent>
                        </DisplayBody>
                    </Display>
                }
                </div>
                <div className="flex grow w-full overflow-y-auto overflow-x-hidden border-[#29292E] border rounded-md p-2 custom-scrollbar-div">
                    <Table>
                        <TableCaption>Lista de ordens</TableCaption>
                        <TableHeader>
                            <TableHead className="text-lime-secondary text-xs font-bold opacity-60 text-center">Ativo</TableHead>
                            <TableHead className="text-lime-secondary text-xs font-bold opacity-60 text-center">Código</TableHead>
                            <TableHead className="text-lime-secondary text-xs font-bold opacity-60 text-center">Quantidade</TableHead>
                            <TableHead className="text-lime-secondary text-xs font-bold opacity-60 text-center">Taxas</TableHead>
                            <TableHead className="text-lime-secondary text-xs font-bold opacity-60 text-center">IRRF</TableHead>
                            <TableHead className="text-lime-secondary text-xs font-bold opacity-60 text-center w-[10%] whitespace-normal">Receita bruta</TableHead>
                            <TableHead className="text-lime-secondary text-xs font-bold opacity-60 text-center w-[10%] whitespace-normal">Receita líquida operacional</TableHead>
                            <TableHead className="text-lime-secondary text-xs font-bold opacity-60 text-center w-[10%] whitespace-normal">Receita líquida contábil</TableHead>
                            <TableHead className="text-lime-secondary text-xs font-bold opacity-60 text-center w-[10%] whitespace-normal">Custo de aquisição</TableHead>
                            <TableHead className="text-lime-secondary text-xs font-bold opacity-60 text-center">Ganho de capital</TableHead>
                        </TableHeader>
                        <TableBody>
                            {ordens && calcularGanhoDeCapitalDosAtivosEmCentavos(ordens
                                .filter(ordem => ordem.operationType === "venda"))
                                .map(ativo => (
                                    <TableRow key={ativo.symbol}>
                                        <TableCell className="text-my-foreground-secondary">
                                            <img src={listaDeOrdensCotacaoBrapi?.find((assetBRAPI :StockResult) => { return ativo.symbol === assetBRAPI.symbol })?.logourl} alt="" className='rounded-sm w-6 h-6 justify-self-center' />
                                        </TableCell>
                                        <TableCell className="text-my-foreground-secondary text-center">{ativo.symbol}</TableCell>
                                        <TableCell className="text-my-foreground-secondary text-right">{ativo.quantidadeTotal}</TableCell>
                                        <TableCell className="text-my-foreground-secondary text-right">{converterValorDeCentavosParaReais(ativo.totalDeTaxasEmCentavos).toLocaleString('pt-BR', {style: "currency", currency: "BRL"})}</TableCell>
                                        <TableCell className="text-my-foreground-secondary text-right">{converterValorDeCentavosParaReais(ativo.totalIRRFEmCentavos).toLocaleString('pt-BR', {style: "currency", currency: "BRL"})}</TableCell>
                                        <TableCell className="text-my-foreground-secondary text-right">{converterValorDeCentavosParaReais(ativo.receitaBrutaTotalEmCentavos).toLocaleString('pt-BR', {style: "currency", currency: "BRL"})}</TableCell>
                                        <TableCell className="text-my-foreground-secondary text-right">{converterValorDeCentavosParaReais(ativo.receitaLiquidaOperacionalTotalEmCentavos).toLocaleString('pt-BR', {style: "currency", currency: "BRL"})}</TableCell>
                                        <TableCell className="text-my-foreground-secondary text-right">{converterValorDeCentavosParaReais(ativo.receitaLiquidaContabilTotalEmCentavos).toLocaleString('pt-BR', {style: "currency", currency: "BRL"})}</TableCell>
                                        <TableCell className="text-my-foreground-secondary text-right">{converterValorDeCentavosParaReais(ativo.custoDeAquisicaoTotalEmCentavos).toLocaleString('pt-BR', {style: "currency", currency: "BRL"})}</TableCell>
                                        <TableCell className="text-my-foreground-secondary text-right">{converterValorDeCentavosParaReais(ativo.ganhoDeCapitalTotalEmCentavos).toLocaleString('pt-BR', {style: "currency", currency: "BRL"})}</TableCell>
                                    </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
        )
    }

    return(
        <div className="flex flex-1 w-full h-full text-my-foreground-secondary p-6">
            <div className="flex grow w-full overflow-y-auto overflow-x-hidden border-[#29292E] border rounded-md p-2 custom-scrollbar-div">
                <Table>
                    <TableCaption>Lista de ordens</TableCaption>
                    <TableHeader>
                        <TableHead className="text-lime-secondary text-xs font-bold opacity-60 text-center">Data da venda</TableHead>
                        <TableHead className="text-lime-secondary text-xs font-bold opacity-60 text-center">Tipo</TableHead>
                        <TableHead className="text-lime-secondary text-xs font-bold opacity-60 text-center">Ativo</TableHead>
                        <TableHead className="text-lime-secondary text-xs font-bold opacity-60 text-center">Código</TableHead>
                        <TableHead className="text-lime-secondary text-xs font-bold opacity-60 text-center">Quantidade</TableHead>
                        <TableHead className="text-lime-secondary text-xs font-bold opacity-60 text-center">Preço unit.</TableHead>
                        <TableHead className="text-lime-secondary text-xs font-bold opacity-60 text-center">Taxas</TableHead>
                        <TableHead className="text-lime-secondary text-xs font-bold opacity-60 text-center">IRRF</TableHead>
                        <TableHead className="text-lime-secondary text-xs font-bold opacity-60 text-center">Total + taxas</TableHead>
                        <TableHead className="text-lime-secondary text-xs font-bold opacity-60 text-center w-[10%] whitespace-normal">Preço médio de aquisição</TableHead>
                        <TableHead className="text-lime-secondary text-xs font-bold opacity-60 text-center w-[10%] whitespace-normal">Custo de aquisição</TableHead>
                        <TableHead className="text-lime-secondary text-xs font-bold opacity-60 text-center">Ganho de capital</TableHead>
                    </TableHeader>
                    <TableBody>
                        {ordens && ordens
                            .filter(ordem => ordem.operationType === "venda")
                            .map(ordem => (
                                <TableRow key={ordem.id}>
                                    <TableCell className="text-my-foreground-secondary">{new Date(ordem.orderDate).toLocaleDateString("pt-BR")}</TableCell>
                                    <TableCell className="text-my-foreground-secondary">{ordem.assetType}</TableCell>
                                    <TableCell className="text-my-foreground-secondary">
                                        <img src={listaDeOrdensCotacaoBrapi?.find((assetBRAPI :StockResult) => { return ordem.symbol === assetBRAPI.symbol })?.logourl} alt="" className='rounded-sm w-6 h-6 justify-self-center' />
                                    </TableCell>
                                    <TableCell className="text-my-foreground-secondary text-center">{ordem.symbol}</TableCell>
                                    <TableCell className="text-my-foreground-secondary text-right">{ordem.amount}</TableCell>
                                    <TableCell className="text-my-foreground-secondary text-right">{converterValorDeCentavosParaReais(ordem.unitPrice).toLocaleString('pt-BR', {style: "currency", currency: "BRL"})}</TableCell>
                                    <TableCell className="text-my-foreground-secondary text-right">{converterValorDeCentavosParaReais(ordem.fees || 0).toLocaleString('pt-BR', {style: "currency", currency: "BRL"})}</TableCell>
                                    <TableCell className="text-my-foreground-secondary text-right">{converterValorDeCentavosParaReais(ordem.taxes || 0).toLocaleString('pt-BR', {style: "currency", currency: "BRL"})}</TableCell>
                                    <TableCell className="text-my-foreground-secondary text-right">{converterValorDeCentavosParaReais(((ordem.unitPrice * ordem.amount) + (ordem.fees || 0))).toLocaleString('pt-BR', {style: "currency", currency: "BRL"})}</TableCell>
                                    <TableCell className="text-my-foreground-secondary text-right">{converterValorDeCentavosParaReais(ordem.averagePrice).toLocaleString('pt-BR', {style: "currency", currency: "BRL"})}</TableCell>
                                    <TableCell className="text-my-foreground-secondary text-right">{converterValorDeCentavosParaReais(ordem.averagePrice * ordem.amount).toLocaleString('pt-BR', {style: "currency", currency: "BRL"})}</TableCell>
                                    <TableCell className="text-my-foreground-secondary text-right">
                                        {
                                            converterValorDeCentavosParaReais(
                                                calcularGanhoDeCapitalDaOrdemVendaEmCentavos(ordem)
                                            ).toLocaleString('pt-BR', {style: "currency", currency: "BRL"})
                                        }
                                    </TableCell>
                                </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}