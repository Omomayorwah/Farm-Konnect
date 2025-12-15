import React from 'react';
import { MapPin, Leaf, UserCheck, ChevronRight } from 'lucide-react';
import logo from '../assets/FARM KONNECT.png';
import heroBackground from '../assets/background.jpg';
import landownerImg from '../assets/landowner.jpg';
import farmerImg from '../assets/farmer.jpg';
import Footer from '../components/Footer';
import Features from '../components/Features';
import Testimonials from '../components/Testimonials';
import '../assets/LandingPage.css';

const LandingPage = ({ onNavigate }) => (
  <div className="bg-white font-sans">
    {/* Header */}
    <header className="absolute top-0 left-0 right-0 z-10 bg-transparent">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <img src={logo} alt="Farm Konnect Logo" className="h-12 w-12 rounded-md" />
            <span className="text-2xl font-bold text-white">Farm Konnect</span>
          </div>
          <div className="hidden md:flex items-center space-x-8 text-white">
            <a href="#about" className="hover:text-green-200 transition">About</a>
            <a href="#features" className="hover:text-green-200 transition">Features</a>
            <a href="#contact" className="hover:text-green-200 transition">Contact</a>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => onNavigate('login')}
              className="text-white font-semibold hover:text-green-200 transition"
            >
              Login
            </button>
            <button
              onClick={() => onNavigate('register')}
              className="bg-green-500 text-white px-6 py-2 rounded-full font-semibold hover:bg-green-600 transition"
            >
              Register
            </button>
          </div>
        </div>
      </nav>
    </header>

    <main>
      {/* Hero Section */}
      <section
        className="relative h-screen flex items-center justify-center text-center text-white hero-section"
        style={{ backgroundImage: `url(${heroBackground})` }}
      >
        <div className="z-10 max-w-3xl mx-auto px-4">
          <h1 className="text-5xl md:text-7xl font-extrabold mb-4 leading-tight">
            Connecting Landowners and Farmers
          </h1>
          <p className="text-lg md:text-xl text-green-100 mb-8">
            The premier platform for leasing agricultural land. Your next opportunity is just a click away.
          </p>
          <button 
            onClick={() => onNavigate('register')}
            className="bg-green-500 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-green-600 transition transform hover:scale-105"
          >
            Get Started Today
          </button>
        </div>
      </section>

      {/* Introduction Section */}
      <section id="about" className="py-20">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
          <div className="bg-white rounded-lg p-8 shadow-lg transform hover:scale-105 transition-transform duration-300">
            <div className="flex items-center mb-4">
              <div className="p-3 bg-green-100 rounded-full mr-4">
                <UserCheck size={32} className="text-green-600" />
              </div>
              <h3 className="text-3xl font-bold text-gray-800">For Landowners</h3>
            </div>
            <p className="text-gray-600 mb-6">
              Turn your idle land into a profitable asset. Connect with verified, passionate farmers looking for their next opportunity.
            </p>
            <button
              onClick={() => onNavigate('register')}
              className="font-semibold text-green-600 hover:text-green-700 transition flex items-center"
            >
              List Your Land <ChevronRight size={20} className="ml-1" />
            </button>
          </div>
          <div className="bg-white rounded-lg p-8 shadow-lg transform hover:scale-105 transition-transform duration-300">
            <div className="flex items-center mb-4">
              <div className="p-3 bg-green-100 rounded-full mr-4">
                <Leaf size={32} className="text-green-600" />
              </div>
              <h3 className="text-3xl font-bold text-gray-800">For Farmers</h3>
            </div>
            <p className="text-gray-600 mb-6">
              Access a wide range of farmland to grow your business. Find the perfect plot that meets your needs and budget.
            </p>
            <button
              onClick={() => onNavigate('register')}
              className="font-semibold text-green-600 hover:text-green-700 transition flex items-center"
            >
              Find Farmland <ChevronRight size={20} className="ml-1" />
            </button>
          </div>
        </div>
      </section>

      <Features />

      {/* How It Works Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-12">Simple Steps to Get Started</h2>
          <div className="grid md:grid-cols-3 gap-12">
            <div className="flex flex-col items-center">
              <div className="w-24 h-24 bg-green-500 text-white rounded-full flex items-center justify-center text-4xl font-bold mb-4">1</div>
              <h3 className="text-2xl font-bold mb-2">Create a Profile</h3>
              <p className="text-gray-600">Sign up as a landowner or farmer and complete your profile to get verified.</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-24 h-24 bg-green-500 text-white rounded-full flex items-center justify-center text-4xl font-bold mb-4">2</div>
              <h3 className="text-2xl font-bold mb-2">Discover Opportunities</h3>
              <p className="text-gray-600">Landowners can list their property, while farmers can search for available land.</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-24 h-24 bg-green-500 text-white rounded-full flex items-center justify-center text-4xl font-bold mb-4">3</div>
              <h3 className="text-2xl font-bold mb-2">Connect & Grow</h3>
              <p className="text-gray-600">Use our secure messaging to connect, sign agreements, and start your partnership.</p>
            </div>
          </div>
        </div>
      </section>

      <Testimonials />
    </main>

    <Footer />
  </div>
);

export default LandingPage;