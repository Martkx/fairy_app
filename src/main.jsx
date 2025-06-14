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
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

