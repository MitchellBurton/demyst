import type * as express from "express";
export async function authorizerMiddleware(
  _req: express.Request,
  _res: express.Response,
  next: express.NextFunction
) {
  // In a real world scenario, we would get credentials from the request and authenticate against the Xero API.
  next();
}
