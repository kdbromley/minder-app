import React, { Component } from 'react';
import { usePromiseTracker } from 'react-promise-tracker';
import Loader from 'react-loader-spinner';

export default function LoadingSpinner(props) {
    const { promiseInProgress } = usePromiseTracker();
    return (
        <>
        {
            (promiseInProgress === true) 
            ? <Loader type='Bars' color='#810012'/>
            : null
        }
        </>
    )
}

