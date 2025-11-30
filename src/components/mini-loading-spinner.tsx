import { cn } from "@/lib/utils";
import React from "react";

// O componente LoadingSpinner agora é responsável pela lógica de FullScreen.
interface MiniLoadingSpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
    size?: 'sm' | 'md' | 'lg' | 'xl';
    
    // Novas propriedades para FullScreen
    isFullScreen?: boolean;
    isLoading: boolean; // Controla se o spinner deve ser exibido
    // delayMs: removido para garantir a visualização imediata
    message?: string;
}

const spinnerSizeClasses = {
    sm: 'h-4 w-4 border-2',
    md: 'h-6 w-6 border-4',
    lg: 'h-8 w-8 border-4',
    xl: 'h-12 w-12 border-8',
};


export const MiniLoadingSpinner = ({ 
    size = 'sm', 
    className, 
    // Props de Controle
    isLoading,
    isFullScreen = true, 
    ...props 
}: MiniLoadingSpinnerProps) => {

    // SIMPLIFICAÇÃO CRÍTICA: Se não estiver carregando, não renderiza nada.
    // Isso garante que o spinner apareça imediatamente quando isLoading for true.
    if (!isLoading) {
        return null;
    }
    
    // O restante da lógica de delay/isVisible foi removida para garantir a robustez.
    
    const selectedSizeClass = spinnerSizeClasses[size] || spinnerSizeClasses.xl;

    // 2. O Conteúdo Base do Spinner (O Ícone Giratório)
    const SpinnerContent = (
        <div 
            role="status"
            className={cn(
                "inline-block rounded-full border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]",
                selectedSizeClass,
                "animate-spin",
                "text-my-foreground-secondary", 
                className
            )}
            {...props}
        />

    );
    
    // 3. Renderização Condicional (Com ou Sem FullScreen Wrapper)
    if (isFullScreen) {
        // Wrapper de tela cheia que centraliza o conteúdo
        return (
            <div className={cn(
                // Classes de centralização total e overlay (SUA SOLUÇÃO FUNCIONAL)
                "flex flex-col items-center justify-center backdrop-blur-sm", 
            )}>
                {SpinnerContent}
            </div>
        );
    }

    // Retorna apenas o spinner (se isFullScreen for false)
    return SpinnerContent;
}