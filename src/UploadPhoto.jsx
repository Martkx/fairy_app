import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Camera, Upload } from "lucide-react";
import Header from "./Header";
import Footer from "./Footer";

export default function UploadPhoto() {
  const navigate = useNavigate();
  const [image, setImage] = useState(null);
  const [showMenu, setShowMenu] = useState(false);
  const fileInputRef = useRef();
  const videoRef = useRef();
  const canvasRef = useRef();

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  const startCamera = async () => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
    }
  };

  const capturePhoto = () => {
    const context = canvasRef.current.getContext("2d");
    context.drawImage(videoRef.current, 0, 0, 300, 200);
    const imageDataUrl = canvasRef.current.toDataURL("image/png");
    setImage(imageDataUrl);
  };

  return (
    <div className="min-h-screen bg-[#ffffff] flex flex-col justify-between px-0 space-y-6 relative">
      {/* Header */}
      <Header />

      <main className="flex-grow flex flex-col items-center space-y-6">
        <h1 className="text-2xl font-bold text-purple-900">Rechnungsfoto hochladen oder aufnehmen</h1>

        <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-md space-y-4 flex flex-col items-center">
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
          />
          <button
            onClick={() => fileInputRef.current.click()}
            className="bg-[#573A6F] text-white px-4 py-2 rounded-md hover:bg-purple-800"
          >
            Foto hochladen
          </button>

          <button
            onClick={startCamera}
            className="bg-[#573A6F] text-white px-4 py-2 rounded-md hover:bg-purple-800"
          >
            Kamera starten
          </button>

          <video ref={videoRef} autoPlay playsInline className="w-full max-w-xs rounded-md" />

          <button
            onClick={capturePhoto}
            className="bg-[#573A6F] text-white px-4 py-2 rounded-md hover:bg-purple-800"
          >
            Foto aufnehmen
          </button>

          <canvas ref={canvasRef} width="300" height="200" className="hidden" />

          {image && (
            <div className="mt-4">
              <img src={image} alt="Vorschau" className="w-full rounded-md shadow" />
            </div>
          )}
        </div>
      </main>

      {/* Normal Footer */}
        < Footer/>
    </div>
  );
}
