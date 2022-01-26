import React, { ReactElement, useState, useEffect, useCallback } from 'react';
import { reconnect } from './api';

export default function Reconnect() {
    const handleClick = (event) => {
        event.preventDefault();
        reconnect()
            .then(console.log)
    }

    return (
        <button onClick={handleClick}>
            Reconnect Now!
        </button>
    )
}