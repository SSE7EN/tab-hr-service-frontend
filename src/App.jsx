import React from 'react';
import Navbar from './components/navbar/navbar.jsx';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import HomePage from './components/pages/HomePage'
import CandidateList from './components/pages/CandidateList'
import Login from './components/pages/Login'
import Register from './components/pages/Register'
import Application from './components/pages/Application'
import EmployeesList from './components/pages/EmployeesList'


export default function App() {
  return (
    <BrowserRouter>
    <Navbar />
    <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/candidatelist" element={<CandidateList />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/apply" element={<Application />} />
        <Route path="/employeeslist" element={<EmployeesList />} />
    </Routes>
  </BrowserRouter>
  );
}
