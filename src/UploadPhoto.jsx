import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Upload, PartyPopper, Plus, BarChart2 } from "lucide-react";
import Header from "./Header";
import Footer from "./Footer";
import Tesseract from "tesseract.js";

const USE_MOCK_DATA = true; // <<< Mock-Modus aktivieren/deaktivieren

export default function UploadPhoto() {
  const navigate = useNavigate();
  const [image, setImage] = useState(null);
  const [ocrText, setOcrText] = useState("");
  const [extractedData, setExtractedData] = useState({
    material: null,
    arbeit: null,
    wegzeit: null,
  });
  const [manualItems, setManualItems] = useState([]);
  const [points, setPoints] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
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
        const MAX_WIDTH = 1000;
        const scale = Math.min(1, MAX_WIDTH / img.width);

        const canvas = document.createElement("canvas");
        canvas.width = img.width * scale;
        canvas.height = img.height * scale;

        const ctx = canvas.getContext("2d");
        ctx.scale(scale, scale);
        ctx.drawImage(img, 0, 0);

        resolve(canvas.toDataURL("image/png"));
      };
      img.src = imageUrl;
    });
  };

  const extractTextFromImage = async (imageUrl) => {
    setIsLoading(true);

    if (USE_MOCK_DATA) {
      // Mock-Analyse simulieren (3 Sekunden warten)
      await new Promise((resolve) => setTimeout(resolve, 3000));

      const mockMaterial = 1199.90;
      const mockArbeit = 624.95;
      const mockWegzeit = 59.50;

      setExtractedData({
        material: `${mockMaterial.toFixed(2)} €`,
        arbeit: `${mockArbeit.toFixed(2)} €`,
        wegzeit: `${mockWegzeit.toFixed(2)} €`,
      });

      const total = mockMaterial + mockArbeit + mockWegzeit;
      setPoints(Math.floor(total));
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 5000);
      setIsLoading(false);
      return;
    }

    const processedImageUrl = await preprocessImage(imageUrl);

    Tesseract.recognize(processedImageUrl, "deu+eng", {
      logger: (m) => console.log(m),
    })
      .then(({ data: { text } }) => {
        setOcrText(text);

        const materialMatch = text.match(/Summe\s*Material(?:kosten)?\s*[:\-]?\s*([\d.,]+)\s*€/i);
        const arbeitMatch = text.match(/Summe\s*Arbeit(?:skosten)?\s*[:\-]?\s*([\d.,]+)\s*€/i);
        const wegzeitMatch = text.match(/Summe\s*Weg(?:zeit|kosten)?\s*[:\-]?\s*([\d.,]+)\s*€/i);

        const material = materialMatch ? parseFloat(materialMatch[1].replace(",", ".")) : 0;
        const arbeit = arbeitMatch ? parseFloat(arbeitMatch[1].replace(",", ".")) : 0;
        const wegzeit = wegzeitMatch ? parseFloat(wegzeitMatch[1].replace(",", ".")) : 0;

        const total = material + arbeit + wegzeit;

        setExtractedData({
          material: materialMatch ? materialMatch[1] + " €" : "Nicht gefunden",
          arbeit: arbeitMatch ? arbeitMatch[1] + " €" : "Nicht gefunden",
          wegzeit: wegzeitMatch ? wegzeitMatch[1] + " €" : "Nicht gefunden",
        });

        setPoints(Math.floor(total));
        setShowPopup(true);
        setTimeout(() => setShowPopup(false), 5000);
      })
      .catch((error) => {
        console.error("OCR Fehler:", error);
      })
      .finally(() => {
        setIsLoading(false);
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

    const sonstigeItems = manualItems
      .filter((item) => item.amount && !isNaN(parseFloat(item.amount)))
      .map((item) => ({
        label: item.label || "Sonstige Kosten",
        amount: parseFloat(item.amount),
      }));

    const sonstigeSum = sonstigeItems.reduce((sum, item) => sum + item.amount, 0);
    const total = material + arbeit + wegzeit + sonstigeSum;

    if (total === 0) {
      alert("Keine gültigen Daten vorhanden.");
      return;
    }

    const arbeitsPercent = Math.round((arbeit / total) * 100);
    const materialPercent = Math.round((material / total) * 100);
    const anfahrtsPercent = Math.round((wegzeit / total) * 100);

    const penalty = Math.abs(arbeitsPercent - 30) + Math.abs(materialPercent - 30);

    const analysisData = {
      score: Math.max(0, 1000 - penalty * 10),
      arbeitskosten: arbeitsPercent,
      arbeitskostenEuro: arbeit,
      materialkosten: materialPercent,
      materialkostenEuro: material,
      anfahrtskosten: anfahrtsPercent,
      anfahrtskostenEuro: wegzeit,
      sonstigeKosten: sonstigeItems.map(item => ({
        label: item.label,
        amount: item.amount,
        percent: Math.round((item.amount / total) * 100),
      })),
    };

    navigate("/FairyScorePage", { state: { analysisData } });
  };

  return (
    <div className="min-h-screen bg-[#f9f7fc] flex flex-col justify-between px-4 py-6 relative">
      <Header />
      <main className="flex-grow flex flex-col items-center space-y-10">
        <h1 className="text-4xl font-extrabold text-[#573A6F] mt-8 text-center">
          Analysiere deine Rechnung
        </h1>

        <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-3xl space-y-8 border border-gray-200 text-lg">
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
          />
          <div className="flex justify-center">
            <button
              onClick={() => fileInputRef.current.click()}
              className="flex items-center gap-3 bg-[#573A6F] text-white px-6 py-4 rounded-lg hover:bg-purple-800 transition duration-300 text-3xl font-semibold"
            >
              <Upload className="w-6 h-6" />
              Dokument scannen oder hochladen
            </button>
          </div>

          {image && (
            <div className="w-full">
              <img
                src={image}
                alt="Vorschau"
                className="w-full rounded-md shadow-md border border-gray-300"
              />
            </div>
          )}

          {(extractedData.material || extractedData.arbeit || extractedData.wegzeit) && (
            <div className="w-full text-left space-y-6">
              <h2 className="text-3xl font-semibold text-gray-800">
                Erkannte Rechnungsdaten:
              </h2>
              <ul className="text-gray-700 space-y-2 text-2xl">
                <li><strong>Materialkosten:</strong> {extractedData.material}</li>
                <li><strong>Arbeitskosten:</strong> {extractedData.arbeit}</li>
                <li><strong>Wegzeit / Anfahrt:</strong> {extractedData.wegzeit}</li>
              </ul>

              <div className="space-y-4">
                {manualItems.map((item, index) => (
                  <div key={index} className="flex gap-3">
                    <input
                      type="text"
                      placeholder="Bezeichnung"
                      value={item.label}
                      onChange={(e) => updateManualItem(index, "label", e.target.value)}
                      className="w-1/2 border border-gray-300 rounded px-3 py-2"
                    />
                    <input
                      type="number"
                      placeholder="Betrag (€)"
                      value={item.amount}
                      onChange={(e) => updateManualItem(index, "amount", e.target.value)}
                      className="w-1/2 border border-gray-300 rounded px-3 py-2"
                    />
                  </div>
                ))}

                <button
                  onClick={addManualItem}
                  className="flex items-center text-[#573A6F] font-medium hover:underline text-xl"
                >
                  <Plus className="w-5 h-5 mr-1" /> Weitere Position hinzufügen
                </button>
              </div>

              <button
                onClick={startAnalysis}
                className="mt-6 w-full flex items-center justify-center gap-3 bg-[#573A6F] text-white px-5 py-4 rounded-lg hover:bg-[#3f2a52] transition text-3xl font-semibold"
              >
                <BarChart2 className="w-6 h-6" />
                Analyse starten
              </button>
            </div>
          )}
        </div>
      </main>

      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="flex flex-col items-center space-y-6">
            <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-b-4 border-[#573A6F]"></div>
            <div className="text-white text-4xl font-medium">Dokument wird gescannt...</div>
          </div>
        </div>
      )}

      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-2xl p-12 w-[90%] max-w-2xl text-center">
            <PartyPopper className="w-24 h-24 text-[#573A6F] mx-auto mb-6" />
            <h2 className="text-4xl font-bold text-[#573A6F]">
              Du hast dir {20} Fairy-Punkte gesichert!
            </h2>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
}
