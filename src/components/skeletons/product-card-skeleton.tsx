export default function ProductCardSkeleton() {
    return (
        <div className="border rounded-lg overflow-hidden animate-pulse">
            {/* Image Skeleton */}
            <div className="relative aspect-square bg-gray-200" />

            {/* Content Skeleton */}
            <div className="p-3 space-y-3">
                <div className="flex items-center gap-1 text-sm text-gray-200">
                    <div className="w-4 h-4 bg-gray-200 rounded-full" />
                    <div className="w-16 h-4 bg-gray-200 rounded" />
                </div>

                <div className="w-3/4 h-5 bg-gray-200 rounded" />
                <div className="w-1/2 h-4 bg-gray-200 rounded" />

                <div className="flex items-center justify-between">
                    <div className="w-16 h-5 bg-gray-200 rounded" />
                    <div className="w-20 h-8 bg-gray-200 rounded" />
                </div>
            </div>
        </div>
    );
}
