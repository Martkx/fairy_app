import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

export default function ManualInvoiceEntry() {
  const navigate = useNavigate();
  const [laborCost, setLaborCost] = useState("");
  const [materialCost, setMaterialCost] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [profession, setProfession] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ laborCost, materialCost, postalCode, profession });
  };

  return (
    <div className="min-h-screen bg-[#ffffff] flex flex-col items-center px-4 pt-4">
      {/* Header */}
      <Header />

      {/* Centered Content */}
      <div className="w-full max-w-md text-center mt-6 space-y-6">
        <h1 className="text-2xl font-bold text-[#573A6F]">
          Rechnungsdaten manuell eingeben
        </h1>

        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-xl shadow-md space-y-4 text-left"
        >
          <div>
            <label className="block text-sm font-medium text-[#573A6F]">
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
            <label className="block text-sm font-medium text-[#573A6F]">
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
            <label className="block text-sm font-medium text-[#573A6F]">
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
            <label className="block text-sm font-medium text-[#573A6F]">
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
      {/* Normal Footer */}
        <Footer/>
    </div>
  );
}
