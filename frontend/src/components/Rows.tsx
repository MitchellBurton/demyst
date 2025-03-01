import { useState } from "react";
import { Row } from "../../../api/src/types/ballanceSheetReport";

export const HeaderRow = ({ row, index }: { row: Row; index: number }) => (
  <tr key={index} className="bg-gray-100 text-left">
    {row.Cells?.map((cell, cellIndex) => (
      <th key={cellIndex} className="p-2 border border-gray-300">
        {cell.Value}
      </th>
    ))}
  </tr>
);

export const SectionRow = ({ row, index }: { row: Row; index: number }) => {
  if (row.Title && (!row.Rows || row.Rows.length === 0)) {
    return <SectionHeaderRow row={row} index={index} />;
  }

  if (row.Title) {
    return <SectionDetailRow row={row} index={index} />;
  }
  return <SectionSummaryRow row={row} index={index} />;
};

const SectionDetailRow = ({ row, index }: { row: Row; index: number }) => {
  const [expanded, setExpanded] = useState(false);
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
    {row.Cells?.map((cell, cellIndex) => (
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
