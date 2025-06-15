import React, { useState } from "react";
import { Camera, Upload } from "lucide-react";

export default function CraftsmanHeatmapPage() {
  const [selectedCraft, setSelectedCraft] = useState("");
  const [zipCode, setZipCode] = useState("");

  const crafts = ["Plumber", "Electrician", "Carpenter", "Painter", "Roofer"];

  return (
    <div className="min-h-screen bg-purple-100 flex flex-col items-center p-4 space-y-6">
      {/* Header */}
      <header className="w-full flex items-center justify-between px-4 py-2 bg-purple-200 rounded-xl mb-2">
        <div className="flex items-center space-x-4">
          <div className="space-y-1">
            <div className="w-6 h-1 bg-white rounded"></div>
            <div className="w-6 h-1 bg-white rounded"></div>
            <div className="w-6 h-1 bg-white rounded"></div>
          </div>
          <img src="/user.png" alt="User" className="w-10 h-10 rounded-full object-cover" />
        </div>
        <div className="w-full bg-purple-200 px-4 py-4 rounded-xl">
          <div className="flex items-center justify-between">
            <div className="flex flex-col items-center text-center flex-1 -ml-10">
            <img
                src="/logo.png"
                alt="Fairy"
                className="w-12 h-12 object-contain mb-1 cursor-pointer"
                onClick={() => navigate('/')}
              />
              <h1 className="text-lg font-bold text-purple-800 leading-tight">
                Fairy. Wissen was <span className="text-purple-700">fair</span> ist
              </h1>
            </div>
            <div className="w-10 h-10"></div>
          </div>
        </div>
      </header>

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
      <footer className="w-full bg-purple-200 text-purple-900 text-center py-2">
        <p className="text-sm">© 2025 Fairy. Alle Rechte vorbehalten.</p>
      </footer>

      {/* Sticky Footer with Icons */}
      <div className="fixed bottom-0 left-0 w-full bg-white border-t border-purple-200 flex justify-around items-center py-3 z-20">
        <button onClick={() => navigate('/upload-photo')} className="flex flex-col items-center text-purple-800">
          <Upload className="w-6 h-6" />
          <span className="text-xs">Rechnung</span>
        </button>
        <button onClick={() => navigate('/assistant')} className="flex flex-col items-center text-purple-800">
          <Camera className="w-6 h-6" />
          <span className="text-xs">KI-Assistent</span>
        </button>
      </div>
    </div>
  );
}
