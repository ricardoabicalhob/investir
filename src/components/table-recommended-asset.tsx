import { MoedaEmReal } from "./moeda-percentual"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "./ui/table"
import { showErrorToast, showSuccesToast } from "@/utils/toasts"
import { useDeleteRecommendedAsset } from "@/queries/recommendedAsset"
import { DialogCreateOrderByRebalancing } from "./dialog-create-order-by-rebalancing"
import { DialogUpdateRecommendedAsset } from "./dialog-update-recommended-asset"
import type { AtivoPlanejadoConsolidado } from "@/interfaces/ativoPlanejadoConsolidado.interface"
import { MiniLoadingSpinner } from "./mini-loading-spinner"
import { TypeOperationIndicator } from "./type-operation_indicator"
import { AlertDialogMessage } from "./alert-dialog"
import { AlertDialogTrigger } from "./ui/alert-dialog"

interface TableRecommendedAssetProps {
    userId :string
    ativosPlanejadosConsolidados :AtivoPlanejadoConsolidado[]
}

export function TableRecommendedAsset({
    userId,
    ativosPlanejadosConsolidados
} :TableRecommendedAssetProps) {

    const { mutate: deleteRecommendedAsset } = useDeleteRecommendedAsset()

    return(
        <Table>
            <TableCaption>Ativos incluídos no planejamento de sua carteira</TableCaption>
            <TableHeader className="sticky top-0 bg-my-background z-10">
                <TableHead className="text-my-foreground-secondary text-xs font-normal opacity-60 text-center">Ativo</TableHead>
                <TableHead className="text-my-foreground-secondary text-xs font-normal opacity-60 text-center">Código</TableHead>
                <TableHead className="text-my-foreground-secondary text-xs font-normal opacity-60 text-center">% atual</TableHead>
                <TableHead className="text-my-foreground-secondary text-xs font-normal opacity-60 text-center">Valor atual</TableHead>
                <TableHead className="text-my-foreground-secondary text-xs font-normal opacity-60 text-center">% planejado</TableHead>
                <TableHead className="text-my-foreground-secondary text-xs font-normal opacity-60 text-center">Valor planejado</TableHead>
                <TableHead className="text-my-foreground-secondary text-xs font-normal opacity-60 text-center">Valor a ajustar</TableHead>
                <TableHead className="text-my-foreground-secondary text-xs font-normal opacity-60 text-center">Recomendação</TableHead>
                <TableHead className="text-my-foreground-secondary text-xs font-normal opacity-60 text-center">Ações</TableHead>
            </TableHeader>
            <TableBody>
                {
                    ativosPlanejadosConsolidados?.map(ativo => {

                        return(
                            <TableRow key={ativo.symbol}>
                                <TableCell className="text-my-foreground-secondary">
                                    {!ativo.logoUrl && <MiniLoadingSpinner size="sm" isLoading={!!ativo.logoUrl} className="text-lime-base/50" />}
                                    {ativo.logoUrl && <img src={ativo.logoUrl} alt="" className='rounded-sm w-6 h-6 justify-self-center' />}
                                </TableCell>
                                
                                <TableCell className="text-my-foreground-secondary text-center">
                                    { ativo.symbol ?? '-' }
                                </TableCell>
                            
                                <TableCell className="text-my-foreground-secondary text-right">
                                    { ativo.percentualAtual ?? "" }
                                </TableCell>

                                <TableCell className="text-my-foreground-secondary text-right">
                                    <MoedaEmReal
                                        centavos={ ativo.posicaoAtualEmCentavos ?? 0 }
                                    />
                                </TableCell>

                                <TableCell className="text-my-foreground-secondary text-right">
                                        {ativo.percentualPlanjado ?? "-"}
                                </TableCell>

                                <TableCell className="text-my-foreground-secondary text-right">
                                    <MoedaEmReal
                                        centavos={ ativo.posicaoPlajadaEmCentavos ?? 0 }
                                    />
                                </TableCell>
                                <TableCell className="text-my-foreground-secondary text-right">
                                    <MoedaEmReal
                                        centavos={ ativo.valorDeAjusteEmCentavos ?? 0 }
                                    />
                                </TableCell>
                                <TableCell className="text-my-foreground-secondary">
                                    <div className="flex w-[60%] h-full items-center gap-2 justify-self-end">
                                        <TypeOperationIndicator
                                            typeOperation={ativo.recomendacaoDe}
                                        />
                                    </div>    
                                </TableCell>
                                <TableCell>
                                    <div className="flex gap-1 items-center justify-center">
                                                                                
                                        <DialogCreateOrderByRebalancing
                                            userId={userId}
                                            initialOperationType={ativo.recomendacaoDe === "venda" ? "Venda" : "Compra"}
                                            initialAssetSymbol={ativo.symbol}
                                            assetLogourl={ativo.logoUrl ?? ""}
                                        />

                                        <DialogUpdateRecommendedAsset 
                                            ativoPlanejado={ativo}
                                        />
                                        

                                        <AlertDialogMessage
                                            title={
                                                <p className="flex items-center gap-2">
                                                    <span className="material-symbols-outlined text-lime-base !text-4xl">warning</span>
                                                    <span>Você tem certeza?</span>
                                                </p>
                                            }
                                            message={
                                                <p><span className="text-my-foreground-secondary font-bold">{ativo.symbol}</span> será excluído definitivamente do seu planejamento. Deseja continuar?</p>
                                            }
                                            action={()=> {
                                                deleteRecommendedAsset(ativo.id, {
                                                    onError: (errorDeleteRecommendedAsset) => {
                                                        showErrorToast(`${ativo.symbol} - ${errorDeleteRecommendedAsset.message}`)
                                                    },
                                                    onSuccess: ()=> {
                                                        showSuccesToast(`Ativo ${ativo.symbol} removido do planejamento!`)
                                                    }
                                                })
                                            }}
                                        >
                                            <AlertDialogTrigger>
                                                <button 
                                                    className="material-symbols-outlined text-lime-secondary opacity-60 hover:bg-my-foreground/50 p-1 rounded-full cursor-pointer" style={{fontSize: 22}}
                                                >
                                                    delete
                                                </button>
                                            </AlertDialogTrigger>
                                        </AlertDialogMessage>
                                    </div>
                                </TableCell>
                            </TableRow>
                        )
                    })
                }
            </TableBody>
        </Table>
    )
}