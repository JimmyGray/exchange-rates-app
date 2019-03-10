import React from 'react';
import { render } from 'react-testing-library';
import { NavigationBar, NavigationBarRoute } from './NavigationBar';

const routes: Array<NavigationBarRoute> = [
    {
        path: '/Home',
        label: 'Home'
    },
    {
        path: '/About',
        label: 'About'
    }
];

describe('GIVEN an empty <NavigationBar> component', () => {
    const { getByTestId, queryByText } = render(<NavigationBar title={ '' } routes={ [] }/>);

    it('THEN Navigation Bar is rendered', () => {
        expect(getByTestId('navigation-bar')).toBeTruthy();
    });

    it('THEN Empty Navigation Bar has no routes', () => {
        expect(queryByText('Home')).toBeNull();
    });

    it('THEN Empty Navigation Bar has no title', () => {
        expect(queryByText('Title')).toBeNull();
    });
});

describe('GIVEN a <NavigationBar> with routes and title', () => {
    it('THEN Navigation Bar renders routes', () => {
        const { queryByText } = render(<NavigationBar title={ 'Title' } routes={ routes }/>);
        expect(queryByText('Home')).toBeTruthy();
        expect(queryByText('About')).toBeTruthy();
    });
    it('THEN Navigation Bar renders title', () => {
        const { queryByText } = render(<NavigationBar title={ 'Title' } routes={ routes }/>);
        expect(queryByText('Title')).toBeTruthy();
    });
});