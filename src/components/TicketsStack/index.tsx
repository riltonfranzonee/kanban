import React, { useMemo } from "react";
import PlusIcon from "@heroicons/react/24/solid/PlusIcon";
import NiceModal from "@ebay/nice-modal-react";
import { ticket } from "@prisma/client";
import { DroppableProvided } from "react-beautiful-dnd";

import { Ticket, TicketSkeleton } from "@src/components";
import classNames from "@src/utils/classNames";

interface TicketsStackProps extends React.ComponentProps<"ul"> {
  status: string;
  tickets: ticket[];
  provided: DroppableProvided;
  loading?: boolean;
}

const TicketsStack: React.FC<TicketsStackProps> = ({
  tickets,
  status,
  provided,
  loading,
}) => {
  const handleOpenNewTaskModal = () => {
    NiceModal.show("ticket", { status });
  };

  const loadingTickets = useMemo(() => {
    if (loading) return Array(3).fill("");
  }, [loading]);

  return (
    <ol
      className={classNames(
        "shadow-md bg-zinc-50 py-8 px-4 mt-4 rounded-lg flex flex-col max-h-[95%] overflow-y-auto"
      )}
      ref={provided.innerRef}
    >
      {loadingTickets ? (
        loadingTickets.map((_, index) => (
          <TicketSkeleton key={index.toString()} />
        ))
      ) : (
        <>
          {tickets.map((ticket, index) => (
            <Ticket
              key={ticket.id}
              id={ticket.id}
              title={ticket.title}
              description={ticket.description}
              tags={ticket.tags}
              status={ticket.status}
              index={index}
            />
          ))}

          {provided.placeholder}

          <li>
            <button
              type="button"
              onClick={handleOpenNewTaskModal}
              className="shadow-sm w-full flex flex-row items-center justify-center bg-white rounded-lg py-3"
              test-id="add-ticket-btn"
            >
              <PlusIcon className="h-5 w-5 mr-2 stroke-2" />

              <span>Add Ticket</span>
            </button>
          </li>
        </>
      )}
    </ol>
  );
};

export default TicketsStack;
