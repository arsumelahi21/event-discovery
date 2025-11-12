"use client";

import { useTicketStore } from "@/lib/store";
import { useState } from "react";

export default function BookTicketForm({ eventTitle }: { eventTitle: string }) {
  const { addTicket } = useTicketStore();
  const [form, setForm] = useState({ name: "", email: "", date: "" });
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addTicket({
      id: Date.now().toString(),
      eventTitle,
      ...form,
    });
    setSuccess(true);
    setForm({ name: "", email: "", date: "" });
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow space-y-4 max-w-md mx-auto">
      <h2 className="text-2xl font-semibold text-center">Book Your Ticket</h2>

      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          placeholder="Full Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
          className="w-full border border-gray-300 rounded-lg px-3 py-2"
        />
        <input
          type="email"
          placeholder="Email Address"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
          className="w-full border border-gray-300 rounded-lg px-3 py-2"
        />
        <input
          type="date"
          value={form.date}
          onChange={(e) => setForm({ ...form, date: e.target.value })}
          required
          className="w-full border border-gray-300 rounded-lg px-3 py-2"
        />

        <button
          type="submit"
          className="w-full bg-primary text-white py-2 rounded-lg hover:bg-blue-600 transition"
        >
          Book Now
        </button>
      </form>

      {success && (
        <div className="text-green-600 text-center font-medium">
         Ticket booked successfully!
        </div>
      )}
    </div>
  );
}
