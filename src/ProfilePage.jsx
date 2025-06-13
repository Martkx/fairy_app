import React from "react";

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
    <div className="min-h-screen bg-purple-100 flex flex-col items-center p-4 space-y-6">
      {/* Header */}
      <header className="w-full flex items-center justify-between px-4 py-2 bg-purple-200 rounded-xl">
        <div className="flex items-center space-x-4">
          <div className="space-y-1">
            <div className="w-6 h-1 bg-white rounded"></div>
            <div className="w-6 h-1 bg-white rounded"></div>
            <div className="w-6 h-1 bg-white rounded"></div>
          </div>
          <img src="/user.png" alt="User" className="w-10 h-10 rounded-full object-cover" onClick={() => navigate('/profile')}/>
        </div>
        {/* Logo and Slogan */}
        <div className="w-full bg-purple-200 px-4 py-4 rounded-xl">
          <div className="flex items-center justify-between">
            <div className="flex flex-col items-center text-center flex-1 -ml-10">
              <img src="/logo.png" alt="Fairy" className="w-12 h-12 object-contain mb-1" />
              <h1 className="text-lg font-bold text-purple-800 leading-tight">
                Fairy. Wissen was <span className="text-purple-700">fair</span> ist
              </h1>
            </div>
            <div className="w-10 h-10"></div>
          </div>
        </div>
      </header>

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

    </div>
  );
}
