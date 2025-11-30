import { cn } from "@/lib/utils"
import { useState } from "react"

export default function MyInputPassword({className, ...props } :React.InputHTMLAttributes<HTMLInputElement>) {
    
    const [ openEye, setOpenEye ] = useState(true)

    const MyButton = ()=> {

        const handleClick = ()=> {
            setOpenEye(!openEye)
        }
    
        return(
            <button 
                type="button" 
                className="flex items-center justify-center cursor-pointer"
                onClick={handleClick}
                onMouseDown={e => e.preventDefault()}
            >
                {
                    openEye &&
                        <span className="material-symbols-outlined" style={{fontSize: 28}}>visibility</span>
                }
                {
                    !openEye &&
                        <span className="material-symbols-outlined" style={{fontSize: 28}}>visibility_off</span>
                }
            </button>
        )
    }

    return(
        <div className={cn("flex w-full h-12 px-4 py-3 justify-center items-center gap-2 rounded-sm border border-solid border-[#29292E] bg-my-background box-border transition-opacity focus-within:border-lime-base", className)}>
            <input
                className="outline-none border-none w-full h-full text-my-foreground-secondary text-base font-normal bg-transparent placeholder:text-my-foreground transition-colors"
                type={openEye ? "password" : "text"} 
                {...props}
            />
            <span className="flex shrink-0 justify-center items-center size-6 [&>svg]:size-6 text-my-foreground group-focus-within:text-lime-base">
                <MyButton />
            </span>
        </div>
    )
}