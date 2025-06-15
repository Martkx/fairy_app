import React from "react";
import { Camera, Upload } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function UploadData() {
  const navigate = useNavigate();

  const handleManual = () => navigate("/manual-entry");
  const handleUpload = () => navigate("/upload-photo");

  return (
    <div className="min-h-screen bg-purple-100 flex flex-col items-center p-4 space-y-6">
      {/* Header */}
      <header className="w-full flex items-center justify-between px-4 py-2 bg-purple-200 rounded-xl">
        <div className="flex items-center space-x-4">
          <div className="space-y-1">
            <div className="w-6 h-1 bg-white rounded"></div>
            <div className="w-6 h-1 bg-white rounded"></div>
            <div className="w-6 h-1 bg-white rounded"></div>
          </div>
          <img
            src="/user.png"
            alt="User"
            className="w-10 h-10 rounded-full object-cover cursor-pointer"
            onClick={() => navigate('/profile')}
          />
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
