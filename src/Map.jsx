import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";

export default function CraftsmanHeatmapPage() {
  const [selectedCraft, setSelectedCraft] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [zoom, setZoom] = useState(1); // Zoom-Level für Bild

  const crafts = [
    "Gärtner",
    "Elektriker",
    "Dachdecker",
    "Maler",
    "Fliesenleger",
    "Installateur",
    "Tischler",
    "Heizungsbauer",
    "Bodenleger",
    "Trockenbauer",
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      <main className="flex-grow flex flex-col items-center text-[#573A6F] px-6 pt-16 pb-20">
        <h1 className="text-5xl font-bold mb-10 text-center">Fairy Preiskarte</h1>

        {/* Zoom Buttons */}
        <div className="flex space-x-4 mb-4">
          <button
            onClick={() => setZoom((z) => Math.min(z + 0.1, 3))}
            className="px-4 py-2 rounded bg-[#D9B4EF] text-white font-semibold hover:bg-[#c59bdd]"
          >
            🔍+
          </button>
          <button
            onClick={() => setZoom((z) => Math.max(z - 0.1, 0.5))}
            className="px-4 py-2 rounded bg-[#D9B4EF] text-white font-semibold hover:bg-[#c59bdd]"
          >
            🔍−
          </button>
        </div>

        {/* Heatmap mit Zoom per Mausrad */}
        <div
          onWheel={(e) => {
            e.preventDefault();
            const delta = e.deltaY < 0 ? 0.1 : -0.1;
            setZoom((z) => Math.min(Math.max(0.5, z + delta), 3));
          }}
          className="w-full max-w-5xl h-[500px] overflow-auto rounded-2xl shadow-lg border-2 border-[#D9B4EF] mb-12 cursor-grab bg-white"
        >
          <div className="w-[150%] h-[150%] relative">
            <img
              src="/heatmap-germany.png"
              alt="Germany Heatmap"
              className="absolute top-0 left-0 w-full h-full object-contain transition-transform duration-200"
              style={{ transform: `scale(${zoom})`, transformOrigin: "top left" }}
            />
          </div>
        </div>

        {/* Formular */}
        <div className="w-full max-w-2xl bg-[#F9F4FB] p-6 rounded-xl shadow space-y-6">
          <div>
            <label className="block mb-2 text-xl font-semibold">Wähle einen Handwerker</label>
            <select
              value={selectedCraft}
              onChange={(e) => setSelectedCraft(e.target.value)}
              className="w-full p-3 rounded border border-[#D9B4EF] bg-white text-[#573A6F] focus:outline-none focus:ring-2 focus:ring-[#D9B4EF]"
            >
              <option value="">Wähle einen Handwerker</option>
              {crafts.map((craft, idx) => (
                <option key={idx} value={craft}>
                  {craft}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block mb-2 text-xl font-semibold">Postleitzahl eingeben</label>
            <input
              type="text"
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value)}
              placeholder="z. B. 10115"
              className="w-full p-3 rounded border border-[#D9B4EF] bg-white text-[#573A6F] focus:outline-none focus:ring-2 focus:ring-[#D9B4EF]"
            />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
