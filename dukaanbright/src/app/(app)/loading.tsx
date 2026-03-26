export default function Loading() {
  return (
    <div className="space-y-8 animate-pulse">
      {/* Header skeleton */}
      <div className="space-y-2">
        <div className="h-8 w-64 bg-surface-container rounded-xl" />
        <div className="h-4 w-48 bg-surface-container-low rounded-xl" />
      </div>
      {/* KPI strip skeleton */}
      <div className="grid grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-surface-container-lowest rounded-xl p-5 shadow-card space-y-3">
            <div className="h-3 w-24 bg-surface-container rounded" />
            <div className="h-8 w-32 bg-surface-container rounded-xl" />
            <div className="h-3 w-16 bg-surface-container-low rounded" />
          </div>
        ))}
      </div>
      {/* Content area skeleton */}
      <div className="grid grid-cols-12 gap-8">
        <div className="col-span-8 bg-surface-container-lowest rounded-xl p-7 shadow-card h-72" />
        <div className="col-span-4 space-y-6">
          <div className="bg-surface-container-lowest rounded-xl p-6 shadow-card h-32" />
          <div className="bg-surface-container-lowest rounded-xl p-6 shadow-card h-48" />
        </div>
      </div>
    </div>
  );
}
