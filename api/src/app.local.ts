import express, {
  type Response as ExResponse,
  type Request as ExRequest,
} from "express";
import swaggerUi from "swagger-ui-express";

import app from "./app";
const port = 9000;

app.use("/docs", swaggerUi.serve, async (_req: ExRequest, res: ExResponse) => {
  const swaggerDocument = await import("../generated/openapi.json", {
    with: { type: "json" },
  });
  console.log("swaggerDocument", swaggerDocument.default);
  res.send(swaggerUi.generateHTML(swaggerDocument.default));
});

express().use("/", app).listen(port);

console.info(`listening on http://localhost:${port}`);
