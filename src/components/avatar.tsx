import { cn } from "@/lib/utils";
import { nameInInitialsFormat } from "@/utils/formatters";

interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
    fullName? :string
}

export default function Avatar({ fullName, className, ...props } :AvatarProps) {
    if(!fullName) {
        return(
            <button type="button" className="overflow-hidden flex items-center justify-center rounded-[22px] w-[55px] h-[49px] bg-lime-base cursor-pointer">
                <div 
                    className={cn("absolute flex items-center justify-center w-[54px] h-[51px] rounded-full bg-lime-base", className)}
                    { ...props }
                >
                    <span className="text-my-foreground-accent text-shadow-xs text-shadow-lime-base text-2xl select-none">
                        ND
                    </span>
                </div>
            </button>
        )
    }
    return(
        <button type="button" className="overflow-hidden flex items-center justify-center rounded-[22px] w-[55px] h-[49px] bg-lime-base cursor-pointer">
            <div 
                className={cn("absolute flex items-center justify-center w-[54px] h-[50px] rounded-full bg-lime-base", className)}
                { ...props }
            >
                <span className="text-my-foreground-accent text-shadow-xs text-shadow-lime-base text-2xl select-none">
                    { nameInInitialsFormat(fullName) }
                </span>
            </div>
        </button>
    )
}