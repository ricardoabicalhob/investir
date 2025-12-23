import {
  useEffect,
  useRef,
  type Dispatch,
  type ReactNode,
  type SetStateAction
} from "react"

import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip"
import { cn } from "@/lib/utils"

/* -------------------------------------------------------------------------- */
/*                               AppTopbarTrigger                             */
/* -------------------------------------------------------------------------- */

interface AppTopbarTriggerProps extends React.HTMLAttributes<HTMLDivElement> {
  isExpanded: boolean
  setIsExpanded: Dispatch<SetStateAction<boolean>>
}

export const AppTopbarTrigger = ({
  className,
  isExpanded,
  setIsExpanded,
  ...props
}: AppTopbarTriggerProps) => {
  return (
    <div
      className={cn(
        "flex items-center justify-center p-2 rounded-sm bg-[#202024] hover:bg-[#29292E] cursor-pointer",
        className
      )}
      onClick={() => setIsExpanded(!isExpanded)}
      {...props}
    >
      <span className="material-symbols-outlined">
        {isExpanded ? "close" : "menu"}
      </span>
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/*                           AppTopbarGroupButtons                             */
/* -------------------------------------------------------------------------- */

interface AppTopbarGroupButtonsProps
  extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  isExpanded: boolean
  title?: string
}

export const AppTopbarGroupButtons = ({
  className,
  children,
  isExpanded,
  title,
  ...props
}: AppTopbarGroupButtonsProps) => {
  return (
    <div
      className={cn("flex items-center gap-2 bg-inherit", className)}
      {...props}
    >
      {title && isExpanded && (
        <span className="text-[10px] text-my-foreground uppercase mr-2">
          {title}
        </span>
      )}

      {children}
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/*                               AppTopbarButton                               */
/* -------------------------------------------------------------------------- */

interface AppTopbarButtonProps extends React.HTMLAttributes<HTMLDivElement> {
  isExpanded: boolean
  isSelected?: boolean
  text: string
  icon: string
  colorIconWhenSelected?: string
}

export const AppTopbarButton = ({
  className,
  isExpanded,
  isSelected = false,
  text,
  icon,
  colorIconWhenSelected,
  ...props
}: AppTopbarButtonProps) => {
  return (
    <div
      className={cn(
        `
        flex
        items-center
        gap-2
        px-3
        py-2
        rounded-sm
        cursor-pointer
        bg-inherit
        hover:bg-[#202024]
        ${isSelected ? "!bg-[#202024]" : ""}
      `,
        className
      )}
      {...props}
    >
      <Tooltip>
        <TooltipTrigger asChild>
          <span
            className="material-symbols-outlined select-none"
            style={{
              color: isSelected ? colorIconWhenSelected : undefined,
              fontVariationSettings: `'FILL' ${isSelected ? "1" : "0"}`
            }}
          >
            {icon}
          </span>
        </TooltipTrigger>

        <TooltipContent side="bottom" hidden={isExpanded}>
          {text}
        </TooltipContent>
      </Tooltip>

      {isExpanded && (
        <span
          className={cn(
            "select-none text-sm shrink-0",
            isSelected && "!text-my-foreground-accent"
          )}
        >
          {text}
        </span>
      )}
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/*                                   AppTopbar                                 */
/* -------------------------------------------------------------------------- */

interface AppTopbarProps {
  isExpanded?: boolean
  setIsExpanded: Dispatch<SetStateAction<boolean>>
  children: ReactNode
}

export const AppMenuTopbar = ({
  isExpanded,
  setIsExpanded,
  children
}: AppTopbarProps) => {
  const topbarRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!isExpanded) return

    function handleClickOutside(event: MouseEvent) {
      if (
        topbarRef.current &&
        !topbarRef.current.contains(event.target as Node)
      ) {
        setIsExpanded(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [isExpanded, setIsExpanded])

  return (
    <>
      {/* Desktop */}
      <div
        className={`
          hidden
          lg:flex
          items-center
          gap-2
          px-4
          h-[64px]
          transition-all
          duration-300
          bg-my-background
          border-b
          border-b-[#29292E]
        `}
      >
        {children}
      </div>

      {/* Mobile */}
      <div
        ref={topbarRef}
        className={`
          flex
          lg:hidden
          flex-col
          fixed
          top-[64px]
          left-0
          w-full
          transition-all
          duration-300
          bg-[#202024]
          z-50
          ${isExpanded
            ? "max-h-[320px] opacity-100"
            : "max-h-0 opacity-0 pointer-events-none"}
          overflow-hidden
        `}
      >
        {children}
      </div>
    </>
  )
}
