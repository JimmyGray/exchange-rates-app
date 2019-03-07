import * as moment from 'moment';
import { createAction, handleActions } from 'redux-actions';
import { ofType } from 'redux-observable';
import { switchMap, map } from 'rxjs/operators';
import { ExchangeRates } from '../../entity/ExchangeRates';
import 'rxjs';
import { ExchangeRatesApi } from '../../util/ExchangeRatesAPI/exchange-rates-api';

export enum ACTION_TYPES {
    FETCH_EXCHANGE_RATES = '@EXCHANGE_RATES/FETCH_EXCHANGE_RATES',
    SET_EXCHANGE_RATES = '@EXCHANGE_RATES/SET_EXCHANGE_RATES'
}
export interface FetchExchangeRatesPayload {
    currency: string;
    date: moment.Moment;
}

export const fetchExchangeRates = (payload: FetchExchangeRatesPayload) => createAction(ACTION_TYPES.FETCH_EXCHANGE_RATES)(payload);
export const setExchangeRates = (payload: any) => createAction(ACTION_TYPES.SET_EXCHANGE_RATES)(payload);

export const EXCHANGE_RATES_DEFAULT_STATE: ExchangeRates = {
    base: '',
    date: '',
    rates: []
};

export const exchangeRatesReducer = handleActions(
    {
        [ACTION_TYPES.SET_EXCHANGE_RATES]: (state: any, action: any) => action.payload
    },
    EXCHANGE_RATES_DEFAULT_STATE
);

export const fetchExchangeRatesEpic$ = (action$: any) => {
    return action$.pipe(
        ofType(ACTION_TYPES.FETCH_EXCHANGE_RATES),
        switchMap(({ payload }) => ExchangeRatesApi.fetchHistoricalRates(payload.currency, payload.date)),
        switchMap((response: any) => response.json()),
        map((exchangeRates: ExchangeRates) => {
            const rates: Array<any> = Object.keys(exchangeRates.rates)
                .map((currency: string) => ({ currency, value: exchangeRates.rates[currency as any] }));
            return {
                ...exchangeRates,
                rates
            };
        }),
        map(setExchangeRates)
    )
}