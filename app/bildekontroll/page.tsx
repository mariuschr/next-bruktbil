'use client';
import { useState } from "react";

const sakerMock = [
  { id: 1, status: "ferdig", dato: "2025-05-01" },
  { id: 2, status: "uferdig", dato: "2025-05-19" },
];

export default function Bildekontroll() {
  const [filter, setFilter] = useState("alle");

  const filtrerte = sakerMock.filter(sak => {
    if (filter === "ferdige") return sak.status === "ferdig";
    if (filter === "uferdige") return sak.status === "uferdig";
    if (filter === "skjul_ferdige") return sak.status !== "ferdig" || new Date(sak.dato) > new Date(Date.now() - 10 * 86400000);
    return true;
  });

  return (
    <div className="max-w-3xl mx-auto p-4">
      <div className="space-x-2 mb-4">
        <button onClick={() => setFilter("alle")}>Alle</button>
        <button onClick={() => setFilter("ferdige")}>Ferdige</button>
        <button onClick={() => setFilter("uferdige")}>Uferdige</button>
        <button onClick={() => setFilter("skjul_ferdige")}>Skjul ferdige >10d</button>
      </div>
      <table className="w-full border">
        <thead><tr><th>ID</th><th>Status</th><th>Dato</th></tr></thead>
        <tbody>
          {filtrerte.map(s => (
            <tr key={s.id} className={s.status === "uferdig" ? "bg-red-100" : ""}>
              <td>{s.id}</td><td>{s.status}</td><td>{s.dato}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
