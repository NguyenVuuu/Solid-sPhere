import React from 'react';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null, errorInfo: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        console.error("🚨 ErrorBoundary caught an error:", error);
        console.error("🚨 Error info:", errorInfo);
        this.setState({
            error,
            errorInfo
        });
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
                    <div className="max-w-2xl w-full bg-white rounded-lg shadow-lg p-8">
                        <div className="flex items-start">
                            <div className="flex-shrink-0">
                                <svg className="h-12 w-12 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                </svg>
                            </div>
                            <div className="ml-4 flex-1">
                                <h3 className="text-xl font-bold text-gray-900 mb-2">
                                    🚨 Oops! Có lỗi xảy ra
                                </h3>
                                <p className="text-gray-700 mb-4">
                                    Component gặp lỗi khi render. Vui lòng kiểm tra Console (F12) để biết thêm chi tiết.
                                </p>

                                {this.state.error && (
                                    <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
                                        <h4 className="text-sm font-semibold text-red-800 mb-2">Error Message:</h4>
                                        <pre className="text-xs text-red-700 whitespace-pre-wrap overflow-auto">
                                            {this.state.error.toString()}
                                        </pre>
                                    </div>
                                )}

                                {this.state.errorInfo && (
                                    <details className="mb-4">
                                        <summary className="cursor-pointer text-sm font-semibold text-gray-700 hover:text-gray-900">
                                            Stack Trace (Click to expand)
                                        </summary>
                                        <pre className="mt-2 text-xs text-gray-600 bg-gray-100 p-3 rounded overflow-auto max-h-64">
                                            {this.state.errorInfo.componentStack}
                                        </pre>
                                    </details>
                                )}

                                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                                    <h4 className="text-sm font-semibold text-blue-800 mb-2">💡 Cách khắc phục:</h4>
                                    <ul className="list-disc list-inside text-sm text-blue-700 space-y-1">
                                        <li>Kiểm tra Backend đang chạy và trả về data đúng format</li>
                                        <li>Kiểm tra ProductCard component có props đúng không</li>
                                        <li>Xem Console (F12) để biết lỗi cụ thể</li>
                                        <li>Thử refresh page (Ctrl + R)</li>
                                    </ul>
                                </div>

                                <button
                                    onClick={() => window.location.reload()}
                                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
                                >
                                    🔄 Refresh Page
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;