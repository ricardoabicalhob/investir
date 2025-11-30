import { showErrorToast, showSuccesToast } from "@/utils/toasts"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { converterValorDeCentavosParaReais, obterPosicaoAtualDaCarteiraEmCentavos, obterQuantidadeAtualDeAcoesDeUmAtivo, removeTrailingF } from "@/utils/assets.utils"
import type { RecommendedAssetCreate } from "@/interfaces/recommendedAsset.interface"
import { useCreateRecommendedAsset } from "@/queries/recommendedAsset"
import { useEffect, useMemo, useState } from "react"
import type { ApiResponse, StockResult } from "@/interfaces/quote.interface"
import { AxiosError } from "axios"
import api from "@/services/api"
import type { OrderPresenter } from "@/interfaces/order.interface"

interface FormCreateRecommendedAssetProps {
    userId :string
    ordens :OrderPresenter[]
    listaDeAtivosCotacaoBrapi :StockResult[]
}

export function FormCreateRecommendedAsset({
    userId,
    ordens,
    listaDeAtivosCotacaoBrapi
} :FormCreateRecommendedAssetProps) {

    const [ validatedAssetBrapi, setValidatedAssetBrapi ] = useState<StockResult>()

    const [ assetSymbol, setAssetSymbol ] = useState<string>("")
    const [ myHeritage, setMyHeritage ] = useState<number>(0)
    const [ plannedPercentage, setPlannedPercentage ] = useState<number>(0)
    const [ amount, setAmount ] = useState<number>(0)
    const [ recommendedValue, setRecommendedValue ] = useState<number>(0)
    const [ unitPrice, setUnitPrice ] = useState<number>(0)
    
    const valueToBeAdjusted = useMemo(()=> {
            if(!plannedPercentage) return 0
            return recommendedValue - (amount * unitPrice)
        }, [recommendedValue, amount, unitPrice])

    const { mutate: createRecommendedAsset } = useCreateRecommendedAsset()

    async function validateSymbol(symbol :string) {
        const token = import.meta.env.VITE_BRAPI_API_KEY

        if(!symbol) {
            setValidatedAssetBrapi(undefined)
            return
        }

        const assetSymbolRevedTrailingF = removeTrailingF(assetSymbol)

        try {
            const response = await api.get(`https://brapi.dev/api/quote/${assetSymbolRevedTrailingF}?token=${token}`)
            const data :ApiResponse = response.data

            setValidatedAssetBrapi(data.results[0])
            setAssetSymbol(data.results[0].symbol)
            setUnitPrice(data.results[0].regularMarketPrice)
        } catch (error :unknown) {
            if(error instanceof AxiosError) {
                showErrorToast(error.response?.data.message)
            }
        }
    }

    function handleSubmit(e :React.FormEvent) {
        e.preventDefault()
        
        if( assetSymbol === null || plannedPercentage === null) {
            showErrorToast("Preencha todos os campos!")
            return
        }

        const recommendedAssetToCreate :RecommendedAssetCreate = {
            recommendedAssetSymbol: removeTrailingF(assetSymbol),
            plannedPercentage: plannedPercentage * 1000,
            amount: amount,
            userId: userId
        }

        createRecommendedAsset(recommendedAssetToCreate, {
            onError: (errorCreateRecommendedAsset) => {
                showErrorToast(errorCreateRecommendedAsset.message)
            },
            onSuccess: ()=> {
                showSuccesToast(`${removeTrailingF(assetSymbol)} - Ativo incluído na carteira recomendada!`)
                setAssetSymbol("")
                setPlannedPercentage(0)
                setAmount(0)
                setRecommendedValue(0)
                setUnitPrice(0)
            }
        })
    }

    useEffect(()=> {
        if(ordens) {
            const currentAmount = obterQuantidadeAtualDeAcoesDeUmAtivo(ordens, userId, removeTrailingF(assetSymbol))
            setAmount(currentAmount)

            if(!plannedPercentage) {
                setRecommendedValue(0)
            } else {
                setRecommendedValue(((myHeritage * 100) * plannedPercentage) / 10000)
            }
        }
    }, [assetSymbol, ordens, plannedPercentage])

    useEffect(()=> {
        setMyHeritage(
            converterValorDeCentavosParaReais(
                obterPosicaoAtualDaCarteiraEmCentavos(
                    listaDeAtivosCotacaoBrapi || [], 
                    ordens || [], 
                    userId
                )
            )
        )
    }, [listaDeAtivosCotacaoBrapi])

    return(
        <form onSubmit={handleSubmit} className="flex flex-col min-w-fit gap-4 pr-3 pb-6 overflow-y-auto overflow-x-hidden custom-scrollbar">
                        
            <div className="flex flex-col gap-3">
                <Label htmlFor="asset-shortname" className="px-1">
                    Ativo
                </Label>
                <Input 
                    id="asset-shortname"
                    type="text"
                    placeholder="Nome do ativo"
                    value={assetSymbol}
                    onKeyDown={e => { if(e.key === 'Enter') e.preventDefault() }}
                    onChange={(e)=> setAssetSymbol(e.target.value)}
                    onBlur={(e)=> {
                        validateSymbol(e.target.value)
                    }}
                    className="bg-my-background-secondary selection:bg-blue-500 text-my-foreground-secondary border-0 focus:!ring-[1px] ml-0.5"
                    onFocus={e => e.target.select()}
                />
            </div>

            {
                assetSymbol && validatedAssetBrapi?.logourl && validatedAssetBrapi.symbol === assetSymbol &&
                    <div className="flex gap-2 items-center">
                        <img src={validatedAssetBrapi?.logourl} alt="" className='rounded-sm w-10 h-10' />
                        <span className="text-xs">{validatedAssetBrapi.shortName}</span>
                    </div>
            }

            <div className="flex flex-col gap-3">
                <Label htmlFor="planned-percentage" className="px-1">
                    Percentual planejado (%)
                </Label>
                <Input 
                    id="planned-percentage"
                    type="number"
                    placeholder="0"
                    step={"0.01"}
                    min={0}
                    max={100}
                    value={plannedPercentage}
                    onChange={(e)=> {setPlannedPercentage(parseFloat(e.target.value))}}
                    className="bg-my-background-secondary selection:bg-blue-500 text-my-foreground-secondary border-0 focus:!ring-[1px] ml-0.5"
                    onFocus={e => e.target.select()}
                />
            </div>

            <div className="flex flex-col gap-3">
                <Label htmlFor="current-value" className="px-1">
                    Valor atual
                </Label>
                <span className="ml-1 px-2.5 py-2 rounded-md select-none text-sm bg-my-background-secondary cursor-no-drop">
                    { (amount * unitPrice).toLocaleString('pt-BR', {style: "currency", currency: "BRL"}) || (0).toLocaleString('pt-BR', {style: "currency", currency: "BRL"}) }
                </span>
            </div>

            <div className="flex flex-col gap-3">
                <Label htmlFor="recommended-value" className="px-1">
                    Valor recomendado
                </Label>
                <span className="ml-1 px-2.5 py-2 rounded-md select-none text-sm bg-my-background-secondary cursor-no-drop">
                    { recommendedValue.toLocaleString('pt-BR', {style: "currency", currency: "BRL"}) || (0).toLocaleString('pt-BR', {style: "currency", currency: "BRL"}) }
                </span>
            </div>

            <div className="flex flex-col gap-3">
                <Label htmlFor="value-adjusted" className="px-1">
                    Valor a ajustar
                </Label>
                <span className="ml-1 px-2.5 py-2 rounded-md select-none text-sm bg-my-background-secondary cursor-no-drop">
                    { valueToBeAdjusted.toLocaleString('pt-BR', {style: "currency", currency: "BRL"}) || (0).toLocaleString('pt-BR', {style: "currency", currency: "BRL"}) }
                </span>
            </div>

            <Button
                type="submit"
                className="focus:ring-my-foreground-secondary/50 focus:!ring-[1px] ml-0.5 cursor-pointer"
            >
                Salvar
            </Button>
        </form>
    )
}