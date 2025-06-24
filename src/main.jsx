import 'leaflet/dist/leaflet.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './HomePage';
import ProfilePage from './ProfilePage';
import Map from './Map';
import UploadData from './UploadData'
import ManualInvoiceEntry from './ManualEntry'
import UploadPhoto from './UploadPhoto'
import SettingsPage from './Settings';
import ChatWithMia from './ChatBot';
import Painter from './Painter';
import Rewards from './Rewards';
import Map2 from './Map2'
import FairyScorePage from './FairiScorePage'
import ConstructionCostCheck from './ConstructionCosts';
import './index.css';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/map" element={<Map />} />
        <Route path="/UploadData" element={<UploadData />} />
        <Route path="/ManualInvoiceEntry" element={<ManualInvoiceEntry />} />
        <Route path="/UploadPhoto" element={<UploadPhoto />} />
        <Route path="/Settings" element={<SettingsPage />} />
        <Route path="/ChatBot" element={<ChatWithMia />} />
        <Route path="/Painter" element={<Painter />} />
        <Route path="/Rewards" element={<Rewards />} />
        <Route path="/ConstructionCostCheck" element={<ConstructionCostCheck />} />
        <Route path="/Map2" element={<Map2 />} />
        <Route path="/FairyScorePage" element={<FairyScorePage />} />

      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

