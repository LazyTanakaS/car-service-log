import { useState } from "react";
import type { ServiceRecord } from "../types";

type RecordFormProps = {
  onAdd: (record: ServiceRecord) => void;
  onUpdate: (record: ServiceRecord) => void;
  editingRecord?: ServiceRecord;
  onCancel: () => void;
};

export function RecordForm({
  onAdd,
  editingRecord,
  onUpdate,
  onCancel,
}: RecordFormProps) {
  const [date, setDate] = useState(editingRecord?.date ?? "");
  const [mileage, setMileage] = useState(
    editingRecord ? String(editingRecord.mileage) : "",
  );
  const [part, setPart] = useState(editingRecord?.part ?? "");

  function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();

    const trimmedPart = part.trim();

    if (mileage === "" || trimmedPart === "") {
      return;
    }

    const record: ServiceRecord = {
      id: editingRecord?.id ?? crypto.randomUUID(),
      date,
      mileage: Number(mileage),
      part: trimmedPart,
    };

    if (editingRecord) {
      onUpdate(record);
    } else {
      onAdd(record);
      setPart("");
      setDate("");
      setMileage("");
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="record-date">Date</label>
      <input
        id="record-date"
        type="date"
        required
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />

      <label htmlFor="record-mileage">Mileage, Km</label>
      <input
        id="record-mileage"
        min={1}
        type="number"
        required
        value={mileage}
        onChange={(e) => setMileage(e.target.value)}
      />

      <label htmlFor="record-part">Parts</label>
      <input
        id="record-part"
        type="text"
        required
        value={part}
        onChange={(e) => setPart(e.target.value)}
      />

      <button type="submit">{editingRecord ? "Save" : "Add"}</button>

      {editingRecord && (
        <button type="button" onClick={onCancel}>
          Cancel
        </button>
      )}
    </form>
  );
}
