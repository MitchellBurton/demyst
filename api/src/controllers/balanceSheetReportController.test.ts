import { describe, it, expect, vi, afterEach } from "vitest";
import { BalanceSheetReportController } from "./balanceSheetReportController";
import type * as express from "express";
import { TsoaResponse } from "tsoa";

const fetch = vi.fn();
global.fetch = fetch;

describe("BalanceSheetReportController", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  const notFoundResponse: TsoaResponse<404, { reason: string }> = vi.fn();
  const badRequest: TsoaResponse<400, { reason: string }> = vi.fn();

  const mockRequest = {} as express.Request;

  it("should return a balance sheet report", async () => {
    const mockReport = {
      Reports: [
        {
          /* mock report data */
        },
      ],
    };
    (fetch as any).mockResolvedValueOnce(
      new Response(JSON.stringify(mockReport))
    );

    const controller = new BalanceSheetReportController();
    const result = await controller.getBalanceSheetReport(
      mockRequest,
      notFoundResponse,
      badRequest
    );

    expect(result).toEqual(mockReport.Reports[0]);
    expect(notFoundResponse).not.toHaveBeenCalled();
    expect(badRequest).not.toHaveBeenCalled();
  });

  it("should return 404 if no report is found", async () => {
    const mockReport = {
      Reports: [],
    };
    (fetch as any).mockResolvedValueOnce(
      new Response(JSON.stringify(mockReport))
    );

    const controller = new BalanceSheetReportController();
    await controller.getBalanceSheetReport(
      mockRequest,
      notFoundResponse,
      badRequest
    );

    expect(notFoundResponse).toHaveBeenCalledWith(404, {
      reason: "Report not found",
    });
    expect(badRequest).not.toHaveBeenCalled();
  });

  it("should return 400 if more than one report is found", async () => {
    const mockReport = {
      Reports: [{}, {}],
    };
    (fetch as any).mockResolvedValueOnce(
      new Response(JSON.stringify(mockReport))
    );

    const controller = new BalanceSheetReportController();
    await controller.getBalanceSheetReport(
      mockRequest,
      notFoundResponse,
      badRequest
    );

    expect(badRequest).toHaveBeenCalledWith(400, {
      reason: "More than one report found",
    });
    expect(notFoundResponse).not.toHaveBeenCalled();
  });
});
