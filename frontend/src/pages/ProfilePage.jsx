import React, { useState } from 'react';

const ProfilePage = ({ user, onUpdate }) => {
  const [formData, setFormData] = useState(user.profile);
  const [saved, setSaved] = useState(false);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(formData);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };
  
  return (
    <div className="max-w-2xl">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Your Profile</h1>
      
      {saved && (
        <div className="bg-green-100 text-green-700 p-4 rounded-lg mb-6">
          Profile updated successfully!
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="bg-white rounded-xl p-6 shadow">
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">Full Name *</label>
          <input 
            type="text" 
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-2"
            value={formData.fullName}
            onChange={(e) => setFormData({...formData, fullName: e.target.value})}
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">Phone *</label>
          <input 
            type="tel" 
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-2"
            value={formData.phone}
            onChange={(e) => setFormData({...formData, phone: e.target.value})}
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">Location *</label>
          <input 
            type="text" 
            required
            placeholder="City, State"
            className="w-full border border-gray-300 rounded-lg px-4 py-2"
            value={formData.location}
            onChange={(e) => setFormData({...formData, location: e.target.value})}
          />
        </div>
        
        {user.type === 'farmer' && (
          <>
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">Years of Experience *</label>
              <input 
                type="number" 
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-2"
                value={formData.experience}
                onChange={(e) => setFormData({...formData, experience: e.target.value})}
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">Farming Type *</label>
              <select 
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-2"
                value={formData.farmingType}
                onChange={(e) => setFormData({...formData, farmingType: e.target.value})}
              >
                <option value="">Select...</option>
                <option value="crops">Crop Production</option>
                <option value="livestock">Livestock</option>
                <option value="mixed">Mixed Farming</option>
                <option value="organic">Organic Farming</option>
              </select>
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">References</label>
              <textarea 
                className="w-full border border-gray-300 rounded-lg px-4 py-2"
                rows="3"
                placeholder="Contact info for previous landowners or employers"
                value={formData.references}
                onChange={(e) => setFormData({...formData, references: e.target.value})}
              />
            </div>
          </>
        )}
        
        <div className="mb-6">
          <label className="block text-gray-700 font-semibold mb-2">Bio</label>
          <textarea 
            className="w-full border border-gray-300 rounded-lg px-4 py-2"
            rows="4"
            placeholder="Tell us about yourself..."
            value={formData.bio}
            onChange={(e) => setFormData({...formData, bio: e.target.value})}
          />
        </div>
        
        <button type="submit" className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition">
          Save Profile
        </button>
      </form>
    </div>
  );
};

export default ProfilePage;

