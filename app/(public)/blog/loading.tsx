export default function Loading() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center p-8 bg-transparent">
      <div role="status" aria-live="polite" aria-busy="true" className="text-center">
        {/* Spinner */}
        <svg
          className="w-12 h-12 block mx-auto animate-spin"
          viewBox="0 0 50 50"
          aria-hidden="true"
        >
          <circle
            cx="25"
            cy="25"
            r="20"
            className="stroke-gray-200"
            strokeWidth="6"
            fill="none"
          />
          <path
            d="M45 25a20 20 0 0 1-20 20"
            className="stroke-primary"
            strokeWidth="6"
            strokeLinecap="round"
            fill="none"
          />
        </svg>

        <p className="mt-3 text-gray-700 text-base">Loading blog posts…</p>
      </div>
    </div>
  );
}
