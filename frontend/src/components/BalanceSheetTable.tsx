import { HeaderRow, SectionRow } from "./Rows";
import { Report } from "../types/balanceSheetTypes";

interface BalanceSheetTableProps {
  report: Report;
}

export const BalanceSheetTable = ({ report }: BalanceSheetTableProps) => {
  const rows = report.Rows;

  // We assume that we only have Header and Section rows at this level.
  // All other rows are discarded.
  const headerRows = rows.filter((row) => row.RowType === "Header");
  const sectionRows = rows.filter((row) => row.RowType === "Section");

  const reportTitle = report.ReportTitles[0] || "";
  const reportOrganisation = report.ReportTitles[1] || "";
  const reportAsAtDate = report.ReportTitles[2] || "";

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-2">{reportTitle}</h2>
      <h3 className="text-lg text-gray-600">{reportOrganisation}</h3>
      <h4 className="text-md text-gray-500 mb-4">{reportAsAtDate}</h4>
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
