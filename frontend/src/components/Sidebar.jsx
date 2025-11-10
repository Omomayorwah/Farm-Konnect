import React from 'react';
import { Home, Search, Mail, Settings, List, FileText, User, X } from 'lucide-react';
import StatusBadge from './StatusBadge';

const Sidebar = ({ user, currentView, onNavigate, onLogout, messageCount, showMobile, onToggleMobile }) => {
  const menuItems = user.type === 'admin' ? [
    { id: 'admin-dashboard', icon: Home, label: 'Dashboard' },
    { id: 'profile', icon: Settings, label: 'Profile' }
  ] : user.type === 'farmer' ? [
    { id: 'dashboard', icon: Home, label: 'Dashboard' },
    { id: 'search-land', icon: Search, label: 'Find Land' },
    { id: 'messages', icon: Mail, label: 'Messages', badge: messageCount },
    { id: 'profile', icon: Settings, label: 'Profile' }
  ] : [
    { id: 'dashboard', icon: Home, label: 'Dashboard' },
    { id: 'profile', icon: Settings, label: 'Profile' },
    { id: 'my-listings', icon: List, label: 'My Listings' },
    { id: 'create-listing', icon: FileText, label: 'List New Land' },
    { id: 'messages', icon: Mail, label: 'Messages', badge: messageCount },
  ];
  
  return (
    <>
      <div className={`${showMobile ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 fixed md:relative z-50 w-64 bg-white border-r border-gray-200 h-screen transition-transform duration-300`}>
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
          {/* IMAGE NEEDED: Sidebar logo - Smaller version of main logo for sidebar,
              dimensions: 120x40px, should be recognizable at smaller size. */}
          <h1 className="text-xl font-bold text-green-700">Farm Konnect</h1>
          <button onClick={onToggleMobile} className="md:hidden">
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <div className="p-4">
          <div className="bg-green-50 rounded-lg p-4 mb-6">
            <div className="flex items-center mb-2">
              {/* IMAGE NEEDED: User avatar placeholder - Generic user silhouette or avatar,
                  dimensions: 48x48px, circular. Later replace with actual user profile photos. */}
              <User className="w-8 h-8 text-green-600 mr-2" />
              <div>
                <p className="font-semibold text-gray-800">{user.profile.fullName || 'User'}</p>
                <p className="text-xs text-gray-600 capitalize">{user.type}</p>
              </div>
            </div>
            <StatusBadge status={user.status} />
          </div>
          
          <nav className="space-y-2">
            {menuItems.map(item => (
              <button
                key={item.id}
                onClick={() => {
                  onNavigate(item.id);
                  onToggleMobile();
                }}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition ${
                  currentView === item.id ? 'bg-green-100 text-green-700' : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <div className="flex items-center">
                  <item.icon className="w-5 h-5 mr-3" />
                  <span>{item.label}</span>
                </div>
                {item.badge > 0 && (
                  <span className="bg-red-500 text-white text-xs rounded-full px-2 py-1">{item.badge}</span>
                )}
              </button>
            ))}
          </nav>
        </div>
        
        <div className="absolute bottom-0 w-full p-4 border-t border-gray-200">
          <button 
            onClick={onLogout}
            className="w-full bg-red-50 text-red-600 py-2 rounded-lg font-semibold hover:bg-red-100 transition"
          >
            Logout
          </button>
        </div>
      </div>
      
      {showMobile && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={onToggleMobile}
        />
      )}
    </>
  );
};

export default Sidebar;

