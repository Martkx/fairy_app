import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Upload, PartyPopper, Plus, BarChart2 } from "lucide-react";
import Header from "./Header";
import Footer from "./Footer";
import Tesseract from "tesseract.js";

export default function UploadPhoto() {
  const navigate = useNavigate();
  const [image, setImage] = useState(null);
  const [extractedData, setExtractedData] = useState({
    material: null,
    arbeit: null,
    wegzeit: null,
  });
  const [manualItems, setManualItems] = useState([]);
  const [points, setPoints] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  const fileInputRef = useRef();

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const url = URL.createObjectURL(e.target.files[0]);
      setImage(url);
      extractTextFromImage(url);
    }
  };

  const preprocessImage = (imageUrl) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);

        // Graustufen + Kontrast
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;
        for (let i = 0; i < data.length; i += 4) {
          const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
          const binarized = avg > 160 ? 255 : 0;
          data[i] = data[i + 1] = data[i + 2] = binarized;
        }
        ctx.putImageData(imageData, 0, 0);
        resolve(canvas.toDataURL("image/png"));
      };
      img.src = imageUrl;
    });
  };

  const extractTextFromImage = async (imageUrl) => {
    const processedImageUrl = await preprocessImage(imageUrl);

    Tesseract.recognize(processedImageUrl, "deu+eng", {
      logger: (m) => console.log(m),
    }).then(({ data: { text } }) => {
      console.log("OCR TEXT:\n", text);

      const materialMatch = text.match(/(Summe\s*)?Material(?:kosten)?[:\s]*([\d.,]+)\s*€/i);
      const arbeitMatch = text.match(/(Summe\s*)?Arbeit(?:skosten)?[:\s]*([\d.,]+)\s*€/i);
      const wegzeitMatch = text.match(/(Summe\s*)?Weg(?:zeit|kosten)?[:\s]*([\d.,]+)\s*€/i);

      const material = materialMatch ? parseFloat(materialMatch[2].replace(",", ".")) : 0;
      const arbeit = arbeitMatch ? parseFloat(arbeitMatch[2].replace(",", ".")) : 0;
      const wegzeit = wegzeitMatch ? parseFloat(wegzeitMatch[2].replace(",", ".")) : 0;

      const total = material + arbeit + wegzeit;

      setExtractedData({
        material: materialMatch ? materialMatch[2] + " €" : "Nicht gefunden",
        arbeit: arbeitMatch ? arbeitMatch[2] + " €" : "Nicht gefunden",
        wegzeit: wegzeitMatch ? wegzeitMatch[2] + " €" : "Nicht gefunden",
      });

      setPoints(Math.floor(total));
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 5000);
    });
  };

  const addManualItem = () => {
    setManualItems([...manualItems, { label: "", amount: "" }]);
  };

  const updateManualItem = (index, field, value) => {
    const updatedItems = [...manualItems];
    updatedItems[index][field] = value;
    setManualItems(updatedItems);
  };

  const startAnalysis = () => {
    const material = parseFloat((extractedData.material || "0").replace("€", "").replace(",", ".")) || 0;
    const arbeit = parseFloat((extractedData.arbeit || "0").replace("€", "").replace(",", ".")) || 0;
    const wegzeit = parseFloat((extractedData.wegzeit || "0").replace("€", "").replace(",", ".")) || 0;

    const versteckteKosten = manualItems.reduce((sum, item) => {
      const num = parseFloat(item.amount);
      return sum + (isNaN(num) ? 0 : num);
    }, 0);

    const total = material + arbeit + wegzeit + versteckteKosten;

    if (total === 0) {
      alert("Keine gültigen Daten vorhanden.");
      return;
    }

    const arbeitsPercent = Math.round((arbeit / total) * 100);
    const materialPercent = Math.round((material / total) * 100);
    const verstecktePercent = Math.round((versteckteKosten / total) * 100);

    const ideal = { arbeit: 30, material: 30, versteckt: 10 };
    const penalty =
      Math.abs(arbeitsPercent - ideal.arbeit) +
      Math.abs(materialPercent - ideal.material) +
      Math.max(0, verstecktePercent - ideal.versteckt);

    const score = Math.max(0, 1000 - penalty * 10);

    navigate("/FairyScorePage", {
      state: {
        analysisData: {
          score,
          arbeitskosten: arbeitsPercent,
          materialkosten: materialPercent,
          versteckteKosten: verstecktePercent,
        },
      },
    });
  };

  return (
    <div className="min-h-screen bg-[#f9f7fc] flex flex-col justify-between px-4 py-6 relative">
      <Header />
      <main className="flex-grow flex flex-col items-center space-y-8">
        <h1 className="text-3xl font-extrabold text-[#573A6F] text-center">
          Analysiere deine Rechnung
        </h1>
        <div className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-md space-y-6 border border-gray-200">
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
          />
          <button
            onClick={() => fileInputRef.current.click()}
            className="flex items-center gap-2 bg-[#573A6F] text-white px-6 py-3 rounded-lg hover:bg-purple-800 transition duration-300 text-lg font-medium"
          >
            <Upload className="w-5 h-5" />
            Dokument scannen oder hochladen
          </button>

          {image && (
            <div className="w-full">
              <img src={image} alt="Vorschau" className="w-full rounded-md shadow-md border border-gray-300" />
            </div>
          )}

          {(extractedData.material || extractedData.arbeit || extractedData.wegzeit) && (
            <div className="w-full text-left space-y-4">
              <h2 className="text-xl font-semibold text-gray-800">Erkannte Rechnungsdaten:</h2>
              <ul className="text-gray-700 space-y-1">
                <li><strong>Materialkosten:</strong> {extractedData.material}</li>
                <li><strong>Arbeitskosten:</strong> {extractedData.arbeit}</li>
                <li><strong>Wegzeit / Anfahrt:</strong> {extractedData.wegzeit}</li>
              </ul>

              <div className="mt-4 space-y-3">
                {manualItems.map((item, index) => (
                  <div key={index} className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Bezeichnung"
                      value={item.label}
                      onChange={(e) => updateManualItem(index, "label", e.target.value)}
                      className="w-1/2 border border-gray-300 rounded px-2 py-1"
                    />
                    <input
                      type="number"
                      placeholder="Betrag (€)"
                      value={item.amount}
                      onChange={(e) => updateManualItem(index, "amount", e.target.value)}
                      className="w-1/2 border border-gray-300 rounded px-2 py-1"
                    />
                  </div>
                ))}

                <button
                  onClick={addManualItem}
                  className="flex items-center text-[#573A6F] font-medium hover:underline"
                >
                  <Plus className="w-5 h-5 mr-1" /> Weitere Position hinzufügen
                </button>
              </div>

              <button
                onClick={startAnalysis}
                className="mt-6 w-full flex items-center justify-center gap-2 bg-[#573A6F] text-white px-4 py-3 rounded-lg hover:bg-[#3f2a52] transition"
              >
                <BarChart2 className="w-5 h-5" />
                Analyse starten
              </button>
            </div>
          )}
        </div>
      </main>

      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-2xl p-12 w-[90%] max-w-2xl text-center">
            <PartyPopper className="w-24 h-24 text-[#573A6F] mx-auto mb-6" />
            <h2 className="text-4xl font-bold text-[#573A6F]">
              Du hast dir {5} Fairy-Punkte gesichert!
            </h2>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
}
