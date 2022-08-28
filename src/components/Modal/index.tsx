import NiceModal, { useModal } from "@ebay/nice-modal-react";
import { Fragment, KeyboardEvent, useState } from "react";
import { useQueryClient } from "react-query";
import TrashIcon from "@heroicons/react/24/outline/TrashIcon";
import { Dialog, Transition } from "@headlessui/react";

import { TicketStatus } from "@src/types/TicketStatus";
import { trpc } from "@src/utils/trpc";
import { READABLE_STATUS as TICKET_READABLE_STATUS } from "@src/constants/TicketStatuses";
import classNames from "@src/utils/classNames";
import {
  Dropdown,
  TagsList,
  TextInput,
  ShareTicketButton,
} from "@src/components";

interface ModalArgs {
  id?: string;
  title?: string;
  description?: string;
  tags?: string[];
  status?: TicketStatus;
}

const statusOptions = Object.keys(TICKET_READABLE_STATUS).map((value) => ({
  label: TICKET_READABLE_STATUS[value as TicketStatus],
  value: value,
}));

const TicketModal: React.FC = () => {
  const modal = useModal("ticket");
  const modalArgs = modal?.args as ModalArgs;

  const [titleInput, setTitleInput] = useState(modalArgs?.title ?? "");
  const [descriptionInput, setDescriptionInput] = useState(
    modalArgs?.description ?? ""
  );
  const [tagInput, setTagInput] = useState("");
  const [statusInput, setStatusInput] = useState(
    modalArgs?.status ?? "BACKLOG"
  );

  const [tagsInput, setTagsInput] = useState(modalArgs?.tags ?? []);

  const ticketId = modalArgs?.id;

  const newTicket = !ticketId;

  const queryClient = useQueryClient();

  const handleCloseModal = () => {
    modal.hide();
  };

  const refetchTasks = () => {
    queryClient.refetchQueries(["ticket.findAll"]);
    handleCloseModal();
  };

  const createTicketMutation = trpc.useMutation("ticket.create", {
    onSuccess: refetchTasks,
  });
  const updateTicketMutation = trpc.useMutation("ticket.update", {
    onSuccess: refetchTasks,
  });
  const deleteTicketMutation = trpc.useMutation("ticket.delete", {
    onSuccess: refetchTasks,
  });

  const handleDeleteTicket = () => {
    if (!ticketId) return;

    deleteTicketMutation.mutate({ id: ticketId });
  };

  const handleSubmit = () => {
    const ticketInput = {
      title: titleInput,
      tags: tagsInput,
      description: descriptionInput,
      status: statusInput,
    };

    if (newTicket) {
      createTicketMutation.mutate(ticketInput);
    } else {
      updateTicketMutation.mutate({
        id: modalArgs.id as string,
        ...ticketInput,
      });
    }
  };

  const handleIncludeTag = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && tagInput && !tagsInput.includes(tagInput)) {
      e.preventDefault();

      setTagsInput((tags) => [...tags, tagInput]);
      setTagInput("");
    }
  };

  const disableDeleteButton =
    createTicketMutation.isLoading ||
    updateTicketMutation.isLoading ||
    deleteTicketMutation.isLoading;

  const disableSubmitButton = !titleInput || disableDeleteButton;

  return (
    <Transition appear show={modal.visible} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto w-screen"
        onClose={handleCloseModal}
      >
        <div className="min-h-screen px-4 text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div
              className="fixed inset-0 bg-black/50"
              onClick={handleCloseModal}
            />
          </Transition.Child>

          <span
            className="inline-block h-screen align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
            afterLeave={() => modal.remove()}
          >
            <div className="inline-block w-full max-w-lg p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
              <div className="text-left">
                <div className="flex items-center justify-between mb-5">
                  <div className="flex">
                    <h4 className="text-lg font-bold mr-2">
                      {newTicket ? "New Ticket" : "Edit ticket"}
                    </h4>

                    {!newTicket && <ShareTicketButton ticketId={ticketId} />}
                  </div>

                  <Dropdown
                    selectedValue={statusInput}
                    options={statusOptions}
                    onSelect={(selectedValue) => {
                      setStatusInput(selectedValue as TicketStatus);
                    }}
                  />
                </div>

                <TextInput
                  label="Title"
                  placeholder="Type your task title"
                  value={titleInput}
                  onChange={(e) => setTitleInput(e.target.value)}
                  test-id="title-input"
                />

                <TextInput
                  label="Description (optional)"
                  placeholder="Provide details about the task"
                  value={descriptionInput}
                  onChange={(e) => setDescriptionInput(e.target.value)}
                  textArea
                />

                <TextInput
                  label="Tags"
                  placeholder="Type a new tag (hit enter to submit)"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={handleIncludeTag}
                />

                <TagsList
                  tags={tagsInput}
                  onRemove={(tag) =>
                    setTagsInput((tags) => tags.filter((t) => t !== tag))
                  }
                />

                <div className="flex items-center justify-between w-full mt-5">
                  {!newTicket && (
                    <button
                      type="button"
                      onClick={
                        !disableDeleteButton ? handleDeleteTicket : undefined
                      }
                      className="transition duration-500 hover:scale-102.5 flex p-2.5 rounded-lg items-center justify-center hover:bg-gray-100 transform"
                    >
                      <TrashIcon className="h-4 w-4 mr-1" />
                      Delete
                    </button>
                  )}

                  <div className="items-center gap-2 flex ml-auto">
                    <button
                      className="w-full p-2.5 flex-1 outline-none"
                      onClick={handleCloseModal}
                      type="button"
                    >
                      Cancel
                    </button>
                    <button
                      className={classNames(
                        "w-full py-2.5 px-5 flex-1 text-white rounded-lg transition duration-500 ",
                        disableSubmitButton
                          ? "bg-red-300 cursor-default"
                          : "bg-red-500"
                      )}
                      type="button"
                      onClick={!disableSubmitButton ? handleSubmit : undefined}
                      test-id="save-ticket-btn"
                    >
                      Save
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default NiceModal.create(TicketModal);
