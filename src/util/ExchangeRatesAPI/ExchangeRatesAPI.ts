import moment from 'moment';

export class ExchangeRatesAPI {
    private static URL: string = 'https://api.exchangeratesapi.io/';
    private static HISTORY: string = 'history?';
    private static DATE_FORMAT: string = 'YYYY-MM-DD';

    public static async fetchRates(currency: string, date: moment.Moment): Promise<Response> {
        const url: string = ExchangeRatesAPI.getRatesQuery(currency, date);
        return await fetch(url);
    }

    public static async fetchHistoricalRates(base: string,
                                             comparison: string,
                                             startDate: moment.Moment,
                                             endDate: moment.Moment): Promise<Response> {
        const url: string = ExchangeRatesAPI.getHistoricalRatesQuery(
            base,
            comparison,
            startDate,
            endDate
        );
        return await fetch(url);
    }

    public static getRatesQuery(currency: string, date: moment.Moment) {
        return ExchangeRatesAPI.URL
            .concat(date.format(ExchangeRatesAPI.DATE_FORMAT))
            .concat('?')
            .concat(ExchangeRatesAPI.getBaseQuery(currency));
    }

    public static getHistoricalRatesQuery(base: string,
                                          comparison: string,
                                          startDate: moment.Moment,
                                          endDate: moment.Moment) {
        return ExchangeRatesAPI.URL
            .concat(ExchangeRatesAPI.HISTORY)
            .concat(ExchangeRatesAPI.getDateQuery(startDate, endDate))
            .concat(ExchangeRatesAPI.getSymbolsQuery(comparison))
            .concat('&')
            .concat(ExchangeRatesAPI.getBaseQuery(base));
    }

    private static getBaseQuery(currency: string): string {
        return `base=${currency}`;
    }

    private static getSymbolsQuery(symbol: string): string {
        return `&symbols=${symbol}`;
    }

    private static getDateQuery(start: moment.Moment, end: moment.Moment) {
        const startFormatted: string = start.format(ExchangeRatesAPI.DATE_FORMAT);
        const endFormatted: string = end.format(ExchangeRatesAPI.DATE_FORMAT);
        return `start_at=${startFormatted}&end_at=${endFormatted}`;
    }
}
