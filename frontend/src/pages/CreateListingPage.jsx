import React, { useState } from 'react';
import { Upload, X, Loader } from 'lucide-react';

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
  
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [previewUrls, setPreviewUrls] = useState([]);
  const [uploadError, setUploadError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const featureOptions = ['Water Source', 'Fencing', 'Road Access', 'Electricity', 'Irrigation', 'Storage Buildings'];
  
  const handleFeatureToggle = (feature) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.includes(feature) 
        ? prev.features.filter(f => f !== feature)
        : [...prev.features, feature]
    }));
  };
  
  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    const maxFiles = 5;
    
    if (selectedFiles.length + files.length > maxFiles) {
      setUploadError(`You can only upload up to ${maxFiles} images. Currently selected: ${selectedFiles.length}`);
      return;
    }
    
    // Validate file types and sizes
    const validFiles = [];
    const invalidFiles = [];
    
    files.forEach(file => {
      const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
      const maxSize = 5 * 1024 * 1024; // 5MB
      
      if (!validTypes.includes(file.type)) {
        invalidFiles.push(`${file.name}: Invalid file type. Only JPEG, PNG, and GIF are allowed.`);
      } else if (file.size > maxSize) {
        invalidFiles.push(`${file.name}: File too large. Maximum size is 5MB.`);
      } else {
        validFiles.push(file);
      }
    });
    
    if (invalidFiles.length > 0) {
      setUploadError(invalidFiles.join('\n'));
    } else {
      setUploadError(null);
    }
    
    if (validFiles.length > 0) {
      setSelectedFiles(prev => [...prev, ...validFiles]);
      
      // Create preview URLs
      const newPreviews = validFiles.map(file => URL.createObjectURL(file));
      setPreviewUrls(prev => [...prev, ...newPreviews]);
    }
  };
  
  const removeSelectedFile = (index) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
    URL.revokeObjectURL(previewUrls[index]);
    setPreviewUrls(prev => prev.filter((_, i) => i !== index));
    setUploadError(null);
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setUploadError(null);
    
    try {
      // Pass both form data and photos to parent handler
      await onSubmit(formData, selectedFiles);
      
      // Clean up preview URLs
      previewUrls.forEach(url => URL.revokeObjectURL(url));
    } catch (error) {
      console.error('Submit error:', error);
      setUploadError(error.message || 'Failed to create listing. Please try again.');
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="max-w-2xl">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">List Your Land</h1>
      
      <form onSubmit={handleSubmit} className="bg-white rounded-xl p-6 shadow">
        {uploadError && (
          <div className="bg-red-100 text-red-700 p-4 rounded-lg mb-4 whitespace-pre-line">
            {uploadError}
          </div>
        )}
        
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">Property Title *</label>
          <input 
            type="text" 
            required
            placeholder="e.g., 50 Acre Farm in Green Valley"
            className="w-full border border-gray-300 rounded-lg px-4 py-2"
            value={formData.title}
            onChange={(e) => setFormData({...formData, title: e.target.value})}
            disabled={isSubmitting}
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
              disabled={isSubmitting}
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
              step="0.01"
              min="0"
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
              value={formData.acreage}
              onChange={(e) => setFormData({...formData, acreage: e.target.value})}
              disabled={isSubmitting}
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
              disabled={isSubmitting}
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
              disabled={isSubmitting}
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
                  disabled={isSubmitting}
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
              min="1"
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
              value={formData.leaseDuration}
              onChange={(e) => setFormData({...formData, leaseDuration: e.target.value})}
              disabled={isSubmitting}
            />
          </div>
          
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Rent Price (₦/month) *</label>
            <input 
              type="number" 
              required
              min="0"
              step="0.01"
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
              value={formData.rentPrice}
              onChange={(e) => setFormData({...formData, rentPrice: e.target.value})}
              disabled={isSubmitting}
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
            disabled={isSubmitting}
          />
        </div>
        
        {/* Image Upload Section */}
        <div className="mb-6 border-t pt-6">
          <label className="block text-gray-700 font-semibold mb-2">
            Property Images (Optional, up to 5)
          </label>
          
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-green-500 transition mb-4">
            <input
              type="file"
              accept="image/jpeg,image/jpg,image/png,image/gif"
              multiple
              onChange={handleFileSelect}
              disabled={isSubmitting || selectedFiles.length >= 5}
              className="hidden"
              id="image-upload"
            />
            <label
              htmlFor="image-upload"
              className="cursor-pointer flex flex-col items-center"
            >
              <Upload className="w-12 h-12 text-gray-400 mb-2" />
              <span className="text-sm text-gray-600">
                Click to select images or drag and drop
              </span>
              <span className="text-xs text-gray-500 mt-1">
                JPEG, PNG, GIF up to 5MB each (Max: 5 images)
              </span>
            </label>
          </div>
          
          {selectedFiles.length > 0 && (
            <div className="mb-4">
              <p className="text-sm font-medium text-gray-700 mb-2">
                Selected Images ({selectedFiles.length}/5):
              </p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {selectedFiles.map((file, index) => (
                  <div key={index} className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden border-2 border-green-500">
                    <img 
                      src={previewUrls[index]} 
                      alt={`Preview ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => removeSelectedFile(index)}
                      className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition"
                      disabled={isSubmitting}
                    >
                      <X className="w-4 h-4" />
                    </button>
                    <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-xs p-1 truncate">
                      {file.name}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        
        <div className="flex gap-4">
          <button 
            type="submit" 
            disabled={isSubmitting}
            className="flex-1 bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {isSubmitting ? (
              <>
                <Loader className="w-5 h-5 mr-2 animate-spin" />
                Creating Listing...
              </>
            ) : (
              'Submit for Review'
            )}
          </button>
          <button 
            type="button" 
            onClick={onCancel} 
            disabled={isSubmitting}
            className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-300 transition disabled:bg-gray-100 disabled:cursor-not-allowed"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateListingPage;