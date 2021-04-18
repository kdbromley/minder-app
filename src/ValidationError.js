import React from 'react';

export default function ValidationError(props) {
    const style = {
        paddingBottom: '10px',
        fontFamily: `'Playfair Display', 'Bodoni MT', 'Didot', 'Times', serif`,
        fontStyle: 'italic'
    }
    
    if (props.message) {
        return (
            <div className='error' style={style} role='alert' >{props.message}</div>
        );
    }
    return <></>
}