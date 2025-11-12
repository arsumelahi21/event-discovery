export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center text-gray-600">
      <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary mb-4"></div>
      <p>Loading content, please wait…</p>
    </div>
  );
}
