import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import Login from './components/login';
import Homepage from './components/homepage';
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
