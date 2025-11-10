import React from 'react';

const QuickActionCard = ({ title, description, icon: Icon, onClick, disabled }) => (
  <button 
    onClick={onClick}
    disabled={disabled}
    className={`bg-white rounded-xl p-6 shadow text-left hover:shadow-lg transition ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
  >
    {/* IMAGE NEEDED: Action card backgrounds - Subtle background images for each action card,
        e.g., tractor for "Find Land", document for "Complete Profile", etc.
        dimensions: 300x200px, very light opacity (10-15%), should not interfere with text. */}
    <Icon className="w-12 h-12 text-green-600 mb-4" />
    <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </button>
);

export default QuickActionCard;

