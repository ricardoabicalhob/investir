import { useEffect } from "react"

export function useClearSymbolOnOperationChange(
    operationType: "Compra" | "Venda",
    setAssetSymbol: (value: string) => void
) {
    useEffect(() => {
        setAssetSymbol("")
    }, [operationType])
}
