import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";

export default function RewardsPage() {
  const totalPoints = 860;
  const invoices = [
    { date: "12.06.2025", description: "Rechnung von Malerbetrieb Müller", points: 120 },
    { date: "05.06.2025", description: "Rechnung von Gärtner Schmidt", points: 80 },
    { date: "30.05.2025", description: "Rechnung von Elektriker Lichtblick", points: 150 },
    { date: "15.05.2025", description: "Rechnung von Fliesenleger BauFix", points: 110 },
    { date: "01.05.2025", description: "Rechnung von Dachdecker Sturm", points: 100 },
    { date: "20.04.2025", description: "Rechnung von Heizungsbauer WärmePro", points: 300 },
  ];

  const [selectedReward, setSelectedReward] = useState(null);

  const rewards = [
    { id: 1, name: "Amazon", image: "/amazon.jpg" },
    { id: 2, name: "IKEA", image: "/ikea.jpg" },
    { id: 3, name: "Bauhaus", image: "/snipes.jpeg" },
    { id: 4, name: "MediaMarkt", image: "/mediamarkt.png" },
    { id: 5, name: "Rewe", image: "/rewe.jpg" },
    { id: 6, name: "OBI", image: "/hornbach.jpg" },
  ];

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />

      <main className="flex flex-col px-6 pt-8 pb-24 flex-grow">
        <h1 className="text-4xl font-bold text-[#573A6F] text-center mb-4">
          Deine Fairy-Points
        </h1>

        <div className="bg-purple-100 text-[#573A6F] rounded-xl p-6 text-center shadow mb-6">
          <p className="text-3xl font-medium">Gesamtpunkte:</p>
          <p className="text-5xl font-bold mt-2">{totalPoints}</p>
          <p className="mt-2 text-xl">Löse deine Punkte gegen Gutscheine ein!</p>
        </div>

        <h2 className="text-3xl font-semibold text-[#573A6F] mb-4">Scans & Punkteverlauf</h2>

        <div className="space-y-4 mb-10">
          {invoices.map((item, index) => (
            <div
              key={index}
              className="flex justify-between items-center bg-purple-50 rounded-lg p-4 shadow-sm"
            >
              <div>
                <p className="text-xl font-semibold text-[#573A6F]">{item.description}</p>
                <p className="text-xl text-gray-600">{item.date}</p>
              </div>
              <p className="text-xl font-bold text-[#573A6F]">+{item.points} Punkte</p>
            </div>
          ))}
        </div>

        {/* Neue Sektion: Punkte einlösen */}
        <div className="bg-purple-50 rounded-xl p-6 shadow">
          <h2 className="text-3xl font-semibold text-[#573A6F] mb-6">Jetzt Punkte einlösen</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
            {rewards.map((reward) => (
              <div
                key={reward.id}
                onClick={() => setSelectedReward(reward.id)}
                className={`cursor-pointer rounded-xl border-4 transition ${
                  selectedReward === reward.id
                    ? "border-[#573A6F] shadow-lg"
                    : "border-transparent"
                }`}
              >
                <img
                  src={reward.image}
                  alt={reward.name}
                  className="w-full h-40 object-contain bg-white p-4 rounded-lg"
                />
                <p className="text-center text-xl font-semibold mt-2 text-[#573A6F]">
                  {reward.name}
                </p>
              </div>
            ))}
          </div>

          <button
            disabled={!selectedReward}
            className={`w-full py-3 text-white text-xl font-bold rounded-xl transition ${
              selectedReward
                ? "bg-[#573A6F] hover:bg-[#6e4b8f]"
                : "bg-gray-400 cursor-not-allowed"
            }`}
          >
            Fortfahren
          </button>
        </div>
      </main>

      <Footer />
    </div>
  );
}
