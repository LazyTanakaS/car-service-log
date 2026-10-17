import type { ServiceRecord } from "../types";

type RecordListProps = {
  records: ServiceRecord[];
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
};

export function RecordList({ records, onDelete, onEdit }: RecordListProps) {
  if (records.length === 0) {
    return <p>No records yet</p>;
  }

  const sorted = [...records].sort((a, b) => b.date.localeCompare(a.date));

  return (
    <ul>
      {sorted.map((record) => (
        <li key={record.id}>
          {record.date} · {record.mileage} km · {record.part}
          <button type="button" onClick={() => onDelete(record.id)}>
            Delete
          </button>
          <button type="button" onClick={() => onEdit(record.id)}>
            Edit
          </button>
        </li>
      ))}
    </ul>
  );
}
