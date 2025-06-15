import React from "react";
import Header from "./Header";
import { Camera, Upload } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function UploadData() {
  const navigate = useNavigate();

  const handleManual = () => navigate("/manual-entry");
  const handleUpload = () => navigate("/upload-photo");

  return (
    <div className="min-h-screen bg-[#ffffff] flex flex-col justify-between px-0 space-y-6 relative">
      {/* Header */}
      <Header />

      {/* Auswahlbereich */}
      <div className="flex flex-col space-y-6 w-full max-w-md mt-8">
        {/* Überschrift */}
        <h2 className="text-2xl font-bold text-purple-900 text-center">Wie möchtest du deine Daten eingeben?</h2>

        {/* Manuelle Eingabe */}
        <div
          onClick={handleManual}
          className="bg-white rounded-2xl shadow-md p-6 flex flex-col items-center cursor-pointer hover:shadow-xl transition duration-200"
        >
          <img src="/manual_entry.png" alt="Manuell eingeben" className="w-32 h-32 object-contain mb-4" />
          <h2 className="text-xl font-semibold text-purple-800">Manuell eingeben</h2>
          <p className="text-sm text-gray-600 text-center mt-1">Trage Rechnungsdaten selbst ein</p>
        </div>

        {/* Foto hochladen oder aufnehmen */}
        <div
          onClick={handleUpload}
          className="bg-white rounded-2xl shadow-md p-6 flex flex-col items-center cursor-pointer hover:shadow-xl transition duration-200"
        >
          <img src="/upload_camera.png" alt="Foto machen oder hochladen" className="w-32 h-32 object-contain mb-4" />
          <h2 className="text-xl font-semibold text-purple-800">Foto machen oder hochladen</h2>
          <p className="text-sm text-gray-600 text-center mt-1">Lade ein Bild deiner Rechnung hoch oder nutze die Kamera</p>
        </div>
      </div>
    </div>
  );
}
