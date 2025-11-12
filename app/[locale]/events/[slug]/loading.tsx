export default function EventDetailLoading() {
  return (
    <section className="container mx-auto px-4 py-10 max-w-4xl animate-pulse">
      {/* Back link placeholder */}
      <div className="mb-4 h-4 w-24 bg-gray-200 rounded"></div>

      {/* Image placeholder */}
      <div className="w-full h-64 md:h-96 bg-gray-200 rounded-2xl mb-6"></div>

      {/* Title */}
      <div className="h-6 w-3/4 bg-gray-200 rounded mb-3"></div>

      {/* Date + location */}
      <div className="h-4 w-1/2 bg-gray-200 rounded mb-6"></div>

      {/* Long description (3–4 lines) */}
      <div className="space-y-3 mb-8">
        <div className="h-4 bg-gray-200 rounded w-full"></div>
        <div className="h-4 bg-gray-200 rounded w-5/6"></div>
        <div className="h-4 bg-gray-200 rounded w-4/5"></div>
        <div className="h-4 bg-gray-200 rounded w-2/3"></div>
      </div>

      {/* Organizer info + book button */}
      <div className="flex items-center justify-between bg-white border rounded-xl p-4 shadow-sm">
        <div className="h-4 w-32 bg-gray-200 rounded"></div>
        <div className="h-10 w-32 bg-gray-200 rounded-lg"></div>
      </div>
    </section>
  );
}
