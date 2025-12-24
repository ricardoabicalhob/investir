import { useState, type Dispatch, type SetStateAction } from "react"
import { Label } from "./ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"
import { Button } from "./ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "./ui/command"
import { cn } from "@/lib/utils"
import { Check } from "lucide-react"

export default function ComboboxAssetType({ assetType, setAssetType} :{assetType :string, setAssetType :Dispatch<SetStateAction<"Acao" | "Fii" | "Cripto">>}) {
    const [ open, setOpen ] = useState(false)

    return(
        <div className="flex flex-col gap-2">
            <Label htmlFor="combobox-ativo" className="px-1 text-my-foreground-secondary">
                Tipo de ativo
            </Label>
            <Popover modal={true} open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        id="combobox-ativo"
                        variant="outline"
                        role="combobox"
                        aria-expanded={open}
                        className={cn(
                            "w-full justify-between focus:!ring-[1px] ml-0.5 text-my-foreground-secondary bg-my-background hover:bg-my-background hover:text-my-foreground-secondary border-0 cursor-pointer",
                        )}
                    >   
                        {assetType}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                    <Command>
                        <CommandInput placeholder="Buscar tipo..." className="h-9" />
                        <CommandList>
                            <CommandEmpty>Selecione uma operação.</CommandEmpty>
                            <CommandGroup>
                                {["Acao", "Fii", "Cripto"].map((item) => (
                                    <CommandItem
                                        key={item}
                                        value={item}
                                        onSelect={(currentValue) => {
                                            setAssetType((currentValue === ["Acao", "Fii", "Cripto"].find((elemento) => elemento === assetType) ? "" : item) as "Acao" | "Fii" | "Cripto")
                                            setOpen(false)
                                        }}
                                    >
                                        { item }
                                        <Check
                                            className={cn(
                                                "ml-auto",
                                                assetType === item ? "opacity-100" : "opacity-0"
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