'use client';
import { useState } from "react";

export default function Finansieringskalkulator() {
  const [bilpris, setBilpris] = useState(0);
  const [innbytte, setInnbytte] = useState(0);
  const [restlan, setRestlan] = useState(0);
  const [egenkapital, setEgenkapital] = useState(0);
  const [kampanje, setKampanje] = useState(true);

  const beregn = () => {
    const lanebelop = bilpris - innbytte - restlan - egenkapital;
    const rente = kampanje ? 0.029 : 0.059;
    const terminbelop = (lanebelop * rente) / (1 - Math.pow(1 + rente, -60));
    return {
      terminbelop: terminbelop.toFixed(0),
      totalbelop: (terminbelop * 60).toFixed(0),
    };
  };

  const resultat = beregn();

  return (
    <div className="max-w-xl mx-auto p-4 space-y-4">
      <h1 className="text-xl font-bold">Finansieringskalkulator</h1>
      <input placeholder="Bilpris" type="number" value={bilpris} onChange={e => setBilpris(+e.target.value)} className="w-full p-2 border rounded" />
      <input placeholder="Innbytte" type="number" value={innbytte} onChange={e => setInnbytte(+e.target.value)} className="w-full p-2 border rounded" />
      <input placeholder="Restlån" type="number" value={restlan} onChange={e => setRestlan(+e.target.value)} className="w-full p-2 border rounded" />
      <input placeholder="Egenkapital" type="number" value={egenkapital} onChange={e => setEgenkapital(+e.target.value)} className="w-full p-2 border rounded" />
      <label className="flex items-center space-x-2">
        <input type="checkbox" checked={kampanje} onChange={() => setKampanje(!kampanje)} />
        <span>Kampanjerente (0,029)</span>
      </label>
      <div>
        <p>Månedlig terminbeløp: <strong>{resultat.terminbelop} kr</strong></p>
        <p>Totalbeløp: <strong>{resultat.totalbelop} kr</strong></p>
      </div>
    </div>
  );
}
