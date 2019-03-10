import React from 'react';
import { MemoryRouter, Route } from 'react-router';
import { Link } from 'react-router-dom';
import { About } from '../About/About';
import { ExchangeRates } from '../ExchangeRates/ExchangeRates';
import { Home } from '../Home/Home';
import './NavigationBarStyles.scss';

export interface NavigationBarProps {
    title: string;
    routes: Array<NavigationBarRoute>;
}

export interface NavigationBarRoute {
    label: string;
    path: string;
}

export const NavigationBar = (props: NavigationBarProps) => (
    <MemoryRouter>
        <div>
            <nav className='navigation-bar__container' data-testid='navigation-bar'>
                <div className='navigation-bar__title'>{ props.title }</div>
                <ul className='navigation-bar__list'>
                    { props.routes.map(route => <NavLink key={ route.path } { ...route }/>) }
                </ul>
            </nav>
            <Route path="/" exact component={ Home }/>
            <Route path="/about" exact component={ About }/>
            <Route path="/exchange-rates" exact component={ ExchangeRates }/>
        </div>
    </MemoryRouter>
);

export const NavLink = (props: NavigationBarRoute) => (
    <Link data-testid='navigation-link' to={ props.path } className='navigation-bar__link'>{ props.label }</Link>
);