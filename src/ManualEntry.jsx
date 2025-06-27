import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import { PartyPopper, BarChart2, Plus } from "lucide-react";

export default function ManualInvoiceEntry() {
  const navigate = useNavigate();
  const [laborCost, setLaborCost] = useState("");
  const [materialCost, setMaterialCost] = useState("");
  const [travelCost, setTravelCost] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [profession, setProfession] = useState("");
  const [manualItems, setManualItems] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [analysisReady, setAnalysisReady] = useState(false); // NEU

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowPopup(true);
    setAnalysisReady(true); // Analyse-Button sichtbar machen
    setTimeout(() => setShowPopup(false), 5000); // Pop-up nach 5 Sekunden schließen
  };

  const startAnalysis = () => {
    const arbeits = parseFloat(laborCost) || 0;
    const material = parseFloat(materialCost) || 0;
    const travel = parseFloat(travelCost) || 0;
  
    const sonstigeItems = manualItems
      .filter((item) => item.amount && !isNaN(parseFloat(item.amount)))
      .map((item) => ({
        label: item.label || "Sonstige Kosten",
        amount: parseFloat(item.amount),
      }));
  
    const extrasSum = sonstigeItems.reduce((sum, item) => sum + item.amount, 0);
    const total = arbeits + material + travel + extrasSum;
  
    if (total === 0) {
      alert("Bitte geben Sie gültige Werte ein.");
      return;
    }
  
    const analysisData = {
      score: Math.max(0, 1000 -
        Math.abs((arbeits / total) * 100 - 30) -
        Math.abs((material / total) * 100 - 30)),
  
      arbeitskosten: Math.round((arbeits / total) * 100),
      arbeitskostenEuro: arbeits,
  
      materialkosten: Math.round((material / total) * 100),
      materialkostenEuro: material,
  
      anfahrtskosten: Math.round((travel / total) * 100),
      anfahrtskostenEuro: travel,
  
      sonstigeKosten: sonstigeItems.map(item => ({
        label: item.label,
        amount: item.amount,
        percent: Math.round((item.amount / total) * 100),
      })),
    };
  
    navigate("/FairyScorePage", { state: { analysisData } });
  };
  

  const addManualItem = () => {
    setManualItems([...manualItems, { label: "", amount: "" }]);
  };

  const updateManualItem = (index, field, value) => {
    const updatedItems = [...manualItems];
    updatedItems[index][field] = value;
    setManualItems(updatedItems);
  };

  return (
    <div className="min-h-screen bg-[#f9f7fc] flex flex-col justify-between px-4 pt-4 relative">
      <Header />

      <main className="flex-grow flex flex-col items-center space-y-10">
        <h1 className="text-4xl font-extrabold text-[#573A6F] mt-8 text-center">
          Rechnungsdaten manuell eingeben
        </h1>

        <div className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-3xl space-y-6 border border-gray-200 text-lg">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-3xl font-medium text-[#573A6F]">Arbeitskosten (€)</label>
              <input
                type="number"
                value={laborCost}
                onChange={(e) => setLaborCost(e.target.value)}
                className="mt-1 w-full border border-purple-300 rounded-md p-2"
                required
              />
            </div>

            <div>
              <label className="block text-3xl font-medium text-[#573A6F]">Materialkosten (€)</label>
              <input
                type="number"
                value={materialCost}
                onChange={(e) => setMaterialCost(e.target.value)}
                className="mt-1 w-full border border-purple-300 rounded-md p-2"
                required
              />
            </div>

            <div>
              <label className="block text-3xl font-medium text-[#573A6F]">Anfahrtskosten (€)</label>
              <input
                type="number"
                value={travelCost}
                onChange={(e) => setTravelCost(e.target.value)}
                className="mt-1 w-full border border-purple-300 rounded-md p-2"
              />
            </div>

            <div>
              <label className="block text-3xl font-medium text-[#573A6F]">Postleitzahl</label>
              <input
                type="text"
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
                className="mt-1 w-full border border-purple-300 rounded-md p-2"
                required
              />
            </div>

            <div>
              <label className="block text-3xl font-medium text-[#573A6F]">Handwerkerrichtung</label>
              <select
                value={profession}
                onChange={(e) => setProfession(e.target.value)}
                className="mt-1 w-full border text-[#573A6F] border-purple-300 rounded-md p-2 text-xl"
                required
              >
                <option value="">Bitte wählen...</option>
                <option value="Gärtner">Gärtner</option>
                <option value="Elektriker">Elektriker</option>
                <option value="Dachdecker">Dachdecker</option>
                <option value="Maler">Maler</option>
                <option value="Fliesenleger">Fliesenleger</option>
                <option value="Installateur">Installateur</option>
                <option value="Tischler">Tischler</option>
                <option value="Heizungsbauer">Heizungsbauer</option>
                <option value="Bodenleger">Bodenleger</option>
                <option value="Trockenbauer">Trockenbauer</option>
              </select>
            </div>

            {manualItems.map((item, index) => (
              <div key={index} className="flex gap-2">
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
              type="button"
              onClick={addManualItem}
              className="flex items-center text-[#573A6F] font-medium hover:underline text-xl"
            >
              <Plus className="w-5 h-5 mr-1" /> Weitere Position hinzufügen
            </button>

            <button
              type="submit"
              className="w-full bg-[#573A6F] text-white font-semibold py-2 rounded-md hover:bg-purple-800 text-3xl"
            >
              Daten speichern
            </button>

            {analysisReady && (
              <button
                type="button"
                onClick={startAnalysis}
                className="mt-4 w-full flex items-center justify-center gap-3 bg-[#573A6F] text-white px-5 py-3 rounded-lg hover:bg-[#3f2a52] transition text-3xl font-semibold"
              >
                <BarChart2 className="w-5 h-5" /> Analyse starten
              </button>
            )}
          </form>
        </div>
      </main>

      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-2xl p-12 w-[90%] max-w-2xl text-center">
            <PartyPopper className="w-24 h-24 text-[#573A6F] mx-auto mb-6" />
            <h2 className="text-4xl font-bold text-[#573A6F]">
              Du hast dir 165 Fairy-Punkte gesichert!
            </h2>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
