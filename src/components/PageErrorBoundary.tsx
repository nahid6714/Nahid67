import React from 'react';

interface PageErrorBoundaryProps {
  children: React.ReactNode;
  pageName?: string;
}

interface PageErrorBoundaryState {
  hasError: boolean;
}

/**
 * Keeps one broken page from taking down the entire portfolio.
 * A refresh button lets visitors retry after a transient browser/runtime issue.
 */
export class PageErrorBoundary extends React.Component<
  PageErrorBoundaryProps,
  PageErrorBoundaryState
> {
  state: PageErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): PageErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    console.error(`Portfolio page error${this.props.pageName ? ` (${this.props.pageName})` : ''}:`, error);
  }

  handleRetry = () => {
    this.setState({ hasError: false });
  };

  render() {
    if (!this.state.hasError) {
      return this.props.children;
    }

    return (
      <section className="min-h-[60vh] flex items-center justify-center px-4 py-20 bg-slate-50 dark:bg-slate-950">
        <div className="w-full max-w-lg rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-8 text-center shadow-xl">
          <div className="mx-auto mb-4 w-12 h-12 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-500 text-xl">
            !
          </div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">This page could not be displayed</h2>
          <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
            A temporary page error occurred. Try loading this page again.
          </p>
          <button
            type="button"
            onClick={this.handleRetry}
            className="mt-5 inline-flex items-center justify-center rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </section>
    );
  }
}
