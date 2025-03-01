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
    const baseUrl = process.env.XERO_API_BASE_URL || "http://localhost:3000";
    const reportApiUrl = `${baseUrl}/api.xro/2.0/Reports/BalanceSheet`;

    // Get all the query parameters and build the URL
    let url = reportApiUrl;
    if (queries) {
      const params = new URLSearchParams(queries as Record<string, string>);
      url = `${reportApiUrl}?${params.toString()}`;
    }

    // Fetch the report from Xero
    const xeroResponse = await fetch(url);
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
