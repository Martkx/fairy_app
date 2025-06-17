import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, GeoJSON, useMap } from "react-leaflet";
import Header from "./Header";
import Footer from "./Footer";
import "leaflet/dist/leaflet.css";

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

const leipzigCoords = [51.3397, 12.3731];

import zipGeoJSON from "./data/2_hoch.geo.json";

function getColor(feature) {
  const type = feature.properties.ENGTYPE_3;
  let value = 600;

  if (type === "Urban District") {
    value = 1200;
  } else if (type === "Rural District") {
    value = 700 + Math.floor(Math.random() * 300);
  } else {
    value = 500 + Math.floor(Math.random() * 200);
  }

  return value > 1100 ? "#b10026" :
         value > 950  ? "#e31a1c" :
         value > 750  ? "#fd8d3c" :
         value > 600  ? "#fecc5c" :
                       "#ffffb2";
}

function ChoroplethLayer() {
  const style = (feature) => ({
    fillColor: getColor(feature),
    weight: 1,
    opacity: 1,
    color: "#999",
    fillOpacity: 0.7,
  });

  return <GeoJSON data={zipGeoJSON} style={style} />;
}

function MapZoom({ coords }) {
  const map = useMap();
  useEffect(() => {
    if (coords) {
      map.setView(coords, 13);
    }
  }, [coords, map]);
  return null;
}

export default function CraftsmanHeatmapPage() {
  const [selectedCraft, setSelectedCraft] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [zoomTo, setZoomTo] = useState(null);

  const handleZipChange = (e) => {
    const value = e.target.value;
    setZipCode(value);
    if (/^04/.test(value)) {
      setZoomTo(leipzigCoords);
    } else {
      setZoomTo(null);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      <main className="flex-grow flex flex-col items-center text-[#573A6F] px-6 pt-16 pb-20 relative">
        <h1 className="text-5xl font-bold mb-10 text-center">Fairy Preiskarte</h1>

        {/* Leaflet Map */}
        <div className="w-full max-w-5xl h-[500px] rounded-2xl shadow-lg border-2 border-[#D9B4EF] mb-12 overflow-hidden relative">
          <MapContainer
            center={[51.0, 10.0]}
            zoom={6}
            scrollWheelZoom={true}
            className="w-full h-full"
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {zoomTo && <MapZoom coords={zoomTo} />}
            <ChoroplethLayer />
          </MapContainer>
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
              onChange={handleZipChange}
              placeholder="z. B. 04109"
              className="w-full p-3 rounded border border-[#D9B4EF] bg-white text-[#573A6F] focus:outline-none focus:ring-2 focus:ring-[#D9B4EF]"
            />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
