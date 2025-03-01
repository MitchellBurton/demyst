import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { HeaderRow, SectionRow } from "./Rows";
import { describe, it, expect } from "vitest";

describe("HeaderRow", () => {
  it("renders header cells correctly", () => {
    const headerRow = {
      RowType: "Header" as const,
      Title: "",
      Cells: [{ Value: "Cell 1" }, { Value: "Cell 2" }],
    };

    render(<HeaderRow row={headerRow} index={0} />);
    expect(screen.getByText("Cell 1")).toBeInTheDocument();
    expect(screen.getByText("Cell 2")).toBeInTheDocument();
  });
});

describe("SectionRow", () => {
  it("renders SectionHeaderRow when row has title and no sub-rows", () => {
    const rowWithoutSubRows = {
      RowType: "Section" as const,
      Title: "Test Title",
      Cells: [],
    };

    render(<SectionRow row={rowWithoutSubRows} index={0} />);
    expect(screen.getByText("Test Title")).toBeInTheDocument();
  });

  it("renders SectionDetailRow when row has title and sub-rows", () => {
    const sectionDetailRow = {
      RowType: "Section" as const,
      Title: "Test Title",
      Cells: [],
      Rows: [
        {
          RowType: "Row" as const,
          Title: "",
          Cells: [{ Value: "SubCell 1" }, { Value: "SubCell 2" }],
        },
      ],
    };
    render(<SectionRow row={sectionDetailRow} index={0} />);
    expect(screen.getByText("Test Title")).toBeInTheDocument();
    expect(screen.getByText("▶")).toBeInTheDocument();
  });

  it("toggles sub-rows visibility on button click", () => {
    const row = {
      RowType: "Section" as const,
      Title: "Test Title",
      Cells: [],
      Rows: [
        {
          RowType: "Row" as const,
          Title: "",
          Cells: [{ Value: "Cell 1" }, { Value: "Cell 2" }],
        },
      ],
    };
    render(<SectionRow row={row} index={0} />);
    const button = screen.getByText("Test Title").closest("button");
    fireEvent.click(button!);
    expect(screen.getByText("Cell 1")).toBeInTheDocument();
    expect(screen.getByText("Cell 2")).toBeInTheDocument();
  });

  it("renders SectionSummaryRow when row has no title but has sub-rows", () => {
    const rowWithoutTitleButWithSubRows = {
      RowType: "Section" as const,
      Title: "",
      Rows: [
        {
          RowType: "Row" as const,
          Title: "",
          Cells: [{ Value: "Cell 1" }, { Value: "Cell 2" }],
        },
      ],
    };
    render(<SectionRow row={rowWithoutTitleButWithSubRows} index={0} />);
    expect(screen.getByText("Cell 1")).toBeInTheDocument();
    expect(screen.getByText("Cell 2")).toBeInTheDocument();
  });

  it("renders 'no data' SectionSummaryRow when row has no title and no rows", () => {
    const rowWithoutTitle = {
      RowType: "Section" as const,
      Title: "",
      Rows: [],
    };
    render(<SectionRow row={rowWithoutTitle} index={0} />);
    expect(screen.getByText("No data")).toBeInTheDocument();
  });
});
