import React from 'react'

interface StopWatchProps {
    elapsedTime: number;
    formatTime: (arg: number) => string;
    label: string;
}

export default function StopWatch({ elapsedTime, formatTime, label }: StopWatchProps) {
    return(
        <p className={label}>{formatTime(elapsedTime)}</p>
    )
}