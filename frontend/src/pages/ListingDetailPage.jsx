import React, { useState } from 'react';
import { Camera, User } from 'lucide-react';
import StatusBadge from '../components/StatusBadge';

const ListingDetailPage = ({ listing, currentUser, onSendMessage, onBack }) => {
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);
  
  const handleSend = (e) => {
    e.preventDefault();
    onSendMessage(listing.id, message);
    setMessage('');
    setSent(true);
    setTimeout(() => setSent(false), 3000);
  };
  
  return (
    <div className="max-w-4xl">
      <button onClick={onBack} className="mb-6 text-green-600 hover:text-green-700 font-semibold">
        ← Back to Search
      </button>
      
      <div className="bg-white rounded-xl shadow overflow-hidden mb-6">
        {/* IMAGE NEEDED: Featured listing hero image - Large, high-quality property photo,
            dimensions: 1200x600px (2:1 aspect ratio), should be hero-worthy showcasing the land.
            Consider image gallery with thumbnails below for multiple photos.
            Quality requirements: High resolution, good lighting, shows land features clearly. */}
        <div className="h-64 md:h-96 bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center">
          <Camera className="w-24 h-24 text-white opacity-50" />
        </div>
        
        <div className="p-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">{listing.title}</h1>
          
          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-600 text-sm">Acreage</p>
              <p className="text-2xl font-bold text-gray-800">{listing.acreage}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-600 text-sm">Land Type</p>
              <p className="text-2xl font-bold text-gray-800 capitalize">{listing.landType}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-600 text-sm">Monthly Rent</p>
              <p className="text-2xl font-bold text-green-600">${listing.rentPrice}</p>
            </div>
          </div>
          
          <div className="mb-6">
            <h3 className="font-bold text-gray-800 mb-2">Location</h3>
            <p className="text-gray-600">{listing.city}, {listing.state}</p>
          </div>
          
          <div className="mb-6">
            <h3 className="font-bold text-gray-800 mb-2">Features</h3>
            <div className="flex flex-wrap gap-2">
              {listing.features.map(feature => (
                <span key={feature} className="bg-green-100 text-green-700 px-3 py-1 rounded-lg">
                  {feature}
                </span>
              ))}
            </div>
          </div>
          
          <div className="mb-6">
            <h3 className="font-bold text-gray-800 mb-2">Description</h3>
            <p className="text-gray-600">{listing.description || 'No description provided'}</p>
          </div>
          
          <div className="mb-6">
            <h3 className="font-bold text-gray-800 mb-2">Lease Terms</h3>
            <p className="text-gray-600">{listing.leaseDuration} months</p>
          </div>
          
          <div className="border-t pt-6">
            <h3 className="font-bold text-gray-800 mb-2">Landowner</h3>
            <div className="flex items-center mb-4">
              {/* IMAGE NEEDED: Landowner profile photo - Actual user uploaded photo,
                  dimensions: 64x64px, circular crop, professional appearance.
                  Placeholder: Professional avatar with person silhouette. */}
              <User className="w-10 h-10 text-gray-400 mr-3" />
              <div>
                <p className="font-semibold text-gray-800">{listing.ownerName}</p>
                <StatusBadge status="approved" />
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-xl shadow p-6">
        <h3 className="font-bold text-gray-800 mb-4">Contact Landowner</h3>
        
        {sent && (
          <div className="bg-green-100 text-green-700 p-4 rounded-lg mb-4">
            Message sent successfully!
          </div>
        )}
        
        <form onSubmit={handleSend}>
          <textarea 
            className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-4"
            rows="4"
            placeholder="Introduce yourself and express your interest..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />
          <button type="submit" className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition">
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default ListingDetailPage;

