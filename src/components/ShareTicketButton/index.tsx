import { Popover, Transition } from "@headlessui/react";
import React, { useEffect } from "react";
import ShareIcon from "@heroicons/react/24/outline/ShareIcon";
import copyToClipboard from "@src/utils/copyToClipboard";

interface ShareTicketContentProps {
  open: boolean;
  close: () => void;
  ticketId: string;
}

const TWO_SECONDS = 2000;

const ShareTicketContent: React.FC<ShareTicketContentProps> = ({
  open,
  close,
  ticketId,
}) => {
  useEffect(() => {
    if (!open) return;

    // auto close in 2 seconds
    const timerId = setTimeout(() => {
      close();
    }, TWO_SECONDS);

    return () => clearTimeout(timerId);
  }, [open, close]);

  const handleCopyTicketLink = () => {
    copyToClipboard(`${window.location.origin}/?ticket=${ticketId}`);
  };

  return (
    <>
      <Popover.Button
        type="button"
        className="border-none outline-none"
        onClick={handleCopyTicketLink}
      >
        <ShareIcon className="text-red-500 h-5 w-5 mt-1" />
      </Popover.Button>

      <Transition
        enter="transition duration-100 ease-out"
        enterFrom="transform scale-95 opacity-0"
        enterTo="transform scale-100 opacity-100"
        leave="transition duration-75 ease-out"
        leaveFrom="transform scale-100 opacity-100"
        leaveTo="transform scale-95 opacity-0"
      >
        <Popover.Panel className="absolute z-10">
          <div className="text-sm text-center px-2 py-1 bg-red-100 whitespace-nowrap rounded-lg">
            Link copied to clipboard!
          </div>
        </Popover.Panel>
      </Transition>
    </>
  );
};

interface ShareTicketButtonProps {
  ticketId: string;
}

const ShareTicketButton: React.FC<ShareTicketButtonProps> = ({ ticketId }) => {
  return (
    <Popover className="relative">
      {({ open, close }) => (
        <ShareTicketContent open={open} close={close} ticketId={ticketId} />
      )}
    </Popover>
  );
};

export default ShareTicketButton;
