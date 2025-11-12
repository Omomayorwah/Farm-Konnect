import React, { useState } from 'react';
import { Camera } from 'lucide-react';

const SearchLandPage = ({ listings, onSelectListing }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({ landType: '', maxPrice: '' });
  
  const filteredListings = listings.filter(listing => {
    const matchesSearch = listing.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         listing.city.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = !filters.landType || listing.landType === filters.landType;
    const matchesPrice = !filters.maxPrice || parseFloat(listing.rentPrice) <= parseFloat(filters.maxPrice);
    return matchesSearch && matchesType && matchesPrice;
  });
  
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Find Land</h1>
      
      <div className="bg-white rounded-xl p-6 shadow mb-6">
        <div className="mb-4">
          <input 
            type="text"
            placeholder="Search by location or title..."
            className="w-full border border-gray-300 rounded-lg px-4 py-2"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="grid md:grid-cols-2 gap-4">
          <select 
            className="border border-gray-300 rounded-lg px-4 py-2"
            value={filters.landType}
            onChange={(e) => setFilters({...filters, landType: e.target.value})}
          >
            <option value="">All Land Types</option>
            <option value="arable">Arable</option>
            <option value="pasture">Pasture</option>
            <option value="orchard">Orchard</option>
            <option value="mixed">Mixed Use</option>
          </select>
          
          <input 
            type="number"
            placeholder="Max Price ($/month)"
            className="border border-gray-300 rounded-lg px-4 py-2"
            value={filters.maxPrice}
            onChange={(e) => setFilters({...filters, maxPrice: e.target.value})}
          />
        </div>
      </div>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredListings.map(listing => (
          <div key={listing.id} className="bg-white rounded-xl shadow hover:shadow-lg transition cursor-pointer" onClick={() => onSelectListing(listing)}>
            {/* IMAGE NEEDED: Land listing photos - Actual property photos uploaded by landowners,
                dimensions: 400x300px (4:3 aspect ratio), should show land conditions, boundaries,
                access roads, water sources. Consider multiple photos per listing in carousel.
                Placeholder: Generic farmland aerial view with proper aspect ratio. */}
            <div className="h-48 bg-gradient-to-br from-green-400 to-green-600 rounded-t-xl flex items-center justify-center">
              <Camera className="w-16 h-16 text-white opacity-50" />
            </div>
            <div className="p-4">
              <h3 className="font-bold text-lg text-gray-800 mb-2">{listing.title}</h3>
              <p className="text-gray-600 text-sm mb-2">{listing.city}, {listing.state}</p>
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-700 font-semibold">{listing.acreage} acres</span>
                <span className="text-green-600 font-bold">₦{listing.rentPrice}/mo</span>
              </div>
              <div className="flex flex-wrap gap-1">
                {listing.features.slice(0, 3).map(feature => (
                  <span key={feature} className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                    {feature}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {filteredListings.length === 0 && (
        <div className="text-center py-12">
          {/* IMAGE NEEDED: Empty state illustration - Friendly illustration showing empty search,
              dimensions: 300x300px, should be encouraging, suggest "no results found" visually.
              Style: Light, friendly illustration with magnifying glass or empty field. */}
          <p className="text-gray-600">No listings found matching your criteria</p>
        </div>
      )}
    </div>
  );
};

export default SearchLandPage;

