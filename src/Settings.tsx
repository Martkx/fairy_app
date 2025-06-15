import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";

export default function SettingsPage() {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState("de");

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />

      <main className="flex flex-col p-6 space-y-6">
        <h2 className="text-2xl font-bold text-purple-900">Einstellungen</h2>

        <div className="space-y-4">
          {/* Mitteilungen */}
          <div className="flex justify-between items-center">
            <span className="text-lg text-purple-800">Mitteilungen erlauben</span>
            <input
              type="checkbox"
              checked={notifications}
              onChange={() => setNotifications(!notifications)}
              className="w-5 h-5"
            />
          </div>

          {/* Dark Mode */}
          <div className="flex justify-between items-center">
            <span className="text-lg text-purple-800">Dark Mode aktivieren</span>
            <input
              type="checkbox"
              checked={darkMode}
              onChange={() => setDarkMode(!darkMode)}
              className="w-5 h-5"
            />
          </div>

          {/* Sprache */}
          <div className="flex flex-col">
            <label className="text-lg text-purple-800 mb-1">Sprache</label>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="border border-purple-300 rounded-md p-2"
            >
              <option value="de">Deutsch</option>
              <option value="en">Englisch</option>
              <option value="fr">Französisch</option>
            </select>
          </div>

          {/* Passwort ändern */}
          <div className="flex flex-col">
            <label className="text-lg text-purple-800 mb-1">Passwort ändern</label>
            <input
              type="password"
              placeholder="Neues Passwort"
              className="border border-purple-300 rounded-md p-2"
            />
            <button className="mt-2 bg-purple-700 text-white px-4 py-2 rounded-md hover:bg-purple-800">
              Speichern
            </button>
          </div>
        </div>
      </main>
      {/* Footer */}
      <Footer/>
    </div>
  );
}
