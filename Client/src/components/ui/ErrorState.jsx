import { AlertTriangle, RefreshCw } from 'lucide-react';

const ErrorState = ({ message = 'Something went wrong.', onRetry }) => (
  <div className="flex flex-col items-center justify-center py-20 text-center gap-4">
    <div className="w-16 h-16 rounded-2xl bg-red-500/10 flex items-center justify-center">
      <AlertTriangle size={28} className="text-red-400" />
    </div>
    <div>
      <h3 className="text-lg font-semibold text-white mb-1">Failed to load</h3>
      <p className="text-surface-300 text-sm max-w-sm">{message}</p>
    </div>
    {onRetry && (
      <button onClick={onRetry} className="btn-ghost gap-2">
        <RefreshCw size={15} />
        Try again
      </button>
    )}
  </div>
);

export default ErrorState;
