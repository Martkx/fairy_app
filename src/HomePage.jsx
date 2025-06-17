import { useNavigate } from 'react-router-dom';
import { Camera, Upload } from "lucide-react";
import Header from "./Header";
import Footer from "./Footer";
import React from "react";



export default function HomePage() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-[#ffffff] flex-col justify-between px-0 relative">
      {/* Header */}
      <Header />
      {/* Statistics Circle */}
      <div className="w-full bg-gradient-to-b from-[#EEDDF6] to-white p-8 text-center mt-0">

        <p className="text-3xl font-semibold">Du hast bereits 1669 Euro transparent verglichen</p>
        <div className="relative w-32 h-32 mx-auto my-4">
          <div className="absolute inset-0 rounded-full border-8 border-red-400"></div>
          <div className="absolute inset-2 flex flex-col items-center justify-center">
            <span className="text-3xl font-bold">1669€</span>
            <span className="text-xl">verglichen</span>
          </div>
        </div>
      </div>


    {/* Jobs Categories */}
<div className="w-full overflow-x-auto">
  <div className="flex space-x-4 px-4 min-w-max">
  {[
  { image: 'gaertner.jpg', label: 'Gärtner' },
  { image: 'elektriker.jpg', label: 'Elektriker' },
  { image: 'dachdecker.jpg', label: 'Dachdecker' },
  { image: 'maler.jpg', label: 'Maler', path: '/Painter' },
  { image: 'fliesenleger.jpg', label: 'Fliesenleger' },
  { image: 'installateur.jpg', label: 'Installateur' },
  { image: 'tischler.jpg', label: 'Tischler' },
  { image: 'heizungsbauer.jpg', label: 'Heizungsbauer' },
  { image: 'bodenleger.jpg', label: 'Bodenleger' },
  { image: 'trockenbauer.jpg', label: 'Trockenbauer' }
].map((job, index) => (
  <div
    key={index}
    className="flex-shrink-0 text-center cursor-pointer"
    onClick={() => job.path && navigate(job.path)} // ➤ Nur wenn Pfad existiert
  >
    <div className="w-32 h-48 rounded-full mx-auto overflow-hidden">
      <img src={`/${job.image}`} alt={job.label} className="w-full h-full object-cover" />
    </div>
    <p className="text-xl font-semibold mt-2 text-[#573A6F]">{job.label}</p>
  </div>
))}

  </div>
</div>



      {/* Map Section */}
      <div className="bg-[#EEDDF6] p-4 rounded-xl text-center flex items-center space-x-4 mx-4 mt-10 cursor-pointer" onClick={() => navigate('/map')}>
        <img src="/map.png" alt="Map Icon" className="w-25 h-40 object-contain" />
        <div className="flex-1">
          <p className="font-semibold text-4xl text-[#573A6F]">Entdecke die Fairy-Karte</p>
        </div>
      </div>
      
      {/* Scan Section */}
      <div className="bg-[#EEDDF6] p-4 rounded-xl text-center flex items-center space-x-4 mx-4 mt-10 cursor-pointer" onClick={() => navigate('/UploadData')}>
        <img src="file-scan.svg" alt="Map Icon" className="w-25 h-40 object-contain" />
        <div className="flex-1">
          <p className="font-semibold text-4xl text-[#573A6F]">Rechnungen scannen.</p>
          <p className="font-semibold text-4xl text-[#573A6F]">Punkte sammeln.</p>
          <p className="font-semibold text-4xl text-[#573A6F]">Belohnungen kassieren.</p>
        </div>
      </div>

      {/* Rewrd Section */}
      <div className="bg-[#EEDDF6] p-4 rounded-xl text-center flex items-center space-x-4 mx-4 mt-10 cursor-pointer" onClick={() => navigate('/Rewards')}>
        <img src="trophy.svg" alt="Map Icon" className="w-25 h-40 object-contain" />
        <div className="flex-1">
          <p className="font-semibold text-4xl text-[#573A6F]">Meine Rewards.</p>
          <p className="font-semibold text-4xl text-[#573A6F]">Meine Erfolge.</p>
        </div>
      </div>

      {/* Material Costs */}
      <div className="bg-[#EEDDF6] p-4 rounded-xl text-center flex items-center space-x-4 mx-4 mt-10 cursor-pointer" onClick={() => navigate('/ConstructionCostCheck')}>
        <img
          src="chart-candlestick.svg"
          alt="Chart Icon"
          className="w-25 h-40 object-contain"
          onClick={() => navigate('/ConstructionCostCheck')}
        />
        <div className="flex-1">
          <p className="font-semibold text-4xl text-[#573A6F]">Materialkosten im Blick.</p>
          <p className="font-semibold text-xl text-[#573A6F] mt-2">Jetzt vergleichen und clever bauen!</p>
        </div>
      </div>



      {/* Normal Footer */}
        <Footer/>

    </div>
  );
}
