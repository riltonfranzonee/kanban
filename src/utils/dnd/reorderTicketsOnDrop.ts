/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { DropResult } from "react-beautiful-dnd";
import { ticket } from "@prisma/client";
import { DropTicketsData } from "@src/types/DropTickets";

const reorderWithinColumn = (
  dropResult: DropResult,
  tickets: ticket[],
  currentTicket: ticket
) => {
  const { destination, source } = dropResult;

  const newTickets = tickets.filter(
    (t) => t.status === destination!.droppableId
  );

  newTickets.splice(source.index, 1);
  newTickets.splice(destination!.index, 0, currentTicket);

  return newTickets.map((ticket, index) => ({
    id: ticket.id,
    index,
    status: ticket.status,
  }));
};

const reorderBetweenColumns = (
  dropResult: DropResult,
  tickets: ticket[],
  currentTicket: ticket
) => {
  const { destination, source } = dropResult;
  // update start column
  const startColumnTickets = tickets.filter(
    (t) => t.status === source.droppableId
  ) as ticket[];
  startColumnTickets.splice(source.index, 1);

  const formattedStartColumnTickets = startColumnTickets.map((t, index) => ({
    id: t.id,
    index,
    status: t.status,
  }));

  // update end column
  const finishColumnTickets = tickets.filter(
    (t) => t.status === destination!.droppableId
  ) as ticket[];
  finishColumnTickets.splice(destination!.index, 0, currentTicket);

  const formattedFinishColumnTickets = finishColumnTickets.map((t, index) => ({
    id: t.id,
    index,
    status: destination!.droppableId,
  }));

  return [...formattedStartColumnTickets, ...formattedFinishColumnTickets];
};

const reorderTicketsOnDrop = (dropResult: DropResult, tickets: ticket[]) => {
  const { destination, source, draggableId } = dropResult;

  if (!destination) return [];

  const hasChangedColumn = destination.droppableId !== source.droppableId;
  const hasChangedIndex = destination.index !== source.index;
  const hasChangedLocation = hasChangedColumn || hasChangedIndex;

  if (!hasChangedLocation) return [];

  const currentTicket = tickets.find((t) => t.id === draggableId) as ticket;

  let updatedTickets: DropTicketsData = [];

  if (hasChangedIndex && !hasChangedColumn) {
    updatedTickets = reorderWithinColumn(dropResult, tickets, currentTicket);
  } else {
    updatedTickets = reorderBetweenColumns(dropResult, tickets, currentTicket);
  }

  return updatedTickets;
};

export default reorderTicketsOnDrop;
