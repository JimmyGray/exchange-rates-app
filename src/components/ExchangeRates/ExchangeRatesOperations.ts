import moment from 'moment';
import { createAction, handleActions } from 'redux-actions';
import { ofType } from 'redux-observable';
import { map, switchMap } from 'rxjs/operators';
import { ExchangeRatesAPI } from '../../util/ExchangeRatesAPI/ExchangeRatesAPI';
import { ExchangeRatesAPIDeserialiser } from '../../util/ExchangeRatesAPI/ExchangeRatesAPIDeserialiser';

export enum ACTION_TYPES {
    FETCH_EXCHANGE_RATES = '@EXCHANGE_RATES/FETCH_EXCHANGE_RATES',
    SET_EXCHANGE_RATES = '@EXCHANGE_RATES/SET_EXCHANGE_RATES',
    RESET_EXCHANGE_RATES = '@EXCHANGE_RATES/RESET_EXCHANGE_RATES'
}

export interface FetchExchangeRatesPayload {
    currency: string;
    date: moment.Moment;
}

export interface ExchangeRates {
    base: string;
    date?: moment.Moment;
    rates: Array<Rate>;
}

export interface Rate {
    currency: string;
    value: string;
}

export const fetchExchangeRates = (payload: FetchExchangeRatesPayload) => createAction(ACTION_TYPES.FETCH_EXCHANGE_RATES)(payload);
export const resetExchangeRates = () => createAction(ACTION_TYPES.RESET_EXCHANGE_RATES)();
export const setExchangeRates = (payload: any) => createAction(ACTION_TYPES.SET_EXCHANGE_RATES)(payload);

export const EXCHANGE_RATES_DEFAULT_STATE: ExchangeRates = {
    base: '',
    date: undefined,
    rates: []
};

export const exchangeRatesReducer = handleActions(
    {
        [ACTION_TYPES.SET_EXCHANGE_RATES]: (state: any, action: any) => action.payload,
        [ACTION_TYPES.RESET_EXCHANGE_RATES]: () => EXCHANGE_RATES_DEFAULT_STATE
    },
    EXCHANGE_RATES_DEFAULT_STATE
);

export const fetchExchangeRatesEpic$ = (action$: any) => {
    return action$.pipe(
        ofType(ACTION_TYPES.FETCH_EXCHANGE_RATES),
        switchMap(({ payload }) => ExchangeRatesAPI.fetchRates(payload.currency, payload.date)),
        switchMap((response: any) => response.json()),
        map(ExchangeRatesAPIDeserialiser.toExchangeRates),
        map(setExchangeRates)
    );
};