import { ChevronLeft, ChevronRight } from 'lucide-react';

const Pagination = ({ page, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  const pages = [];
  const delta = 2;
  const left = Math.max(1, page - delta);
  const right = Math.min(totalPages, page + delta);

  if (left > 1) {
    pages.push(1);
    if (left > 2) pages.push('...');
  }
  for (let i = left; i <= right; i++) pages.push(i);
  if (right < totalPages) {
    if (right < totalPages - 1) pages.push('...');
    pages.push(totalPages);
  }

  return (
    <div className="flex items-center justify-center gap-2 mt-8">
      <button
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
        className="btn-ghost px-3 py-2 disabled:opacity-30"
        aria-label="Previous page"
      >
        <ChevronLeft size={18} />
      </button>

      {pages.map((p, idx) =>
        p === '...' ? (
          <span key={`ellipsis-${idx}`} className="px-2 text-surface-400 select-none">
            …
          </span>
        ) : (
          <button
            key={p}
            onClick={() => onPageChange(p)}
            className={`w-9 h-9 rounded-xl text-sm font-medium transition-all duration-200 ${
              p === page
                ? 'bg-brand-500 text-white shadow-lg shadow-brand-500/30'
                : 'text-surface-200 hover:bg-surface-700 hover:text-white'
            }`}
            aria-label={`Page ${p}`}
            aria-current={p === page ? 'page' : undefined}
          >
            {p}
          </button>
        )
      )}

      <button
        onClick={() => onPageChange(page + 1)}
        disabled={page === totalPages}
        className="btn-ghost px-3 py-2 disabled:opacity-30"
        aria-label="Next page"
      >
        <ChevronRight size={18} />
      </button>
    </div>
  );
};

export default Pagination;
