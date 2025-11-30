import { useAlocacaoData } from '@/hooks/useAlocacaoData';
import type { DataChartAsset } from '@/utils/assets.utils';

export const BarraDeAlocacao = ({ ativosRecomendados, colorMap } :{ativosRecomendados :DataChartAsset[], colorMap :Map<string, string>}) => {
    
    return (
        <div className="bg-gray-200 gap-0 w-full max-w-lg h-9 flex rounded-lg overflow-hidden shadow-inner">
            {
                ativosRecomendados.map((ativo :DataChartAsset, index :number) => {
                    
                    const color = colorMap.get(ativo.assetSymbol) || '#ccc'; 
                    
                    return (
                        <div 
                            key={ativo.assetSymbol || index} 
                            style={{ 
                                width: ativo.assetWeight,
                                backgroundColor: color 
                            }} 
                            className={`h-full transition-all duration-700 group relative cursor-pointer`}
                            title={`${ativo.assetSymbol}: ${ativo.assetWeight}`}
                        >
                             {/* Mostrar Ticker (se o peso for significativo) */}
                             {parseFloat(ativo.assetWeight) > 5 && ( 
                                <span className="absolute inset-0 flex items-center justify-center text-xs font-semibold text-white/90 group-hover:opacity-100 p-1">
                                    {ativo.assetSymbol}
                                </span>
                             )}
                        </div>
                    );
                })
            }
        </div>
    );
};

export const LegendaDeAlocacao = ({ ativosRecomendados, colorMap } :{ativosRecomendados :DataChartAsset[], colorMap :Map<string, string>}) => {
    
    return (
        <div className="flex flex-wrap gap-4 justify-center md:justify-start">
            {
                ativosRecomendados.map(ativo => {
                    const color = colorMap.get(ativo.assetSymbol) || '#ccc';
                    return (
                        <div key={ativo.assetSymbol} className="flex items-center space-x-2 p-2 bg-my-background-secondary rounded-lg shadow-sm">
                            <div 
                                className="w-3 h-3 rounded-full shadow-inner" 
                                style={{ backgroundColor: color }} 
                            />
                            <span className="text-xs text-my-foreground-secondary font-medium">
                                {ativo.assetSymbol}
                            </span>
                            <span className="text-xs font-bold text-my-foreground-secondary">
                                {ativo.assetWeight}
                            </span>
                        </div>
                    );
                })
            }
        </div>
    );
};


/**
 * Componente que orquestra a lógica e a visualização completa.
 */
const CarteiraDeAlocacaoCompleta = ({ ativosIniciais, title } :{ativosIniciais :Array<DataChartAsset>, title :string}) => {

    const { ativosRecomendados, colorMap } = useAlocacaoData(ativosIniciais.filter(ativo => parseFloat(ativo.assetWeight) > 0));

    const totalWeight = ativosRecomendados
        .filter(ativo => ativo.assetSymbol !== "ESPAÇO DISPONÍVEL")
        .reduce((total, ativoAtual) => total + parseFloat(ativoAtual.assetWeight), 0)

    
    if(ativosIniciais.length === 0) {
        ativosIniciais.push({assetSymbol: "ESPAÇO DISPONÍVEL", assetWeight: "100.00%"})
    }

    return (
        <div className="p-4 md:p-8 space-y-8 bg-my-background min-h-screen font-sans flex flex-col items-center">
            <header className="w-full max-w-lg text-center">
                <h1 className="text-2xl font-semibold text-my-foreground-secondary border-b-2 border-lime-500 pb-2">
                    {title}
                </h1>
                <p className="text-base text-my-foreground mt-2">
                    Visualização da distribuição de pesos dos ativos (Total: {totalWeight.toFixed(2)}%).
                </p>
            </header>
            
            {/* 1. Barra de Alocação */}
            <BarraDeAlocacao 
                ativosRecomendados={ativosRecomendados} 
                colorMap={colorMap} 
            />
            
            {/* 2. Legenda */}
            <section className="pt-4 w-full max-w-lg">
                <h2 className="text-lg font-semibold mb-4 text-my-foreground text-center md:text-left">
                    Composição Detalhada
                </h2>
                <LegendaDeAlocacao 
                    ativosRecomendados={ativosRecomendados} 
                    colorMap={colorMap} 
                />
            </section>
        </div>
    );
};

export default CarteiraDeAlocacaoCompleta;