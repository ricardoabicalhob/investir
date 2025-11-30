import { useState, type Dispatch, type SetStateAction } from "react"
import { Label } from "./ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"
import { Button } from "./ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "./ui/command"
import { cn } from "@/lib/utils"
import { Check } from "lucide-react"
import type { TradeModality } from "@/interfaces/orderBreakdown.interface"

export default function ComboboxTradeModality({ tradeModality, setTradeModality} :{tradeModality :TradeModality, setTradeModality :Dispatch<SetStateAction<TradeModality>>}) {
    const [ open, setOpen ] = useState(false)

    const tradesModalities = {
        day_trade: "Day Trade",
        swing_trade: "Swing Trade"
    }

    return(
        <div className="flex flex-col gap-3">
            <Label htmlFor="combobox-trade-modality" className="pl-2 text-my-foreground-secondary">
                Modalidade
            </Label>
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        id="combobox-trade-modality"
                        variant="outline"
                        role="combobox"
                        aria-expanded={open}
                        className={cn(
                            "w-full justify-between focus:!ring-[1px] ml-0.5 text-my-foreground-secondary bg-my-background-secondary hover:bg-my-background-secondary hover:text-my-foreground-secondary border-0 cursor-pointer",
                        )}
                    >   
                        {tradesModalities[tradeModality]}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                    <Command>
                        <CommandInput placeholder="Buscar modalidade..." className="h-9" />
                        <CommandList>
                            <CommandEmpty>Selecione uma modalidade.</CommandEmpty>
                            <CommandGroup>
                                {["swing_trade", "day_trade"].map((item) => (
                                    <CommandItem
                                        key={item}
                                        value={item}
                                        onSelect={() => {
                                            setTradeModality(item as TradeModality);
                                            setOpen(false);
                                        }}
                                    >
                                        { tradesModalities[item as TradeModality] }
                                        <Check
                                            className={cn(
                                                'ml-auto',
                                                tradeModality === item ? "opacity-100" : "opacity-0"
                                            )}
                                        />
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>
        </div>
    )
}