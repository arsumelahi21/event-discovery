export default function Loading() {
  return (
    <section className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">Upcoming Events</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="bg-white rounded-2xl shadow-md overflow-hidden animate-pulse"
          >
            <div className="h-40 bg-gray-200"></div>

            <div className="p-4 space-y-3">
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              <div className="h-3 bg-gray-200 rounded w-2/3"></div>

              <div className="pt-2">
                <div className="h-9 bg-gray-200 rounded-lg w-full"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
