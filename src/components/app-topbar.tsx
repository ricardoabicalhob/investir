import type { ReactNode } from "react"

interface AppTopbarProps {
    children :ReactNode
}

export default function AppTopbar({ children } :AppTopbarProps) {
    return(
        <div className="flex items-center justify-between max-h-[80px] min-h-[80px] pl-4 pr-8 bg-my-background-secondary border-b-[1px] border-b-[#29292E]">
            { children }
        </div>
    )
}