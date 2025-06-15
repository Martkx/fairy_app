import { useNavigate } from 'react-router-dom';
import { Camera, Upload } from "lucide-react";
import Header from "./Header";
import Footer from "./Footer";
import React from "react";



export default function HomePage() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-[#ffffff] flex flex-col justify-between px-0 relative">
      {/* Header */}
      <Header />
      {/* Statistics Circle */}
      <div className="w-full bg-gradient-to-b from-[#F2DAFF] to-white p-4 text-center">
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
      <div className="w-full bg-[#EEDDF6] p-4 rounded-xl text-center flex items-center space-x-4">
        <img src="/map.png" alt="Map Icon" className="w-25 h-40 object-contain" onClick={() => navigate('/map')}/>
        <div className="flex-1">
          <p className="font-semibold">Entdecke die Fairy-Karte</p>
        </div>
      </div>
      
      {/* Reward Section */}
      <div className="w-full bg-[#EEDDF6] p-4 rounded-xl text-center flex items-center space-x-4">
        <img src="rewards.png" alt="Map Icon" className="w-25 h-40 object-contain" />
        <div className="flex-1">
          <p className="font-semibold">Rechnungen scannen.</p>
          <p className="font-semibold">Punkte sammeln.</p>
          <p className="font-semibold">Belohnungen kassieren.</p>
        </div>
      </div>

      {/* Empty Section Placeholder */}
      <div className="w-full bg-[#EEDDF6] p-4 rounded-xl text-center flex items-center space-x-4">
        <img src="cup.png" alt="Map Icon" className="w-25 h-40 object-contain" />
        <div className="flex-1">
          <p className="font-semibold">Meine Rewards.</p>
          <p className="font-semibold">Meine Erfolge.</p>
        </div>
      </div>

      {/* Normal Footer */}
        <Footer/>

    </div>
  );
}
