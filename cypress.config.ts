import { defineConfig } from "cypress";
import { prisma } from "./src/server/db/client";

export default defineConfig({
  e2e: {
    setupNodeEvents(on) {
      on("task", {
        async resetDb() {
          console.log({ prisma });

          await prisma.ticket.deleteMany();
          return null;
        },
      });
      // implement node event listeners here
    },
    baseUrl: "http://localhost:3000",
  },
});
