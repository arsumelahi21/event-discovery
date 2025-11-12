"use client";

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center space-y-4">
      <h2 className="text-2xl font-bold text-red-600">Something went wrong 😢</h2>
      <p className="text-gray-600">{error.message}</p>
      <button
        onClick={() => reset()}
        className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-blue-600 transition"
      >
        Try again
      </button>
    </div>
  );
}
