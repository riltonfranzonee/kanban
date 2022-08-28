import React, { useMemo } from "react";
import { Droppable } from "react-beautiful-dnd";

import { READABLE_STATUS } from "@src/constants/TicketStatuses";
import { TicketStatus } from "@src/types/TicketStatus";
import { TicketsStack } from "@src/components";
import { trpc } from "@src/utils/trpc";

interface StatusColumnProps {
  status: TicketStatus;
  loading?: boolean;
}

const StatusColumn: React.FC<StatusColumnProps> = ({ status, loading }) => {
  const title = READABLE_STATUS[status];

  const { data } = trpc.useQuery(["ticket.findAll"]);

  const tickets = useMemo(
    () => data?.filter((ticket) => ticket.status === status) || [],
    [data, status]
  );

  return (
    <div
      className={"w-[23%] min-w-[300px] mr-4 last:mr-0"}
      test-id="status-column"
    >
      <span className="block text-xl font-semibold">
        {title} {!loading && `(${tickets.length})`}
      </span>

      <Droppable droppableId={status}>
        {(provided) => (
          <TicketsStack
            {...provided.droppableProps}
            provided={provided}
            status={status}
            tickets={tickets}
            loading={loading}
          />
        )}
      </Droppable>
    </div>
  );
};

export default StatusColumn;
