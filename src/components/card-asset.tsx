import { MoedaEmReal } from "./moeda-percentual"
import React, { useEffect, useState } from "react"
import type { AssetPresenter } from "@/interfaces/asset.interface"

interface CardAssetProps {
    ativo :AssetPresenter
}

function CardAsset({ ativo } :CardAssetProps) {

    const [imageLoaded, setImageLoaded] = useState(false)
    const [imageError, setImageError] = useState(false)

    const resultadoEhNegativo = parseFloat(ativo.resultadoDoAtivoEmPercentual) < 0
    const resultadoEhZero = parseFloat(ativo.resultadoDoAtivoEmPercentual) === 0

    if(ativo.quantidadeAtualDeAcoes === 0) return null

    const EmptySymbol = () => {
        return(
            <div className="flex items-center justify-center rounded-sm min-w-10 max-w-10 min-h-10 max-h-10 bg-my-background border border-lime-base/50">
                <span className="material-symbols-outlined text-lime-base" style={{fontSize: 32}}>
                    finance_mode
                </span>
            </div>
        )
    }

    useEffect(() => {
        setImageLoaded(false)
        setImageError(false)
    }, [ativo.logoUrl])

    return(
        <div className="flex flex-col min-h-[210px] max-h-[210px] min-w-[290px] max-[600px]:max-w-full max-w-[24%] grow gap-3 bg-my-background-secondary rounded-md px-3 py-2.5 border border-[#29292E]">
            <div className="flex items-center gap-3">
                {(!imageLoaded || imageError) && <EmptySymbol />}

                {ativo.logoUrl.trim() && (
                    <img
                        src={ativo.logoUrl}
                        alt="logo-brapi"
                        className={`rounded-sm w-10 h-10 ${imageLoaded ? "block" : "hidden"}`}
                        onLoad={() => setImageLoaded(true)}
                        onError={() => setImageError(true)}
                    />
                )}
                
                <div className="flex flex-col w-full gap-2">
                    <div className="flex w-full gap-3 items-center justify-between">
                        <span className="font-semibold text-sm">{ativo.assetSymbol}</span>
                        <div className="flex gap-2 flex-wrap">
                            <span className="font-normal text-[9px]">Atualizado em: </span>
                            <span className="font-light text-[9px]">{new Date(ativo.regularMarketTime).toLocaleDateString("pt-BR")}</span>
                            <span className="font-light text-[9px]">{new Date(ativo.regularMarketTime).toLocaleTimeString("pt-BR")}</span>
                        </div>
                    </div>
                    <span className="font-semibold text-[10px]">{ativo.shortName}</span>
                </div>
            </div>
            <div className="flex flex-col gap-3">
                <div className="flex justify-between">
                    <span className="text-xs text-my-foreground-secondary">Quantidade</span>
                    <span className="text-xs text-my-foreground-secondary">{ativo.quantidadeAtualDeAcoes}</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-xs text-my-foreground-secondary">Preço médio</span>
                    <span className="text-xs text-my-foreground-secondary">
                        <MoedaEmReal centavos={ativo.precoMedioBrutoPagoNoAtivoEmCentavos}/>
                    </span>
                </div>
                <div className="flex justify-between">
                    <span className="text-xs text-my-foreground-secondary">Preço atual</span>
                    <span className="text-xs text-my-foreground-secondary">
                        <MoedaEmReal centavos={ativo.precoAtualDoAtivoEmCentavos}/>
                    </span>
                </div>
                <div className="flex justify-between">
                    <span className="text-xs text-my-foreground-secondary">Posição</span>
                    <span className="text-xs text-my-foreground-secondary">
                        <MoedaEmReal centavos={ativo.posicaoAtualDoAtivoEmCentavos}/>
                    </span>
                </div>
                <div className="flex justify-between">
                    <span className="text-xs text-my-foreground-secondary">Resultado total</span>
                    <div className="flex gap-1 items-center">
                        <span className="text-xs text-my-foreground-secondary">
                            <MoedaEmReal centavos={ativo.resultadoDoAtivoEmCentavos}/>
                        </span>
                        <div className={`flex gap-0 items-center text-xs ${ resultadoEhZero ? "text-my-foreground-secondary" : resultadoEhNegativo ? 'text-red-destructive' : 'text-green-base' }`}>
                            <span className="text-my-foreground-secondary">(</span>
                            { !resultadoEhZero && <span className="material-symbols-outlined select-none">
                                { resultadoEhNegativo ? "arrow_drop_down" : "arrow_drop_up"}
                            </span>}
                                {ativo.resultadoDoAtivoEmPercentual}
                            <span className="text-my-foreground-secondary pl-1">)</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default React.memo(CardAsset)