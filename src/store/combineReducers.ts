import { combineReducers } from 'redux';
import { historicalRatesReducer } from '../components/ExchangeRates/ExchangeRatesData/HistoricalRatesTable/HistoricalRatesOperations';
import { exchangeRatesReducer } from '../components/ExchangeRates/ExchangeRatesOperations';

export const rootReducer = combineReducers({
    exchangeRates: exchangeRatesReducer,
    historicalRates: historicalRatesReducer
});