import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/NavBar';
import Home from './pages/Home';
import DelegatesPage from './pages/DelegatesPage';
import DelegateProfile from './pages/DelegateProfile';
import ProposalDetails from './pages/ProposalDetails';
import ChatBot from './pages/Attestation';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/delegates" element={<DelegatesPage />} />
        <Route path="/delegate/:id" element={<DelegateProfile />} />
        <Route path="/proposal/:id" element={<ProposalDetails />} />
        <Route path="/governance/:id" element={<ChatBot />} />
      </Routes>
    </Router>
  );
};

export default App;