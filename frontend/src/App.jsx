import React, { useState, useEffect, useCallback } from 'react';
import * as api from './services/apiService';
import Sidebar from './components/Sidebar';
import MobileHeader from './components/MobileHeader';
import LandingPage from './pages/LandingPage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import ProfilePage from './pages/ProfilePage';
import CreateListingPage from './pages/CreateListingPage';
import SearchLandPage from './pages/SearchLandPage';
import ListingDetailPage from './pages/ListingDetailPage';
import MessagesPage from './pages/MessagesPage';
import MyListingsPage from './pages/MyListingsPage';
import AdminDashboard from './pages/AdminDashboard';

const FarmKonnectApp = () => {
  const [currentView, setCurrentView] = useState('landing');
  const [currentUser, setCurrentUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [listings, setListings] = useState([]);
  const [messages, setMessages] = useState([]);
  const [selectedListing, setSelectedListing] = useState(null);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadListings = useCallback(async (user = currentUser) => {
    try {
      let listingsData;
      if (user?.type === 'admin') {
        const response = await api.getAllListingsAdmin();
        // API returns { listings: array } or just array
        listingsData = response.listings || response;
      } else {
        const response = await api.getAllListings();
        // API returns { listings: array } or just array
        listingsData = response.listings || response;
      }
      setListings(Array.isArray(listingsData) ? listingsData.map(l => ({ ...l, id: l._id || l.id })) : []);
    } catch (error) {
      console.error('Error loading listings:', error);
      setError('Failed to load listings');
    }
  }, [currentUser]);

  const loadMessages = useCallback(async () => {
    try {
      const response = await api.getAllMessages();
      // API returns { messages: array } or just array
      const messagesData = response.messages || response;
      setMessages(Array.isArray(messagesData) ? messagesData.map(m => ({ ...m, id: m._id || m.id })) : []);
    } catch (error) {
      console.error('Error loading messages:', error);
      setError('Failed to load messages');
    }
  }, []);

  const loadUsers = useCallback(async () => {
    try {
      const response = await api.getUsers();
      // API returns { users: array } or just array
      const usersData = response.users || response;
      setUsers(Array.isArray(usersData) ? usersData.map(u => ({ ...u, id: u._id || u.id })) : []);
    } catch (error) {
      console.error('Error loading users:', error);
      setError('Failed to load users');
    }
  }, []);

  const loadInitialData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      // Check if user is already logged in (has token)
      const token = api.getToken();
      if (token) {
        const response = await api.getCurrentUser();
        // API returns { user: object } or just the user object
        const user = response.user || response;
        
        if (user) {
          // Normalize user ID
          const normalizedUser = { ...user, id: user.id || user._id };
          setCurrentUser(normalizedUser);
          setCurrentView(normalizedUser.type === 'admin' ? 'admin-dashboard' : 'dashboard');
          
          // Load user-specific data
          await Promise.all([
            loadListings(normalizedUser),
            loadMessages(),
            normalizedUser.type === 'admin' && loadUsers(),
          ]);
        }
      }
    } catch (error) {
      console.error('Error loading initial data:', error);
      // If token is invalid, clear it
      api.logout();
    }
    setIsLoading(false);
  }, [loadListings, loadMessages, loadUsers]);

  // Load data from API on mount
  useEffect(() => {
    loadInitialData();
  }, [loadInitialData]);

  const handleRegister = async (formData) => {
    setError(null);
    try {
      const response = await api.register({
        email: formData.email,
        password: formData.password,
        type: formData.type,
      });
      
      // API returns { user: object, token: string } or similar
      const user = response.user || response;
      const normalizedUser = { ...user, id: user.id || user._id };
      setCurrentUser(normalizedUser);
      setCurrentView('dashboard');
      
      // Load initial data after registration
      await loadListings(normalizedUser);
      await loadMessages();
    } catch (error) {
      console.error('Registration error:', error);
      setError(error.message || 'Registration failed. Please try again.');
      throw error;
    }
  };

  const handleLogin = async (email, password) => {
    setError(null);
    try {
      const response = await api.login({ email, password });
      
      // API returns { user: object, token: string } or similar
      const user = response.user || response;
      const normalizedUser = { ...user, id: user.id || user._id };
      setCurrentUser(normalizedUser);
      setCurrentView(normalizedUser.type === 'admin' ? 'admin-dashboard' : 'dashboard');
      
      // Load user-specific data after login
      await Promise.all([
        loadListings(),
        loadMessages(),
        normalizedUser.type === 'admin' && loadUsers(),
      ]);
      
      return true;
    } catch (error) {
      console.error('Login error:', error);
      setError(error.message || 'Invalid email or password');
      return false;
    }
  };

  const handleLogout = async () => {
    api.logout();
    setCurrentUser(null);
    setUsers([]);
    setListings([]);
    setMessages([]);
    setCurrentView('landing');
  };

  const handleUpdateProfile = async (profileData) => {
    setError(null);
    try {
      const response = await api.updateProfile(profileData);
      // API returns { user: object } or just the user object
      const user = response.user || response;
      const normalizedUser = { ...user, id: user.id || user._id };
      setCurrentUser(normalizedUser);
    } catch (error) {
      console.error('Profile update error:', error);
      setError(error.message || 'Failed to update profile');
      throw error;
    }
  };

  const handleCreateListing = async (listingData, photos = []) => {
    setError(null);
    try {
      // Convert string numbers to actual numbers
      const processedData = {
        ...listingData,
        acreage: parseFloat(listingData.acreage),
        leaseDuration: parseInt(listingData.leaseDuration),
        rentPrice: parseFloat(listingData.rentPrice),
      };
      
      await api.createListing(processedData, photos);
      
      // Refresh listings
      await loadListings();
      setCurrentView('dashboard');
    } catch (error) {
      console.error('Create listing error:', error);
      setError(error.message || 'Failed to create listing');
      throw error;
    }
  };

  const handleSendMessage = async (listingId, content) => {
    setError(null);
    try {
      const listing = listings.find(l => (l.id === listingId) || (l._id === listingId));
      if (!listing) {
        throw new Error('Listing not found');
      }
      
      const toId = listing.ownerId?._id || listing.ownerId;
      
      await api.sendMessage({
        listingId: listing._id || listing.id,
        toId,
        content,
      });
      
      // Refresh messages
      await loadMessages();
    } catch (error) {
      console.error('Send message error:', error);
      setError(error.message || 'Failed to send message');
      throw error;
    }
  };

  const handleAdminAction = async (type, targetId, action) => {
    setError(null);
    try {
      if (type === 'user') {
        await api.updateUserStatus(targetId, action);
        // Refresh users and listings
        await loadUsers();
      } else if (type === 'listing') {
        await api.updateListingStatus(targetId, action);
        // Refresh listings
        await loadListings();
      }
    } catch (error) {
      console.error('Admin action error:', error);
      setError(error.message || 'Failed to perform admin action');
      throw error;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-green-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading Farm Konnect...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4 mx-4 mt-4 rounded">
          <p className="font-semibold">Error</p>
          <p>{error}</p>
          <button 
            onClick={() => setError(null)} 
            className="mt-2 text-sm underline"
          >
            Dismiss
          </button>
        </div>
      )}
      {currentView === 'landing' && <LandingPage onNavigate={setCurrentView} />}
      {currentView === 'register' && <RegisterPage onRegister={handleRegister} onNavigate={setCurrentView} />}
      {currentView === 'login' && <LoginPage onLogin={handleLogin} onNavigate={setCurrentView} />}
      
      {currentUser && currentView !== 'landing' && currentView !== 'register' && currentView !== 'login' && (
        <div className="flex flex-col md:flex-row min-h-screen">
          <Sidebar 
            user={currentUser} 
            currentView={currentView} 
            onNavigate={setCurrentView}
            onLogout={handleLogout}
            messageCount={messages.filter(m => {
              const toId = m.toId?._id || m.toId || m.toId;
              const userId = currentUser.id || currentUser._id;
              return toId?.toString() === userId?.toString() && !m.read;
            }).length}
            showMobile={showMobileMenu}
            onToggleMobile={() => setShowMobileMenu(!showMobileMenu)}
          />
          <main className="flex-1 p-4 md:p-8">
            <MobileHeader onToggleMenu={() => setShowMobileMenu(!showMobileMenu)} user={currentUser} />
            
            {currentView === 'dashboard' && (
              <Dashboard 
                user={currentUser} 
                listings={listings.filter(l => {
                  const ownerId = l.ownerId?._id || l.ownerId || l.ownerId;
                  const userId = currentUser.id || currentUser._id;
                  return ownerId?.toString() === userId?.toString();
                })}
                messages={messages.filter(m => {
                  const toId = m.toId?._id || m.toId || m.toId;
                  const fromId = m.fromId?._id || m.fromId || m.fromId;
                  const userId = currentUser.id || currentUser._id;
                  return toId?.toString() === userId?.toString() || fromId?.toString() === userId?.toString();
                })}
                onNavigate={setCurrentView}
              />
            )}
            
            {currentView === 'profile' && (
              <ProfilePage user={currentUser} onUpdate={handleUpdateProfile} />
            )}
            
            {currentView === 'create-listing' && currentUser.type === 'landowner' && (
              <CreateListingPage onSubmit={handleCreateListing} onCancel={() => setCurrentView('dashboard')} />
            )}
            
            {currentView === 'search-land' && currentUser.type === 'farmer' && (
              <SearchLandPage 
                listings={listings.filter(l => l.status === 'approved')} 
                onSelectListing={(listing) => {
                  setSelectedListing(listing);
                  setCurrentView('listing-detail');
                }}
              />
            )}
            
            {currentView === 'listing-detail' && selectedListing && (
              <ListingDetailPage 
                listing={selectedListing}
                currentUser={currentUser}
                onSendMessage={handleSendMessage}
                onBack={() => setCurrentView('search-land')}
              />
            )}
            
            {currentView === 'messages' && (
              <MessagesPage 
                messages={messages.filter(m => {
                  const toId = m.toId?._id || m.toId || m.toId;
                  const fromId = m.fromId?._id || m.fromId || m.fromId;
                  const userId = currentUser.id || currentUser._id;
                  return toId?.toString() === userId?.toString() || fromId?.toString() === userId?.toString();
                })}
                currentUser={currentUser}
                listings={listings}
                users={users}
              />
            )}
            
            {currentView === 'my-listings' && currentUser.type === 'landowner' && (
              <MyListingsPage 
                listings={listings.filter(l => {
                  const ownerId = l.ownerId?._id || l.ownerId || l.ownerId;
                  const userId = currentUser.id || currentUser._id;
                  return ownerId?.toString() === userId?.toString();
                })}
                onNavigate={setCurrentView}
              />
            )}
            
            {currentView === 'admin-dashboard' && currentUser.type === 'admin' && (
              <AdminDashboard 
                users={users}
                listings={listings}
                messages={messages}
                onAdminAction={handleAdminAction}
              />
            )}
          </main>
        </div>
      )}
    </div>
  );
};

export default FarmKonnectApp;