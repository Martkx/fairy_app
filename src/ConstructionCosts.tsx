import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Header from "./Header";
import Footer from "./Footer";

const materialPrices = [
  { name: "Holz (€/m³)", price: 420 },
  { name: "Stahl (€/t)", price: 960 },
  { name: "Beton (€/m³)", price: 140 },
  { name: "Kupfer (€/t)", price: 8800 },
  { name: "Gipskarton (€/m²)", price: 6.5 },
  { name: "Aluminium (€/t)", price: 2300 },
  { name: "Ziegel (€/1.000 Stk.)", price: 350 },
  { name: "Bitumen (€/t)", price: 550 },
  { name: "Glas (€/m²)", price: 45 },
  { name: "Dämmstoff (€/m²)", price: 12 },
];

function calculateFairScore(prices) {
  const maxReference = [500, 1200, 200, 10000, 8, 2500, 400, 700, 60, 15]; // Referenzwerte für Höchstpreise
  const total = prices.reduce((acc, item, i) => {
    const ratio = item.price / maxReference[i];
    return acc + ratio;
  }, 0);
  const average = total / prices.length;
  const score = Math.round((1 - average) * 100);
  return Math.max(0, Math.min(score, 100));
}

export default function ConstructionCostCheck() {
  const navigate = useNavigate();
  const score = calculateFairScore(materialPrices);
  const scoreText =
    score > 70
      ? "Jetzt ist ein guter Zeitpunkt für deinen Auftrag!"
      : score > 40
      ? "Baukosten sind durchschnittlich – Entscheide individuell."
      : "Die Preise sind aktuell hoch – Warten könnte sich lohnen.";

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />

      <main className="flex flex-col px-6 pt-8 pb-24 flex-grow">
        {/* Zurück-Button */}
        <button
          onClick={() => navigate(-1)}
          className="self-start mb-4 flex items-center text-[#573A6F] font-semibold hover:underline text-3xl"
        >
          <ArrowLeft className="mr-2" /> Zurück
        </button>

        <h1 className="text-4xl font-bold text-[#573A6F] text-center mb-6">
          Aktuelle Materialpreise & Baukosten-Check
        </h1>

        <div className="bg-purple-50 p-6 rounded-xl shadow-md space-y-4 mb-10">
          <h2 className="text-3xl font-semibold text-[#573A6F] mb-2">Rohstoffpreise</h2>
          <ul className="space-y-2 text-xl text-[#573A6F]">
            {materialPrices.map((item, idx) => (
              <li key={idx} className="flex justify-between">
                <span>{item.name}</span>
                <span>{item.price.toFixed(2)} €</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-[#573A6F] text-white rounded-xl p-6 text-center shadow-lg">
          <h3 className="text-3xl font-bold mb-2">Fair-Score: {score} / 100</h3>
          <p className="text-xl">{scoreText}</p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
