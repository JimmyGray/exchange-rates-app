import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { combineEpics, createEpicMiddleware } from 'redux-observable';
import { fetchHistoricalRatesEpic$ } from '../components/ExchangeRates/ExchangeRatesData/HistoricalRatesTable/HistoricalRatesOperations';
import { fetchExchangeRatesEpic$ } from '../components/ExchangeRates/ExchangeRatesOperations';
import { rootReducer } from './combineReducers';

export const rootEpic = combineEpics(
    fetchExchangeRatesEpic$,
    fetchHistoricalRatesEpic$
);

const epicMiddleware = createEpicMiddleware();

export const configureStore = () => {
    const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(epicMiddleware)));
    epicMiddleware.run(rootEpic);
    return store;
};