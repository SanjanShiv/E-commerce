import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';

import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import OAuth2RedirectHandler from './pages/OAuth2RedirectHandler';

import './App.css';

function App() {
  return (
    <div>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/oauth2/redirect" element={<OAuth2RedirectHandler />} />

          {/* Protected Routes for any logged in User */}
          <Route element={<ProtectedRoute />}>
            <Route path="/profile" element={<Profile />} />
          </Route>
          
          {/* Admin Only Route example */}
          <Route element={<ProtectedRoute roleRequired="ROLE_ADMIN" />}>
            {/* Added later if there is a separate admin dashboard */}
          </Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
