import { Link } from 'react-router-dom';
import { Home, Frown } from 'lucide-react';

const NotFoundPage = () => (
  <div className="min-h-[calc(100vh-12rem)] flex items-center justify-center text-center">
    <div className="space-y-6">
      <div className="relative inline-block">
        <span className="text-[8rem] font-black text-surface-700 leading-none select-none">404</span>
        <Frown size={48} className="text-brand-400 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
      </div>
      <div>
        <h1 className="text-2xl font-bold text-white mb-2">Page not found</h1>
        <p className="text-surface-300 text-sm max-w-xs mx-auto">
          The page you're looking for doesn't exist or has been moved.
        </p>
      </div>
      <Link to="/" className="btn-primary inline-flex">
        <Home size={16} />
        Back to Home
      </Link>
    </div>
  </div>
);

export default NotFoundPage;
