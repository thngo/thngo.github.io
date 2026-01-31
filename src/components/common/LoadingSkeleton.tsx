import React from 'react';

/**
 * Animated loading skeleton component
 *
 * Displays a pulsing placeholder UI while content is loading.
 * Used as a Suspense fallback for lazy-loaded routes to improve
 * perceived performance.
 *
 * Features:
 * - Pulsing animation using Tailwind's animate-pulse
 * - Mimics typical page layout (title, content grid, sections)
 * - Responsive design with mobile/desktop layouts
 *
 * @example
 * ```tsx
 * <Suspense fallback={<LoadingSkeleton />}>
 *   <LazyComponent />
 * </Suspense>
 * ```
 */
const LoadingSkeleton: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto p-8 space-y-8 animate-pulse">
      {/* Title skeleton */}
      <div className="h-8 bg-gray-300 rounded w-1/3 mx-auto"></div>

      {/* Content grid skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2 space-y-4">
          <div className="h-4 bg-gray-300 rounded"></div>
          <div className="h-4 bg-gray-300 rounded"></div>
          <div className="h-4 bg-gray-300 rounded w-5/6"></div>
        </div>
        <div className="h-48 bg-gray-300 rounded"></div>
      </div>

      {/* Additional content sections */}
      <div className="space-y-4">
        <div className="h-6 bg-gray-300 rounded w-1/4"></div>
        <div className="h-4 bg-gray-300 rounded"></div>
        <div className="h-4 bg-gray-300 rounded"></div>
        <div className="h-4 bg-gray-300 rounded w-4/5"></div>
      </div>

      <div className="space-y-4">
        <div className="h-6 bg-gray-300 rounded w-1/4"></div>
        <div className="h-4 bg-gray-300 rounded"></div>
        <div className="h-4 bg-gray-300 rounded w-3/4"></div>
      </div>
    </div>
  );
};

export default LoadingSkeleton;
