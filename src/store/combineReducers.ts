import { combineReducers } from 'redux';
import { exchangeRatesReducer } from '../components/ExchangeRates/ExchangeRatesOperations';

export const rootReducer = combineReducers({
    exchangeRates: exchangeRatesReducer
});