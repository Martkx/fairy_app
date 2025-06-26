import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Camera, Upload } from "lucide-react";
import Header from "./Header";
import Footer from "./Footer";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function HomePage() {
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(null);

  const COLORS = ["#573A6F", "#9C7CBF", "#C9AFE5"];
  const data = [
    { name: "Maler", value: 720 },
    { name: "Gärtner", value: 549 },
    { name: "Elektriker", value: 400 },
  ];

  const renderCustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white border border-gray-300 rounded shadow-md p-2 text-2xl text-[#573A6F]">
          <p>{`${payload[0].name}: ${payload[0].value}€`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-[#ffffff] flex-col justify-between px-0 relative">
      <Header />

      {/* Statistics Circle */}
<div className="w-full bg-gradient-to-b from-[#EEDDF6] to-white p-8 text-center mt-0">
  <p className="text-3xl font-semibold text-[#573A6F]">
    Du hast bereits 1669 Euro transparent verglichen
  </p>
  <div className="w-64 h-64 mx-auto my-6 relative">
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={70}
          outerRadius={100}
          paddingAngle={3}
          dataKey="value"
          onMouseEnter={(_, index) => setActiveIndex(index)}
          onMouseLeave={() => setActiveIndex(null)}
        >
          {data.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={COLORS[index % COLORS.length]}
              stroke={activeIndex === index ? "#fff" : "#f9f7fc"}
              strokeWidth={activeIndex === index ? 3 : 1}
            />
          ))}
        </Pie>
        <Tooltip content={renderCustomTooltip} />
      </PieChart>
    </ResponsiveContainer>

    {/* Center text stays readable */}
    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
      <span className="text-3xl font-bold text-[#573A6F]">1669€</span>
      <span className="text-xl text-[#573A6F]">verglichen</span>
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
              onClick={() => job.path && navigate(job.path)}
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
      <div className="bg-[#EEDDF6] p-4 rounded-xl text-center flex items-center space-x-4 mx-4 mt-10 cursor-pointer" onClick={() => navigate('/map2')}>
        <img src="/map.png" alt="Map Icon" className="w-25 h-40 object-contain" />
        <div className="flex-1">
          <p className="font-semibold text-4xl text-[#573A6F]">Entdecke die Fairy-Karte</p>
        </div>
      </div>

      {/* Scan Section */}
      <div className="bg-[#EEDDF6] p-4 rounded-xl text-center flex items-center space-x-4 mx-4 mt-10 cursor-pointer" onClick={() => navigate('/UploadData')}>
        <img src="file-scan.svg" alt="Scan Icon" className="w-25 h-40 object-contain" />
        <div className="flex-1">
          <p className="font-semibold text-4xl text-[#573A6F]">Rechnungen scannen.</p>
          <p className="font-semibold text-4xl text-[#573A6F]">Punkte sammeln.</p>
          <p className="font-semibold text-4xl text-[#573A6F]">Belohnungen kassieren.</p>
        </div>
      </div>

      {/* Rewards Section */}
      <div className="bg-[#EEDDF6] p-4 rounded-xl text-center flex items-center space-x-4 mx-4 mt-10 cursor-pointer" onClick={() => navigate('/Rewards')}>
        <img src="trophy.svg" alt="Trophy Icon" className="w-25 h-40 object-contain" />
        <div className="flex-1">
          <p className="font-semibold text-4xl text-[#573A6F]">Meine Rewards.</p>
          <p className="font-semibold text-4xl text-[#573A6F]">Meine Erfolge.</p>
        </div>
      </div>

      {/* Material Costs Section */}
      <div className="bg-[#EEDDF6] p-4 rounded-xl text-center flex items-center space-x-4 mx-4 mt-10 cursor-pointer" onClick={() => navigate('/ConstructionCostCheck')}>
        <img
          src="chart-candlestick.svg"
          alt="Chart Icon"
          className="w-25 h-40 object-contain"
        />
        <div className="flex-1">
          <p className="font-semibold text-4xl text-[#573A6F]">Materialkosten im Blick.</p>
          <p className="font-semibold text-xl text-[#573A6F] mt-2">Jetzt vergleichen und clever bauen!</p>
        </div>
      </div>

      <Footer />
    </div>
  );
}
