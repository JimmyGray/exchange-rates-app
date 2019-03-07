export interface Rate {
    currency: string;
    value: string;
}

export interface ExchangeRates {
    base: string;
    date: string,
    rates: Array<Rate>
}