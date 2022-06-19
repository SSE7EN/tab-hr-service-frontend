import React from 'react';
import Navbar from './components/navbar/navbar.jsx';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import HomePage from './components/pages/HomePage'
import ApllicationsList from './components/pages/ApllicationsList'
import Login from './components/pages/Login'
import Register from './components/pages/Register'
import Application from './components/pages/Application'
import Candidate from './components/pages/Candidate';
import EmployeesList from './components/pages/EmployeesList'
import Position from './components/pages/Position'


export default function App() {
  return (
    <BrowserRouter>
    <Navbar />
    <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/apllicationslist" element={<ApllicationsList />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/apply" element={<Application />} />
        <Route path="/candidate" element={<Candidate />} />
        <Route path="/employeeslist" element={<EmployeesList />} />
        <Route path="/position" element={<Position />} />
    </Routes>
  </BrowserRouter>
  );
}
