import { applyMiddleware, createStore } from 'redux';
import { combineEpics, createEpicMiddleware } from 'redux-observable';
import { fetchExchangeRatesEpic$ } from '../components/ExchangeRates/ExchangeRatesOperations';
import { rootReducer } from './combineReducers';
import { composeWithDevTools } from 'redux-devtools-extension';

export const rootEpic = combineEpics(
    fetchExchangeRatesEpic$
);

const epicMiddleware = createEpicMiddleware();

export const configureStore = () => {
    const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(epicMiddleware)));
    epicMiddleware.run(rootEpic);
    return store;
}