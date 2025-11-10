import React, { useState } from 'react';
import StatusBadge from '../components/StatusBadge';

const AdminDashboard = ({ users, listings, messages, onAdminAction }) => {
  const [view, setView] = useState('users');
  
  const pendingUsers = users.filter(u => u.status === 'pending' && u.type !== 'admin');
  const pendingListings = listings.filter(l => l.status === 'pending');
  
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Admin Dashboard</h1>
      
      <div className="grid md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl p-6 shadow">
          <h3 className="text-gray-600 mb-2">Total Users</h3>
          <p className="text-3xl font-bold text-gray-800">{users.filter(u => u.type !== 'admin').length}</p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow">
          <h3 className="text-gray-600 mb-2">Pending Users</h3>
          <p className="text-3xl font-bold text-yellow-600">{pendingUsers.length}</p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow">
          <h3 className="text-gray-600 mb-2">Active Listings</h3>
          <p className="text-3xl font-bold text-gray-800">{listings.filter(l => l.status === 'approved').length}</p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow">
          <h3 className="text-gray-600 mb-2">Pending Listings</h3>
          <p className="text-3xl font-bold text-yellow-600">{pendingListings.length}</p>
        </div>
      </div>
      
      <div className="bg-white rounded-xl shadow">
        <div className="border-b flex">
          <button 
            onClick={() => setView('users')}
            className={`px-6 py-3 font-semibold ${view === 'users' ? 'text-green-600 border-b-2 border-green-600' : 'text-gray-600'}`}
          >
            Users ({pendingUsers.length})
          </button>
          <button 
            onClick={() => setView('listings')}
            className={`px-6 py-3 font-semibold ${view === 'listings' ? 'text-green-600 border-b-2 border-green-600' : 'text-gray-600'}`}
          >
            Listings ({pendingListings.length})
          </button>
        </div>
        
        <div className="p-6">
          {view === 'users' && (
            <div className="space-y-4">
              {users.filter(u => u.type !== 'admin').map(user => (
                <div key={user.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-bold text-gray-800">{user.profile.fullName || user.email}</h3>
                      <p className="text-sm text-gray-600 capitalize">{user.type}</p>
                      <p className="text-sm text-gray-500">{user.email}</p>
                    </div>
                    <StatusBadge status={user.status} />
                  </div>
                  
                  {user.type === 'farmer' && (
                    <div className="bg-gray-50 rounded p-3 mb-4 text-sm">
                      <p className="text-gray-600"><span className="font-semibold">Experience:</span> {user.profile.experience} years</p>
                      <p className="text-gray-600"><span className="font-semibold">Type:</span> {user.profile.farmingType}</p>
                      <p className="text-gray-600"><span className="font-semibold">Location:</span> {user.profile.location}</p>
                    </div>
                  )}
                  
                  {user.status === 'pending' && (
                    <div className="flex gap-2">
                      <button 
                        onClick={() => onAdminAction('user', user.id, 'approved')}
                        className="flex-1 bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700 transition"
                      >
                        Approve
                      </button>
                      <button 
                        onClick={() => onAdminAction('user', user.id, 'rejected')}
                        className="flex-1 bg-red-600 text-white py-2 rounded-lg font-semibold hover:bg-red-700 transition"
                      >
                        Reject
                      </button>
                    </div>
                  )}
                </div>
              ))}
              
              {users.filter(u => u.type !== 'admin').length === 0 && (
                <p className="text-center text-gray-500 py-8">No users yet</p>
              )}
            </div>
          )}
          
          {view === 'listings' && (
            <div className="space-y-4">
              {/* IMAGE NEEDED: Admin panel icons - Small icons for different listing statuses,
                  dimensions: 32x32px, clear visual indicators for pending/approved/rejected states. */}
              {listings.map(listing => (
                <div key={listing.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-bold text-gray-800">{listing.title}</h3>
                      <p className="text-sm text-gray-600">{listing.city}, {listing.state}</p>
                      <p className="text-sm text-gray-500">Owner: {listing.ownerName}</p>
                    </div>
                    <StatusBadge status={listing.status} />
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 mb-4 bg-gray-50 rounded p-3">
                    <div>
                      <p className="text-xs text-gray-600">Acreage</p>
                      <p className="font-bold text-gray-800">{listing.acreage}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600">Type</p>
                      <p className="font-bold text-gray-800 capitalize">{listing.landType}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600">Price</p>
                      <p className="font-bold text-green-600">${listing.rentPrice}/mo</p>
                    </div>
                  </div>
                  
                  {listing.status === 'pending' && (
                    <div className="flex gap-2">
                      <button 
                        onClick={() => onAdminAction('listing', listing.id, 'approved')}
                        className="flex-1 bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700 transition"
                      >
                        Approve
                      </button>
                      <button 
                        onClick={() => onAdminAction('listing', listing.id, 'rejected')}
                        className="flex-1 bg-red-600 text-white py-2 rounded-lg font-semibold hover:bg-red-700 transition"
                      >
                        Reject
                      </button>
                    </div>
                  )}
                  
                  {listing.status === 'approved' && (
                    <button 
                      onClick={() => onAdminAction('listing', listing.id, 'rented')}
                      className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
                    >
                      Mark as Rented
                    </button>
                  )}
                </div>
              ))}
              
              {listings.length === 0 && (
                <p className="text-center text-gray-500 py-8">No listings yet</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

