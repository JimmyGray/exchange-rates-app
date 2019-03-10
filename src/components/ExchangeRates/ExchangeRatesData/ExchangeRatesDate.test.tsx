import React from 'react';
import { render } from 'react-testing-library';
import { EXCHANGE_RATES_DEFAULT_STATE } from '../ExchangeRatesOperations';
import { ExchangeRatesData } from './ExchangeRatesData';
import { MOCK_EXCHANGE_RATES } from './ExchangeRatesTable/ExchangeRatesTable.test';
import { MOCK_HISTORICAL_RATES } from './HistoricalRatesTable/HistoricalRatesTable.test';

describe('GIVEN a <ExchangeRatesData> component', () => {
    const spy = jest.fn();
    describe('WHEN Exchange Rates and Historical Rates are EMPTY', () => {
        it('Children are not rendered', () => {
            const { queryByText } = render(<ExchangeRatesData
                exchangeRates={ EXCHANGE_RATES_DEFAULT_STATE }
                historicalRates={ [] }
                fetchCurrencyHistory={ spy }
            />);
            expect(queryByText('EUR 01-02-2019')).toBeFalsy();
            expect(queryByText('EUR / GBP 12 Month Rate')).toBeFalsy();
        });
    });

    describe('WHEN Exchange Rates and Historical Rates have data', () => {
        it('Renders Card Title', () => {
            const { queryByText } = render(<ExchangeRatesData
                exchangeRates={ MOCK_EXCHANGE_RATES }
                historicalRates={ MOCK_HISTORICAL_RATES }
                fetchCurrencyHistory={ spy }
            />);
            expect(queryByText('EUR 01-02-2019')).toBeTruthy();
            expect(queryByText('EUR / GBP 12 Month Rate')).toBeTruthy();
        });
    });
});
