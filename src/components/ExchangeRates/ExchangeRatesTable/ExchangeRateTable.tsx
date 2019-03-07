import React, { SFC, useState } from 'react';
import { connect } from 'react-redux';
import { ExchangeRates, Rate } from '../../../entity/ExchangeRates';

export interface ExchangeRatesTableProps {
    exchangeRates: ExchangeRates;
}

export interface ExchangeRatesRowProps {
    rate: Rate;
}

export const ExchangeRatesRow: SFC<ExchangeRatesRowProps> = (props: ExchangeRatesRowProps) => (
  <div>
      <div>{props.rate.currency}</div>
      <div>{props.rate.value}</div>
  </div>
);

export const ExchangeRatesTable: SFC<ExchangeRatesTableProps> = (props: ExchangeRatesTableProps) => {
    const { base, rates } = props.exchangeRates;
    return (
        <div>
            {base}
            {rates.map(rate => <ExchangeRatesRow key={rate.currency} rate={rate}/>)}
        </div>
    )
}

const mapStateToProps = ({ exchangeRates }: any) => ({ exchangeRates });

export const ExchangeRatesTableConnected = connect(mapStateToProps)(ExchangeRatesTable);
