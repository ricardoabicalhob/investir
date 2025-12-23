import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useEffect, useMemo } from "react"

interface YearPickerProps {
  value?: number
  onChange: (year: number) => void
  totalYears?: number // default: 10
  label?: string
}

export function YearPicker({
  value,
  onChange,
  totalYears = 10,
  label = "Ano",
}: YearPickerProps) {
  const currentYear = new Date().getFullYear()

  // ✅ Ano selecionado por padrão
  useEffect(() => {
    if (!value) {
      onChange(currentYear)
    }
  }, [value, currentYear, onChange])

  // ✅ Lista dinâmica de anos (ex: 2016 → 2025)
  const years = useMemo(() => {
  return Array.from({ length: totalYears }, (_, i) => currentYear - i)
}, [currentYear, totalYears])

  return (
    <div className="flex gap-2 items-center">
      <Label className="text-sm pl-2">{label}</Label>

      <Select
        value={String(value ?? currentYear)}
        onValueChange={(year) => onChange(Number(year))}
      >
        <SelectTrigger className="w-full justify-between focus:!ring-[1px] ml-0.5 font-normal text-my-foreground-secondary bg-my-background-secondary border-0 hover:bg-my-background-secondary hover:text-my-foreground-secondary cursor-pointer">
          <SelectValue placeholder="Selecione o ano" />
        </SelectTrigger>

        <SelectContent>
          {years.map((year) => (
            <SelectItem key={year} value={String(year)}>
              {year}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
