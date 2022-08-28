import { useRouter } from "next/router";
import { useEffect, useMemo } from "react";
import { useModal } from "@ebay/nice-modal-react";
import { ticket } from "@prisma/client";

const useHandleOpenTicketFromUrl = (tickets: ticket[]) => {
  const router = useRouter();
  const ticketModal = useModal("ticket");

  const ticketToOpenId = useMemo(() => router?.query?.ticket, [router.query]);

  useEffect(() => {
    if (ticketToOpenId && tickets.length) {
      const ticketToOpen = tickets.find(
        (ticket) => ticket.id === ticketToOpenId
      );

      if (!ticketToOpen) return;

      ticketModal.show(ticketToOpen);
      router.replace("/", undefined, { shallow: true });
    }
    // silencing the array deps error because we don't need ticketModals in it
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ticketToOpenId, tickets, router]);
};

export default useHandleOpenTicketFromUrl;
