import { useNavigate } from 'react-router-dom';
import React from "react";



export default function HomePage() {
  const navigate = useNavigate();
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


      {/* Statistics Circle */}
      <div className="w-full bg-purple-200 rounded-xl p-4 shadow-md text-center">
        <p className="text-sm font-semibold">Du hast bereits 1669 Euro transparent verglichen</p>
        <div className="relative w-32 h-32 mx-auto my-4">
          <div className="absolute inset-0 rounded-full border-8 border-red-400"></div>
          <div className="absolute inset-2 flex flex-col items-center justify-center">
            <span className="text-2xl font-bold">1669€</span>
            <span className="text-sm">verglichen</span>
          </div>
        </div>
      </div>

      {/* Jobs Categories */}
      <div className="flex justify-between space-x-2 overflow-x-auto w-full">
        {['gaertner.jpg', 'elektriker.jpg', 'dachdecker.jpg', 'maler.jpg', 'maler.jpg', 'maler.jpg'].map((image, index) => (
          <div key={index} className="flex-shrink-0 text-center">
            <div className="w-28 h-40 rounded-full mx-auto overflow-hidden">
              <img src={`/${image}`} alt={image} className="w-full h-full object-cover" />
            </div>
            <p className="text-sm font-semibold mt-1">
              {['Gärtner', 'Elektriker', 'Dachdecker', 'Maler', 'Fliesenleger', 'Fliesenleger'][index]}
            </p>
          </div>
        ))}
      </div>

      {/* Map Section */}
      <div className="w-full bg-purple-200 p-4 rounded-xl text-center flex items-center space-x-4">
        <img src="/map.png" alt="Map Icon" className="w-25 h-40 object-contain" onClick={() => navigate('/map')}/>
        <div className="flex-1">
          <p className="font-semibold">Entdecke die Fairy-Karte</p>
        </div>
      </div>

      {/* Reward Section */}
      <div className="w-full bg-purple-200 p-4 rounded-xl text-center flex items-center space-x-4">
        <img src="reward.png" alt="Map Icon" className="w-25 h-40 object-contain" />
        <div className="flex-1">
          <p className="font-semibold">Rechnungen scannen.</p>
          <p className="font-semibold">Punkte sammeln.</p>
          <p className="font-semibold">Belohnungen kassieren.</p>
        </div>
      </div>

      {/* Empty Section Placeholder */}
      <div className="w-full bg-purple-200 p-4 rounded-xl text-center flex items-center space-x-4">
        <img src="reward.png" alt="Map Icon" className="w-25 h-40 object-contain" />
        <div className="flex-1">
          <p className="font-semibold">Rechnungen scannen.</p>
          <p className="font-semibold">Punkte sammeln.</p>
          <p className="font-semibold">Belohnungen kassieren.</p>
        </div>
      </div>

    </div>
  );
}
