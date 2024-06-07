import React, { Component } from 'react';

class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        console.error("ErrorBoundary caught an error", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            if (this.state.error?.message.includes("Loading chunk")) {
                return (
                    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 p-4">
                        <h1 className="text-2xl font-bold text-red-600 mb-4">Something went wrong while loading the page. Please try again later.</h1>
                        <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition" onClick={() => window.location.reload()}>Reload</button>
                    </div>
                );
            }

            return (
                <div className="flex flex-col items-center justify-center h-screen bg-gray-100 p-4">
                    <h1 className="text-2xl font-bold text-red-600">Something went wrong. Please try again later.</h1>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
