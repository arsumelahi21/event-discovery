"use client";

import { useTicketStore } from "@/lib/store";

export default function MyTicketsPage() {
  const { tickets, removeTicket } = useTicketStore();

  const handlePrint = (ticketId: string) => {
    const ticket = tickets.find((t) => t.id === ticketId);
    if (!ticket) return;

    const printContent = `
      <html>
        <head>
          <title>Ticket - ${ticket.eventTitle}</title>
          <style>
            body { font-family: sans-serif; padding: 20px; }
            .ticket {
              border: 2px solid #000;
              border-radius: 12px;
              padding: 20px;
              width: 400px;
              margin: 0 auto;
            }
            h2 { margin-top: 0; }
            p { margin: 5px 0; }
            .footer { text-align: center; margin-top: 20px; font-size: 12px; color: #555; }
          </style>
        </head>
        <body>
          <div class="ticket">
            <h2>${ticket.eventTitle}</h2>
            <p><strong>Name:</strong> ${ticket.name}</p>
            <p><strong>Email:</strong> ${ticket.email}</p>
            <p><strong>Date:</strong> ${ticket.date}</p>
            <div class="footer">
              <p>Thank you for booking with Event Discovery Platform</p>
            </div>
          </div>
        </body>
      </html>
    `;

    const newWindow = window.open("", "_blank");
    newWindow!.document.write(printContent);
    newWindow!.document.close();
    newWindow!.print();
  };

  return (
    <section className="p-6">
      <h1 className="text-3xl font-bold mb-4">My Tickets</h1>

      {tickets.length === 0 ? (
        <p className="text-gray-500">No tickets booked yet.</p>
      ) : (
        <table className="w-full border-collapse bg-white rounded-xl overflow-hidden shadow">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="p-3">Event</th>
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Date</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {tickets.map((t) => (
              <tr key={t.id} className="border-b hover:bg-gray-50">
                <td className="p-3">{t.eventTitle}</td>
                <td className="p-3">{t.name}</td>
                <td className="p-3">{t.email}</td>
                <td className="p-3">{t.date}</td>
                <td className="p-3 flex gap-3 justify-center">
                  <button
                    onClick={() => handlePrint(t.id)}
                    className="text-blue-600 hover:underline"
                  >
                    Print
                  </button>
                  <button
                    onClick={() => removeTicket(t.id)}
                    className="text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  );
}
