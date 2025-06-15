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
        <div className="w-20 h-20 bg-purple-200 text-purple-800 font-bold text-3xl rounded-full flex items-center justify-center">
          M
        </div>
        <p className="mt-2 text-lg font-medium">Max Mustermann</p>
      </div>

      {/* Account Section */}
      <div className="w-full flex justify-center">
        <div className="w-full max-w-md px-6">
            <h2 className="text-md font-bold mb-4 text-center">Konto</h2>
            <div className="flex flex-col space-y-4">
            {profileItems.map((item, index) => (
                <div key={index} className="flex items-center space-x-4">
                <span className="text-xl w-6 text-center">{item.icon}</span>
                <span className="text-md">{item.label}</span>
                </div>
            ))}
            </div>
        </div>
      </div>
      {/* Normal Footer */}
        <Footer/>

    </div>
  );
}
