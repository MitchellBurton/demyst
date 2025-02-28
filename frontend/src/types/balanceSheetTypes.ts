export interface Report {
  ReportID: string;
  ReportName: string;
  ReportType: "BalanceSheet";
  ReportTitles: string[];
  ReportDate: string;
  UpdatedDateUTC: string;
  Rows: Row[];
}

export interface Cell {
  Value: string;
  Attributes: {
    Id?: string;
    Value: string;
  }[];
}

export interface Row {
  RowType: "Header" | "Row" | "SummaryRow" | "Section";
  Title: string;
  Cells: Cell[];
  Rows?: Row[];
}
