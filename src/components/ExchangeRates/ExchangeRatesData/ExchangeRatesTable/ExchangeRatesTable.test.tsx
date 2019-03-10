import moment from 'moment';
import React from 'react';
import { fireEvent, render } from 'react-testing-library';
import { ExchangeRates } from '../../ExchangeRatesOperations';
import { ExchangeRatesTable } from './ExchangeRatesTable';

export const MOCK_EXCHANGE_RATES: ExchangeRates = {
    base: 'EUR',
    date: moment('01-02-2019', 'DD-MM-YYYY'),
    rates: [
        {
            currency: 'GBP',
            value: '0.87'
        }
    ]
};

describe('GIVEN a <ExchangeRatesTable> component', () => {
    const spy = jest.fn();
    it('Renders Card Title', () => {
        const { getByText } = render(<ExchangeRatesTable
            exchangeRates={ MOCK_EXCHANGE_RATES }
            onCurrencyClick={ spy }
        />);
        expect(getByText('EUR 01-02-2019')).toBeTruthy();
    });

    it('On Currency click returns correct currency', () => {
        const { getByText } = render(<ExchangeRatesTable
            exchangeRates={ MOCK_EXCHANGE_RATES }
            onCurrencyClick={ spy }
        />);
        fireEvent.click(getByText('GBP'));
        expect(spy).toHaveBeenCalledWith('GBP');
    });
});
