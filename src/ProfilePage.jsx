import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Camera, Upload } from "lucide-react";

export default function ProfilePage() {
  const profileItems = [
    { icon: "🪪", label: "Persönliche Daten" },
    { icon: "🔐", label: "Anmelden & Sicherheit" },
    { icon: "✉️", label: "Nachrichten" },
    { icon: "👍", label: "Meine Bewertungen" },
    { icon: "📄", label: "Meine Rechnungen" },
    { icon: "🎧", label: "Kundensupport" },
  ];

  return (
    <div className="min-h-screen bg-[#ffffff] flex flex-col justify-between px-0 space-y-6 relative">
      {/* Header */}
      <Header />

      {/* User Info */}
      <div className="flex flex-col items-center">
        <div className="w-40 h-40 bg-purple-200 text-purple-800 font-bold text-8xl rounded-full flex items-center justify-center">
          M
        </div>
        <p className="mt-4 text-4xl font-semibold">Max Mustermann</p>
      </div>

      {/* Account Section */}
      <div className="w-full flex justify-center">
        <div className="w-full max-w-md px-6">
          <h2 className="text-3xl font-bold mb-6 text-center">Konto</h2>
          <div className="flex flex-col space-y-5">
            {profileItems.map((item, index) => (
              <div key={index} className="flex items-center space-x-4">
                <span className="text-3xl w-8 text-center">{item.icon}</span>
                <span className="text-lg">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Normal Footer */}
      <Footer />
    </div>
  );
}
