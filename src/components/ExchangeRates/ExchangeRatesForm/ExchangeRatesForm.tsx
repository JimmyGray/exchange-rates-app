import moment from 'moment';
import React, { CSSProperties, SFC, useState } from 'react';
import { SingleDatePicker } from 'react-dates';
import { connect } from 'react-redux';
import Select from 'react-select';
import { bindActionCreators, Dispatch } from 'redux';
import { Button } from '../../Common/Button/Button';
import { Card } from '../../Common/Card/Card';
import { currencies, Currency } from '../Currencies';
import {
    HistoricalRates,
    resetCurrencyHistory
} from '../ExchangeRatesData/HistoricalRatesTable/HistoricalRatesOperations';
import {
    ExchangeRates,
    fetchExchangeRates,
    FetchExchangeRatesPayload,
    resetExchangeRates
} from '../ExchangeRatesOperations';
import './ExchangeRatesFormStyles.scss';

export const getCurrencyLabel = (currency: Currency) => `${currency.value} - ${currency.label}`;

export interface ExchangeRatesViewProps {
    exchangeRates: ExchangeRates;
    historicalRates: Array<HistoricalRates>;
    fetchExchangeRates: (payload: FetchExchangeRatesPayload) => void;
    resetExchangeRates: () => void;
    resetCurrencyHistory: () => void;
}

const isInFuture = (day: number) => (moment().diff(day) < 0);

const customStyles = {
    control: (base: CSSProperties) => ({
        ...base,
        borderRadius: 0,
        borderColor: '#bdbdbd',
        height: '3rem'
    })
};

const isWeekend = (date: number) => {
    const day = moment(date).day();
    return day === 0 || day === 6;
};
export const ExchangeRatesForm: SFC<ExchangeRatesViewProps> = (props: ExchangeRatesViewProps) => {
    const [currency, selectCurrency] = useState();
    const [date, selectDate] = useState<moment.Moment | null>(null);
    const [focused, setFocused] = useState(false);
    const canSubmit: boolean = !!date && currency;
    const canReset: boolean = !!props.historicalRates.length || !!props.exchangeRates.rates.length;
    return (
        <Card>
            <div className={ 'exchange-rates__container' }>
                <SingleDatePicker
                    id={ 'date-picker' }
                    date={ date }
                    onDateChange={ (date) => selectDate(date!) }
                    onFocusChange={ () => setFocused(!focused) }
                    focused={ focused }
                    displayFormat={ 'DD/MM/YYYY' }
                    isOutsideRange={ isInFuture }
                    hideKeyboardShortcutsPanel={ true }
                    isDayBlocked={ isWeekend }
                />
                <Select
                    className={ 'exchange-rates__search' }
                    value={ currency }
                    options={ currencies }
                    onChange={ (currency) => selectCurrency(currency) }
                    getOptionLabel={ getCurrencyLabel }
                    styles={ customStyles }
                    placeholder={ 'Select a Currency' }
                />
                <div className={ 'exchange-rates__button-group' }>
                    <Button label={ 'Submit' }
                            disabled={ !canSubmit }
                            onClick={ () => {
                                props.fetchExchangeRates({ date: date!, currency: currency.value });
                                props.resetCurrencyHistory();
                            } }/>
                    <Button
                        label={ 'Reset' }
                        onClick={ () => {
                            props.resetCurrencyHistory();
                            props.resetExchangeRates();
                            selectCurrency('');
                            selectDate(null);
                        } }
                        disabled={ !canReset }
                    />
                </div>
            </div>
        </Card>
    );
};

const mapStateToProps = ({ exchangeRates, historicalRates }: any) => ({
    exchangeRates,
    historicalRates
});
const mapDispatchToProps: any = (dispatch: Dispatch<any>) => bindActionCreators({
    fetchExchangeRates,
    resetExchangeRates,
    resetCurrencyHistory
}, dispatch);

export const ExchangeRatesFormConnected = connect(mapStateToProps, mapDispatchToProps)(ExchangeRatesForm);