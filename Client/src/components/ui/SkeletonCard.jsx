const SkeletonCard = () => (
  <div className="glass rounded-2xl p-5 border border-surface-700">
    <div className="flex items-start justify-between gap-4">
      <div className="flex-1 space-y-3">
        <div className="skeleton h-5 w-3/4 rounded-lg" />
        <div className="skeleton h-4 w-1/2 rounded-lg" />
        <div className="flex gap-3 mt-2">
          <div className="skeleton h-6 w-16 rounded-full" />
          <div className="skeleton h-6 w-20 rounded-full" />
          <div className="skeleton h-6 w-24 rounded-full" />
        </div>
      </div>
      <div className="skeleton h-9 w-9 rounded-lg shrink-0" />
    </div>
  </div>
);

const StorySkeletons = ({ count = 10 }) => (
  <div className="space-y-3">
    {Array.from({ length: count }).map((_, i) => (
      <SkeletonCard key={i} />
    ))}
  </div>
);

export default StorySkeletons;
