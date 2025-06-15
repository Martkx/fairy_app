import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);

  return (
    <header className="w-full bg-[#F2DAFF] px-4 pt-3 pb-3 relative">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <div className="space-y-1 cursor-pointer" onClick={() => setShowMenu(!showMenu)}>
              <div className="w-6 h-1 bg-white rounded"></div>
              <div className="w-6 h-1 bg-white rounded"></div>
              <div className="w-6 h-1 bg-white rounded"></div>
            </div>
            {showMenu && (
              <div className="absolute top-8 left-0 bg-white rounded-md shadow-lg z-20 w-40 py-2">
                <button
                  onClick={() => navigate('/settings')}
                  className="block w-full text-left px-4 py-2 text-sm text-purple-800 hover:bg-purple-100"
                >
                  Einstellungen
                </button>
                <button
                  onClick={() => navigate('/profile')}
                  className="block w-full text-left px-4 py-2 text-sm text-purple-800 hover:bg-purple-100"
                >
                  Benutzerdaten
                </button>
                <button
                  onClick={() => navigate('/help')}
                  className="block w-full text-left px-4 py-2 text-sm text-purple-800 hover:bg-purple-100"
                >
                  Hilfe
                </button>
              </div>
            )}
          </div>
          <img
            src="/user.png"
            alt="User"
            className="w-10 h-10 rounded-full object-cover cursor-pointer"
            onClick={() => navigate('/profile')}
          />
        </div>

        <div className="flex flex-col items-center justify-center text-center flex-1 cursor-pointer" onClick={() => navigate('/')}> 
          <img
            src="/logo.png"
            alt="Fairy"
            className="w-20 h-25 object-contain mb-1"
          />
          <h1 className="text-lg font-bold text-[#573A6F] leading-tight">
            Fairy. Wissen was fair ist 
          </h1>
        </div>
      </div>
    </header>
  );
}
