import { Bookmark, ExternalLink, ArrowUp, Clock, User } from 'lucide-react';
import { useBookmarks, useToggleBookmark } from '../hooks/useStories';
import StorySkeletons from '../components/ui/SkeletonCard';
import ErrorState from '../components/ui/ErrorState';
import EmptyState from '../components/ui/EmptyState';
import { formatDistanceToNow } from '../utils/formatDate';

const BookmarksPage = () => {
  const { data, isLoading, isError, error, refetch } = useBookmarks();
  const { mutate: toggle } = useToggleBookmark();
  const stories = data?.data || [];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight flex items-center gap-3">
          <Bookmark className="text-brand-400" size={26} />
          Bookmarks
        </h1>
        <p className="text-surface-300 text-sm mt-1">
          {stories.length} saved {stories.length === 1 ? 'story' : 'stories'}
        </p>
      </div>

      {isLoading && <StorySkeletons count={5} />}
      {isError && <ErrorState message={error?.message} onRetry={refetch} />}
      {!isLoading && !isError && stories.length === 0 && (
        <EmptyState
          icon={Bookmark}
          title="No bookmarks yet"
          subtitle="Head to the home page and bookmark stories you want to read later."
        />
      )}

      {!isLoading && !isError && stories.length > 0 && (
        <div className="space-y-3">
          {stories.map((story) => (
            <article key={story._id} className="glass rounded-2xl p-5 border border-surface-700 card-hover">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0 space-y-2">
                  <a href={story.url || '#'} target="_blank" rel="noopener noreferrer"
                    className="font-semibold text-white hover:text-brand-400 transition-colors flex items-start gap-2 group">
                    <span className="line-clamp-2">{story.title}</span>
                    <ExternalLink size={13} className="shrink-0 mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity text-brand-400" />
                  </a>
                  <div className="flex flex-wrap gap-3">
                    <span className="badge bg-brand-500/15 text-brand-400"><ArrowUp size={11} />{story.points} pts</span>
                    <span className="badge bg-surface-700 text-surface-200"><User size={11} />{story.author}</span>
                    {story.postedAt && (
                      <span className="badge bg-surface-700 text-surface-300"><Clock size={11} />{formatDistanceToNow(story.postedAt)}</span>
                    )}
                  </div>
                </div>
                <button
                  onClick={() => toggle(story._id)}
                  className="p-2 rounded-lg text-brand-400 bg-brand-500/10 hover:bg-red-500/10 hover:text-red-400 transition-all shrink-0"
                  aria-label="Remove bookmark"
                  title="Remove bookmark"
                >
                  <Bookmark size={16} className="fill-brand-400" />
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
};

export default BookmarksPage;
