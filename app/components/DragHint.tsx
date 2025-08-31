export default function DragHint() {
  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-lg px-4 py-3 shadow-lg border border-white/50 max-w-xs">
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1">
          {/* Drag icon */}
          <svg
            className="w-5 h-5 text-gray-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M7 16l-4-4m0 0l4-4m-4 4h18"
            />
          </svg>
          <svg
            className="w-5 h-5 text-gray-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
          </svg>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-700">Drag to explore</p>
          <p className="text-xs text-gray-500">Swipe cards horizontally</p>
        </div>
      </div>
    </div>
  );
}
