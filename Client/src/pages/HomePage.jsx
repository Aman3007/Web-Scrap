import { useState, useCallback } from 'react';
import { Search, Zap } from 'lucide-react';
import StoryCard from '../components/stories/StoryCard';
import StorySkeletons from '../components/ui/SkeletonCard';
import ErrorState from '../components/ui/ErrorState';
import EmptyState from '../components/ui/EmptyState';
import Pagination from '../components/ui/Pagination';
import { useStories } from '../hooks/useStories';
import { DEFAULT_PAGE_SIZE } from '../constants';

const HomePage = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [searchInput, setSearchInput] = useState('');

  const { data, isLoading, isError, error, refetch } = useStories({
    page,
    limit: DEFAULT_PAGE_SIZE,
    search,
  });

  const stories = data?.data || [];
  const pagination = data?.pagination || {};

  const handleSearch = useCallback((e) => {
    e.preventDefault();
    setPage(1);
    setSearch(searchInput.trim());
  }, [searchInput]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="space-y-6">
      {}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Top Stories
          </h1>
          <p className="text-surface-300 text-sm mt-1">
            {pagination.total
              ? `${pagination.total} stories scraped from Hacker News`
              : 'Live stories from Hacker News'}
          </p>
        </div>

        {}
        <form onSubmit={handleSearch} className="flex gap-2 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-surface-400" />
            <input
              type="text"
              id="story-search"
              placeholder="Search stories…"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="input-field pl-9"
            />
          </div>
          <button type="submit" className="btn-primary shrink-0">
            Search
          </button>
        </form>
      </div>

      {}
      {search && (
        <div className="flex items-center gap-2">
          <span className="badge bg-brand-500/15 text-brand-400">
            <Zap size={11} />
            Showing results for: "{search}"
          </span>
          <button
            onClick={() => { setSearch(''); setSearchInput(''); setPage(1); }}
            className="text-xs text-surface-400 hover:text-white transition-colors"
          >
            Clear
          </button>
        </div>
      )}

      {}
      {isLoading && <StorySkeletons count={DEFAULT_PAGE_SIZE} />}

      {isError && (
        <ErrorState
          message={error?.message || 'Failed to load stories.'}
          onRetry={refetch}
        />
      )}

      {!isLoading && !isError && stories.length === 0 && (
        <EmptyState
          title="No stories found"
          subtitle={search ? `No results for "${search}". Try a different keyword.` : 'Click Refresh to scrape the latest stories from Hacker News.'}
        />
      )}

      {!isLoading && !isError && stories.length > 0 && (
        <>
          <div className="space-y-3">
            {stories.map((story, i) => (
              <StoryCard
                key={story._id}
                story={story}
                index={(page - 1) * DEFAULT_PAGE_SIZE + i + 1}
              />
            ))}
          </div>
          <Pagination
            page={pagination.page || page}
            totalPages={pagination.totalPages || 1}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </div>
  );
};

export default HomePage;
