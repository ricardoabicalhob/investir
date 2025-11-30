import { useEffect, useRef, type Dispatch, type ReactNode, type SetStateAction } from "react"
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip"
import { cn } from "@/lib/utils"

interface AppSidebarTriggerProps extends React.HtmlHTMLAttributes<HTMLDivElement> {
    isExpanded :boolean
    setIsExpanded :Dispatch<SetStateAction<boolean>>
}

export const AppSidebarTrigger = ({ className, isExpanded, setIsExpanded, ...props } :AppSidebarTriggerProps) => {
    return(
        <>
            <div 
                className={cn("hidden lg:flex items-center justify-center w-fit h-fit p-2 rounded-sm bg-[#202024] hover:bg-[#29292E] cursor-pointer", className)}
                onClick={()=> setIsExpanded(!isExpanded)}
                { ...props }
            >
                {
                    isExpanded &&
                    <span className="material-symbols-outlined" style={{fontWeight: 300}}>menu_open</span>
                }
                {
                    !isExpanded &&
                    <span className="material-symbols-outlined rotate-180" style={{fontWeight: 300}}>menu_open</span>
                }
            </div>

            <div 
                className={cn("z-50 flex lg:hidden items-center justify-center w-fit h-fit p-2 rounded-sm bg-[#202024] hover:bg-[#29292E] cursor-pointer", className)}
                onClick={()=> setIsExpanded(!isExpanded)}
                { ...props }
            >
                {
                    isExpanded &&
                    <span className="material-symbols-outlined" style={{fontWeight: 700}}>close</span>
                }
                {
                    !isExpanded &&
                    <span className="material-symbols-outlined rotate-180" style={{fontWeight: 300}}>menu</span>
                }
            </div>
        </>
    )
}

interface AppSidebarGroupButtonsProps extends React.HTMLAttributes<HTMLDivElement> {
    children :ReactNode
    isExpanded :boolean
    title? :string
}

export const AppSidebarGroupButtons = ({ className, children, isExpanded, title, ...props } :AppSidebarGroupButtonsProps) => {
    return(
        <div
            className={cn("flex flex-col bg-inherit gap-2", className)}
            { ...props }
        >
            { title && <div className="flex min-h-9 items-center gap-2 max-lg:px-6">
                            {isExpanded && <span className="text-[10px] text-my-foreground">{ title.toUpperCase() }</span>}
                            {isExpanded && <div className="bg-[#29292E] h-[1px] flex-grow"/>}
                        </div>} 
            { children }  
        </div>
    )
}

interface AppSidebarButtonProps extends React.HtmlHTMLAttributes<HTMLDivElement> {
    isExpanded :boolean
    isSelected? :boolean
    text :string
    icon :string
    colorIconWhenSelected? :string
}

export const AppSidebarButton = ({ className, isExpanded, isSelected = false, text, icon, colorIconWhenSelected, ...props } :AppSidebarButtonProps) => {
    return(
        <div 
            className={cn(`
                flex 
                items-center 
                ${isExpanded ? 'justify-start w-full max-lg:rounded-none max-lg:px-6' : 'justify-center w-fit'} 
                ${isSelected ? '!bg-[#202024]' : ''}
                h-fit 
                gap-2 
                p-2 
                rounded-sm 
                cursor-pointer
                bg-inherit
                max-lg:hover:bg-[#29292E]
                hover:bg-[#202024]
            `, className)}
            { ...props }
        >
            
            <Tooltip>
                <TooltipTrigger asChild>
                    <span className={cn(`material-symbols-outlined select-none`, className)} style={{color: `${isSelected ? colorIconWhenSelected : ''}`, fontVariationSettings: `'FILL' ${isSelected ? '1' : '0'}`}}>{ icon }</span>                    
                </TooltipTrigger>
                <TooltipContent side="right" hidden={isExpanded} className="text-base">
                    { text }
                </TooltipContent>
            </Tooltip>
            { isExpanded && <span className={cn(`select-none text-sm shrink-0 ${isSelected ? '!text-my-foreground-accent' : ''}`, className)}>{ text }</span> }
            
        </div>
    )
}

interface AppSidebarProps {
    isExpanded :boolean
    setIsExpanded :Dispatch<SetStateAction<boolean>>
    children :ReactNode
}

export default function AppSidebar({ isExpanded, setIsExpanded, children } :AppSidebarProps) {

    const sidebarRef = useRef<HTMLDivElement>(null)

    useEffect(()=> {
        if(!isExpanded) {
            return;
        }

        function handleClickOutside(event :MouseEvent) {
            const isMobileSidebarActuallyVisible = sidebarRef.current &&
                sidebarRef.current.offsetWidth > 0 &&
                sidebarRef.current.offsetHeight > 0 &&
                window.getComputedStyle(sidebarRef.current).opacity !== '0' &&
                window.getComputedStyle(sidebarRef.current).pointerEvents !== 'none'
            
            if(!isMobileSidebarActuallyVisible) {
                return;
            }
            
            if(sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
                setIsExpanded(false)
            }
        }

        if(isExpanded) {
            document.addEventListener('mousedown', handleClickOutside)
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [isExpanded])

    return(
        <>
            <div 
                className={`
                    hidden
                    lg:flex
                    flex-col
                    px-4
                    py-4
                    gap-2
                    overflow-hidden
                    transition-all
                    duration-300
                    ease-in-out
                    h-[calc(100vh-80px)]
                    ${isExpanded ? 'w-[216px]' : 'w-[80px]'}
                    overflow-y-auto
                    custom-scrollbar
                    bg-my-background
                    border-r-[1px]
                    border-r-[#29292E]
                `}
            >

                { children }
            </div>

            <div
                ref={sidebarRef} 
                className={`
                    flex
                    lg:hidden
                    flex-col
                    fixed
                    top-0
                    pt-[96px]
                    px-0
                    pb-4
                    z-49
                    gap-0
                    overflow-hidden
                    transition-opacity
                    duration-500
                    ease-in-out
                    h-[calc(100vh)]
                    ${isExpanded ? 'w-[340px] opacity-100 fade-in' : 'w-0 opacity-0 pointer-events-none'}
                    overflow-y-auto
                    custom-scrollbar
                    bg-[#202024]
                `}
            >

                { children }
            </div>
        </>
    )
}