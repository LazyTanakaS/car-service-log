import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { RecordList } from "./RecordList";

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
});
