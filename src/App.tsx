import React from 'react'
import { useState, useEffect, useRef } from 'react';
import StopWatchButton from './StopWatchButton';
import StopWatch from './StopWatch';
import './App.css';

export default function App() {
    const [isRunning, setIsRunning] = useState<boolean>(false);
    const [elapsedTime, setElapsedTime] = useState<number>(0);
    const [lapTimer, setLapTimer] = useState<number>(0);
    const [savedLaps, setSavedLaps] = useState<number[]>([]);
    const intervalRef = useRef<number | null>(null);
    const startTimeRef = useRef<number>(0);
    const startLapTimeRef = useRef<number>(0);

    useEffect(() => {
        if(isRunning) {
            // Sets the start and lap ref to the current time
            startTimeRef.current = Date.now() - elapsedTime;
            startLapTimeRef.current = Date.now() - lapTimer;

            // Interval to update the elapsed time every 10 milliseconds
            intervalRef.current = window.setInterval(() => {
                const currentTime = Date.now() - startTimeRef.current;
                const currentLapTime = Date.now() - startLapTimeRef.current;
                setElapsedTime(currentTime) // Updates the elapsed time
                setLapTimer(currentLapTime); // Updates the lap timer
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

    const toggleTimmer = (): void => {
        setIsRunning(!isRunning);
    }

    const lapResetAction = (): void => {
        if(isRunning) {
            saveLap();
        } else {
            resetStopWatch();
        }
    }
    
    const resetStopWatch = (): void => {
        setElapsedTime(0)
        setLapTimer(0);
        setSavedLaps([]);

        // Reset the timer references to 0
        startTimeRef.current = 0;
        startLapTimeRef.current = 0;
    }
    
    const saveLap = (): void => {
        if(isRunning) {
            const lapElapsedTime = Date.now() - startLapTimeRef.current;
            setSavedLaps((prevLaps) => [lapElapsedTime, ...prevLaps]);
            startLapTimeRef.current = Date.now(); // Reset lap timer after saving the previous lap in array
        }
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
                <StopWatch label='main-timer' elapsedTime={elapsedTime} formatTime={formatTime} />
                <div className='btn-container'>
                    <StopWatchButton onClick={toggleTimmer} label={isRunning ? 'Stop' : 'Start'} />
                    <StopWatchButton onClick={lapResetAction} label={isRunning ? 'Lap' : 'Reset'} />
                </div>
            </section>

            {savedLaps.length > 0 && (
                <section>
                    <ul>
                        <li className='lap-list'><span>Current Lap: </span><StopWatch label='lap-timer' elapsedTime={lapTimer} formatTime={formatTime} /></li>
                        {savedLaps.map((lapTime, index) => {
                            return <li className='lap-list' key={index}><span>{`Lap ${savedLaps.length - index}:`}</span><span>{formatTime(lapTime)}</span></li>
                        })}
                    </ul>
                </section>
            )}
        </div>
    )
}