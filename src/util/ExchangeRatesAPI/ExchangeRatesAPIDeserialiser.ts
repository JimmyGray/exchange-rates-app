import moment from 'moment';
import { ExchangeRates } from '../../components/ExchangeRates/ExchangeRatesOperations';

export interface IHistoricalRatesResponse {
    base: string;
    end_at: string;
    rates: any;
    start_at: string;
}

export class ExchangeRatesAPIDeserialiser {
    public static toExchangeRates = (exchangeRates: ExchangeRates) => {
        const rates: Array<any> = Object.keys(exchangeRates.rates)
            .map((currency: string) => ({ currency, value: exchangeRates.rates[currency as any] }));
        const date: moment.Moment = moment(exchangeRates.date);
        return {
            ...exchangeRates,
            date,
            rates
        };
    };

    public static toExchangeRatesComparison = (exchangeRates: IHistoricalRatesResponse) => {
        return Object.keys(exchangeRates.rates).map(date => {
            const data = Object.keys(exchangeRates.rates[date]).flatMap(curr => ({
                currency: curr,
                value: exchangeRates.rates[date][curr]
            }));
            return {
                date: moment(date, 'YYYY-MM-DD'),
                ...data[0]
            };
        });
    };
}