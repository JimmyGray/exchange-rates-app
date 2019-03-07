import React, { Component } from 'react';

import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router';
import { Link, Route } from 'react-router-dom';
import './App.css';
import { About } from './components/About/About';
import { ExchangeRatesViewConnected } from './components/ExchangeRates/ExchangeRatesView';
import { Home } from './components/Home/Home';
import { configureStore } from './store/createStore';

const store = configureStore();

class App extends Component {
    render() {
        return (
            <Provider store={ store }>
                <MemoryRouter>
                    <div>
                        <nav>
                            <ul>
                                <li>
                                    <Link to="/">Home</Link>
                                </li>
                                <li>
                                    <Link to="/about/">About</Link>
                                </li>
                                <li>
                                    <Link to="/exchange-rates/">Exchange Rates</Link>
                                </li>
                            </ul>
                        </nav>
                        <Route path="/" exact component={ Home }/>
                        <Route path="/about" exact component={ About }/>
                        <Route path="/exchange-rates" exact component={ ExchangeRatesViewConnected }/>
                    </div>
                </MemoryRouter>
            </Provider>
        );
    }
}

export default App;
