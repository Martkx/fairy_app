import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";

export default function UploadData() {
  const navigate = useNavigate();

  const handleManual = () => navigate("/ManualInvoiceEntry");
  const handleUpload = () => navigate("/UploadPhoto");

  return (
    <div className="min-h-screen bg-[#ffffff] flex flex-col justify-between px-0 relative">
      {/* Header */}
      <Header />

      {/* Auswahlbereich */}
      <div className="flex flex-col items-center space-y-6 w-full max-w-md self-center mt-8">
        {/* Überschrift */}
        <h2 className="text-2xl font-bold text-[#573A6F] text-center">
          Wie möchtest du deine Daten eingeben?
        </h2>

        {/* Manuelle Eingabe */}
        <div
          onClick={handleManual}
          className="w-80 bg-white rounded-2xl shadow-md p-6 flex flex-col items-center cursor-pointer hover:shadow-xl transition duration-200"
        >
          <img
            src="/notebook-pen.svg"
            alt="Manuell eingeben"
            className="w-32 h-32 object-contain mb-4"
          />
          <h2 className="text-xl font-semibold text-[#573A6F]">Manuell eingeben</h2>
          <p className="text-sm text-[#573A6F] text-center mt-1">
            Trage Rechnungsdaten selbst ein
          </p>
        </div>

        {/* Foto hochladen oder aufnehmen */}
        <div
          onClick={handleUpload}
          className="w-80 bg-white rounded-2xl shadow-md p-6 flex flex-col items-center cursor-pointer hover:shadow-xl transition duration-200 "
        >
          <img
            src="/fullscreen.svg"
            alt="Foto machen oder hochladen"
            className="w-32 h-32 object-contain mb-4"
          />
          <h2 className="text-xl font-semibold text-[#573A6F]">Foto machen oder hochladen</h2>
          <p className="text-sm text-[#573A6F] text-center mt-1">
            Lade ein Bild deiner Rechnung hoch oder nutze die Kamera
          </p>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
