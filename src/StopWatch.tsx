import React from 'react'

interface StopWatchProps {
    elapsedTime: number;
    formatTime: (arg: number) => string
}

export default function StopWatch({ elapsedTime, formatTime }: StopWatchProps) {
    return(
        <p>{formatTime(elapsedTime)}</p>
    )
}