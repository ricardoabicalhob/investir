import { cn } from "@/lib/utils";

function DisplayGroup({
    children,
    className,
    ...props
} :React.ComponentProps<'div'>) {
    return(
        <div
            className={cn(
                "flex items-center justify-between gap-3 bg-my-background-secondary rounded-md",
                className
            )}
            { ...props }
        >
            { children }
        </div>
    )
}

function Display({ 
    children, 
    className, 
    ...props 
} :React.ComponentProps<'div'>) {
    return(
        <div
            className={cn(
                "flex flex-col bg-my-background-secondary py-1 px-3 gap-1 rounded-md", 
                className
            )}
            {...props}
        >
            { children }
        </div>
    )
}

function DisplayTitle({
    children,
    className,
    ...props
} :React.ComponentProps<'span'>) {
    return(
        <span
            className={cn(
                "text-xs font-semibold text-my-foreground-secondary",
                className
            )}
            { ...props }
        >
            { children }
        </span>
    )
}

function DisplayHeader({
    children,
    className,
    ...props
} :React.ComponentProps<'div'>) {
    return(
        <div
            className={cn(
                "",
                className
            )}
            { ...props }
        >
            { children }
        </div>
    )
}

function DisplayBody({ 
    children,
    className,
    ...props
} :React.ComponentProps<'div'>) {
    return(
        <div
            className={cn(
                "",
                className
            )}
            { ...props }
        >
            { children }
        </div>
    )
}

function DisplayContent({
    children,
    className,
    ...props
} :React.ComponentProps<'div'>) {
    return(
        <div
            className={cn(
                "flex flex-col gap-2",
                className
            )}
            { ...props }
        >
            { children }
        </div>
    )
}

function DisplayItem({
    children,
    className, 
    ...props 
} :React.ComponentProps<'span'>) {
    return(
        <span 
            style={{
                fontFamily: 'Montserrat, sans-serif', 
                letterSpacing: '2px', 
                fontSize: 24
            }} 
            className={cn(
                "text-2xl font-semibold text-my-foreground-secondary",
                className
            )}
            { ...props }
        >
            { children }
        </span>
    )
}

function DisplayIcon({ 
    children,
    className,
    ...props
} :React.ComponentProps<'span'>) {
    return(
        <span 
            className={cn(
                "material-symbols-outlined cursor-pointer hover:!text-lime-base !text-[30px]",
                className
            )}
            { ...props }
        >
            { children }
        </span>
    )
}

export { 
    DisplayGroup,
    Display,
    DisplayTitle,
    DisplayHeader,
    DisplayItem,
    DisplayBody,
    DisplayContent,
    DisplayIcon
}