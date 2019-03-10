import moment from 'moment';
import React from 'react';
import { render } from 'react-testing-library';
import { HistoricalRates } from './HistoricalRatesOperations';
import { HistoricalRatesTable } from './HistoricalRatesTable';

const MOCK_BASE = 'EUR';
export const MOCK_HISTORICAL_RATES: Array<HistoricalRates> = [
    {
        currency: 'GBP',
        date: moment('01-02-2019', 'DD-MM-YYYY'),
        rate: 1.00
    }
];
describe('GIVEN a <HistoricalRatesTable> component', () => {
    it('Renders Card Title', () => {
        const { getByText } = render(<HistoricalRatesTable base={ MOCK_BASE }
                                                           historicalRates={ MOCK_HISTORICAL_RATES }/>);
        expect(getByText('EUR / GBP 12 Month Rate')).toBeTruthy();
    });
});
