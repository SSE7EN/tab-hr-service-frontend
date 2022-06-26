import React from 'react';
import Navbar from './components/navbar/navbar.jsx';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import HomePage from './components/pages/HomePage'
import ApllicationsList from './components/pages/ApllicationsList'
import Login from './components/pages/Login'
import Logout from "./components/pages/logout";
import RegisterUser from './components/pages/RegisterUser';
import Apply from './components/pages/Apply';
import Application from './components/pages/Application';
import EmployeesList from './components/pages/EmployeesList'
import Position from './components/pages/Position'
import ResetPassword from './components/pages/ResetPassword';
import RegisterCandidate from './components/pages/RegisterCandidate.jsx';
import PositionsList from './components/pages/PositionsList.jsx';
import ApplicationSent from './components/pages/ApplicationSent.jsx';
import UsersApplications from './components/pages/UsersApplications.jsx'
import Report from './components/pages/Report.jsx'
import Meeting from './components/pages/Meeting'
import MeetingsList from './components/pages/MeetingsList'

export default function App() {
  return (
    <BrowserRouter>
    <Navbar />
    <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/apllicationslist" element={<ApllicationsList />} />
        <Route path="/register_user" element={<RegisterUser />} />
        <Route path="/register_candidate" element={<RegisterCandidate />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/apply/:id" element={<Apply />} />
        <Route path="/application/:id" element={<Application />} />
        <Route path="/employeeslist" element={<EmployeesList />} />
        <Route path="/position" element={<Position />} />
        <Route path="/positionlist" element={<PositionsList />} />
        <Route path="/resetpassword" element={<ResetPassword />} />
        <Route path="/applicationsent" element={<ApplicationSent />} />
        <Route path="/userapplications" element={<UsersApplications />} />
        <Route path="/report" element={<Report />} />
        <Route path="/meeting" element={<Meeting />} />
        <Route path="/meetings" element={<MeetingsList />} />
    </Routes>
  </BrowserRouter>
  );
}
