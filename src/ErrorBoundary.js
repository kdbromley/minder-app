import { PropTypes } from 'prop-types';
import React from 'react';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className='error'>
                    <h1 className='error__message'>
                        Something went wrong.
                    </h1>
                </div>
            )
        }
        return this.props.children;
    }
}

ErrorBoundary.propTypes = {
    children: PropTypes.object
}

export default ErrorBoundary;