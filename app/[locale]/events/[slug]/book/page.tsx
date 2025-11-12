import { getEventBySlug } from "@/lib/api";
import BookTicketForm from "@/components/BookTicketForm";

export default async function BookTicketPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }> | { locale: string; slug: string };
}) {
  // handle both direct and async params
  const resolvedParams = await Promise.resolve(params);
  const { slug } = resolvedParams;

  const event = await getEventBySlug(slug);

  if (!event) {
    return (
      <div className="p-10 text-center text-red-600 font-semibold">
        Event not found
      </div>
    );
  }

  return (
    <section className="p-10 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">{event.title}</h1>
      <BookTicketForm eventTitle={event.title} />
    </section>
  );
}
