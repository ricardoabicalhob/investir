import { toast } from "sonner"

export const showErrorToast = (message :string) => {
    toast(message, {
        style: {
            backgroundColor: "var(--red-destructive)",
            color: "var(--my-foreground-secondary)",
            borderColor: "var(--red-destructive)",
            borderBottomColor: "var(--chart-1)",
            borderBottomWidth: 3,
            minWidth: 520,
            width: "90%",
            fontSize: 15
        },
        position: "bottom-right",
    })
}

export const showSuccesToast = (message :string) => {
    toast(message, {
        style: {
            backgroundColor: "#29292E",
            color: "var(--my-foreground-secondary)",
            borderColor: "#323238",
            borderBottomColor: "var(--lime-base)",
            borderBottomWidth: 3,
            minWidth: 520,
            width: "90%",
            height: 64,
            fontSize: 15
        },
        position: "bottom-right",
    })
}