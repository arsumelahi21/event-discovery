"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function BookTicketPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    email: "",
    mobile: "",
    date: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMessage(null);

    if (!form.name || !form.email || !form.mobile || !form.date) {
      setMessage({ type: "error", text: "Please fill in all fields." });
      return;
    }

    setLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve, reject) =>
        setTimeout(() => {
          Math.random() > 0.2 ? resolve("success") : reject("fail");
        }, 1000)
      );

      setMessage({ type: "success", text: "Ticket booked successfully!" });
      setForm({ name: "", email: "", mobile: "", date: "" });
    } catch {
      setMessage({ type: "error", text: "Booking failed. Please try again." });
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="max-w-lg mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-center mb-8">Book Your Ticket</h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-6 bg-white p-6 rounded-2xl shadow-md"
      >
        <div>
          <label className="block text-sm font-semibold mb-2">Full Name</label>
          <input
            type="text"
            className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-primary"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">Email</label>
          <input
            type="email"
            className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-primary"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">Mobile Number</label>
          <input
            type="tel"
            className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-primary"
            value={form.mobile}
            onChange={(e) => setForm({ ...form, mobile: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">Event Date</label>
          <input
            type="date"
            className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-primary"
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-blue-600 transition disabled:opacity-50"
        >
          {loading ? "Booking..." : "Book Now"}
        </button>
      </form>

      {message && (
        <div
          className={`mt-6 text-center p-3 rounded-lg font-medium ${
            message.type === "success"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {message.text}
        </div>
      )}

      <div className="text-center mt-8">
        <button
          onClick={() => router.back()}
          className="text-primary hover:underline"
        >
          ← Back to Event
        </button>
      </div>
    </section>
  );
}
