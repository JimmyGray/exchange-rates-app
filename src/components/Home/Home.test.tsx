import React from 'react';
import { render } from 'react-testing-library';
import { Home } from './Home';

describe('GIVEN a <Home> component', () => {
    it('Renders Home Message', () => {
        const { getByText } = render(<Home/>);
        expect(getByText('Home Page')).toBeTruthy();
    });
});
