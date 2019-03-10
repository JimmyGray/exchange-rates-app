import moment from 'moment';
import { ExchangeRatesAPI } from './ExchangeRatesAPI';

describe('GIVEN ExchangeRatesAPI', () => {
    describe('WHEN getRatesQuery is called', () => {
        const query: string = ExchangeRatesAPI.getRatesQuery(
            'EUR',
            moment('01-02-2019', 'DD-MM-YYYY')
        );
        it('THEN returns correct query', () => {
            expect(query).toEqual('https://api.exchangeratesapi.io/2019-02-01?base=EUR');
        });
    });

    describe('WHEN getHistoricalRatesQuery is called', () => {
        const query: string = ExchangeRatesAPI.getHistoricalRatesQuery(
            'EUR',
            'USD',
            moment('01-02-2018', 'DD-MM-YYYY'),
            moment('01-02-2019', 'DD-MM-YYYY')
        );
        it('THEN returns correct query', () => {
            expect(query).toEqual('https://api.exchangeratesapi.io/history?start_at=2018-02-01&end_at=2019-02-01&symbols=USD&base=EUR');
        });
    });
});