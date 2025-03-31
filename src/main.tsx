import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import Login from './components/login';
import Homepage from './components/homepage';
import CommunityPage from './components/community';
import JobPage from './components/jobPage';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/homepage" element={<Homepage />} />
        <Route path="/community" element={<CommunityPage />} />
        <Route path="/jobs" element={<JobPage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
