import { Cell, Pie, PieChart } from "recharts"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  type ChartConfig,
  ChartContainer,
} from "@/components/ui/chart"
import { useMemo } from "react"
import { formatarPercentualComVirgula, type DataChartAsset } from "@/utils/assets.utils"
import type { OrderPresenter } from "@/interfaces/order.interface"
import type { StockResult } from "@/interfaces/quote.interface"
import InformationMyPositionBar from "./information-my-position-bar"

export const description = "A pie chart with a legend"

interface GraficoPizzaProps {
    dataChart : DataChartAsset[]
    listaDeOrdens? :OrderPresenter[],
    listaDeAtivosCotacaoBrapi? :StockResult[],
    userId? :string,
    tituloDoGrafico? :string,
    title? :string,
}

const colorPalette = [
  "#FF8C00", // Laranja Neon
  "#39FF14", // Verde Elétrico
  "#00BFFF", // Azul Elétrico
  "#FF3333", // Vermelho Intenso
  "#FFD700", // Amarelo Gema
  "#FF69B4", // Pink Fluorescente
  "#1E90FF", // Azul Oceano Claro
  "#A333FF", // Roxo Ultravioleta
  "#DAA520", // Cobre Metálico
  "#00FFFF", // Ciano Puro
];

const getcolorsForAsset = (index :number) => {
    return colorPalette[index % colorPalette.length]
}

export function GraficoPizza({ dataChart, tituloDoGrafico, title, listaDeOrdens, listaDeAtivosCotacaoBrapi, userId } :GraficoPizzaProps) {

    const chartConfig :ChartConfig = useMemo(()=> {
        const dynamicConfig :ChartConfig = {}
        dataChart.forEach((entry, index)=> {
            dynamicConfig[entry.assetSymbol] = {
                label: entry.assetSymbol,
                color: getcolorsForAsset(index)
            }
        })
        return dynamicConfig
    }, [dataChart])

    // if(dataChart.length === 0) {
    //     return(
    //         <Card className="flex flex-col w-[49.5%] text-my-foreground-secondary bg-my-background-secondary border-0">
    //             <CardHeader className="items-center pb-0">
    //                 <CardTitle className="text-lg sm:text-xl">{tituloDoGrafico}</CardTitle>
    //             </CardHeader>
    //             <CardContent className="flex-1 flex">
    //                     <div className="flex flex-col gap-2 w-full h-full items-center justify-center">
    //                         <span className="material-symbols-outlined text-gray-300" style={{fontSize: 48}}>donut_small</span>
    //                     </div>
    //             </CardContent>
    //         </Card>
    //     )    
    // }

  return (
    <Card className="flex flex-col w-[49.5%] text-my-foreground-secondary bg-my-background-secondary border-0">
      <CardHeader className="items-center pb-0">
        <CardTitle className="text-lg sm:text-xl text-my-foreground-secondary">{tituloDoGrafico}</CardTitle>
        {
          userId &&
            <InformationMyPositionBar
              title={title || ""}
              listaDeOrdens={listaDeOrdens || []}
              listaDeAtivosQuotacaoBrapi={listaDeAtivosCotacaoBrapi || []}
              userId={userId || ""}
            />
        }
      </CardHeader>
      <CardContent className="flex-1 flex items-center justify-center py-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto h-fit min-h-[371px] max-h-[500px] flex-1" // aspect-square removido
        >
          <PieChart>
            <Pie 
                data={dataChart} 
                dataKey="assetWeight" 
                nameKey="assetSymbol"
                innerRadius={70}
                outerRadius={100}
                cornerRadius="0%"
                labelLine={false}
                label={({ payload, ...props }) => {
                    return (
                      <text
                          cx={props.cx}
                          cy={props.cy}
                          x={props.x}
                          y={props.y}
                          textAnchor={props.textAnchor}
                          dominantBaseline={props.dominantBaseline}
                          fill="var(--my-foreground-secondary"
                      >
                          {`${payload.assetSymbol} - ${formatarPercentualComVirgula(payload.assetWeight).toLocaleString("pt-BR", {style: "percent", currency: "BRL", minimumFractionDigits: 2, maximumFractionDigits: 2})}`}
                      </text>
                )
              }}
            >
                {
                    dataChart.map((_, index)=> (
                        <Cell key={`cell-${index}`} fill={getcolorsForAsset(index)} />
                    ))
                }
            </Pie>
            {/* <ChartLegend
              content={<ChartLegendContent nameKey="assetSymbol"/>}
              className="items-start -translate-y-2 flex gap-2 mt-4 *:basis-1/4 *:justify-center"
            /> */}
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}