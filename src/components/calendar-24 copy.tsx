import { useState, type Dispatch, type SetStateAction } from "react"
import { Label } from "./ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"
import { Button } from "./ui/button"
import { ChevronDownIcon } from "lucide-react"
import { Calendar } from "./ui/calendar"
import { cn } from "@/lib/utils"
import { Input } from "./ui/input"

export default function Calendar24({date, setDate} :{date :Date | undefined, setDate :Dispatch<SetStateAction<Date | undefined>>}) {
    
    const [ open, setOpen ] = useState(false)

    return(
        <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-3">
                <Label htmlFor="date-picker" className="px-1">
                    Data
                </Label>
                <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                        <Button
                            variant="outline"
                            id="date-picker"
                            className={cn(
                                "w-full justify-between focus:!ring-[1px] ml-0.5 font-normal text-my-foreground-secondary bg-my-background-secondary border-0 hover:bg-my-background-secondary hover:text-my-foreground-secondary cursor-pointer",
                                // date ? "text-lime-secondary hover:text-lime-secondary" : "text-my-foreground-secondary"
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
            <div className="flex flex-col gap-3">
                <Label htmlFor="time-picker" className="px-1">
                    Hora de início
                </Label>
                <Input
                    type="time"
                    id="time-picker"
                    step="1"
                    onBlur={(e)=> {
                        const timeSplit = e.target.value.split(":")
                        date?.setHours(parseInt(timeSplit[0]), parseInt(timeSplit[1]), parseInt(timeSplit[2]))
                    }}
                    defaultValue="00:00:00"
                    className="bg-my-background-secondary border-0 focus:!ring-[1px] ml-0.5 appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                />
            </div>
        </div>
    )
}