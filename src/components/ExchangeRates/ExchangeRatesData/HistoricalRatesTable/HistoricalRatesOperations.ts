import moment from 'moment';
import { createAction, handleActions } from 'redux-actions';
import { ofType } from 'redux-observable';
import { map, switchMap } from 'rxjs/operators';
import { ExchangeRatesAPI } from '../../../../util/ExchangeRatesAPI/ExchangeRatesAPI';
import { ExchangeRatesAPIDeserialiser } from '../../../../util/ExchangeRatesAPI/ExchangeRatesAPIDeserialiser';

export enum ACTION_TYPES {
    FETCH_CURRENCY_HISTORY = '@HISTORICAL_CHART/FETCH_CURRENCY_HISTORY',
    SET_CURRENCY_HISTORY = '@HISTORICAL_CHART/SET_CURRENCY_HISTORY',
    RESET_CURRENCY_HISTORY = '@HISTORICAL_CHART/RESET_CURRENCY_HISTORY'
}

export interface HistoricalRates {
    date: moment.Moment;
    currency: string;
    rate: number;
}

export interface FetchCurrencyHistoryPayload {
    base: string;
    comparison: string;
    startDate: moment.Moment;
    endDate: moment.Moment;
}

export const fetchCurrencyHistory = (payload: FetchCurrencyHistoryPayload) => createAction(ACTION_TYPES.FETCH_CURRENCY_HISTORY)(payload);
export const resetCurrencyHistory = () => createAction(ACTION_TYPES.RESET_CURRENCY_HISTORY)();
export const setCurrencyHistory = (payload) => createAction(ACTION_TYPES.SET_CURRENCY_HISTORY)(payload);

export const HISTORICAL_CHART_DEFAULT_STATE: Array<HistoricalRates> = [];

export const historicalRatesReducer = handleActions(
    {
        [ACTION_TYPES.SET_CURRENCY_HISTORY]: (state: any, action: any) => action.payload,
        [ACTION_TYPES.RESET_CURRENCY_HISTORY]: () => HISTORICAL_CHART_DEFAULT_STATE
    },
    HISTORICAL_CHART_DEFAULT_STATE
);

export const fetchHistoricalRatesEpic$ = (action$: any) => {
    return action$.pipe(
        ofType(ACTION_TYPES.FETCH_CURRENCY_HISTORY),
        switchMap(({ payload: { base, comparison, startDate, endDate } }) => ExchangeRatesAPI.fetchHistoricalRates(base, comparison, startDate, endDate)),
        switchMap((response: any) => response.json()),
        map(ExchangeRatesAPIDeserialiser.toExchangeRatesComparison),
        map(setCurrencyHistory)
    );
};