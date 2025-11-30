
import { Tooltip } from "@radix-ui/react-tooltip"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "./ui/alert-dialog"
import type { ReactNode } from "react"

interface AlertDialogMessageProps {
    children :React.ReactNode
    title? :ReactNode
    message? :ReactNode
    action? :()=> void
}

export function AlertDialogMessage({
    children,
    title,
    message,
    action
} :AlertDialogMessageProps) {
  return (
    <AlertDialog>
        <Tooltip>
            { children }
        </Tooltip>
        <AlertDialogContent
            className="bg-my-background border border-my-foreground/50"
        >
            <AlertDialogHeader>
                <AlertDialogTitle className="text-my-foreground-secondary">{ title }</AlertDialogTitle>
                <AlertDialogDescription className="text-my-foreground-secondary/70">
                    { message }
                </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
                <AlertDialogCancel className="bg-lime-base hover:bg-lime-secondary border-none cursor-pointer text-white font-bold hover:text-white">Cancelar</AlertDialogCancel>
                <AlertDialogAction className="bg-my-background-secondary text-my-foreground-secondary cursor-pointer" onClick={action}>Continuar</AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
    </AlertDialog>
  )
}
