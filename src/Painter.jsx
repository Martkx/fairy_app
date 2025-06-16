import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { PaintRoller, FileText, DoorOpen, Square, Heater, Building2, Hammer } from "lucide-react";

export default function PainterFormPage() {
  const categories = [
    {
      title: "Streicharbeiten",
      items: [
        { icon: <PaintRoller size={40} />, label: "Streichen" },
        { icon: <FileText size={40} />, label: "Tapezieren" },
      ],
    },
    {
      title: "Lackierarbeiten",
      items: [
        { icon: <DoorOpen size={40} />, label: "Türen" },
        { icon: <Square size={40} />, label: "Fenster" },
        { icon: <Heater size={40} />, label: "Heizkörper" },
      ],
    },
    {
      title: "Fassadenarbeiten",
      items: [
        { icon: <Building2 size={40} />, label: "Außen streichen" },
        { icon: <Hammer size={40} />, label: "Außen verputzen" },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="px-6 pt-6 pb-24">
        <h1 className="text-3xl font-bold text-[#573A6F] mb-6 text-center">
          Was möchtest du machen lassen?
        </h1>

        {categories.map((cat, idx) => (
          <div key={idx} className="mb-8">
            <h2 className="text-2xl font-semibold text-[#573A6F] mb-4">
              {cat.title}
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {cat.items.map((item, i) => (
                <div
                  key={i}
                  className="flex items-center justify-center flex-col bg-purple-100 text-[#573A6F] rounded-xl w-36 h-36 shadow hover:shadow-md cursor-pointer"
                >
                  {item.icon}
                  <span className="text-xl font-medium mt-2 text-center">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </main>

      <Footer />
    </div>
  );
}