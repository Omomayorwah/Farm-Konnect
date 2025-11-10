import React, { useState } from 'react';
import logo from '../assets/FARM KONNECT.png'
import background from '../assets/IMG_9284.JPG'

const LoginPage = ({ onLogin, onNavigate }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await onLogin(email, password);
    if (!success) {
      setError('Invalid email or password');
    }
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{backgroundImage: `url(${background})`, backgroundSize:'cover'}}>
      <div className="bg-white rounded-xl shadow-xl p-8 w-full max-w-md">
        <div style={{width:'100%',display:'flex',flexDirection:'column',alignItems:'center'}}>
          <img src={logo} alt="" style={{width:'8rem', height:'8rem'}} />
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Welcome Back</h2>
        </div>
        {error && <div className="bg-red-100 text-red-700 p-3 rounded-lg mb-4">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Email</label>
            <input 
              type="email" 
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          
          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2">Password</label>
            <input 
              type="password" 
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          
          <button type="submit" className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition">
            Login
          </button>
        </form>
        
        <p className="text-center mt-4 text-gray-600">
          Don't have an account? 
          <button onClick={() => onNavigate('register')} className="text-green-600 font-semibold ml-1">Register</button>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;

