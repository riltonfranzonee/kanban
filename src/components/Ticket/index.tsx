import { useModal } from "@ebay/nice-modal-react";
import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { TagsList } from "@src/components";
import { STATUS_COLORS } from "@src/constants/TicketStatuses";
import classNames from "@src/utils/classNames";

export interface TicketProps extends React.ComponentProps<"button"> {
  id: string;
  title: string;
  description?: string | null;
  tags: string[];
  status: string;
  index: number;
}

const Ticket: React.FC<TicketProps> = ({
  id,
  title,
  description,
  tags,
  status,
  index,
}) => {
  const modal = useModal("ticket");

  const borderColor = STATUS_COLORS[status]?.border;

  const handleOpenModal = () => {
    modal.show({ title, id, description, tags, status });
  };

  return (
    <Draggable draggableId={id} index={index}>
      {(provided) => (
        <li
          className={classNames(
            `flex w-full flex-col shadow-sm bg-white rounded-md p-4 mb-4 border-l-4`,
            borderColor
          )}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          onClick={handleOpenModal}
          test-id="ticket-item"
        >
          <span className="font-bold" test-id="ticket-title">
            {title}
          </span>

          <TagsList tags={tags} />
        </li>
      )}
    </Draggable>
  );
};

export default Ticket;
