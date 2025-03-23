// import { StrictMode, useState } from 'react';
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './css files/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css files/main.css';
// import * as React from 'react';
// import { createRoot } from 'react-dom/client';
// import React from 'react';
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Pages
import HomePage from './views/main';
import Network from './views/network';
import Group from './views/group';
import Layout from './views/Layout';
import Job from './views/job';
import Notification from './views/notification';
import Profile from './views/profile';


function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="network" element={<Network />} />
        <Route path="group" element={<Group />} />
        <Route path="job" element={<Job />} />
        <Route path="notification" element={<Notification />} />
        <Route path="profile" element={<Profile />} />
      </Route>
    </Routes>
    </BrowserRouter>
  )
  // const [count, setCount] = useState(0)
  // const homePage = () => {
  //   console.log("homePage is called")
  // }
  // return (
  //   <button onClick={homePage}>Call homePage</button>
  // )

// return (
//   homePage()
//   // <homePage />
// )

  // return (
  //   <>
  //     <div>
  //       <a href="https://vite.dev" target="_blank">
  //         <img src={viteLogo} className="logo" alt="Vite logo" />
  //       </a>
  //       <a href="https://react.dev" target="_blank">
  //         <img src={reactLogo} className="logo react" alt="React logo" />
  //       </a>
  //     </div>
  //     <h1>Vite + React</h1>
  //     <div className="card">
  //       <button onClick={() => setCount((count) => count + 1)}>
  //         count is {count}
  //       </button>
  //       <p>
  //         Edit <code>src/App.tsx</code> and save to test HMR
  //       </p>
  //     </div>
  //     <p className="read-the-docs">
  //       Click on the Vite and React logos to learn more
  //     </p>
  //     <div></div>
  //   </>
  // )
}
// createRoot(document.getElementById('root')!).render(
//   <StrictMode>
//     <App />
//   </StrictMode>,
// )
export default App;

// {/* // Main App component that renders the Layout */}
// function MyApp() {
//   return (
//     <div>
//       <Layout />
//     </div>
//   )
// }

// export default MyApp;