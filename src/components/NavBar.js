import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BrowserProvider } from 'ethers';

const Navbar = () => {
  // State management for wallet connection
  const [userAddress, setUserAddress] = useState(null);
  const location = useLocation();

  // Navigation links configuration
  const navLinks = [
    { text: 'Proposals', path: '/', active: location.pathname === '/' },
    { text: 'Voters', path: '/delegates', active: location.pathname === '/delegates' },
    { text: 'Attestation Committee', path: 'http://localhost:3001/uvv-dtgk-ikp', external: true  }
  ];

  // Wallet connection handler
  const handleConnectWallet = async () => {
    // Check if MetaMask is installed
    if (window.ethereum) {
      try {
        // Request account access
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        
        // Create provider and get signer
        const provider = new BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const address = await signer.getAddress();
        
        // Update state with connected address
        setUserAddress(address);
        console.log('Connected address:', address);
      } catch (error) {
        console.error('Error connecting to wallet:', error);
      }
    } else {
      alert('Please install MetaMask to connect your wallet');
    }
  };

  // Format address for display
  const formatAddress = (address) => {
    if (!address) return '';
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <nav className="w-full border-b border-gray-200 bg-white px-4 py-3">
      <div className="mx-auto max-w-7xl flex items-center justify-between">
        {/* Left section: Logo and title */}
        <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <div className="w-6 h-6 bg-black rounded-sm"></div>
          <div className="relative">
            <div className="w-2 h-2 bg-blue-500 rounded-full absolute -top-1 -right-2"></div>
            <span className="text-base font-medium">zenoDAO</span>
          </div>
        </Link>

        {/* Center section: Navigation links */}
        <div className="flex gap-1 bg-gray-100 p-1 rounded-lg">
          {navLinks.map((link) => (
            <Link
              key={link.text}
              to={link.path}
              className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors
                ${link.active 
                  ? 'bg-white text-black shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'}`}
            >
              {link.text}
            </Link>
          ))}
        </div>

        {/* Right section: Wallet Connection button */}
        <button 
          onClick={handleConnectWallet}
          className={`px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium
            transition-colors ${userAddress 
              ? 'bg-gray-50 text-gray-700'
              : 'text-gray-900 hover:bg-gray-50'}`}
        >
          {userAddress ? formatAddress(userAddress) : 'Connect Wallet'}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;