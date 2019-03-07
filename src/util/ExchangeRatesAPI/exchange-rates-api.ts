import * as moment from 'moment';

export class ExchangeRatesApi {
    private static URL: string = 'https://api.exchangeratesapi.io/';
    private static DATE_FORMAT: string = 'YYYY-DD-MM';

    public static async fetchHistoricalRates(currency: string, date: moment.Moment): Promise<Response> {
        const dateQuery: string = date.format(ExchangeRatesApi.DATE_FORMAT);
        const currencyQuery: string = ExchangeRatesApi.getBaseQuery(currency);
        const url: string = ExchangeRatesApi.URL.concat(dateQuery).concat(currencyQuery);
        return await fetch(url);
    }

    private static getBaseQuery(currency: string): string {
        return `?base=${currency}`;
    }
}