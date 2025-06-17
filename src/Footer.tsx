import React from "react";
import { useNavigate } from "react-router-dom";
import {Upload, Sparkles } from "lucide-react";

export default function Footer() {
  const navigate = useNavigate();

  return (
    <>
      {/* Normal Footer */}
      <footer className="w-full bg-[#F2DAFF] text-[#573A6F] text-center py-4 text-sm space-y-1 mt-10">
    <p>© 2025 Fairy. Alle Rechte vorbehalten.</p>
    <p>Fairy GmbH, Fairyweg 12, 04109 Leipzig</p>
    <p>Handelsregister: HRB 123456 | Amtsgericht Leipzig</p>
    <p>USt-IdNr.: DE123456789</p>
    <p>
      <a href="/impressum" className="underline hover:text-purple-700">Impressum</a> |
      <a href="/datenschutz" className="underline hover:text-purple-700">Datenschutz</a>
    </p>
  </footer>

      {/* Sticky Footer with Icons */}
      <div className="fixed bottom-0 left-0 w-full bg-white border-t border-purple-200 flex justify-around items-center py-3 z-20">
        <button
          onClick={() => navigate('/UploadPhoto')}
          className="flex flex-col items-center text-[#573A6F]"
        >
          <Upload className="w-20 h-20" />
          <span className="text-3xl">Rechnung</span>
        </button>
        <button
          onClick={() => navigate('/ChatBot')}
          className="flex flex-col items-center text-[#573A6F]"
        >
          <Sparkles className="w-20 h-20" />
          <span className="text-3xl">KI-Assistent</span>
        </button>
      </div>
    </>
  );
}
