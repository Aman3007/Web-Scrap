import { ExternalLink, ArrowUp, Clock, User } from 'lucide-react';
import BookmarkButton from '../ui/BookmarkButton';
import { useAuth } from '../../context/AuthContext';
import { formatDistanceToNow } from '../../utils/formatDate';

const StoryCard = ({ story, index }) => {
  const { user } = useAuth();
  const isBookmarked = user?.bookmarks?.some(
    (b) => (typeof b === 'object' ? b._id : b) === story._id
  );

  return (
    <article
      className="glass rounded-2xl p-5 border border-surface-700 card-hover group"
      aria-label={`Story: ${story.title}`}
    >
      <div className="flex items-start justify-between gap-4">
        {}
        <div className="flex gap-4 flex-1 min-w-0">
          {}
          <span className="shrink-0 w-7 h-7 rounded-lg bg-surface-700 flex items-center justify-center text-xs font-bold text-surface-300 mt-0.5">
            {index}
          </span>

          <div className="flex-1 min-w-0">
            {}
            <a
              href={story.url || '#'}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-white leading-snug hover:text-brand-400 transition-colors duration-200 flex items-start gap-2 group/link"
            >
              <span className="line-clamp-2">{story.title}</span>
              <ExternalLink
                size={14}
                className="shrink-0 mt-0.5 opacity-0 group-hover/link:opacity-100 transition-opacity text-brand-400"
              />
            </a>

            {}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 mt-2.5">
              {}
              <span className="badge bg-brand-500/15 text-brand-400">
                <ArrowUp size={11} />
                {story.points} pts
              </span>

              {}
              <span className="badge bg-surface-700 text-surface-200">
                <User size={11} />
                {story.author}
              </span>

              {}
              {story.postedAt && (
                <span className="badge bg-surface-700 text-surface-300">
                  <Clock size={11} />
                  {formatDistanceToNow(story.postedAt)}
                </span>
              )}
            </div>
          </div>
        </div>

        {}
        <BookmarkButton storyId={story._id} isBookmarked={isBookmarked} />
      </div>
    </article>
  );
};

export default StoryCard;
