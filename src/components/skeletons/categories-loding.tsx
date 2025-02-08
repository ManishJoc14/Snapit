
export default function CategoriesSkeleton() {
    return (
        Array.from({ length: 7 }).map((_, index) => (
            <li key={index}>
                <button className="w-full text-left px-3 py-2 rounded-md flex items-center gap-3">
                    <div className="w-6 h-6 bg-gray-200 rounded-full animate-pulse"></div>
                    <div className="w-28 h-6 bg-gray-200 rounded-sm animate-pulse"></div>
                </button>
            </li>
        ))
    )
}