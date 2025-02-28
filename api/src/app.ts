import express, {
  json,
  urlencoded,
  type Response as ExResponse,
  type Request as ExRequest,
  type NextFunction,
} from "express";

import cors from "cors";

import { ValidateError } from "tsoa";
import { RegisterRoutes } from "../generated/routes";

const app = express();
app.use(cors());
// Use body parser to read sent json payloads
app.use(
  urlencoded({
    extended: true,
  })
);
app.use(json());

RegisterRoutes(app);

/**
 *  HTTP Error type guard.
 */
function isHttpError(err: unknown): err is { statusCode: number } {
  return typeof err === "object" && err !== null && "statusCode" in err;
}

function shouldExposeError(err: unknown): err is { expose: boolean } {
  return (
    typeof err === "object" &&
    err !== null &&
    "expose" in err &&
    err.expose === true
  );
}

function hasMessage(err: { statusCode: number }) {
  return typeof err === "object" && err !== null && "message" in err;
}

// biome-ignore lint/suspicious/noConfusingVoidType: This fits the types of express middleware.
app.use(function errorHandler(
  err: unknown,
  req: ExRequest,
  res: ExResponse,
  next: NextFunction
): ExResponse | void {
  if (err instanceof ValidateError) {
    console.warn(`Caught Validation Error for ${req.path}:`, err.fields);
    return res.status(422).json({
      message: "Validation Failed",
      details: err?.fields,
    });
  }
  if (isHttpError(err)) {
    console.error("Caught Error for", req.path, err);
    // If the error has an `expose` property, we can use that to determine if we should show the error message.
    return res.status(err.statusCode).json({
      message: hasMessage(err) ? err.message : "Request Failed",
      details: shouldExposeError(err) ? err : undefined,
    });
  }

  if (err instanceof Error) {
    console.error("Caught Error for", req.path, err);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }

  next();
} as express.ErrorRequestHandler);

export default app;
