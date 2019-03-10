import React, { Component } from 'react';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router';
import { Route } from 'react-router-dom';
import 'rxjs';
import './App.scss';
import { About } from './components/About/About';
import { ExchangeRates } from './components/ExchangeRates/ExchangeRates';
import { Home } from './components/Home/Home';
import { NavigationBar, NavigationBarRoute } from './components/NavigationBar/NavigationBar';
import { configureStore } from './store/createStore';

const store = configureStore();

export const routes: Array<NavigationBarRoute> = [
    {
        label: 'Home',
        path: '/'
    },
    {
        label: 'About',
        path: '/about/'
    },
    {
        label: 'Exchange Rates',
        path: '/exchange-rates/'
    }
];

class App extends Component {
    render() {
        return (
            <Provider store={ store }>
                <NavigationBar title='Exchange Rates' routes={routes}/>
            </Provider>
        );
    }
}

export default App;
