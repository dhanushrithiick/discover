import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/navbar';
import Dashboard from './pages/Dashboard';
import DamageMap from './pages/damagemaps';
import Overview from './pages/Overview';
import Signup from './pages/signup';

const AppContent = () => {
  const location = useLocation();

  // Hide Navbar on signup page
  const hideNavbar = location.pathname === '/';

  return (
    <>
      {!hideNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/hotspots" element={<DamageMap />} />
        <Route path="/overview" element={<Overview />} />
      </Routes>
    </>
  );
};

const App = () => (
  <Router>
    <AppContent />
  </Router>
);

export default App;
