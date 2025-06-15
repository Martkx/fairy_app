import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Camera, Upload } from "lucide-react";


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
    <div className="min-h-screen bg-purple-100 flex flex-col justify-between p-6 space-y-6 relative">
      {/* Header */}
      <header className="w-full bg-purple-200 px-4 py-4 rounded-xl relative">
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
              className="w-12 h-12 object-contain mb-1"
            />
            <h1 className="text-lg font-bold text-purple-800 leading-tight">
              Fairy. Wissen was <span className="text-purple-700">fair</span> ist
            </h1>
          </div>
        </div>
      </header>

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
            className="bg-purple-700 text-white px-4 py-2 rounded-md hover:bg-purple-800"
          >
            Foto hochladen
          </button>

          <button
            onClick={startCamera}
            className="bg-purple-700 text-white px-4 py-2 rounded-md hover:bg-purple-800"
          >
            Kamera starten
          </button>

          <video ref={videoRef} autoPlay playsInline className="w-full max-w-xs rounded-md" />

          <button
            onClick={capturePhoto}
            className="bg-purple-700 text-white px-4 py-2 rounded-md hover:bg-purple-800"
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
      <footer className="w-full bg-purple-200 text-purple-900 text-center py-2">
        <p className="text-sm">© 2025 Fairy. Alle Rechte vorbehalten.</p>
      </footer>

      {/* Sticky Footer with Icons */}
      <div className="fixed bottom-0 left-0 w-full bg-white border-t border-purple-200 flex justify-around items-center py-3 z-20">
        <button onClick={() => navigate('/upload-photo')} className="flex flex-col items-center text-purple-800">
          <Upload className="w-6 h-6" />
          <span className="text-xs">Rechnung</span>
        </button>
        <button onClick={() => navigate('/assistant')} className="flex flex-col items-center text-purple-800">
          <Camera className="w-6 h-6" />
          <span className="text-xs">KI-Assistent</span>
        </button>
      </div>
    </div>
  );
}
