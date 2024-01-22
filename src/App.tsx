import React from 'react'
import { useState, useEffect, useRef } from 'react';
import StopWatchButton from './StopWatchButton';
import StopWatch from './StopWatch';

export default function App() {
    const [isRunning, setIsRunning] = useState<boolean>(false);
    const [elapsedTime, setElapsedTime] = useState<number>(0);
    const intervalRef = useRef<number | null>(null);
    const startTimeRef = useRef<number>(0);

    useEffect(() => {
        if(isRunning) {
            // Sets the start ref to the current time
            startTimeRef.current = Date.now() - elapsedTime;

            // Interval to update the elapsed time every 10 milliseconds
            intervalRef.current = window.setInterval(() => {
                const currentTime = Date.now() - startTimeRef.current;
                setElapsedTime(currentTime) // Updates the elapsed time
            }, 10);
        }

        // Unmounts the component to ensure the timer stops when the stop button is clicked
        return () => {
            const intervalId = intervalRef.current;
            if (intervalId !== null) {
                clearInterval(intervalId);
            }
        };
    }, [isRunning, elapsedTime]);

    const toggleTimmer = ():void => {
        setIsRunning(!isRunning);
    }

    const lapResetAction = (): void => {

    }

    const formatTime = (time: number): string => {
        const minutes = Math.floor(time / 60000);
        const seconds = Math.floor((time % 60000) / 1000);
        const milliseconds = Math.floor((time % 1000) / 10);

        return (`${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(2, '0')}`);
    }

    return(
        <div>
            <header>
                <h1>Stopwatch</h1>
            </header>

            <section>
                <StopWatch elapsedTime={elapsedTime} formatTime={formatTime} />
                <StopWatchButton onClick={toggleTimmer} label={isRunning ? 'Stop' : 'Start'} />
                <StopWatchButton onClick={lapResetAction} label={isRunning ? 'Lap' : 'Reset'} />
            </section>
        </div>
    )
}