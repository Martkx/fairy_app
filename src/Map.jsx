import React, { useState } from "react";
import { Camera, Upload } from "lucide-react";
import Header from "./Header";
import Footer from "./Footer";

export default function CraftsmanHeatmapPage() {
  const [selectedCraft, setSelectedCraft] = useState("");
  const [zipCode, setZipCode] = useState("");

  const crafts = ["Plumber", "Electrician", "Carpenter", "Painter", "Roofer"];

  return (
    <div className="min-h-screen bg-[#ffffff] flex flex-col justify-between px-0 space-y-6 relative">
      {/* Header */}
      <Header />

      {/* Page Headline */}
      <h1 className="text-2xl font-bold text-center mb-2">Fairy Preiskarte</h1>

      {/* Heatmap Card with Zoom & Pan */}
      <div className="w-full max-w-4xl h-[500px] overflow-auto rounded-xl border bg-white cursor-grab mb-4">
        <div className="w-[150%] h-[150%] relative">
          <img
            src="/heatmap-germany.png"
            alt="Germany Heatmap"
            className="absolute top-0 left-0 w-full h-full object-contain"
          />
        </div>
      </div>

      {/* Controls */}
      <div className="w-full max-w-xl space-y-4">
        <div>
          <label className="block mb-1 font-semibold">Select Craftsman Type</label>
          <select
            value={selectedCraft}
            onChange={(e) => setSelectedCraft(e.target.value)}
            className="w-full p-2 rounded border"
          >
            <option value="">-- Choose a craft --</option>
            {crafts.map((craft, idx) => (
              <option key={idx} value={craft}>{craft}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-1 font-semibold">Enter ZIP Code</label>
          <input
            type="text"
            value={zipCode}
            onChange={(e) => setZipCode(e.target.value)}
            placeholder="e.g. 10115"
            className="w-full p-2 rounded border"
          />
        </div>
      </div>
      {/* Normal Footer */}
        <Footer/>
    </div>
  );
}
