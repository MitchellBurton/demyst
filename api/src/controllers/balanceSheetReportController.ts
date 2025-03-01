import type * as express from "express";
import {
  Controller,
  Get,
  Middlewares,
  Queries,
  Request,
  Res,
  Route,
  type TsoaResponse,
} from "tsoa";

import { authorizerMiddleware } from "../lib/middleware";
import { BalanceSheetReport } from "../types/ballanceSheetReport";

interface BalanceSheetReportQueryString {
  date?: string;
  periods?: string;
  timeframe?: string;
  trackingOptionID1?: string;
  trackingOptionID2?: string;
  standardLayout?: string;
  paymentsOnly?: string;
}

interface XeroBalanceSheetReportResponse {
  Status: string;
  Reports: BalanceSheetReport[];
}

@Route("balanceSheetReport")
@Middlewares(authorizerMiddleware)
export class BalanceSheetReportController extends Controller {
  @Get()
  public async getBalanceSheetReport(
    @Request() req: express.Request,
    @Res() notFoundResponse: TsoaResponse<404, { reason: string }>,
    @Res() badRequest: TsoaResponse<400, { reason: string }>,
    @Queries() queries?: BalanceSheetReportQueryString
  ): Promise<BalanceSheetReport> {
    const reportApiBaseUrl =
      "http://localhost:3000/api.xro/2.0/Reports/BalanceSheet";

    // Get all the query parameters
    if (queries) {
      const params = new URLSearchParams(queries as Record<string, string>);
      const url = `${reportApiBaseUrl}?${params.toString()}`;
    }

    // Fetch the report from Xero
    const xeroResponse = await fetch(reportApiBaseUrl);
    const xeroBalanceSheetReportResponse =
      (await xeroResponse.json()) as XeroBalanceSheetReportResponse;

    // Basic error handling
    if (
      xeroBalanceSheetReportResponse.Reports.length === 0 ||
      !xeroBalanceSheetReportResponse.Reports[0]
    ) {
      return notFoundResponse(404, { reason: "Report not found" });
    }
    if (xeroBalanceSheetReportResponse.Reports.length > 1) {
      return badRequest(400, { reason: "More than one report found" });
    }

    const report: BalanceSheetReport =
      xeroBalanceSheetReportResponse.Reports[0];
    return report;
  }
}
