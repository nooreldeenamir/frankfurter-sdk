// Typed models for the Frankfurter SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
// params (op.<name>.points[].g.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface Currency {
  end_date?: string
  iso_code: string
  iso_numeric?: string
  name: string
  start_date?: string
  symbol?: string
}

export interface CurrencyListMatch {
  end_date?: string
  iso_code?: string
  iso_numeric?: string
  name?: string
  start_date?: string
  symbol?: string
}

export interface Rate {
  base: string
  date: string
  id?: string
  quote: string
  rate: number
}

export interface RateLoadMatch {
  base: string
  quote: string
  date?: string
}

export interface RateListMatch {
  base?: string
  date?: string
  quote?: string
}

