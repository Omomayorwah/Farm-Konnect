import React from 'react';
import logo from '../assets/FARM KONNECT.png'
import background from '../assets/IMG_9306.jpg'
import landowner from '../assets/IMG_9308.JPG'
import farmer from '../assets/IMG_9309.JPG'
import Footer from '../components/Footer';

const LandingPage = ({ onNavigate }) => (
  <div className="min-h-screen bg-gradient-to-br from-green-600 to-green-800">
    <nav className="bg-white/10 backdrop-blur-sm border-b border-white/20">
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        <div style={{display:'flex', flexDirection:'row', alignItems:'center', gap:'0.8rem'}}>
          <img src={logo} alt="" style={{width:'60px', height:'50px', borderRadius:'5px'}} />
        <h1 className="text-3xl font-bold text-white">Farm Konnect</h1>
        </div>
        <button 
          onClick={() => onNavigate('login')}
          className="bg-white text-green-700 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition"
        >
          Login
        </button>
      </div>
    </nav>
    
    <div className="max-w-[100%]" style={{backgroundImage:`url(${background})`,backgroundSize: 'cover', backgroundPosition: 'center'}}>
      <div className='mx-auto px-4 py-16 text-center' style={{ width: '100%', backgroundColor: 'rgba(0, 0, 0, 0.6)'}}>
      <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
        Connect Land with Opportunity
      </h2>
      <p className="text-xl text-green-100 mb-12 max-w-2xl mx-auto">
        The trusted platform connecting landowners with vetted farmers. Monetize idle land or find your next farm.
      </p>
      
      <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-16">
        <div className="bg-white rounded-xl p-8 shadow-2xl">
          <img src={landowner} alt="" style={{width:'100%', height:'50%', marginBottom:'1rem', borderRadius:'5px'}} />
          <h3 className="text-2xl font-bold text-gray-800 mb-4">For Landowners</h3>
          <p className="text-gray-600 mb-6">Turn your idle land into steady income with verified, reliable farmers</p>
          <button 
            onClick={() => onNavigate('register')}
            className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition"
          >
            List Your Land
          </button>
        </div>
        
        <div className="bg-white rounded-xl p-8 shadow-2xl">
          <img src={farmer} alt="" style={{width:'100%', height:'50%', marginBottom:'1rem', borderRadius:'5px'}} />
          <h3 className="text-2xl font-bold text-gray-800 mb-4">For Farmers</h3>
          <p className="text-gray-600 mb-6">Access quality farmland and build your agricultural business</p>
          <button 
            onClick={() => onNavigate('register')}
            className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition"
          >
            Find Land
          </button>
        </div>
      </div>
      
      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 max-w-4xl mx-auto">
        <h3 className="text-2xl font-bold text-white mb-8">How It Works</h3>
        <div className="grid md:grid-cols-3 gap-8 text-white">
          <div>
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">1</div>
            <h4 className="font-bold mb-2">Create Profile</h4>
            <p className="text-green-100">Sign up and complete your verified profile</p>
          </div>
          <div>
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">2</div>
            <h4 className="font-bold mb-2">Connect</h4>
            <p className="text-green-100">List land or search for opportunities</p>
          </div>
          <div>
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">3</div>
            <h4 className="font-bold mb-2">Transact</h4>
            <p className="text-green-100">Sign agreements and start farming</p>
          </div>
        </div>
      </div>
    </div>
    </div>
    <Footer />
  </div>
);

export default LandingPage;

