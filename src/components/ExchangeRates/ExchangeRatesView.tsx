import React, { SFC, useState } from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';
import { bindActionCreators, Dispatch } from 'redux';
import { ExchangeRates } from '../../entity/ExchangeRates';
import { currencies, Currency } from './Currencies';
import { SingleDatePicker } from 'react-dates';
import moment from 'moment';
import { fetchExchangeRates, FetchExchangeRatesPayload } from './ExchangeRatesOperations';
import { ExchangeRatesTableConnected } from './ExchangeRatesTable/ExchangeRateTable';

export const getCurrencyLabel = (currency: Currency) => `${currency.value} - ${currency.label}`;

export interface ExchangeRatesViewProps {
    exchangeRates: ExchangeRates;
    fetchExchangeRates: (payload: FetchExchangeRatesPayload) => void;
}

export const ExchangeRatesView: SFC<ExchangeRatesViewProps> = (props: ExchangeRatesViewProps) => {
    const [ currency, selectCurrency ] = useState();
    const [ date, selectDate ] = useState<moment.Moment>(moment());
    const [ focused, setFocused ] = useState(false);
    console.log(props.exchangeRates);
    return (
        <div>
            <SingleDatePicker
                id={'date-picker'}
                date={date}
                onDateChange={(date) => selectDate(date!)}
                onFocusChange={() => setFocused(!focused)}
                focused={focused}
                displayFormat={'DD/MM/YYYY'}
            />
            <Select
                value={currency}
                options={currencies}
                onChange={(currency) => selectCurrency(currency)}
                getOptionLabel={getCurrencyLabel}
            />
            <button
                onClick={() => props.fetchExchangeRates({ date, currency: currency.value })}
                disabled={!currency}>Submit</button>
            <ExchangeRatesTableConnected />
        </div>
    )
}

const mapStateToProps = ({ exchangeRates }: any) => ({ exchangeRates });
const mapDispatchToProps: any = (dispatch: Dispatch<any>) => bindActionCreators({ fetchExchangeRates }, dispatch);

export const ExchangeRatesViewConnected = connect(mapStateToProps, mapDispatchToProps)(ExchangeRatesView);