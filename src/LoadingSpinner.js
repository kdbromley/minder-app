import React, { Component } from 'react';
import { usePromiseTracker } from 'react-promise-tracker';

export default function LoadingSpinner(props) {
    const { promiseInProgress } = usePromiseTracker();
    return (
        <>
        {
            (promiseInProgress === true) 
            ? <h3>Fetch in progress</h3>
            : null
        }
        </>
    )
}

