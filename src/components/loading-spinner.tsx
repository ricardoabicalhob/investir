import { cn } from "@/lib/utils";
import React from "react";

// O componente LoadingSpinner agora é responsável pela lógica de FullScreen.
interface LoadingSpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
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


export const LoadingSpinner = ({ 
    size = 'xl', 
    className, 
    // Props de Controle
    isLoading,
    isFullScreen = true, 
    message = 'Carregando...',
    ...props 
}: LoadingSpinnerProps) => {

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
        >
            <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                { message }
            </span>
        </div>
    );
    
    // 3. Renderização Condicional (Com ou Sem FullScreen Wrapper)
    if (isFullScreen) {
        // Wrapper de tela cheia que centraliza o conteúdo
        return (
            <div className={cn(
                // Classes de centralização total e overlay (SUA SOLUÇÃO FUNCIONAL)
                "fixed inset-0 z-[5000] flex flex-col items-center justify-center backdrop-blur-sm", 
                "w-screen h-screen", 
                "bg-my-background/95" 
            )}>
                {SpinnerContent}
                
                {/* Mensagem de loading */}
                <p className="mt-4 text-my-foreground-secondary text-lg font-medium">
                    {message}
                </p>
            </div>
        );
    }

    // Retorna apenas o spinner (se isFullScreen for false)
    return SpinnerContent;
};


// // 4. EXEMPLO DE USO (App)
// const App = () => {
//     const [data, setData] = React.useState<any>(null);
//     const [loading, setLoading] = React.useState(false);

//     const fetchData = () => {
//         setLoading(true);
//         // Simula uma requisição de 3 segundos
//         setTimeout(() => {
//             setData({ status: 'Data carregada com sucesso!' });
//             setLoading(false);
//         }, 3000);
//     };

//     return (
//         <div className="min-h-[200vh] bg-my-background text-my-foreground p-8">
//             <h1 className="text-3xl font-bold mb-4 text-my-foreground-accent">
//                 Aplicação de Teste
//             </h1>
//             <p className="mb-8 text-my-foreground-secondary">
//                 O scroll está ativo (200vh), mas o spinner ficará fixo no centro.
//             </p>

//             <button
//                 onClick={fetchData}
//                 disabled={loading}
//                 className={cn(
//                     "px-6 py-3 rounded-xl font-semibold transition-colors",
//                     loading 
//                         ? "bg-gray-700 text-gray-500 cursor-not-allowed" 
//                         : "bg-lime-base text-my-background hover:bg-lime-secondary"
//                 )}
//             >
//                 {loading ? 'Carregando...' : 'Carregar Dados Financeiros (3s)'}
//             </button>

//             <div className="mt-8 p-4 bg-my-background-secondary rounded-lg border border-gray-800">
//                 <p>Status: {data ? data.status : 'Aguardando ação.'}</p>
//             </div>
            
//             {/* O spinner agora é garantido de renderizar imediatamente quando 'loading' for true */}
//             <LoadingSpinner isLoading={loading} size="xl" message="Buscando dados no servidor..." />

//             {/* Conteúdo longo para habilitar o scroll */}
//             <div className="mt-16 text-my-foreground-secondary">
//                 {Array.from({ length: 50 }).map((_, i) => (
//                     <p key={i} className="py-1">Linha de Conteúdo #{i + 1}</p>
//                 ))}
//             </div>

//         </div>
//     );
// };

// export default App;