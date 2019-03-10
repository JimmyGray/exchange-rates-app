import moment from 'moment';
import React, { PureComponent, SFC, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { ExchangeRates } from '../ExchangeRatesOperations';
import './ExchangeRatesDataStyles.scss';
import { ExchangeRatesTable } from './ExchangeRatesTable/ExchangeRatesTable';
import {
    fetchCurrencyHistory,
    FetchCurrencyHistoryPayload,
    HistoricalRates
} from './HistoricalRatesTable/HistoricalRatesOperations';
import { HistoricalRatesTable } from './HistoricalRatesTable/HistoricalRatesTable';

export interface ExchangeRatesDataProps {
    exchangeRates: ExchangeRates;
    historicalRates: Array<HistoricalRates>;
    fetchCurrencyHistory: (payload: FetchCurrencyHistoryPayload) => void;
}

export class ExchangeRatesData extends PureComponent<ExchangeRatesDataProps> {

    private onCurrencyClick = (comparison: string) => {
        const { base, date } = this.props.exchangeRates;
        const startDate: moment.Moment = moment(date).subtract(1, 'years');
        this.props.fetchCurrencyHistory({
            base,
            comparison,
            startDate,
            endDate: moment(date)
        });
    };

    public render() {
        const { exchangeRates, historicalRates } = this.props;
        const isExchangeRatesEmpty: boolean = !exchangeRates.rates.length;
        const isHistoricalRatesEmpty: boolean = !historicalRates.length;
        return (
            <div className='exchange-rates-data__container'>
                { !isExchangeRatesEmpty && <ExchangeRatesTable
                    exchangeRates={ this.props.exchangeRates }
                    onCurrencyClick={ this.onCurrencyClick }
                /> }
                { !isHistoricalRatesEmpty && <HistoricalRatesTable
                    historicalRates={ historicalRates }
                    base={ exchangeRates.base }
                /> }
            </div>
        );
    }
}

const mapStateToProps = ({ exchangeRates, historicalRates }: any) => ({ exchangeRates, historicalRates });
const mapDispatchToProps: any = (dispatch: Dispatch<any>) => bindActionCreators({ fetchCurrencyHistory }, dispatch);

export const ExchangeRatesDataConnected = connect(mapStateToProps, mapDispatchToProps)(ExchangeRatesData);