import type { NextPage } from "next";
import { ModalDef } from "@ebay/nice-modal-react";
import { Sidebar, KanbanBoard, TicketModal, Head } from "@src/components";

const KanbanHome: NextPage = () => {
  return (
    <>
      <Head />

      <div className="flex flex-col md:flex-row w-full h-full text-gray-700">
        <Sidebar />
        <KanbanBoard />
      </div>

      <ModalDef id="ticket" component={TicketModal} />
    </>
  );
};

export default KanbanHome;
