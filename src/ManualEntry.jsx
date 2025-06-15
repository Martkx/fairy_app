import React, { useState } from "react";
import { Camera, Upload } from "lucide-react";
import { useNavigate } from "react-router-dom";

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
    <div className="min-h-screen bg-purple-100 flex flex-col items-center p-6 space-y-6">
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

      <h1 className="text-2xl font-bold text-purple-900">Rechnungsdaten manuell eingeben</h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow-md w-full max-w-md space-y-4"
      >
        <div>
          <label className="block text-sm font-medium text-purple-800">Arbeitskosten (€)</label>
          <input
            type="number"
            value={laborCost}
            onChange={(e) => setLaborCost(e.target.value)}
            className="mt-1 w-full border border-purple-300 rounded-md p-2"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-purple-800">Materialkosten (€)</label>
          <input
            type="number"
            value={materialCost}
            onChange={(e) => setMaterialCost(e.target.value)}
            className="mt-1 w-full border border-purple-300 rounded-md p-2"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-purple-800">Postleitzahl</label>
          <input
            type="text"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
            className="mt-1 w-full border border-purple-300 rounded-md p-2"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-purple-800">Handwerkerrichtung</label>
          <select
            value={profession}
            onChange={(e) => setProfession(e.target.value)}
            className="mt-1 w-full border border-purple-300 rounded-md p-2"
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
          className="w-full bg-purple-700 text-white font-semibold py-2 rounded-md hover:bg-purple-800"
        >
          Daten speichern
        </button>
      </form>
    </div>
  );
}
