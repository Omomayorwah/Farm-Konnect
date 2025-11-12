import React, { useState } from 'react';
import { Camera, User, Upload, X, Loader } from 'lucide-react';
import StatusBadge from '../components/StatusBadge';
import { updateListing, API_BASE_URL } from '../services/apiService';

const ListingDetailPage = ({ listing, currentUser, onSendMessage, onBack, onListingUpdate }) => {
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [previewUrls, setPreviewUrls] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [imageErrors, setImageErrors] = useState([]);
  
  // Check if current user is the owner
  const listingId = listing._id || listing.id;
  const ownerId = listing.ownerId?._id || listing.ownerId;
  const userId = currentUser?._id || currentUser?.id;
  const isOwner = ownerId?.toString() === userId?.toString();
  
  // Get existing photos
  const existingPhotos = listing.photos || [];
  
  const handleImageError = (index) => {
    setImageErrors(prev => prev.includes(index) ? prev : [...prev, index]);
  };
  
  // Construct image URL
  const getImageUrl = (photoPath) => {
    if (!photoPath) return null;
    // If it's already a full URL, return it
    if (photoPath.startsWith('http')) return photoPath;
    // Otherwise, construct from API base URL (remove /api and add photo path)
    const baseUrl = API_BASE_URL.replace('/api', '');
    return `${baseUrl}${photoPath}`;
  };
  
  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    const maxFiles = 5 - existingPhotos.length;
    
    if (files.length > maxFiles) {
      setUploadError(`You can only upload up to ${maxFiles} more image(s). Maximum 5 images total.`);
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
    }
    
    if (validFiles.length > 0) {
      setSelectedFiles(prev => [...prev, ...validFiles]);
      
      // Create preview URLs
      const newPreviews = validFiles.map(file => URL.createObjectURL(file));
      setPreviewUrls(prev => [...prev, ...newPreviews]);
      setUploadError(null);
    }
  };
  
  const removeSelectedFile = (index) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
    URL.revokeObjectURL(previewUrls[index]);
    setPreviewUrls(prev => prev.filter((_, i) => i !== index));
  };
  
  const handleImageUpload = async (e) => {
    e.preventDefault();
    
    if (selectedFiles.length === 0) {
      setUploadError('Please select at least one image to upload.');
      return;
    }
    
    setUploading(true);
    setUploadError(null);
    setUploadSuccess(false);
    
    try {
      const response = await updateListing(listingId, {}, selectedFiles);
      
      // Clear selected files and previews
      previewUrls.forEach(url => URL.revokeObjectURL(url));
      setSelectedFiles([]);
      setPreviewUrls([]);
      
      setUploadSuccess(true);
      setTimeout(() => setUploadSuccess(false), 3000);
      
      // Notify parent component to refresh listing data
      if (onListingUpdate && response.listing) {
        onListingUpdate(response.listing);
      }
    } catch (error) {
      console.error('Image upload error:', error);
      setUploadError(error.message || 'Failed to upload images. Please try again.');
    } finally {
      setUploading(false);
    }
  };
  
  const handleSend = (e) => {
    e.preventDefault();
    onSendMessage(listing.id || listingId, message);
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
        {/* Image Gallery */}
        {existingPhotos.length > 0 ? (
          <div className="relative">
            <div className="h-64 md:h-96 bg-gray-100 overflow-hidden">
              {imageErrors.includes(0) ? (
                <div className="w-full h-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center">
                  <Camera className="w-24 h-24 text-white opacity-50" />
                </div>
              ) : (
                <img 
                  src={getImageUrl(existingPhotos[0])} 
                  alt={listing.title}
                  className="w-full h-full object-cover"
                  onError={() => handleImageError(0)}
                />
              )}
            </div>
            {existingPhotos.length > 1 && (
              <div className="grid grid-cols-4 gap-2 p-2 bg-gray-50">
                {existingPhotos.slice(1).map((photo, index) => {
                  const actualIndex = index + 1;
                  return (
                    <div key={index} className="relative aspect-video bg-gray-200 rounded overflow-hidden">
                      {imageErrors.includes(actualIndex) ? (
                        <div className="w-full h-full bg-gray-300 flex items-center justify-center">
                          <Camera className="w-8 h-8 text-gray-400" />
                        </div>
                      ) : (
                        <img 
                          src={getImageUrl(photo)} 
                          alt={`${listing.title} - ${actualIndex + 1}`}
                          className="w-full h-full object-cover"
                          onError={() => handleImageError(actualIndex)}
                        />
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        ) : (
          <div className="h-64 md:h-96 bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center">
            <Camera className="w-24 h-24 text-white opacity-50" />
          </div>
        )}
        
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
              <p className="text-2xl font-bold text-green-600">₦{listing.rentPrice}</p>
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
      
      {/* Image Upload Section - Only visible to owner */}
      {isOwner && (
        <div className="bg-white rounded-xl shadow p-6 mb-6">
          <h3 className="font-bold text-gray-800 mb-4">Manage Listing Images</h3>
          
          {uploadSuccess && (
            <div className="bg-green-100 text-green-700 p-4 rounded-lg mb-4">
              Images uploaded successfully!
            </div>
          )}
          
          {uploadError && (
            <div className="bg-red-100 text-red-700 p-4 rounded-lg mb-4 whitespace-pre-line">
              {uploadError}
            </div>
          )}
          
          {existingPhotos.length > 0 && (
            <div className="mb-6">
              <p className="text-sm text-gray-600 mb-2">Current Images ({existingPhotos.length}/5):</p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {existingPhotos.map((photo, index) => (
                  <div key={index} className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden border-2 border-gray-200">
                    {imageErrors.includes(`manage-${index}`) ? (
                      <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                        <Camera className="w-8 h-8 text-gray-400" />
                      </div>
                    ) : (
                      <img 
                        src={getImageUrl(photo)} 
                        alt={`Listing ${index + 1}`}
                        className="w-full h-full object-cover"
                        onError={() => handleImageError(`manage-${index}`)}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {existingPhotos.length < 5 && (
            <form onSubmit={handleImageUpload}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Upload Images ({existingPhotos.length}/5 used, {5 - existingPhotos.length} remaining)
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-green-500 transition">
                  <input
                    type="file"
                    accept="image/jpeg,image/jpg,image/png,image/gif"
                    multiple
                    onChange={handleFileSelect}
                    disabled={uploading || (existingPhotos.length + selectedFiles.length >= 5)}
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
                      JPEG, PNG, GIF up to 5MB each
                    </span>
                  </label>
                </div>
              </div>
              
              {selectedFiles.length > 0 && (
                <div className="mb-4">
                  <p className="text-sm font-medium text-gray-700 mb-2">
                    Selected Images ({selectedFiles.length}):
                  </p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
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
                          disabled={uploading}
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              <button
                type="submit"
                disabled={uploading || selectedFiles.length === 0}
                className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {uploading ? (
                  <>
                    <Loader className="w-5 h-5 mr-2 animate-spin" />
                    Uploading...
                  </>
                ) : (
                  <>
                    <Upload className="w-5 h-5 mr-2" />
                    Upload Images
                  </>
                )}
              </button>
            </form>
          )}
          
          {existingPhotos.length >= 5 && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <p className="text-sm text-yellow-800">
                Maximum number of images (5) reached. Remove existing images to upload new ones.
              </p>
            </div>
          )}
        </div>
      )}
      
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

