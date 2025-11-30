// Define a interface para os dados individuais da ação (SAPR4F)
export interface StockResult {
    currency: 'BRL' | string;
    marketCap: number;
    shortName: string;
    regularMarketChange: number;
    regularMarketChangePercent: number;
    regularMarketTime: string; // ISO 8601 Date String
    regularMarketPrice: number;
    regularMarketDayHigh: number;
    regularMarketDayRange: string;
    regularMarketDayLow: number;
    regularMarketVolume: number;
    regularMarketPreviousClose: number;
    regularMarketOpen: number;
    fiftyTwoWeekRange: string;
    fiftyTwoWeekLow: number;
    fiftyTwoWeekHigh: number;
    symbol: string;
    logourl: string; // URL da imagem
    priceEarnings: number;
    earningsPerShare: number;
}

// Define a interface para o objeto de resposta completo da API
export interface ApiResponse {
    results: StockResult[]; // O campo 'results' é um array de objetos StockResult
    requestedAt: string;     // ISO 8601 Date String
    took: string;            // Geralmente uma string que indica o tempo (ex: "0ms")
}

// Exemplo de como você usaria a tipagem:
/*
const data: ApiResponse = {
    // ... seu objeto JSON aqui
};

// Acessando os dados tipados:
const preco = data.results[0].regularMarketPrice; // tipado como number
*/