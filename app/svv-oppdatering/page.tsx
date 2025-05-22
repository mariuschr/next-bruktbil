'use client';
import { useState } from "react";

const dummyData = Array.from({ length: 23 }, (_, i) => ({ id: i + 1, purchase_date: "2025-04-01" }));

export default function SVVOppdatering() {
  const [data, setData] = useState(dummyData);
  const [offset, setOffset] = useState(0);

  const grupper = [];
  for (let i = 0; i < data.length; i += 10) grupper.push(data.slice(i, i + 10));

  const oppdaterGruppe = () => {
    const nyData = [...data];
    grupper[offset].forEach(item => {
      const index = nyData.findIndex(d => d.id === item.id);
      nyData[index] = { ...item, updated: true };
    });
    setData(nyData);
    setOffset(offset + 1);
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-lg font-bold mb-2">SVV Oppdatering</h1>
      <button onClick={oppdaterGruppe} disabled={offset >= grupper.length} className="mb-4 p-2 bg-blue-500 text-white rounded">
        Oppdater neste gruppe ({offset + 1}/{grupper.length})
      </button>
      <ul>
        {data.map(item => (
          <li key={item.id} className={item.updated ? "text-green-600" : ""}>ID: {item.id} – {item.updated ? "Oppdatert" : "Ikke oppdatert"}</li>
        ))}
      </ul>
    </div>
  );
}
