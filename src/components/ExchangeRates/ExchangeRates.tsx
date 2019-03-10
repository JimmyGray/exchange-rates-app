import React, { SFC, useState } from 'react';
import { ExchangeRatesDataConnected } from './ExchangeRatesData/ExchangeRatesData';
import { ExchangeRatesFormConnected } from './ExchangeRatesForm/ExchangeRatesForm';

export interface ExchangeRatesProps {
}

export const ExchangeRates: SFC<ExchangeRatesProps> = (props: ExchangeRatesProps) => {
    return (
        <>
            <ExchangeRatesFormConnected/>
            <ExchangeRatesDataConnected/>
        </>
    );
};