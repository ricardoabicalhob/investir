import type { DataChartAsset } from "@/utils/assets.utils";
import { STATIC_ALLOCATION_COLORS } from "@/utils/fns.utils";
import { useMemo } from "react";

export const useAlocacaoData = (ativosIniciais :DataChartAsset[]) => {
    
    // Lista de ativos simulados
    const mockAtivos = ativosIniciais;
    
    // Calcula o peso total
    const totalWeight = mockAtivos.reduce((sum, ativo) => sum + parseFloat(ativo.assetWeight), 0);

    // Mapeamento de Cores (Memorização) - Garante que a cor seja persistente por ticker
    const colorMap = useMemo(() => {
        const map = new Map();
        
        mockAtivos.forEach((/** @type {Ativo} */ ativo, index) => {
            if (!map.has(ativo.assetSymbol)) {
                map.set(ativo.assetSymbol, STATIC_ALLOCATION_COLORS[index]);
            }
        });
        return map;
    }, [mockAtivos]);

    return {
        ativosRecomendados: mockAtivos,
        totalWeight,
        colorMap
    };
};