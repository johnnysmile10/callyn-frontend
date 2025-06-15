
import React from "react";

/**
 * EliteErrorBoundary is a robust error boundary for the Call Center interface.
 * It catches rendering/runtime errors in its child subtree and displays a friendly fallback.
 */
interface EliteErrorBoundaryProps {
  children: React.ReactNode;
}

interface EliteErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class EliteErrorBoundary extends React.Component<
  EliteErrorBoundaryProps,
  EliteErrorBoundaryState
> {
  constructor(props: EliteErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // You can log to an external service here.
    if (process.env.NODE_ENV !== "production") {
      // eslint-disable-next-line no-console
      console.error("Elite Call Center Error Boundary caught error:", error, errorInfo);
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-6 bg-red-50 text-red-800 border border-red-200 rounded shadow-inner my-5">
          <h2 className="font-bold text-lg mb-2">Oops! Something went wrong.</h2>
          <div className="text-sm">
            <div>Please refresh or reach out to support if the issue persists.</div>
            {process.env.NODE_ENV !== "production" && this.state.error && (
              <pre className="mt-2 text-xs whitespace-pre-wrap break-all max-h-32 overflow-auto">
                {this.state.error.message}
              </pre>
            )}
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default EliteErrorBoundary;

