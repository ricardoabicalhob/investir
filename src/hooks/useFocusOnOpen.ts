import { useEffect } from "react"

export function useFocusOnOpen<T extends HTMLElement>(
    ref: React.RefObject<T | null>, 
    isOpen: boolean
) {
    useEffect(() => {
        if (isOpen) {
            setTimeout(() => {
                ref.current?.focus()
            }, 100)
        }
    }, [isOpen, ref])
}