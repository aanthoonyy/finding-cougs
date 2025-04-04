import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import Login from './components/login';
import Homepage from './components/homepage';
import CommunityPage from './components/community';
import JobPage from './components/jobPage';
import AdminPanel from './components/AdminPanel';

import Network from './components/network';
import Notification from './components/notification';
import Job from './components/job';
import Profile from './components/profile';
import Group from './components/group';
import Post from './components/post';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/homepage" element={<Homepage />} />
        <Route path="/community" element={<CommunityPage />} />
        <Route path="/jobs" element={<JobPage />} />
        <Route path="/admin" element={<AdminPanel />} />

        <Route path="/network" element={<Network />} />
        <Route path="/notification" element={<Notification />} />
        <Route path="/job" element={<Job />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/network/group" element={<Group />} />
        <Route path="/profile/post" element={<Post />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
