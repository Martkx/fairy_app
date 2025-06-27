import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { CircularProgressbarWithChildren, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import Header from "./Header";
import Footer from "./Footer";

export default function FairiScorePage() {
  const navigate = useNavigate();
  const location = useLocation();

  const data = location.state?.analysisData || {
    score: 0,
    arbeitskosten: 0,
    arbeitskostenEuro: 0,
    materialkosten: 0,
    materialkostenEuro: 0,
    anfahrtskosten: 0,
    anfahrtskostenEuro: 0,
    sonstigeKosten: [],
  };

  const getRatingFromValue = (percent) => {
    if (percent >= 90) return { label: "Sehr gut", color: "text-green-600" };
    if (percent >= 70) return { label: "Gut", color: "text-green-500" };
    if (percent >= 50) return { label: "Normal", color: "text-orange-500" };
    return { label: "Schlecht", color: "text-red-500" };
  };

  const overallLabel = getRatingFromValue(data.score / 10).label;

  return (
    <div className="min-h-screen bg-[#f9f7fc] flex flex-col justify-between">
      <Header />

      <main className="flex flex-col items-center px-4 pt-8 pb-16 space-y-10 flex-grow">
        <button
          onClick={() => navigate(-1)}
          className="self-start flex items-center text-[#573A6F] font-semibold hover:underline"
        >
          <ArrowLeft className="mr-2" /> Zurück
        </button>

        <h1 className="text-4xl font-extrabold text-[#573A6F] text-center">
          Dein Fairy-Score
        </h1>

        <div className="w-52 h-52">
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

        <div className="bg-white w-full max-w-2xl rounded-2xl p-6 shadow-lg space-y-6 border border-gray-200">
          <CostRow
            label="Arbeitskosten"
            percent={data.arbeitskosten}
            amount={data.arbeitskostenEuro}
          />
          <CostRow
            label="Materialkosten"
            percent={data.materialkosten}
            amount={data.materialkostenEuro}
          />
          <CostRow
            label="Anfahrtskosten"
            percent={data.anfahrtskosten}
            amount={data.anfahrtskostenEuro}
          />

          {data.sonstigeKosten && data.sonstigeKosten.length > 0 && (
            <div className="border-t pt-4">
              <p className="text-3xl font-semibold text-[#573A6F] mb-2">Sonstige Kosten</p>
              <div className="space-y-3">
                {data.sonstigeKosten.map((item, index) => {
                  const { color } = getRatingFromValue(item.percent);
                  return (
                    <div
                      key={index}
                      className="flex justify-between text-base border-b pb-2 last:border-none"
                    >
                      <div className={`font-medium ${color} text-xl`}>
                        {item.label || "Unbenannt"}
                      </div>
                      <div className="text-right">
                        <p className="text-gray-800 font-semibold text-3xl">{item.percent}%</p>
                        <p className="text-xl text-gray-500">
                          {item.amount?.toFixed(2)} €
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}

function CostRow({ label, percent, amount }) {
  const { label: rating, color } = getRatingFromValue(percent);
  return (
    <div className="flex justify-between items-start border-b pb-4 last:border-none last:pb-0">
      <div>
        <p className="text-3xl font-semibold text-[#573A6F]">{label}</p>
        <p className={`text-xl font-medium ${color}`}>{rating}</p>
      </div>
      <div className="text-right">
        <p className="text-3xl font-bold text-gray-800">{percent}%</p>
        <p className="text-xl text-gray-500">{amount?.toFixed(2)} €</p>
      </div>
    </div>
  );
}

function getRatingFromValue(percent) {
  if (percent >= 90) return { label: "Sehr gut", color: "text-green-600" };
  if (percent >= 70) return { label: "Gut", color: "text-green-500" };
  if (percent >= 50) return { label: "Normal", color: "text-orange-500" };
  return { label: "Schlecht", color: "text-red-500" };
}
