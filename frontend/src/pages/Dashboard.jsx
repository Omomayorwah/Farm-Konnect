import React from 'react';
import { Search, User, FileText, List } from 'lucide-react';
import StatusBadge from '../components/StatusBadge';
import QuickActionCard from '../components/QuickActionCard';

const Dashboard = ({ user, listings, messages, onNavigate }) => {
  const unreadMessages = messages.filter(m => m.toId === user.id && !m.read).length;
  
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Dashboard</h1>
      
      {user.status === 'pending' && (
        <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mb-6">
          {/* IMAGE NEEDED: Alert/warning icon - Small icon for notification banners,
              dimensions: 24x24px, yellow warning style. */}
          <p className="text-yellow-700 font-semibold">Your profile is under review</p>
          <p className="text-yellow-600 text-sm">Complete your profile to speed up verification</p>
        </div>
      )}
      
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl p-6 shadow">
          <h3 className="text-gray-600 mb-2">Profile Status</h3>
          <StatusBadge status={user.status} />
        </div>
        
        {user.type === 'landowner' && (
          <div className="bg-white rounded-xl p-6 shadow">
            <h3 className="text-gray-600 mb-2">Active Listings</h3>
            <p className="text-3xl font-bold text-gray-800">{listings.filter(l => l.status === 'approved').length}</p>
          </div>
        )}
        
        <div className="bg-white rounded-xl p-6 shadow">
          <h3 className="text-gray-600 mb-2">Unread Messages</h3>
          <p className="text-3xl font-bold text-gray-800">{unreadMessages}</p>
        </div>
      </div>
      
      <div className="grid md:grid-cols-2 gap-6">
        {user.type === 'farmer' ? (
          <>
            <QuickActionCard 
              title="Find Land"
              description="Search for available farmland in your area"
              icon={Search}
              onClick={() => onNavigate('search-land')}
              disabled={user.status !== 'approved'}
            />
            <QuickActionCard 
              title="Complete Profile"
              description="Build your farmer trust score"
              icon={User}
              onClick={() => onNavigate('profile')}
            />
          </>
        ) : (
          <>
            <QuickActionCard 
              title="List New Land"
              description="Add a new property to the marketplace"
              icon={FileText}
              onClick={() => onNavigate('create-listing')}
              disabled={user.status !== 'approved'}
            />
            <QuickActionCard 
              title="Manage Listings"
              description="View and edit your land listings"
              icon={List}
              onClick={() => onNavigate('my-listings')}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;

