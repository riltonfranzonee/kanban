import { createRouter } from "./context";
import { z } from "zod";
import { TICKET_STATUS } from "../../constants/TicketStatuses";
import { ticket } from "@prisma/client";

export const ticketRouter = createRouter()
  .query("findAll", {
    async resolve({ ctx }) {
      return ctx.prisma.ticket.findMany({ orderBy: { index: "asc" } });
    },
  })
  .mutation("create", {
    input: z.object({
      title: z.string(),
      description: z.string().optional(),
      tags: z.array(z.string()),
      status: z.string().optional(),
    }),
    async resolve({ ctx, input }) {
      const status = input.status ?? TICKET_STATUS.BACKLOG;

      await ctx.prisma.ticket.updateMany({
        where: { status: { equals: status } },
        data: { index: { increment: 1 } },
      });

      return ctx.prisma.ticket.create({
        data: input,
      });
    },
  })
  .mutation("update", {
    input: z.object({
      id: z.string(),
      title: z.string().optional(),
      description: z.string().optional(),
      tags: z.array(z.string()).optional(),
      status: z.string().optional(),
      index: z.number().optional(),
    }),
    async resolve({ ctx, input }) {
      const { id, ...updateData } = input;

      const currentTicket = await ctx.prisma.ticket.findUnique({
        where: { id },
      });

      const changedStatus = currentTicket?.status !== updateData.status;

      if (changedStatus) {
        await ctx.prisma.ticket.updateMany({
          where: { status: { equals: updateData.status } },
          data: { index: { increment: 1 } },
        });

        await ctx.prisma.ticket.updateMany({
          where: {
            status: { equals: currentTicket?.status },
            index: { gt: 0 },
          },
          data: { index: { decrement: 1 } },
        });

        updateData.index = 0;
      }

      return ctx.prisma.ticket.update({
        where: { id },
        data: updateData,
      });
    },
  })
  .mutation("drop", {
    input: z.object({
      tickets: z.array(
        z.object({
          id: z.string(),
          index: z.number(),
          status: z.string(),
        })
      ),
    }),
    async resolve({ ctx, input }) {
      const { tickets } = input;

      const updateAllTickets = tickets.map(({ id, index, status }) => {
        return ctx.prisma.ticket.update({
          where: { id },
          data: {
            index,
            status,
          },
        });
      });

      const updatedTickets: ticket[] = await ctx.prisma.$transaction(
        updateAllTickets
      );

      return updatedTickets;
    },
  })
  .mutation("delete", {
    input: z.object({
      id: z.string(),
    }),
    async resolve({ ctx, input }) {
      const { id } = input;

      return ctx.prisma.ticket.delete({
        where: { id },
      });
    },
  });
