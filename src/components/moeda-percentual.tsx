import { converterValorDeCentavosParaReais, formatarPercentualComVirgula } from "@/utils/assets.utils";

interface MoedaEmRealProps extends React.HTMLAttributes<HTMLSpanElement> {
  centavos: number
  parenteses?: boolean
}

export function MoedaEmReal({ centavos, parenteses, ...props } :MoedaEmRealProps) {
    if(parenteses) {
        return(
            <span
                { ...props }
            >
                ({ converterValorDeCentavosParaReais(centavos).toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL"
                }) })
            </span>
        )
    } else {
        return(
            <span
                { ...props }
            >
                { converterValorDeCentavosParaReais(centavos).toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL"
                }) }
            </span>
        )
    }
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