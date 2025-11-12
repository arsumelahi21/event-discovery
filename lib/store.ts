import { create } from "zustand";
import { persist } from "zustand/middleware";

interface Ticket {
  id: string;
  eventTitle: string;
  name: string;
  email: string;
  date: string;
}

interface TicketStore {
  tickets: Ticket[];
  addTicket: (ticket: Ticket) => void;
  removeTicket: (id: string) => void;
}

export const useTicketStore = create<TicketStore>()(
  persist(
    (set) => ({
      tickets: [],
      addTicket: (ticket) =>
        set((state) => ({
          tickets: [...state.tickets, ticket],
        })),
      removeTicket: (id) =>
        set((state) => ({
          tickets: state.tickets.filter((t) => t.id !== id),
        })),
    }),
    { name: "event-tickets" } 
  )
);
