import { useState } from "react"
import { Button } from "./ui/button"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog"
import { Separator } from "./ui/separator"
import type { OrderPresenter } from "@/interfaces/order.interface"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table"
import { MoedaEmReal } from "./moeda-percentual"
import type { TradeModality } from "@/interfaces/orderBreakdown.interface"

interface DialogInfoOrderProps {
    ordem :OrderPresenter
    logoUrl :string
}

export function DialogInfoOrder({
    ordem,
    logoUrl
} :DialogInfoOrderProps) {
    
    const [ isInfoDialogOpen, setIsInfoDialogOpen ] = useState(false)

    const [ assetSymbol, setAssetSymbol ] = useState<string>()
    const [ orderDate, setOrderDate ] = useState<Date | undefined>()

    const modality :{ [key in TradeModality] :string } = {
        day_trade: "Day Trade",
        swing_trade: "Swing Trade"
    }

    return(
        <Dialog open={isInfoDialogOpen} onOpenChange={(open)=> {
            setIsInfoDialogOpen(open)

            if(open) {
                setAssetSymbol(ordem.symbol)
                setOrderDate(ordem.orderDate)
            }
        }}>
            <div>
                <DialogTrigger asChild>
                    <button
                        onClick={()=> {}}
                        className={`material-symbols-outlined text-lime-secondary opacity-60 hover:bg-my-foreground/50 p-1 rounded-full ${
                            ordem.operationType === "compra" 
                            ? 'pointer-events-none text-my-foreground' 
                            : 'cursor-pointer'
                        }`} 
                        style={{fontSize: 22}}                                                
                    >
                        more_horiz
                    </button>
                </DialogTrigger>
                <DialogContent 
                    className="sm:max-w-[550px] bg-my-background border-2 border-my-foreground/40 shadow-xl shadow-my-background-secondary"
                >
                <DialogHeader>
                    <DialogTitle className="text-my-foreground-secondary">Mais informações sobre a ordem</DialogTitle>
                    <DialogDescription className="flex justify-between gap-3 items-center">
                        Veja mais informações sobre a sua ordem aqui.
                        <img 
                            src={logoUrl} 
                            alt="" 
                            className='rounded-sm w-10 h-10 justify-self-center bg-black 
                            shadow-[0_0_30px_5px_rgba(255,255,255,0.4)]
                            ring-0 ring-white/40
                            ring-offset-[2px] ring-offset-[#303028]
                            border border-white/20
                            backdrop-blur-sm' />
                        
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4">
                    <div className="flex justify-between">
                        <span className="ml-1 px-2.5 py-2 rounded-md select-none text-sm text-my-foreground-secondary bg-my-background-secondary cursor-no-drop">
                            { assetSymbol }
                        </span>
                        <span className="ml-1 px-2.5 py-2 rounded-md select-none text-sm text-my-foreground-secondary bg-my-background-secondary cursor-no-drop">
                            { new Date(orderDate || "").toLocaleDateString('pt-BR') }
                        </span>
                    </div>
                    
                        <Table>
                            <TableHeader>
                                <TableHead className="text-my-foreground-secondary text-xs font-normal opacity-60 text-center">Modalidade</TableHead>
                                <TableHead className="text-my-foreground-secondary text-xs font-normal opacity-60 text-center">Quantidade</TableHead>
                                <TableHead className="text-my-foreground-secondary text-xs font-normal opacity-60 text-center">Taxas operacionais</TableHead>
                                <TableHead className="text-my-foreground-secondary text-xs font-normal opacity-60 text-center">IRRF</TableHead>
                                <TableHead className="text-my-foreground-secondary text-xs font-normal opacity-60 text-center">Lucro líquido</TableHead>
                            </TableHeader>
                            <TableBody>
                                {
                                    ordem.breakdowns.map(breakdown => (
                                        <TableRow>
                                            <TableCell className="text-my-foreground-secondary">{ modality[breakdown.modality] }</TableCell>
                                            <TableCell className="text-my-foreground-secondary text-right">{ breakdown.amount }</TableCell>
                                            <TableCell className="text-my-foreground-secondary text-right"><MoedaEmReal centavos={ breakdown.fees ?? 0 } /></TableCell>
                                            <TableCell className="text-my-foreground-secondary text-right"><MoedaEmReal centavos={ breakdown.taxes ?? 0 } /></TableCell>
                                            <TableCell className="text-my-foreground-secondary text-right"><MoedaEmReal centavos={ breakdown.netProfitFromDayTrading ?? 0 } /></TableCell>
                                        </TableRow>
                                    ))
                                }
                            </TableBody>
                        </Table>

                    <Separator className="bg-my-foreground/50" />
                </div>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button 
                            onClick={(e)=> {
                                setIsInfoDialogOpen(false) 
                                e.preventDefault()
                            }} 
                            className="bg-lime-base hover:bg-lime-secondary border-none cursor-pointer text-white font-bold hover:text-white focus:!ring-0" 
                            variant="outline"
                        >
                            Fechar
                        </Button>
                    </DialogClose>
                </DialogFooter>
                </DialogContent>
            </div>
        </Dialog>
    )
}