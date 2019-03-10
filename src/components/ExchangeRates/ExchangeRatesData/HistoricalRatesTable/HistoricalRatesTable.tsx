import moment from 'moment';
import React, { SFC, useState } from 'react';
import ReactTable from 'react-table';
import { DATE_FORMAT } from '../../../../util/date';
import { Card } from '../../../Common/Card/Card';
import { HistoricalRates } from './HistoricalRatesOperations';

export interface HistoricalRatesTableProps {
    historicalRates: Array<HistoricalRates>;
    base: string;
}

const columns = [
    {
        Header: 'Date',
        accessor: data => moment(data.date).format(DATE_FORMAT),
        id: 'date',
        sortMethod: (a, b) => {
            const aMoment = moment(a, DATE_FORMAT).valueOf();
            const bMoment = moment(b, DATE_FORMAT).valueOf();
            if (a === b) {
                return 0;
            }
            return aMoment > bMoment ? 1 : -1;
        }
    },
    {
        Header: 'Rate',
        accessor: 'value'
    }
];

export const HistoricalRatesTable: SFC<HistoricalRatesTableProps> = (props: HistoricalRatesTableProps) => {
    const currency: string = props.historicalRates[0] && props.historicalRates[0].currency || '';
    return (
        <Card title={ `${props.base} / ${currency} 12 Month Rate` }>
            <ReactTable
                className='exchange-rates-table__table'
                data={ props.historicalRates }
                columns={ columns }
                defaultSorted={ [{ id: 'date', desc: true }] }
            />
        </Card>
    );
};