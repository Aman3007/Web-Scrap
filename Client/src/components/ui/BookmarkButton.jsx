import { Bookmark, BookmarkCheck } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useToggleBookmark } from '../../hooks/useStories';
import { useNavigate } from 'react-router-dom';

const BookmarkButton = ({ storyId, isBookmarked }) => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { mutate, isPending } = useToggleBookmark();

  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    mutate(storyId);
  };

  return (
    <button
      onClick={handleClick}
      disabled={isPending}
      aria-label={isBookmarked ? 'Remove bookmark' : 'Add bookmark'}
      className={`p-2 rounded-lg transition-all duration-200 ${
        isBookmarked
          ? 'text-brand-400 bg-brand-500/10 hover:bg-brand-500/20'
          : 'text-surface-300 hover:text-brand-400 hover:bg-surface-700'
      } disabled:opacity-50`}
    >
      {isBookmarked ? (
        <BookmarkCheck size={16} className="fill-brand-400" />
      ) : (
        <Bookmark size={16} />
      )}
    </button>
  );
};

export default BookmarkButton;
