import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent, act } from '@testing-library/react';
import App from './App';

jest.useFakeTimers();

describe('Stopwatch App', () => {
  let stopwatchHeading: HTMLElement;;
  let timeElement: HTMLElement;;
  let startStopButton: HTMLElement;;
  let lapResetButton: HTMLElement;;

  beforeEach(() => {
    render(<App />);

    // Set up elements before each test
    stopwatchHeading = screen.getByRole('heading', { name: /Stopwatch/i });
    timeElement = screen.getByText(/00:00.00/i);
    startStopButton = screen.getByRole('button', { name: /Start/i });
    lapResetButton = screen.getByRole('button', { name: /Reset/i });
  });

  it('Should start and stop the timer', () => {
    // verify initial render
    expect(stopwatchHeading).toBeInTheDocument();
    expect(timeElement).toBeInTheDocument();
    expect(startStopButton).toBeInTheDocument();
    expect(lapResetButton).toBeInTheDocument();

    // Trigger start button click
    fireEvent.click(startStopButton);

    // Advance time by 100ms
    act(() => {
      jest.advanceTimersByTime(100);
    });

    // Check if the stopwatch time is updated
    expect(timeElement).not.toHaveTextContent('00:00.00');
    expect(timeElement).toHaveTextContent('00:00.10');
    expect(startStopButton).toHaveTextContent('Stop');

    fireEvent.click(startStopButton);

    act(() => {
      jest.advanceTimersByTime(100);
    });    

    expect(timeElement).toHaveTextContent('00:00.10');
  });
});