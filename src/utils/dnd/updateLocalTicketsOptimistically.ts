import { ticket } from "@prisma/client";
import { DropTicketsData } from "@src/types/DropTickets";
import { QueryClient } from "react-query";

const updateLocalTicketsOptimistically = (
  queryClient: QueryClient,
  reorderedTickets: DropTicketsData
) => {
  queryClient.setQueryData<ticket[]>("ticket.findAll", (cachedTickets) => {
    const updatedCachedTickets = cachedTickets?.map((cachedTicket) => {
      const ticketUpdated = reorderedTickets.find(
        (ticket) => ticket.id === cachedTicket.id
      );

      if (ticketUpdated) {
        return {
          ...cachedTicket,
          ...ticketUpdated,
        };
      }

      return cachedTicket;
    });

    updatedCachedTickets?.sort((a, b) => a.index - b.index);

    return updatedCachedTickets ?? [];
  });
};

export default updateLocalTicketsOptimistically;
