import os from "node:os";

import type { App } from "@/infrastructure/web/index";

export default (app: typeof App) => {
  app.get("/", () => ({ status: "ok" }));

  app.get("/info", () => {
    const cpuUsage = process.cpuUsage();
    const totalMemory = os.totalmem();
    const freeMemory = os.freemem();

    return {
      cpuUsage,
      totalMemory,
      freeMemory,
    };
  });

  return app;
};