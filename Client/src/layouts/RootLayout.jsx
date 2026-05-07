import { Outlet } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';

const RootLayout = () => (
  <div className="min-h-screen flex flex-col">
    <Navbar />
    <main className="flex-1 max-w-5xl mx-auto w-full px-4 sm:px-6 py-8">
      <Outlet />
    </main>
    <footer className="border-t border-surface-700/60 py-5 text-center text-xs text-surface-400">
      <p>
        HNFeed — Stories powered by{' '}
        <a
          href="https://news.ycombinator.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-brand-400 hover:underline"
        >
          Hacker News
        </a>
      </p>
    </footer>
  </div>
);

export default RootLayout;
