import React from 'react'
import { useState } from 'react'
import StopWatchButton from './StopWatchButton'

export default function App() {
    const [isRunning, setIsRunning] = useState<boolean>(false);

    const toggleTimmer = ():void => {
        setIsRunning(!isRunning);
    }

    const lapResetAction = (): void => {

    }

    return(
        <div>
            <header>
                <h1>Stopwatch</h1>
            </header>

            <section>
                <StopWatchButton onClick={toggleTimmer} label={isRunning ? 'Stop' : 'Start'} />
                <StopWatchButton onClick={lapResetAction} label={isRunning ? 'Lap' : 'Reset'} />
            </section>
        </div>
    )
}