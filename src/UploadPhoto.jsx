import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Camera, Upload, PartyPopper } from "lucide-react";
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
  const [points, setPoints] = useState(0);
  const [showPopup, setShowPopup] = useState(false);

  const fileInputRef = useRef();
  const videoRef = useRef();
  const canvasRef = useRef();

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const url = URL.createObjectURL(e.target.files[0]);
      setImage(url);
      extractTextFromImage(url);
    }
  };

  const startCamera = async () => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
    }
  };

  const capturePhoto = () => {
    const context = canvasRef.current.getContext("2d");
    context.drawImage(videoRef.current, 0, 0, 300, 200);
    const imageDataUrl = canvasRef.current.toDataURL("image/png");
    setImage(imageDataUrl);
    extractTextFromImage(imageDataUrl);
  };

  const extractTextFromImage = (imageUrl) => {
    Tesseract.recognize(imageUrl, "eng", {
      logger: (m) => console.log(m),
    }).then(({ data: { text } }) => {
      console.log("OCR TEXT:\n", text);

      const materialMatch = text.match(/Summe Material:\s*([\d.,]+)\s*€/i);
      const arbeitMatch = text.match(/Summe Arbeit:\s*([\d.,]+)\s*€/i);
      const wegzeitMatch = text.match(/Summe Wegzeit:\s*([\d.,]+)\s*€/i);

      const material = materialMatch ? parseFloat(materialMatch[1].replace(",", ".")) : 0;
      const arbeit = arbeitMatch ? parseFloat(arbeitMatch[1].replace(",", ".")) : 0;
      const wegzeit = wegzeitMatch ? parseFloat(wegzeitMatch[1].replace(",", ".")) : 0;

      const total = material + arbeit + wegzeit;
      const fairyPoints = Math.floor(total); // 1 Punkt pro vollem Euro

      setExtractedData({
        material: materialMatch ? materialMatch[1] + " €" : "Nicht gefunden",
        arbeit: arbeitMatch ? arbeitMatch[1] + " €" : "Nicht gefunden",
        wegzeit: wegzeitMatch ? wegzeitMatch[1] + " €" : "Nicht gefunden",
      });

      setPoints(5);
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 5000);
    });
  };

  return (
    <div className="min-h-screen bg-[#ffffff] flex flex-col justify-between px-0 space-y-6 relative">
      <Header />

      <main className="flex-grow flex flex-col items-center space-y-6">
        <h1 className="text-2xl font-bold text-purple-900">
          Rechnungsfoto hochladen oder aufnehmen
        </h1>

        <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-md space-y-4 flex flex-col items-center">
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
          />
          <button
            onClick={() => fileInputRef.current.click()}
            className="bg-[#573A6F] text-white px-4 py-2 rounded-md hover:bg-purple-800"
          >
            Foto hochladen
          </button>

          <button
            onClick={startCamera}
            className="bg-[#573A6F] text-white px-4 py-2 rounded-md hover:bg-purple-800"
          >
            Kamera starten
          </button>

          <video ref={videoRef} autoPlay playsInline className="w-full max-w-xs rounded-md" />

          <button
            onClick={capturePhoto}
            className="bg-[#573A6F] text-white px-4 py-2 rounded-md hover:bg-purple-800"
          >
            Foto aufnehmen
          </button>

          <canvas ref={canvasRef} width="300" height="200" className="hidden" />

          {image && (
            <div className="mt-4 w-full">
              <img src={image} alt="Vorschau" className="w-full rounded-md shadow" />
            </div>
          )}

          {(extractedData.material || extractedData.arbeit || extractedData.wegzeit) && (
            <div className="mt-6 text-left w-full">
              <h2 className="text-lg font-semibold mb-2 text-gray-800">Erkannte Rechnungsdaten:</h2>
              <ul className="text-gray-700 space-y-1">
                <li><strong>Materialkosten:</strong> {extractedData.material}</li>
                <li><strong>Arbeitskosten:</strong> {extractedData.arbeit}</li>
                <li><strong>Wegzeit / Anfahrt:</strong> {extractedData.wegzeit}</li>
              </ul>
            </div>
          )}
        </div>
      </main>

      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-2xl p-12 w-[90%] max-w-2xl text-center">
            <PartyPopper className="w-24 h-24 text-[#573A6F] mx-auto mb-6" />
            <h2 className="text-4xl font-bold text-[#573A6F]">
              Du hast dir {points} Fairy-Punkte gesichert!
            </h2>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
