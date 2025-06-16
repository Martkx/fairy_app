import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import { PartyPopper } from "lucide-react";

export default function ManualInvoiceEntry() {
  const navigate = useNavigate();
  const [laborCost, setLaborCost] = useState("");
  const [materialCost, setMaterialCost] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [profession, setProfession] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 5000);
  };

  return (
    <div className="min-h-screen bg-[#ffffff] flex flex-col items-center px-4 pt-4 relative">
      {/* Header */}
      <Header />

      {/* Centered Content */}
      <div className="w-full max-w-md text-center mt-6 space-y-6">
        <h1 className="text-3xl font-bold text-[#573A6F]">
          Rechnungsdaten manuell eingeben
        </h1>

        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-xl shadow-md space-y-4 text-left"
        >
          <div>
            <label className="block text-xl font-medium text-[#573A6F]">
              Arbeitskosten (€)
            </label>
            <input
              type="number"
              value={laborCost}
              onChange={(e) => setLaborCost(e.target.value)}
              className="mt-1 w-full border border-purple-300 rounded-md p-2"
              required
            />
          </div>

          <div>
            <label className="block text-xl font-medium text-[#573A6F]">
              Materialkosten (€)
            </label>
            <input
              type="number"
              value={materialCost}
              onChange={(e) => setMaterialCost(e.target.value)}
              className="mt-1 w-full border border-purple-300 rounded-md p-2"
              required
            />
          </div>

          <div>
            <label className="block text-xl font-medium text-[#573A6F]">
              Postleitzahl
            </label>
            <input
              type="text"
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
              className="mt-1 w-full border border-purple-300 rounded-md p-2"
              required
            />
          </div>

          <div>
            <label className="block text-xl font-medium text-[#573A6F]">
              Handwerkerrichtung
            </label>
            <select
              value={profession}
              onChange={(e) => setProfession(e.target.value)}
              className="mt-1 w-full border text-[#573A6F] border-purple-300 rounded-md p-2"
              required
            >
              <option value="">Bitte wählen...</option>
              <option value="Maler">Maler</option>
              <option value="Fliesenleger">Fliesenleger</option>
              <option value="Gärtner">Gärtner</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-[#573A6F] text-white font-semibold py-2 rounded-md hover:bg-purple-800"
          >
            Daten speichern
          </button>
        </form>
      </div>

      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-2xl p-12 w-[90%] max-w-2xl text-center">
            <PartyPopper className="w-24 h-24 text-[#573A6F] mx-auto mb-6" />
            <h2 className="text-4xl font-bold text-[#573A6F]">Du hast dir 165 Fairy-Punkte gesichert!</h2>
          </div>
        </div>
      )}

      {/* Normal Footer */}
      <Footer />
    </div>
  );
}
