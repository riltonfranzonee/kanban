import React from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { StatusColumn } from "@src/components";
import { TICKET_STATUS } from "@src/constants/TicketStatuses";
import { TicketStatus } from "@src/types/TicketStatus";
import { trpc } from "@src/utils/trpc";
import { reorderTicketsOnDrop } from "@src/utils/dnd";
import updateLocalTicketsOptimistically from "@src/utils/dnd/updateLocalTicketsOptimistically";
import { useIsBrowser, useHandleOpenTicketFromUrl } from "@src/hooks";
import { useQueryClient } from "react-query";

const statuses = Object.keys(TICKET_STATUS) as TicketStatus[];

const KanbanBoard: React.FC = () => {
  const {
    refetch: refetchTickets,
    data: ticketsData,
    isLoading,
  } = trpc.useQuery(["ticket.findAll"]);

  const tickets = ticketsData ?? [];

  useHandleOpenTicketFromUrl(tickets);

  const dropTicketMutation = trpc.useMutation(["ticket.drop"], {
    onSuccess: () => refetchTickets(),
    onError: () => refetchTickets(),
  });

  const queryClient = useQueryClient();

  const onDragEnd = (dropResult: DropResult) => {
    const reorderedTickets = reorderTicketsOnDrop(dropResult, tickets);

    if (!reorderedTickets.length) return;

    updateLocalTicketsOptimistically(queryClient, reorderedTickets);

    dropTicketMutation.mutate({
      tickets: reorderedTickets,
    });
  };

  const isBrowser = useIsBrowser();
  if (!isBrowser) return <></>;

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <main className="bg-gray-100 pt-24 md:pl-24 md:pt-8 flex py-8 flex-1 min-w-fit text-gray-700 justify-around overflow-x-auto md:px-2 px-5">
        {statuses.map((ticketStatus) => (
          <StatusColumn
            key={ticketStatus}
            status={ticketStatus}
            loading={isLoading && !ticketsData}
          />
        ))}
      </main>
    </DragDropContext>
  );
};

export default KanbanBoard;
