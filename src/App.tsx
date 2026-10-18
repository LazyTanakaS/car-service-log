import { RecordForm } from "./components/RecordForm";
import { RecordList } from "./components/RecordList";
import type { ServiceRecord } from "./types";
import "./App.css";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { useState } from "react";

function App() {
  const [records, setRecords] = useLocalStorage<ServiceRecord[]>("records", []);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [filter, setFilter] = useState("");

  const editingRecord = records.find((record) => record.id === editingId);
  const parts = [...new Set(records.map((record) => record.part))];
  const activeFilter = parts.includes(filter) ? filter : "";
  const visibleRecords =
    activeFilter === ""
      ? records
      : records.filter((record) => record.part === activeFilter);

  function handleAdd(record: ServiceRecord) {
    setRecords((prev) => [...prev, record]);
  }

  function handleDelete(id: string) {
    if (id === editingId) {
      setEditingId(null);
    }
    setRecords((prev) => prev.filter((record) => record.id !== id));
  }

  function handleUpdate(updated: ServiceRecord) {
    setRecords((prev) =>
      prev.map((record) => (record.id === updated.id ? updated : record)),
    );
    setEditingId(null);
  }

  function handleCancel() {
    setEditingId(null);
  }

  return (
    <main>
      <h1>Car service log</h1>

      <RecordForm
        key={editingId ?? "new"}
        editingRecord={editingRecord}
        onAdd={handleAdd}
        onUpdate={handleUpdate}
        onCancel={handleCancel}
      />

      <select value={activeFilter} onChange={(e) => setFilter(e.target.value)}>
        <option value="">All</option>
        {parts.map((part) => (
          <option key={part} value={part}>
            {part}
          </option>
        ))}
      </select>

      <RecordList
        records={visibleRecords}
        isFiltered={activeFilter !== ""}
        onDelete={handleDelete}
        onEdit={setEditingId}
      />
    </main>
  );
}

export default App;
