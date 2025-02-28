import React from "react";

interface BalanceSheetTableProps {
  report: Report;
}
export interface Report {
  ReportID: string;
  ReportName: string;
  ReportType: "BalanceSheet";
  ReportTitles: string[];

  ReportDate: string;
  UpdatedDateUTC: string; //"\/Date(1519358515899)\/",
  Rows: Row[];
}

interface Cell {
  Value: string;
  Attributes: {
    Id?: string;
    Value: string;
  }[];
}

interface Row {
  RowType: "Header" | "Row" | "SummaryRow" | "Section";
  Title: string;
  Cells: Cell[];
  Rows?: Row[];
}

const HeaderRow = ({ row, index }: { row: Row; index: number }) => (
  <tr key={index} className="bg-gray-100 text-left">
    {row.Cells.map((cell, cellIndex) => (
      <th key={cellIndex} className="p-2 border border-gray-300">
        {cell.Value}
      </th>
    ))}
  </tr>
);

const SectionRow = ({ row, index }: { row: Row; index: number }) => {
  if (row.Title && (!row.Rows || row.Rows.length === 0)) {
    return <SectionHeaderRow row={row} index={index} />;
  }

  if (row.Title) {
    return <SectionDetailRow row={row} index={index} />;
  }
  return <SectionSummaryRow row={row} index={index} />;
};

const SectionDetailRow = ({ row, index }: { row: Row; index: number }) => {
  const [expanded, setExpanded] = React.useState(false);
  return (
    <tr key={index} className="bg-gray-200 font-bold">
      <td colSpan={3} className="p-2 border border-gray-300">
        <div className="ml-4">
          <button
            onClick={() => setExpanded(!expanded)}
            className="text-left w-full flex items-center"
          >
            <span
              className={`transform transition-transform ${
                expanded ? "rotate-90" : ""
              }`}
            >
              ▶
            </span>
            <span className="ml-2">{row.Title}</span>
          </button>
          {expanded && (
            <table className="w-full">
              <colgroup>
                <col className="w-1/2" />
                <col className="w-1/4" />
                <col className="w-1/4" />
              </colgroup>
              <tbody>
                {row.Rows?.map((subRow, subIndex) => (
                  <BasicRow row={subRow} index={subIndex} />
                ))}
                {row.Rows?.length === 0 && (
                  <tr>
                    <td colSpan={3} className="p-2 border border-gray-300">
                      No data
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </td>
    </tr>
  );
};
const SectionHeaderRow = ({ row, index }: { row: Row; index: number }) => (
  <tr key={index} className="bg-gray-200 font-bold">
    <td colSpan={3} className="p-2 border border-gray-300">
      <div className="ml-4">
        <span className="ml-2">{row.Title}</span>
      </div>
    </td>
  </tr>
);

const SectionSummaryRow = ({ row, index }: { row: Row; index: number }) => (
  <tr key={index} className="bg-gray-200 font-bold sdfs">
    <td colSpan={3} className="p-2 border border-gray-300">
      <div className="ml-4">
        {row.Title ? <span className="ml-2">{row.Title}</span> : null}
        <table className="w-full border-collapse border-spacing-0">
          <colgroup>
            <col className="w-1/2" />
            <col className="w-1/4" />
            <col className="w-1/4" />
          </colgroup>
          <tbody>
            {row.Rows?.map((subRow, subIndex) => (
              <BasicRow row={subRow} index={subIndex} />
            ))}
            {row.Rows?.length === 0 && (
              <tr>
                <td colSpan={3} className="p-2 border border-gray-300">
                  No data
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </td>
  </tr>
);

const BasicRow = ({ row, index }: { row: Row; index: number }) => (
  <tr
    key={index}
    className={row.RowType === "SummaryRow" ? "bg-gray-100 font-semibold" : ""}
  >
    {row.Cells.map((cell, cellIndex) => (
      <td key={cellIndex} className="p-2 border border-gray-300 text-right">
        {cellIndex === 0 ? (
          <span className="text-left block">{cell.Value}</span>
        ) : (
          cell.Value
        )}
      </td>
    ))}
  </tr>
);

export const BalanceSheetTable = ({ report }: BalanceSheetTableProps) => {
  const rows = report.Rows;

  // We assume that we only have Header and Section rows at this level.
  // All other rows are discarded.
  const headerRows = rows.filter((row) => row.RowType === "Header");
  const sectionRows = rows.filter((row) => row.RowType === "Section");

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-2">{report.ReportTitles[0]}</h2>
      <h3 className="text-lg text-gray-600">{report.ReportTitles[1]}</h3>
      <h4 className="text-md text-gray-500 mb-4">{report.ReportTitles[2]}</h4>
      <table className="w-full border border-gray-300 shadow-md rounded-lg border-collapse border-spacing-0">
        <colgroup>
          <col className="w-1/2" />
          <col className="w-1/4" />
          <col className="w-1/4" />
        </colgroup>
        <thead>
          {headerRows.map((row, index) => (
            <HeaderRow row={row} index={index} />
          ))}
        </thead>
        <tbody>
          {sectionRows.map((row, index) => (
            <SectionRow row={row} index={index} />
          ))}
        </tbody>
      </table>
    </div>
  );
};
