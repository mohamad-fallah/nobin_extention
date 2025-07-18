import Card from "../../components/Card";

export default function SearchWidget() {
  return (
    <Card height="200px">
      <div className="relative mb-3">
        <input
          className="w-full rounded-lg bg-gray-50 pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300 border border-gray-200"
          placeholder="جستجو..."
          dir="rtl"
        />
        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">🔍</span>
      </div>
      <div className="grid grid-cols-5 gap-2 flex-1 px-2">
        {[...Array(5)].map((_, i) => (
          <button
            key={i}
            className="aspect-square bg-gray-50 hover:bg-gray-100 rounded-lg flex items-center justify-center transition-all hover:scale-105 group"
          >
            <span className="text-gray-300 group-hover:text-gray-400 transition-colors">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M17 3H7C5.89543 3 5 3.89543 5 5V21L12 18L19 21V5C19 3.89543 18.1046 3 17 3Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </button>
        ))}
      </div>
      <div className="flex justify-center gap-2 mt-2">
        <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
        <span className="w-1.5 h-1.5 bg-gray-300 rounded-full"></span>
      </div>
    </Card>
  );
}
