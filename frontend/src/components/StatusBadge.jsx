import React from 'react';
import { CheckCircle, Clock, XCircle } from 'lucide-react';

const StatusBadge = ({ status }) => {
  const configs = {
    pending: { icon: Clock, text: 'Under Review', color: 'bg-yellow-100 text-yellow-700' },
    approved: { icon: CheckCircle, text: 'Verified', color: 'bg-green-100 text-green-700' },
    rejected: { icon: XCircle, text: 'Rejected', color: 'bg-red-100 text-red-700' }
  };
  
  const config = configs[status] || configs.pending;
  const Icon = config.icon;
  
  return (
    <div className={`flex items-center ${config.color} rounded-lg px-3 py-1 text-sm font-semibold`}>
      <Icon className="w-4 h-4 mr-2" />
      {config.text}
    </div>
  );
};

export default StatusBadge;

