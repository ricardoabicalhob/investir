import type { CompensationResponse } from "./compensation.interface";
import type { DarfI } from "./darf.interface";

export type ProcessFiscalResultResponse =
    | { type: "DARF"; data: DarfI }
    | { type: "COMPENSATION"; data: CompensationResponse }
    | { type: "NO_TAX" }