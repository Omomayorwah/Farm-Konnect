import React, { useState } from 'react';
import logo from '../assets/FARM KONNECT.png'
import background from '../assets/IMG_9284.JPG'


const RegisterPage = ({ onRegister, onNavigate }) => {
  const [formData, setFormData] = useState({ email: '', password: '', type: 'farmer' });
  
  const handleSubmit = (e) => {
    e.preventDefault();
    onRegister(formData);
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center p-4"  style={{backgroundImage: `url(${background})`, backgroundSize:'cover'}}>
      {/* IMAGE NEEDED: Background pattern - Subtle agricultural pattern (wheat stalks, leaves),
          tiled background, light opacity, adds texture without overwhelming content. */}
      <div className="bg-white rounded-xl shadow-xl p-8 w-full max-w-md">
        <div style={{width:'100%',display:'flex',flexDirection:'column',alignItems:'center'}}>
          <img src={logo} alt="" style={{width:'8rem', height:'8rem'}} />
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Create Account</h2>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">I am a...</label>
            <div className="flex gap-4">
              <label className="flex-1">
                <input 
                  type="radio" 
                  name="type" 
                  value="farmer" 
                  checked={formData.type === 'farmer'}
                  onChange={(e) => setFormData({...formData, type: e.target.value})}
                  className="mr-2"
                />
                Farmer
              </label>
              <label className="flex-1">
                <input 
                  type="radio" 
                  name="type" 
                  value="landowner"
                  checked={formData.type === 'landowner'}
                  onChange={(e) => setFormData({...formData, type: e.target.value})}
                  className="mr-2"
                />
                Landowner
              </label>
            </div>
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Email</label>
            <input 
              type="email" 
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
          </div>
          
          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2">Password</label>
            <input 
              type="password" 
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
            />
          </div>
          
          <button type="submit" className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition">
            Create Account
          </button>
        </form>
        
        <p className="text-center mt-4 text-gray-600">
          Already have an account? 
          <button onClick={() => onNavigate('login')} className="text-green-600 font-semibold ml-1">Login</button>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;

