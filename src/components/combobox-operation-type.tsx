import { useState, type Dispatch, type SetStateAction } from "react"
import { Label } from "./ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"
import { Button } from "./ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "./ui/command"
import { cn } from "@/lib/utils"
import { Check } from "lucide-react"

export default function ComboboxOperationType({ operationType, setOperationType} :{operationType :string, setOperationType :Dispatch<SetStateAction<"Compra" | "Venda">>}) {
    const [ open, setOpen ] = useState(false)

    return(
        <div className="flex flex-col gap-3">
            <Label htmlFor="combobox-operation" className="px-1 text-my-foreground-secondary">
                Operação
            </Label>
            <Popover modal={true} open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        id="combobox-operation"
                        variant="outline"
                        role="combobox"
                        aria-expanded={open}
                        className={cn(
                            "w-full justify-between focus:!ring-[1px] ml-0.5 text-my-foreground-secondary bg-my-background hover:bg-my-background hover:text-my-foreground-secondary border-0 cursor-pointer",
                        )}
                    >   
                        {operationType}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                    <Command>
                        <CommandInput placeholder="Buscar operação..." className="h-9" />
                        <CommandList>
                            <CommandEmpty>Selecione uma operação.</CommandEmpty>
                            <CommandGroup>
                                {["Compra", "Venda"].map((item) => (
                                    <CommandItem
                                        key={item}
                                        value={item}
                                        onSelect={() => {
                                            setOperationType(item as "Compra" | "Venda");
                                            setOpen(false);
                                        }}
                                    >
                                        { item }
                                        <Check
                                            className={cn(
                                                'ml-auto',
                                                operationType === item ? "opacity-100" : "opacity-0"
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