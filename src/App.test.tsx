import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import App from './App';

jest.useFakeTimers();

describe('Stopwatch App', () => {
  it('Renders and interacts with the Stopwatch component', () => {
    render(<App />);

    const stopwatchHeading = screen.getByRole('heading', { name: /Stopwatch/i });

    expect(stopwatchHeading).toBeInTheDocument();
  })
});