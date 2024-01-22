import React from 'react'

interface StopWatchButtonProps {
    label: string;
    onClick: () => void;
}

export default function StopWatchButton({ label, onClick }: StopWatchButtonProps) {
    return(
        <button className={label} onClick={onClick}>{label}</button>
    )
}