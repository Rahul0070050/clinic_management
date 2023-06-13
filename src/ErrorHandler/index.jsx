import React, { Component } from 'react';

class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hasError: false,
        };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true }
    }

    componentDidCatch(error, info) {
        // You can log the error to an error reporting service
        console.error(error);

        this.state.hasError
        // You can also display a fallback UI
        this.setState({ hasError: true });
    }

    render() {
        if (this.state.hasError) {
            // Fallback UI when an error occurs
            return <h1>Something went wrong.</h1>;
        }
        return this.props.children;
    }
}

export default ErrorBoundary;
