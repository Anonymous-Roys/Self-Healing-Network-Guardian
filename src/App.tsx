import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Dashboard from './components/dashboard/Dashboard';
import Devices from './components/devices/Devices';
import Alerts from './components/alerts/Alerts';
import Topology from './components/topology/Topology';
import './index.css';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/devices" element={<Devices />} />
          <Route path="/alerts" element={<Alerts />} />
          <Route path="/topology" element={<Topology />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App