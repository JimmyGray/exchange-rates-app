import React from 'react';
import { render } from 'react-testing-library';
import { About } from './About';

describe('GIVEN a <About> component', () => {
    it('Renders About Message', () => {
        const { getByText } = render(<About/>);
        expect(getByText('About Page')).toBeTruthy();
    });
});