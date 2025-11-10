import React from 'react';
import { Menu, User } from 'lucide-react';

const MobileHeader = ({ onToggleMenu, user }) => (
  <div className="md:hidden flex items-center justify-between mb-6 bg-white p-4 rounded-lg shadow">
    <button onClick={onToggleMenu}>
      <Menu className="w-6 h-6 text-gray-600" />
    </button>
    <h2 className="font-bold text-gray-800">Farm Konnect</h2>
    <User className="w-6 h-6 text-green-600" />
  </div>
);

export default MobileHeader;

