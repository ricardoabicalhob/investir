import { useState, type Dispatch, type SetStateAction } from "react"
import { Label } from "./ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"
import { Button } from "./ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "./ui/command"
import { cn } from "@/lib/utils"
import { Check } from "lucide-react"

export default function ComboboxAssetsForSale({assetsForSale, assetForSale, setAssetForSale, onBlur} :{assetsForSale :Record<string, string>, assetForSale :string | undefined, setAssetForSale :Dispatch<SetStateAction<keyof typeof assetsForSale | undefined>>, onBlur?: React.FocusEventHandler<HTMLButtonElement>}) {
    const [ open, setOpen ] = useState(false)

    const assets :Array<keyof typeof assetsForSale> = Object.keys(assetsForSale)

    return(
        <div className="flex flex-col gap-3">
            <Label htmlFor="combobox-operation" className="px-1 text-my-foreground-secondary">
                Ativo
            </Label>
            <Popover modal={true} open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        id="combobox-assets-for-sale"
                        variant="outline"
                        role="combobox"
                        aria-expanded={open}
                        className={cn(
                            `${!assetForSale ? "!text-my-foreground pl-2.5" : ""}`,
                            "w-full gap-3 justify-start focus:!ring-[1px] !px-2 ml-0.5 text-my-foreground-secondary bg-my-background hover:bg-my-background hover:text-my-foreground-secondary border-0 cursor-pointer",
                        )}
                        onBlur={onBlur}
                    >   
                        { !!assetForSale && !!!assetsForSale[assetForSale] && <div className="flex items-center justify-self-center justify-center rounded-sm bg-my-background-secondary border border-my-foreground/50 w-6 h-6">
                            <span className="material-symbols-outlined text-lime-base">finance_mode</span>
                        </div> }
                        { !!assetForSale && !!assetsForSale[assetForSale] && <img src={assetsForSale[assetForSale]} alt="" className='rounded-sm w-5 h-5' /> }
                        {assetForSale || "Selecione um ativo"}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                    <Command>
                        <CommandInput placeholder="Buscar ativo..." className="h-9" />
                        <CommandList>
                            <CommandEmpty>Selecione um ativo.</CommandEmpty>
                            <CommandGroup>
                                {assets.map((item) => (
                                    <CommandItem
                                        key={item}
                                        value={item}
                                        onSelect={(currentValue) => {
                                            setAssetForSale((currentValue === assets.find((elemento) => elemento === assetForSale) ? "" : item))
                                            setOpen(false)
                                        }}
                                        className="flex w-full"
                                    >
                                        { !!!assetsForSale[item] && <div className="flex items-center justify-self-center justify-center rounded-sm bg-my-background-secondary border border-my-foreground/50 w-6 h-6">
                                            <span className="material-symbols-outlined text-lime-base">finance_mode</span>
                                        </div> }
                                        { !!assetsForSale[item] && <img src={assetsForSale[item]} alt="" className='rounded-sm w-5 h-5' /> }
                                        { item }
                                        <Check
                                            className={cn(
                                                'ml-auto',
                                                assetForSale === item ? "opacity-100" : "opacity-0"
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