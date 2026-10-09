export interface Currency {
    end_date?: string;
    iso_code: string;
    iso_numeric?: string;
    name: string;
    start_date?: string;
    symbol?: string;
}
export interface CurrencyListMatch {
    end_date?: string;
    iso_code?: string;
    iso_numeric?: string;
    name?: string;
    start_date?: string;
    symbol?: string;
}
export interface Rate {
    base: string;
    date: string;
    id?: string;
    quote: string;
    rate: number;
}
export interface RateLoadMatch {
    base: string;
    quote: string;
    date?: string;
}
export interface RateListMatch {
    base?: string;
    date?: string;
    quote?: string;
}
