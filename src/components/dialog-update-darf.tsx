import { useState } from "react"
import { Button } from "./ui/button"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Separator } from "./ui/separator"
import { showErrorToast, showSuccesToast } from "@/utils/toasts"
import { formatCentavosToReal, parseInputToCentavos } from "@/utils/formatters"
import type { DarfI, DarfToUpdateI } from "@/interfaces/darf.interface"
import type { TradeModality } from "@/interfaces/orderBreakdown.interface"
import { useUpdateDarf } from "@/queries/darf"
import { Link } from "react-router"
import Calendar24 from "./calendar-24"

interface DialogUpdateDarfProps {
    darf :DarfI
}

export function DialogUpdateDarf({
    darf,
} :DialogUpdateDarfProps) {

    const modalities = {
        "swing_trade": "Swing Trade",
        "day_trade": "Day Trade"
    }
    
    const [ isUpdateDialogOpen, setIsUpdateDialogOpen ] = useState(false)

    const [ modality, setModality ] = useState<TradeModality>()
    const [ periodoApuracao, setPeriodoApuracao ] = useState<string>()
    const [ codReceitaToUpdate, setCodReceitaToUpdate ] = useState<number>()
    const [ dueDateToUpdate, setDueDateToUpdate ] = useState<Date>()
    const [ centavosValorDoPrincipal, setCentavosValorDoPrincipal ] = useState<string>(darf.valorDoPrincipal.toString())
    const [ centavosValorDaMultaToUpdate, setCentavosValorDaMultaToUpdate ] = useState<string>("")
    const [ centavosValorJurosEncargosToUpdate, setCentavosValorJurosEncargosToUpdate ] = useState<string>("")
    const [ centavosValorTotal, setCentavosValorTotal ] = useState<string>(darf.valorTotal.toString())

    const { mutate: updateDarf } = useUpdateDarf()


    // const handleChangeDueDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     const value = e.target.value;

    //     if (!value) {
    //         setDueDateToUpdate(undefined);
    //         return;
    //     }

    //     // Como o input retorna somente "YYYY-MM-DD", garantimos o horário fixo.
    //     const date = new Date(`${value}T00:00:00`);

    //     if (isNaN(date.getTime())) {
    //         showErrorToast("Data inválida");
    //         return;
    //     }

    //     setDueDateToUpdate(date);
    // }

    const handleChangeValorDoPrincipal = (e :React.ChangeEvent<HTMLInputElement>) => {
        const centavos = parseInputToCentavos(e.target.value)
        setCentavosValorDoPrincipal(centavos)
    }

    const handleChangeValorDaMultaToUpdate = (e :React.ChangeEvent<HTMLInputElement>) => {
        const centavos = parseInputToCentavos(e.target.value)

        setCentavosValorDaMultaToUpdate(centavos)

        const total =
            parseInt(centavosValorDoPrincipal || "0") +
            parseInt(centavos || "0") +
            parseInt(centavosValorJurosEncargosToUpdate || "0")

        setCentavosValorTotal(total.toString())
    }

    const handleChangeValorJurosEncargosToUpdate = (e :React.ChangeEvent<HTMLInputElement>) => {
        const centavos = parseInputToCentavos(e.target.value)

        setCentavosValorJurosEncargosToUpdate(centavos)

        const total =
            parseInt(centavosValorDoPrincipal || "0") +
            parseInt(centavosValorDaMultaToUpdate || "0") +
            parseInt(centavos || "0")

        setCentavosValorTotal(total.toString())
    }

    const handleChangeValorTotal = (e :React.ChangeEvent<HTMLInputElement>) => {
        const centavos = parseInputToCentavos(e.target.value)
        setCentavosValorTotal(centavos)
    }



    function handleSubmitUpdate(e :React.FormEvent) {
        e.preventDefault()
        
        if(codReceitaToUpdate == null || dueDateToUpdate == null || centavosValorDaMultaToUpdate == null || centavosValorJurosEncargosToUpdate == null) {
            showErrorToast("Preencha todos os campos")
            return
        }

        const valorDaMultaInCents :number = parseFloat(parseInputToCentavos(centavosValorDaMultaToUpdate))
        const valorJurosEncargosInCents :number = parseInt(parseInputToCentavos(centavosValorJurosEncargosToUpdate))

        const darfToUpdate :DarfToUpdateI = {
            id: darf.id,
            codReceita: codReceitaToUpdate,
            dueDate: dueDateToUpdate,
            valorDaMulta: valorDaMultaInCents,
            valorJurosEncargos: valorJurosEncargosInCents,
        }

        updateDarf(darfToUpdate, {
            onError: (errorUpdateOrder) => {
                showErrorToast(errorUpdateOrder.message)
            },
            onSuccess: ()=> {
                setIsUpdateDialogOpen(false)
                showSuccesToast("DARF alterada com sucesso!")
            }
        })
    }

    return(
        <Dialog open={isUpdateDialogOpen} onOpenChange={(open)=> {
            setIsUpdateDialogOpen(open)

            if(open) {
                setModality(darf.modality)
                setPeriodoApuracao(darf.periodoApuracao)
                setCodReceitaToUpdate(darf.codReceita)
                setDueDateToUpdate(new Date(darf.dueDate))
                setCentavosValorDoPrincipal(parseInputToCentavos(darf.valorDoPrincipal.toString()))
                setCentavosValorDaMultaToUpdate(parseInputToCentavos(darf.valorDaMulta.toString()))
                setCentavosValorJurosEncargosToUpdate(parseInputToCentavos(darf.valorJurosEncargos.toString()))
                setCentavosValorTotal(parseInputToCentavos(darf.valorTotal.toString()))
            }
        }}>
            <form id={`form-update-order-${darf.id}`} onSubmit={handleSubmitUpdate}>
                <DialogTrigger asChild>
                    <span
                        onClick={()=> setIsUpdateDialogOpen(true)}
                        className={`material-symbols-outlined text-lime-secondary opacity-60 hover:bg-my-foreground/50 p-1 rounded-full cursor-pointer`} style={{fontSize: 22}}                                                
                    >
                        edit_square
                    </span>
                </DialogTrigger>
                <DialogContent 
                    onEscapeKeyDown={(e) => e.preventDefault()} 
                    onPointerDownOutside={e => e.preventDefault()}
                    className="sm:max-w-[425px] bg-my-background border-2 border-my-foreground/40 shadow-xl shadow-my-background-secondary"
                >
                <DialogHeader>
                    <DialogTitle className="text-my-foreground-secondary">Editar DARF</DialogTitle>
                    <DialogDescription className="flex gap-3 items-center">
                        Faça alterações na sua DARF aqui. Clique em salvar quando terminar.
                        {/* <img 
                            src={logoUrl} 
                            alt="" 
                            className='rounded-sm w-10 h-10 justify-self-center bg-black 
                            shadow-[0_0_30px_5px_rgba(255,255,255,0.4)]
                            ring-0 ring-white/40
                            ring-offset-[1px] ring-offset-[#303028]
                            border border-white/20
                            backdrop-blur-sm' /> */}
                        
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4">
                    <span className="ml-1 px-2.5 py-2 rounded-md select-none text-sm text-my-foreground-secondary bg-my-background-secondary cursor-no-drop">
                        { modality ? modalities[modality] : "-" }
                    </span>

                    <span className="ml-1 px-2.5 py-2 rounded-md select-none text-sm text-my-foreground-secondary bg-my-background-secondary cursor-no-drop">
                        { periodoApuracao?.replace('-', '/') }
                    </span>

                    <div className="grid gap-3 text-my-foreground-secondary">
                        <Label htmlFor={`vencimento-${darf.id}`} className="pl-1">Vencimento</Label>
                        {/* <Input className="bg-my-background-secondary selection:bg-blue-500 text-my-foreground-secondary border-0 focus:!ring-[1px] ml-0.5 hide-webkit-spinners datepicker-icon datepicker-icon-invert-white" type="date" value={dueDateToUpdate ? dueDateToUpdate.toISOString().split("T")[0] : ""} onChange={handleChangeDueDate} id={`vencimento-${darf.id}`} name="vencimento" /> */}
                        <Calendar24 date={dueDateToUpdate} setDate={setDueDateToUpdate} />
                    </div>
                    
                    <div className="grid gap-3 text-my-foreground-secondary">
                        <Label htmlFor={`principal-${darf.id}`} className="pl-1">Valor do principal</Label>
                        <Input placeholder="0,00" disabled className="bg-my-background-secondary selection:bg-blue-500 text-my-foreground-secondary border-0 focus:!ring-[1px] ml-0.5 hide-webkit-spinners" type="text" value={formatCentavosToReal(centavosValorDoPrincipal)} onChange={handleChangeValorDoPrincipal} id={`principal-${darf.id}`} name="principal" />
                    </div>
                    
                    <div className="grid gap-3 text-my-foreground-secondary">
                        <div className="flex gap-3">
                            <Label htmlFor={`darf-${darf.id}`} className="pl-1">Valor da multa</Label>
                            <Link className="text-sm font-bold hover:text-lime-base" target="_blank" to={"https://sicalc.receita.fazenda.gov.br/sicalc/principal"}>(SicalcWeb)</Link>
                        </div>
                        <Input placeholder="0,00" className="bg-my-background-secondary selection:bg-blue-500 text-my-foreground-secondary border-0 focus:!ring-[1px] ml-0.5 hide-webkit-spinners" type="text" value={formatCentavosToReal(centavosValorDaMultaToUpdate)} onChange={handleChangeValorDaMultaToUpdate} id={`multa-${darf.id}`} name="multa" />
                    </div>
                    
                    <div className="grid gap-3 text-my-foreground-secondary">
                        <Label htmlFor={`fees-${darf.id}`} className="pl-1">Valor dos juros e/ou encargos</Label>
                        <Input placeholder="0,00" className="bg-my-background-secondary selection:bg-blue-500 text-my-foreground-secondary border-0 focus:!ring-[1px] ml-0.5 hide-webkit-spinners" type="text" value={formatCentavosToReal(centavosValorJurosEncargosToUpdate)} onChange={handleChangeValorJurosEncargosToUpdate} id={`juros-${darf.id}`} name="juros" />
                    </div>
                    
                    <div className="grid gap-3 text-my-foreground-secondary">
                        <Label htmlFor={`total-${darf.id}`} className="pl-1">Valor total</Label>
                        <Input placeholder="0,00" disabled className="bg-my-background-secondary selection:bg-blue-500 text-my-foreground-secondary border-0 focus:!ring-[1px] ml-0.5 hide-webkit-spinners" type="text" value={formatCentavosToReal(centavosValorTotal)} onChange={handleChangeValorTotal} id={`total-${darf.id}`} name="total" />
                    </div>
                    
                    <Separator className="bg-my-background-secondary" />
                </div>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button onClick={(e)=> {setIsUpdateDialogOpen(false); e.preventDefault()}} className="bg-lime-base hover:bg-lime-secondary border-none cursor-pointer text-white font-bold hover:text-white" variant="outline">Cancelar</Button>
                    </DialogClose>
                    <Button className="bg-my-background-secondary text-my-foreground-secondary cursor-pointer" form={`form-update-order-${darf.id}`} type="submit">Salvar alterações</Button>
                </DialogFooter>
                </DialogContent>
            </form>
        </Dialog>
    )
}