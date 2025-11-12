"use client";

import { useRef } from "react";
import { X } from "lucide-react";

type TicketPrintViewProps = {
  ticket: {
    id: string;
    eventTitle: string;
    attendee: string;
    email: string;
    date: string;
    status: string;
  };
  onClose: () => void;
};

export default function TicketPrintView({ ticket, onClose }: TicketPrintViewProps) {
  const printRef = useRef<HTMLDivElement>(null);

  const handlePrint = () => {
    if (printRef.current) {
      const printContent = printRef.current.innerHTML;
      const newWindow = window.open("", "_blank");
      if (newWindow) {
        newWindow.document.write(`
          <html>
            <head>
              <title>${ticket.eventTitle} - Ticket</title>
              <style>
                body {
                  font-family: 'Arial', sans-serif;
                  padding: 20px;
                  color: #111;
                }
                .ticket {
                  border: 2px solid #2563eb;
                  border-radius: 16px;
                  padding: 24px;
                  width: 400px;
                  margin: 0 auto;
                }
                .header {
                  text-align: center;
                  border-bottom: 1px dashed #2563eb;
                  margin-bottom: 16px;
                  padding-bottom: 8px;
                }
                .title {
                  font-size: 20px;
                  font-weight: 700;
                  color: #2563eb;
                }
                .details p {
                  margin: 4px 0;
                }
                .status {
                  font-weight: 600;
                  padding: 4px 8px;
                  border-radius: 8px;
                  display: inline-block;
                }
                .status.confirmed {
                  background: #dcfce7;
                  color: #166534;
                }
                .status.pending {
                  background: #fef9c3;
                  color: #92400e;
                }
              </style>
            </head>
            <body>
              ${printContent}
            </body>
          </html>
        `);
        newWindow.document.close();
        newWindow.print();
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-lg p-6 relative w-full max-w-md">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <X size={20} />
        </button>

        <div ref={printRef}>
          <div className="border-2 border-primary rounded-2xl p-6">
            <h2 className="text-xl font-bold text-primary text-center mb-3">
              {ticket.eventTitle}
            </h2>
            <p className="text-center text-sm text-gray-500 mb-4">
              Ticket ID: {ticket.id}
            </p>

            <div className="space-y-2 text-sm">
              <p><strong>Attendee:</strong> {ticket.attendee}</p>
              <p><strong>Email:</strong> {ticket.email}</p>
              <p>
                <strong>Date:</strong>{" "}
                {new Date(ticket.date).toLocaleDateString("en-GB")}
              </p>
              <p>
                <strong>Status:</strong>{" "}
                <span
                  className={`status ${
                    ticket.status === "Confirmed" ? "confirmed" : "pending"
                  }`}
                >
                  {ticket.status}
                </span>
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6 text-center">
          <button
            onClick={handlePrint}
            className="bg-primary text-white px-5 py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Print Ticket
          </button>
        </div>
      </div>
    </div>
  );
}
