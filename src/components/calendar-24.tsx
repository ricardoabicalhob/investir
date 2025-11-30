import { useState, type Dispatch, type SetStateAction } from "react"
import { Label } from "./ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"
import { Button } from "./ui/button"
import { ChevronDownIcon } from "lucide-react"
import { Calendar } from "./ui/calendar"
import { cn } from "@/lib/utils"

export default function Calendar24({date, setDate} :{date :Date | undefined, setDate :Dispatch<SetStateAction<Date | undefined>>}) {
    
    const [ open, setOpen ] = useState(false)

    return(
        <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-3">
                <Label htmlFor="date-picker" className="px-1 text-my-foreground-secondary">
                    Data
                </Label>
                <Popover modal={true} open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                        <Button
                            variant="outline"
                            id="date-picker"
                            className={cn(
                                "w-full justify-between focus:!ring-[1px] ml-0.5 font-normal text-my-foreground-secondary bg-my-background border-0 hover:bg-my-background hover:text-my-foreground-secondary cursor-pointer",
                            )}
                        >   
                            {date ? date.toLocaleDateString("pt-BR") : "Selecione a data"}
                            <ChevronDownIcon />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                        <Calendar 
                            mode="single"
                            selected={date}
                            captionLayout="dropdown"
                            onSelect={(date) => {
                                setDate(date)
                                setOpen(false)
                                document.getElementById("time-picker")?.focus()
                            }}
                        />
                    </PopoverContent>
                </Popover>
            </div>
        </div>
    )
}