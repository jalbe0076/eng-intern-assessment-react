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
    expect(lapResetButton).toHaveTextContent('Lap');

    // Trigger stop button click
    fireEvent.click(startStopButton);

    act(() => {
      jest.advanceTimersByTime(100);
    });    

    expect(timeElement).toHaveTextContent('00:00.10');
  });

  it('Should add laps and reset the timer', () => {
    // Trigger start button click
    fireEvent.click(startStopButton);

    // Advance time by 100ms
    act(() => {
      jest.advanceTimersByTime(100);
    });

    // Check if the stopwatch time is updated
    fireEvent.click(lapResetButton);

    // Get and check laps
    const currentLapTime = screen.getByText(/Current Lap:/i);
    const lapTime1 = screen.getByText(/Lap 1: 00:00.10/i);
    expect(currentLapTime).toBeInTheDocument();
    expect(lapTime1).toBeInTheDocument();
    expect(timeElement).toHaveTextContent('00:00.10');

    act(() => {
      jest.advanceTimersByTime(200);
    });    

    // Trigger stop button click
    fireEvent.click(lapResetButton);
    
    // Get and check additional laps
    const lapTime2 = screen.getByText(/Lap 2: 00:00.20/i);
    expect(lapTime2).toBeInTheDocument();
    expect(timeElement).toHaveTextContent('00:00.30');
    
    // Trigger stop and reset button click
    fireEvent.click(startStopButton);
    expect(lapResetButton).toHaveTextContent('Reset');
    fireEvent.click(lapResetButton);

    // Confirm reset render
    expect(timeElement).toHaveTextContent('00:00.00');
    expect(currentLapTime).not.toBeInTheDocument();
    expect(lapTime1).not.toBeInTheDocument();
    expect(lapTime2).not.toBeInTheDocument();
  });
});