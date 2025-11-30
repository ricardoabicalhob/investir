import { cn } from "@/lib/utils"
import { toUpperCaseFirstChar } from "@/utils/formatters"

interface TypeOperationIndicatorProps extends React.ComponentProps<"div"> {
    typeOperation :"compra" | "venda" | "neutro"
}

function TypeOperationIndicator({
    className,
    typeOperation,
    ...props
} :TypeOperationIndicatorProps) {
    return(
        <div 
            { ...props }
            className={cn(`flex items-center justify-center rounded-sm w-[80%] py-1 text-xs select-none ${
                typeOperation === "compra" 
                ? "bg-lime-base/20 text-lime-base/60" 
                : typeOperation === "venda" 
                ? "bg-red-destructive/30 text-red-400" 
                : "bg-yellow-400/30 text-yellow-200/60"
            }`, className)}>
            <span className="align-middle">{ toUpperCaseFirstChar(typeOperation) ?? "-" }</span>
        </div>
    )
}

export { TypeOperationIndicator }