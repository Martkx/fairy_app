import React from "react";
import { useNavigate } from "react-router-dom";
import { Camera, Upload } from "lucide-react";

export default function Footer() {
  const navigate = useNavigate();

  return (
    <>
      {/* Normal Footer */}
      <footer className="w-full bg-purple-200 text-purple-900 text-center py-2">
        <p className="text-sm">© 2025 Fairy. Alle Rechte vorbehalten.</p>
      </footer>

      {/* Sticky Footer with Icons */}
      <div className="fixed bottom-0 left-0 w-full bg-white border-t border-purple-200 flex justify-around items-center py-3 z-20">
        <button
          onClick={() => navigate('/upload-photo')}
          className="flex flex-col items-center text-purple-800"
        >
          <Upload className="w-6 h-6" />
          <span className="text-xs">Rechnung</span>
        </button>
        <button
          onClick={() => navigate('/ChatBot')}
          className="flex flex-col items-center text-purple-800"
        >
          <Camera className="w-6 h-6" />
          <span className="text-xs">KI-Assistent</span>
        </button>
      </div>
    </>
  );
}
