import React, { useEffect, useState, useMemo } from "react";
import { MapContainer, TileLayer, GeoJSON, useMap } from "react-leaflet";
import Header from "./Header";
import Footer from "./Footer";
import "leaflet/dist/leaflet.css";
import zipGeoJSON from "./data/2_hoch.geo.json";
import plzCoords from "./data/plz_coords.json";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

// === Datenquellen ===
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

const expensiveCities = [
  "München",
  "Frankfurt am Main",
  "Stuttgart",
  "Freiburg",
  "Heidelberg",
  "Düsseldorf",
  "Mainz",
  "Wiesbaden",
  "Hamburg",
  "Berlin",
  "Köln",
  "Erlangen",
  "Ingolstadt",
  "Regensburg",
  "Augsburg",
];

// === Farbregelung ===
function getColor(feature, selectedCraft) {
  const type = feature.properties.ENGTYPE_3;
  const city = feature.properties.NAME_3;
  let value = 600;

  if (selectedCraft) {
    if (city === "Leipzig Städte") {
      value = 1000;
    }else if (city === "Frankfurt am Main Städte") {
      value = 2000;
    }else if (city === "Hamburg Städte") {
      value = 2000;
    }else if (city === "Cologne Städte") {
      value = 2000;
    }else if (city === "Stuttgart Städte") {
      value = 2000;
    }else if (city === "Düsseldorf Städte") {
      value = 2000;
    } else if (expensiveCities.includes(city)) {
      value = 2000;
    } else if (type === "Urban District") {
      value = 1050 + Math.floor(Math.random() * 150);
    } else if (type === "Rural District") {
      value = 700 + Math.floor(Math.random() * 200);
    } else {
      value = 500 + Math.floor(Math.random() * 150);
    }
  }

  return value > 1700
    ? "#650016"
    : value > 1100
    ? "#b10026"
    : value > 1000
    ? "#b13300"
    : value > 950
    ? "#e31a1c"
    : value > 750
    ? "#fd8d3c"
    : value > 600
    ? "#fecc5c"
    : "#ffffb2";
}

// === Choropleth-Layer (Memoisiert) ===
const ChoroplethLayer = React.memo(function ChoroplethLayer({ selectedCraft }) {
  const style = useMemo(() => {
    return (feature) => ({
      fillColor: getColor(feature, selectedCraft),
      weight: 1,
      opacity: 1,
      color: "#999",
      fillOpacity: 0.7,
    });
  }, [selectedCraft]);

  return <GeoJSON data={zipGeoJSON} style={style} />;
});

// === Karten-Zoom bei Koordinaten ===
function MapZoom({ coords }) {
  const map = useMap();
  useEffect(() => {
    if (coords) {
      map.setView(coords, 13);
    }
  }, [coords, map]);
  return null;
}

// === Hauptkomponente ===
export default function CraftsmanHeatmapPage() {
  const [selectedCraft, setSelectedCraft] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [zoomTo, setZoomTo] = useState(null);
  const navigate = useNavigate();

  const handleZipChange = (e) => {
    setZipCode(e.target.value);
  };

  const handleZipSearch = () => {
    const found = plzCoords.find((entry) => entry.plz === zipCode);
    if (found) {
      setZoomTo([found.lat, found.lng]);
    } else {
      alert("Postleitzahl nicht gefunden.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      <main className="flex-grow flex flex-col items-center text-[#573A6F] px-6 pt-16 pb-20 relative">
        {/* Zurück-Button */}
        <button
          onClick={() => navigate(-1)}
          className="self-start flex items-center text-[#573A6F] font-semibold hover:underline text-3xl"
        >
          <ArrowLeft className="mr-2" /> Zurück
        </button>
        <h1 className="text-4xl font-bold mb-10 text-center">Fairy Preiskarte</h1>

        {/* Karte */}
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
            <ChoroplethLayer selectedCraft={selectedCraft} />
          </MapContainer>
        </div>

        {/* Eingabeformular */}
        <div className="w-full max-w-2xl bg-[#F9F4FB] p-6 rounded-xl shadow space-y-6">
          <div>
            <label className="block mb-2 text-3xl font-semibold">Wähle einen Handwerker</label>
            <select
              value={selectedCraft}
              onChange={(e) => setSelectedCraft(e.target.value)}
              className="w-full p-3 rounded border border-[#D9B4EF] bg-white text-[#573A6F] focus:outline-none focus:ring-2 focus:ring-[#D9B4EF] text-xl"
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
            <label className="block mb-2 text-3xl font-semibold">Postleitzahl eingeben</label>
            <input
              type="text"
              value={zipCode}
              onChange={handleZipChange}
              placeholder="z. B. 04109"
              className="w-full p-3 text-xl rounded border border-[#D9B4EF] bg-white text-[#573A6F] focus:outline-none focus:ring-2 focus:ring-[#D9B4EF]"
            />
            <button
              onClick={handleZipSearch}
              className="mt-3 px-5 py-2 bg-[#573A6F] text-white font-semibold rounded hover:bg-[#c49adc] transition"
            >
              Suchen
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
