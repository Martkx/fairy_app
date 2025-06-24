import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { CircularProgressbarWithChildren, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

export default function FairiScorePage() {
  const navigate = useNavigate();
  const location = useLocation();

  // Beispielhafte Daten
  const data = location.state?.analysisData || {
    score: 660,
    arbeitskosten: 80,
    materialkosten: 60,
    versteckteKosten: 100,
  };

  const getRatingText = (percent) => {
    if (percent >= 90) return { label: "Sehr gut", color: "text-green-600" };
    if (percent >= 70) return { label: "Gut", color: "text-green-500" };
    if (percent >= 50) return { label: "Normal", color: "text-orange-500" };
    return { label: "Schlecht", color: "text-red-500" };
  };

  const overallLabel = getRatingText(data.score / 10).label;

  return (
    <div className="min-h-screen bg-white px-4 py-8 flex flex-col items-center space-y-8">
      <button onClick={() => navigate(-1)} className="self-start flex items-center text-purple-800 font-semibold">
        <ArrowLeft className="mr-2" /> Zurück
      </button>

      <h1 className="text-2xl font-bold text-gray-800">Fairi Score</h1>

      <div className="w-48 h-48">
        <CircularProgressbarWithChildren
          value={data.score}
          maxValue={1000}
          styles={buildStyles({
            pathColor: "#7C3AED",
            trailColor: "#E5E7EB",
            strokeLinecap: "round",
          })}
        >
          <div className="text-center">
            <p className="text-lg text-gray-700 font-semibold">{overallLabel}</p>
            <p className="text-4xl font-bold text-gray-900">{data.score}</p>
          </div>
        </CircularProgressbarWithChildren>
      </div>

      <div className="bg-purple-50 w-full max-w-md rounded-2xl p-6 space-y-6 shadow-md">
        <CostRow label="Arbeitskosten" value={data.arbeitskosten} />
        <CostRow label="Materialkosten" value={data.materialkosten} />
        <CostRow label="Versteckte Kosten" value={data.versteckteKosten} />
      </div>
    </div>
  );
}

function CostRow({ label, value }) {
  const { label: rating, color } = getRatingFromValue(value);
  return (
    <div className="flex justify-between items-start border-b pb-4 last:border-none last:pb-0">
      <div>
        <p className="text-lg font-semibold text-purple-900">{label}</p>
        <p className={`text-sm font-medium ${color}`}>{rating}</p>
      </div>
      <p className="text-xl font-bold text-gray-800">{value}%</p>
    </div>
  );
}

function getRatingFromValue(percent) {
  if (percent >= 90) return { label: "Sehr gut", color: "text-green-600" };
  if (percent >= 70) return { label: "Gut", color: "text-green-500" };
  if (percent >= 50) return { label: "Normal", color: "text-orange-500" };
  return { label: "Schlecht", color: "text-red-500" };
}
