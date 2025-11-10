import React from 'react';
import StatusBadge from '../components/StatusBadge';

const MyListingsPage = ({ listings, onNavigate }) => {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">My Listings</h1>
        <button 
          onClick={() => onNavigate('create-listing')}
          className="bg-green-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-700 transition"
        >
          Add New
        </button>
      </div>
      
      <div className="space-y-4">
        {listings.map(listing => (
          <div key={listing.id} className="bg-white rounded-xl shadow p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{listing.title}</h3>
                <p className="text-gray-600">{listing.city}, {listing.state}</p>
              </div>
              <StatusBadge status={listing.status} />
            </div>
            
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div>
                <p className="text-gray-600 text-sm">Acreage</p>
                <p className="font-bold text-gray-800">{listing.acreage}</p>
              </div>
              <div>
                <p className="text-gray-600 text-sm">Type</p>
                <p className="font-bold text-gray-800 capitalize">{listing.landType}</p>
              </div>
              <div>
                <p className="text-gray-600 text-sm">Price</p>
                <p className="font-bold text-green-600">${listing.rentPrice}/mo</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {listings.length === 0 && (
        <div className="bg-white rounded-xl shadow p-12 text-center">
          {/* IMAGE NEEDED: Empty state illustration for "no listings" - Friendly illustration,
              dimensions: 300x300px, showing person creating first listing or empty dashboard.
              Style: Encouraging, modern illustration style, should motivate action. */}
          <p className="text-gray-600 mb-4">You haven't created any listings yet</p>
          <button 
            onClick={() => onNavigate('create-listing')}
            className="bg-green-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-700 transition"
          >
            Create Your First Listing
          </button>
        </div>
      )}
    </div>
  );
};

export default MyListingsPage;

