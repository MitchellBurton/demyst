/* tslint:disable */
/* eslint-disable */
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import type { TsoaRoute } from '@tsoa/runtime';
import {  fetchMiddlewares, ExpressTemplateService } from '@tsoa/runtime';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { BalanceSheetReportController } from './../src/controllers/balanceSheetReportController';
import type { Request as ExRequest, Response as ExResponse, RequestHandler, Router } from 'express';



// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

const models: TsoaRoute.Models = {
    "Cell": {
        "dataType": "refObject",
        "properties": {
            "Value": {"dataType":"string","required":true},
            "Attributes": {"dataType":"array","array":{"dataType":"nestedObjectLiteral","nestedProperties":{"Value":{"dataType":"string","required":true},"Id":{"dataType":"string"}}}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Row": {
        "dataType": "refObject",
        "properties": {
            "RowType": {"dataType":"union","subSchemas":[{"dataType":"enum","enums":["Header"]},{"dataType":"enum","enums":["Row"]},{"dataType":"enum","enums":["SummaryRow"]},{"dataType":"enum","enums":["Section"]}],"required":true},
            "Title": {"dataType":"string","required":true},
            "Cells": {"dataType":"array","array":{"dataType":"refObject","ref":"Cell"}},
            "Rows": {"dataType":"array","array":{"dataType":"refObject","ref":"Row"}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "BalanceSheetReport": {
        "dataType": "refObject",
        "properties": {
            "ReportID": {"dataType":"string","required":true},
            "ReportName": {"dataType":"string","required":true},
            "ReportType": {"dataType":"enum","enums":["BalanceSheet"],"required":true},
            "ReportTitles": {"dataType":"array","array":{"dataType":"string"},"required":true},
            "ReportDate": {"dataType":"string","required":true},
            "UpdatedDateUTC": {"dataType":"string","required":true},
            "Rows": {"dataType":"array","array":{"dataType":"refObject","ref":"Row"},"required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "BalanceSheetReportQueryString": {
        "dataType": "refObject",
        "properties": {
            "date": {"dataType":"string"},
            "periods": {"dataType":"string"},
            "timeframe": {"dataType":"string"},
            "trackingOptionID1": {"dataType":"string"},
            "trackingOptionID2": {"dataType":"string"},
            "standardLayout": {"dataType":"string"},
            "paymentsOnly": {"dataType":"string"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
};
const templateService = new ExpressTemplateService(models, {"noImplicitAdditionalProperties":"throw-on-extras","bodyCoercion":true});

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa




export function RegisterRoutes(app: Router) {

    // ###########################################################################################################
    //  NOTE: If you do not see routes for all of your controllers in this file, then you might not have informed tsoa of where to look
    //      Please look into the "controllerPathGlobs" config option described in the readme: https://github.com/lukeautry/tsoa
    // ###########################################################################################################


    
        const argsBalanceSheetReportController_getBalanceSheetReport: Record<string, TsoaRoute.ParameterSchema> = {
                req: {"in":"request","name":"req","required":true,"dataType":"object"},
                notFoundResponse: {"in":"res","name":"404","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"reason":{"dataType":"string","required":true}}},
                badRequest: {"in":"res","name":"400","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"reason":{"dataType":"string","required":true}}},
                queries: {"in":"queries","name":"queries","ref":"BalanceSheetReportQueryString"},
        };
        app.get('/balanceSheetReport',
            ...(fetchMiddlewares<RequestHandler>(BalanceSheetReportController)),
            ...(fetchMiddlewares<RequestHandler>(BalanceSheetReportController.prototype.getBalanceSheetReport)),

            async function BalanceSheetReportController_getBalanceSheetReport(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsBalanceSheetReportController_getBalanceSheetReport, request, response });

                const controller = new BalanceSheetReportController();

              await templateService.apiHandler({
                methodName: 'getBalanceSheetReport',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa


    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
}

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
