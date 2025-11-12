"use client";

import { useState } from "react";
import DataTable, { Column } from "@/components/DataTable";
import TicketPrintView from "@/components/TicketPrintView";

type Ticket = {
  id: string;
  eventTitle: string;
  attendee: string;
  email: string;
  date: string;
  status: "Confirmed" | "Pending";
};

const tickets: Ticket[] = [
  {
    id: "TCK-001",
    eventTitle: "Tech Conference 2025",
    attendee: "John Doe",
    email: "john@example.com",
    date: "2025-12-10",
    status: "Confirmed",
  },
  {
    id: "TCK-002",
    eventTitle: "Music Fest Dubai",
    attendee: "Jane Smith",
    email: "jane@example.com",
    date: "2025-11-22",
    status: "Pending",
  },
];

export default function TicketsPage() {
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);

  const columns: Column<Ticket>[] = [
    { key: "id", label: "Ticket ID", sortable: true },
    { key: "eventTitle", label: "Event", sortable: true },
    { key: "attendee", label: "Attendee", sortable: true },
    { key: "email", label: "Email" },
    {
      key: "date",
      label: "Date",
      sortable: true,
      render: (row) =>
        new Date(row.date).toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }),
    },
    {
      key: "status",
      label: "Status",
      render: (row) => (
        <span
          className={`px-3 py-1 text-xs rounded-full font-semibold ${
            row.status === "Confirmed"
              ? "bg-green-100 text-green-700"
              : "bg-yellow-100 text-yellow-700"
          }`}
        >
          {row.status}
        </span>
      ),
    },
  ];

  const handlePrintClick = (ticket: Ticket) => {
    setSelectedTicket(ticket);
  };

  return (
    <>
      <DataTable
        data={tickets}
        columns={columns}
        title="My Tickets"
        searchKeys={["eventTitle", "attendee", "email"]}
        onPrint={handlePrintClick}
      />

      {selectedTicket && (
        <TicketPrintView
          ticket={selectedTicket}
          onClose={() => setSelectedTicket(null)}
        />
      )}
    </>
  );
}
