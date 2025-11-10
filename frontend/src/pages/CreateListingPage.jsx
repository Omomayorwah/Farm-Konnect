import React, { useState } from 'react';

const CreateListingPage = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    landType: '',
    acreage: '',
    city: '',
    state: '',
    features: [],
    leaseDuration: '',
    rentPrice: '',
    description: ''
  });
  
  const featureOptions = ['Water Source', 'Fencing', 'Road Access', 'Electricity', 'Irrigation', 'Storage Buildings'];
  
  const handleFeatureToggle = (feature) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.includes(feature) 
        ? prev.features.filter(f => f !== feature)
        : [...prev.features, feature]
    }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };
  
  return (
    <div className="max-w-2xl">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">List Your Land</h1>
      
      <form onSubmit={handleSubmit} className="bg-white rounded-xl p-6 shadow">
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">Property Title *</label>
          <input 
            type="text" 
            required
            placeholder="e.g., 50 Acre Farm in Green Valley"
            className="w-full border border-gray-300 rounded-lg px-4 py-2"
            value={formData.title}
            onChange={(e) => setFormData({...formData, title: e.target.value})}
          />
        </div>
        
        <div className="grid md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Land Type *</label>
            <select 
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
              value={formData.landType}
              onChange={(e) => setFormData({...formData, landType: e.target.value})}
            >
              <option value="">Select...</option>
              <option value="arable">Arable</option>
              <option value="pasture">Pasture</option>
              <option value="orchard">Orchard</option>
              <option value="mixed">Mixed Use</option>
            </select>
          </div>
          
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Total Acreage *</label>
            <input 
              type="number" 
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
              value={formData.acreage}
              onChange={(e) => setFormData({...formData, acreage: e.target.value})}
            />
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-gray-700 font-semibold mb-2">City *</label>
            <input 
              type="text" 
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
              value={formData.city}
              onChange={(e) => setFormData({...formData, city: e.target.value})}
            />
          </div>
          
          <div>
            <label className="block text-gray-700 font-semibold mb-2">State *</label>
            <input 
              type="text" 
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
              value={formData.state}
              onChange={(e) => setFormData({...formData, state: e.target.value})}
            />
          </div>
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">Features</label>
          <div className="grid grid-cols-2 gap-2">
            {featureOptions.map(feature => (
              <label key={feature} className="flex items-center">
                <input 
                  type="checkbox"
                  checked={formData.features.includes(feature)}
                  onChange={() => handleFeatureToggle(feature)}
                  className="mr-2"
                />
                {feature}
              </label>
            ))}
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Lease Duration (months) *</label>
            <input 
              type="number" 
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
              value={formData.leaseDuration}
              onChange={(e) => setFormData({...formData, leaseDuration: e.target.value})}
            />
          </div>
          
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Rent Price ($/month) *</label>
            <input 
              type="number" 
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
              value={formData.rentPrice}
              onChange={(e) => setFormData({...formData, rentPrice: e.target.value})}
            />
          </div>
        </div>
        
        <div className="mb-6">
          <label className="block text-gray-700 font-semibold mb-2">Description</label>
          <textarea 
            className="w-full border border-gray-300 rounded-lg px-4 py-2"
            rows="4"
            placeholder="Describe your property..."
            value={formData.description}
            onChange={(e) => setFormData({...formData, description: e.target.value})}
          />
        </div>
        
        <div className="flex gap-4">
          <button type="submit" className="flex-1 bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition">
            Submit for Review
          </button>
          <button type="button" onClick={onCancel} className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-300 transition">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateListingPage;

