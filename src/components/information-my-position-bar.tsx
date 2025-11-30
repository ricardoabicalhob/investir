import type { OrderPresenter } from "@/interfaces/order.interface"
import type { StockResult } from "@/interfaces/quote.interface"
import { 
    converterValorDeCentavosParaReais, 
    formatarPercentualComVirgula, 
    obterPosicaoAtualDaCarteiraEmCentavos, 
    obterResultadoDaCarteiraEmCentavos, 
    obterResultadoDaCarteiraEmPercentual, 
    obterResultadoDePerformanceDaCarteira 
} from "@/utils/assets.utils"

interface InformationMyPositionBarProps {
    title :string
    userId :string
    listaDeOrdens :OrderPresenter[]
    listaDeAtivosQuotacaoBrapi :StockResult[]
}

export default function InformationMyPositionBar({ title, userId, listaDeOrdens, listaDeAtivosQuotacaoBrapi } :InformationMyPositionBarProps) {
    return(
        <div className="flex flex-col w-full gap-1 bg-my-background-secondary rounded-md px-3 py-1">
            <span className="font-semibold">
                { title }
            </span>
            <span 
                style={{fontFamily: 'Montserrat, sans-serif', letterSpacing: '2px', fontSize: 24}} 
                className="text-2xl font-semibold text-my-foreground-secondary"
            >
                {
                    converterValorDeCentavosParaReais(
                        obterPosicaoAtualDaCarteiraEmCentavos(
                            listaDeAtivosQuotacaoBrapi, 
                            listaDeOrdens, 
                            userId
                        )
                    ).toLocaleString('pt-BR', {style: "currency", currency: "BRL"})
                }
            </span>
            <div className="flex items-center gap-1">
                {
                    obterResultadoDePerformanceDaCarteira(listaDeAtivosQuotacaoBrapi, listaDeOrdens, userId) < 0 &&
                    <span className="material-symbols-outlined select-none text-red-destructive" style={{fontSize: 24}}>arrow_drop_down</span>
                }
                {
                    converterValorDeCentavosParaReais(
                        obterResultadoDaCarteiraEmCentavos(
                            listaDeAtivosQuotacaoBrapi, 
                            listaDeOrdens, 
                            userId 
                        )
                    ).toLocaleString('pt-BR', {style: "currency", currency: "BRL"})
                }
                {
                    obterResultadoDePerformanceDaCarteira(listaDeAtivosQuotacaoBrapi, listaDeOrdens, userId) > 0 &&
                    <span className="material-symbols-outlined select-none text-green-base" style={{fontSize: 24}}>arrow_drop_up</span>
                }
                {
                    <span style={{fontFamily: 'Montserrat, sans-serif', letterSpacing: '2px', fontSize: 14}}>
                        ({
                            formatarPercentualComVirgula(
                                obterResultadoDaCarteiraEmPercentual(
                                    listaDeAtivosQuotacaoBrapi, 
                                    listaDeOrdens,
                                    userId
                                )
                            ).toLocaleString('pt-BR', {style: "percent", currency: "BRL", minimumFractionDigits: 2, maximumFractionDigits: 2})
                        })
                    </span>
                }

            </div>
        </div>
    )
}