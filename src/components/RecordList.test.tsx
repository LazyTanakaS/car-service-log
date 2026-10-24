import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { RecordList } from "./RecordList";
import type { ServiceRecord } from "../types";

const records: ServiceRecord[] = [
  { id: "a1", date: "2026-01-10", mileage: 12000, part: "Oil" },
  { id: "a2", date: "2026-03-05", mileage: 12500, part: "Brake pads" },
];

describe("RecordList", () => {
  it("shows the empty state when there are no records", () => {
    render(
      <RecordList
        records={[]}
        isFiltered={false}
        onDelete={vi.fn()}
        onEdit={vi.fn()}
      />,
    );

    expect(screen.getByText("No records yet")).toBeInTheDocument();
  });

  it("shows the filter message when the filter hides everything", () => {
    render(
      <RecordList
        records={[]}
        isFiltered={true}
        onDelete={vi.fn()}
        onEdit={vi.fn()}
      />,
    );

    expect(screen.getByText("Nothing found")).toBeInTheDocument();
    expect(screen.queryByText("No records yet")).not.toBeInTheDocument();
  });

  it("renders a row for each record", () => {
    render(
      <RecordList
        records={records}
        isFiltered={false}
        onDelete={vi.fn()}
        onEdit={vi.fn()}
      />,
    );

    expect(screen.getAllByRole("listitem")).toHaveLength(2);
    expect(screen.getByText(/Oil/)).toBeInTheDocument();
  });

  it("sorts records by date, newest first", () => {
    render(
      <RecordList
        records={records}
        isFiltered={false}
        onDelete={vi.fn()}
        onEdit={vi.fn()}
      />,
    );

    const items = screen.getAllByRole("listitem");

    expect(items[0]).toHaveTextContent(/Brake pads/);
    expect(items[1]).toHaveTextContent(/Oil/);
  });
});
