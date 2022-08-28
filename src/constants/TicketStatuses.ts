import { TicketStatus } from "@src/types/TicketStatus";

export const TICKET_STATUS: Record<TicketStatus, TicketStatus> = {
  BACKLOG: "BACKLOG",
  IN_PROGRESS: "IN_PROGRESS",
  IN_REVIEW: "IN_REVIEW",
  FINISHED: "FINISHED",
};

export const READABLE_STATUS: Record<TicketStatus, string> = {
  BACKLOG: "Backlog",
  IN_PROGRESS: "In progress",
  IN_REVIEW: "In review",
  FINISHED: "Finished",
};

export const STATUS_COLORS: Record<string, { border: string; text?: string }> =
  {
    BACKLOG: {
      border: "border-red-500",
      text: "text-red-500",
    },
    IN_PROGRESS: {
      border: "border-blue-500",
      text: "text-blue-500",
    },
    IN_REVIEW: {
      border: "border-yellow-500",
      text: "text-yellow-500",
    },
    FINISHED: {
      border: "border-green-500",
      text: "text-green-500",
    },
  };
