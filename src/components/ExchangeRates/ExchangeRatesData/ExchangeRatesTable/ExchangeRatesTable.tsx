import React, { SFC, useState } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import { DATE_FORMAT } from '../../../../util/date';
import { Card } from '../../../Common/Card/Card';
import { ExchangeRates } from '../../ExchangeRatesOperations';
import './ExchangeRatesTableStyles.scss';

export interface ExchangeRatesTableProps {
    exchangeRates: ExchangeRates;
    onCurrencyClick: (currency: string) => void;
}

const columns = [{
    Header: 'Currency',
    accessor: 'currency'
}, {
    Header: 'Rate',
    accessor: 'value'
}];

export const ExchangeRatesTable: SFC<ExchangeRatesTableProps> = (props: ExchangeRatesTableProps) => {
    const { rates, date } = props.exchangeRates;
    const dateLabel: string = date && date.format(DATE_FORMAT) || '';
    return (
        <Card title={ `${props.exchangeRates.base} ${dateLabel}` }>
            <ReactTable
                className='exchange-rates-table__table'
                data={ rates }
                columns={ columns }
                getTdProps={ (state, rowInfo) => {
                    return {
                        onClick: () => props.onCurrencyClick(rowInfo.original.currency)
                    };
                } }
            />
        </Card>
    );
};