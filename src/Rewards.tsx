import React from "react";
import Header from "./Header";
import Footer from "./Footer";

export default function RewardsPage() {
  const totalPoints = 860; // Beispielwert, könnte später dynamisch sein
  const invoices = [
    { date: "12.06.2025", description: "Rechnung von Malerbetrieb Müller", points: 120 },
    { date: "05.06.2025", description: "Rechnung von Gärtner Schmidt", points: 80 },
    { date: "30.05.2025", description: "Rechnung von Elektriker Lichtblick", points: 150 },
    { date: "15.05.2025", description: "Rechnung von Fliesenleger BauFix", points: 110 },
    { date: "01.05.2025", description: "Rechnung von Dachdecker Sturm", points: 100 },
    { date: "20.04.2025", description: "Rechnung von Heizungsbauer WärmePro", points: 300 },
  ];

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />

      <main className="flex flex-col px-6 pt-8 pb-24 flex-grow">
        <h1 className="text-3xl font-bold text-[#573A6F] text-center mb-4">
          Deine Fair-Points
        </h1>

        <div className="bg-purple-100 text-[#573A6F] rounded-xl p-6 text-center shadow mb-6">
          <p className="text-xl font-medium">Gesamtpunkte:</p>
          <p className="text-5xl font-bold mt-2">{totalPoints}</p>
          <p className="mt-2 text-md">Löse deine Punkte gegen Gutscheine ein!</p>
        </div>

        <h2 className="text-2xl font-semibold text-[#573A6F] mb-4">Scans & Punkteverlauf</h2>

        <div className="space-y-4">
          {invoices.map((item, index) => (
            <div
              key={index}
              className="flex justify-between items-center bg-purple-50 rounded-lg p-4 shadow-sm"
            >
              <div>
                <p className="text-md font-semibold text-[#573A6F]">{item.description}</p>
                <p className="text-sm text-gray-600">{item.date}</p>
              </div>
              <p className="text-xl font-bold text-[#573A6F]">+{item.points} Punkte</p>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
