import type { DarfI } from "@/interfaces/darf.interface";
import { MoedaEmReal } from "./moeda-percentual";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { DialogUpdateDarf } from "./dialog-update-darf";
import { AlertDialogMessage } from "./alert-dialog";
import { useDeleteDarf, useUpdatePagamentoDarf } from "@/queries/darf";
import { showErrorToast, showSuccesToast } from "@/utils/toasts";
import { AlertDialogTrigger } from "./ui/alert-dialog";
import { Checkbox } from "./ui/checkbox";
import { LoadingSpinner } from "./loading-spinner";
import { DialogDarf } from "./dialog-darf";

interface TableDarfsProps {
    darfs :DarfI[]
}

export function TableDarfs({
    darfs
} :TableDarfsProps) {

    // const icons = {
    //     "swing_trade": "monitoring",
    //     "day_trade": "acute"
    // }

    const modalities = {
        "swing_trade": "Swing Trade",
        "day_trade": "Day Trade"
    }

    const { mutate: deleteDarf } = useDeleteDarf()
    const { mutate: updatePagamentoDarf, isPending: isPendingUpdatePagamento } = useUpdatePagamentoDarf()

    function handelDeleteDarf(id :string) {
        deleteDarf(id, {
            onError: (errorDeleteDarf) => {
                showErrorToast(errorDeleteDarf.message)
            },
            onSuccess: ()=> {
                showSuccesToast(`DARF excluída!`)
            }
        })
    }

    function handlePagamentoDarf(id :string) {
        updatePagamentoDarf(id, {
            onError: (errorUpdatedDarf) => {
                showErrorToast(errorUpdatedDarf.message)
            },
            onSuccess: (darfUpdated)=> {
                showSuccesToast(`${darfUpdated?.paga ? 'Pagamento realizado.' : 'Pagamento pendente.'}`)
            }
        })
    }

    return(
        <Table>
            <TableCaption>Lista de DARFs</TableCaption>
            <TableHeader className="sticky top-0 bg-my-background z-10">
                <TableHead className="text-my-foreground-secondary text-xs font-normal opacity-60 text-center">Período de apuração</TableHead>
                <TableHead className="text-my-foreground-secondary text-xs font-normal opacity-60 text-center">Modalidade</TableHead>
                <TableHead className="text-my-foreground-secondary text-xs font-normal opacity-60 text-center w-[5%]">Código da Receita</TableHead>
                <TableHead className="text-my-foreground-secondary text-xs font-normal opacity-60 text-center">Vencimento</TableHead>
                <TableHead className="text-my-foreground-secondary text-xs font-normal opacity-60 text-center">Valor do principal</TableHead>
                <TableHead className="text-my-foreground-secondary text-xs font-normal opacity-60 text-center">Multa</TableHead>
                <TableHead className="text-my-foreground-secondary text-xs font-normal opacity-60 text-center">Juros / Encargos</TableHead>
                <TableHead className="text-my-foreground-secondary text-xs font-normal opacity-60 text-center">Valor total</TableHead>
                <TableHead className="text-my-foreground-secondary text-xs font-normal opacity-60 text-center">Paga?</TableHead>
                <TableHead className="text-my-foreground-secondary text-xs font-normal opacity-60 text-center">Ações</TableHead>
            </TableHeader>
            <TableBody>
                {darfs &&
                    darfs.map(darf => (
                        <TableRow key={darf.id}>
                            <TableCell className="text-my-foreground-secondary text-left tabular-nums">{darf.periodoApuracao.replace('-', '/')}</TableCell>
                            <TableCell className="text-my-foreground-secondary text-left">{modalities[darf.modality]}</TableCell>
                            <TableCell className="text-my-foreground-secondary text-right tabular-nums">{darf.codReceita}</TableCell>
                            <TableCell className="text-my-foreground-secondary text-right tabular-nums">{new Date(darf.dueDate).toLocaleDateString("pt-BR")}</TableCell>
                            <TableCell className="text-my-foreground-secondary text-right tabular-nums"><MoedaEmReal centavos={darf.valorDoPrincipal} /></TableCell>
                            <TableCell className="text-my-foreground-secondary text-right tabular-nums"><MoedaEmReal centavos={darf.valorDaMulta} /></TableCell>
                            <TableCell className="text-my-foreground-secondary text-right tabular-nums"><MoedaEmReal centavos={darf.valorJurosEncargos} /></TableCell>
                            <TableCell className="text-my-foreground-secondary text-right tabular-nums"><MoedaEmReal centavos={darf.valorTotal} /></TableCell>
                            <TableCell className="text-my-foreground-secondary text-center">
                                {!isPendingUpdatePagamento &&
                                    <Checkbox 
                                        className="cursor-pointer data-[state=checked]:text-lime-base"
                                        checked={darf.paga} 
                                        onClick={()=> handlePagamentoDarf(darf.id)}    
                                />}
                                {isPendingUpdatePagamento && 
                                    <LoadingSpinner size="sm" className="text-lime-base" isLoading={isPendingUpdatePagamento}/>}
                            </TableCell>
                            <TableCell>
                                
                                <div className="flex gap-1 items-center justify-center">
                                    <DialogDarf
                                        darf={darf}
                                    />

                                    <DialogUpdateDarf 
                                        darf={darf}
                                    />

                                    <AlertDialogMessage
                                        title={
                                            <p className="flex items-center gap-2">
                                                <span className="material-symbols-outlined text-lime-base !text-4xl">warning</span>
                                                <span>Você tem certeza?</span>
                                            </p>
                                        }
                                        message={
                                            <p>A DARF de <span className="text-my-foreground-secondary font-bold">{modalities[darf.modality]}</span> registrada para o período de apuração <span className="text-my-foreground-secondary font-bold">{darf.periodoApuracao.replace('-', '/')}</span> será excluída definivamente. Deseja continuar?</p>
                                        }
                                        action={()=> {
                                            handelDeleteDarf(darf.id)
                                        }}
                                    >
                                        <AlertDialogTrigger>
                                            <button 
                                                className="material-symbols-outlined text-lime-secondary opacity-60 hover:bg-my-foreground/50 p-1 rounded-full cursor-pointer" 
                                                style={{fontSize: 22}}
                                            >
                                                delete
                                            </button>
                                        </AlertDialogTrigger>
                                    </AlertDialogMessage>
                                </div>
                                
                            </TableCell>
                        </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}