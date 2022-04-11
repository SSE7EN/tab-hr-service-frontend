import React from 'react';
import Navbar from './components/navbar/navbar.jsx';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import HomePage from './components/pages/HomePage'
import FirstPage from './components/pages/FirstPage'
import SecondPage from './components/pages/SecondPage'
import Login from './components/pages/Login'
import Register from './components/pages/Register'
import Application from './components/pages/Application'


export default function App() {
  return (
    <BrowserRouter>
    <Navbar />
    <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/firstpage" element={<FirstPage />} />
        <Route path="/secondpage" element={<SecondPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/apply" element={<Application />} />
    </Routes>
  </BrowserRouter>
  );
}
