export interface BalanceSheetReport {
  ReportID: string;
  ReportName: string;
  ReportType: "BalanceSheet";
  ReportTitles: string[];

  ReportDate: string;
  UpdatedDateUTC: string;
  Rows: Row[];
}

export interface Row {
  RowType: "Header" | "Row" | "SummaryRow" | "Section";
  Title: string;
  Cells?: Cell[];
  Rows?: Row[];
}

export interface Cell {
  Value: string;
  Attributes?: {
    Id?: string;
    Value: string;
  }[];
}
