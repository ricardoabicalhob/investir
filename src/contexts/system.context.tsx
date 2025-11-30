import type { TradeModality } from "@/interfaces/orderBreakdown.interface";
import { createContext, useMemo, useState, type Dispatch, type ReactNode, type SetStateAction } from "react";

interface SystemProviderProps {
    children :ReactNode
}

interface SystemContextProps {
    tradeModality :TradeModality
    setTradeModality :Dispatch<SetStateAction<TradeModality>>
}

export const SystemContext = createContext({} as SystemContextProps)

export function SystemProvider({ children } :SystemProviderProps) {

    const [ tradeModality, setTradeModality ] = useState<TradeModality>("swing_trade")

    const contextValue = useMemo(()=> ({
        tradeModality, setTradeModality
    }), [tradeModality, setTradeModality])

    return(
        <SystemContext.Provider value={contextValue}>
            { children }
        </SystemContext.Provider>
    )
}