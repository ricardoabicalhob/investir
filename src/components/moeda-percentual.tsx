import { converterValorDeCentavosParaReais, formatarPercentualComVirgula } from "@/utils/assets.utils";

export function MoedaEmReal({ centavos } :{ centavos :number }) {
    return(
        <span>
            { converterValorDeCentavosParaReais(centavos).toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL"
            }) }
        </span>
    )
}

export function Porcento({ percentual } :{ percentual :number }) {
    return(
        <span>
            { formatarPercentualComVirgula(percentual).toLocaleString("pt-BR", {
                style: "percent",
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            }) }
        </span>
    )
}