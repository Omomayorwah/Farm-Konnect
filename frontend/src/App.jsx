import React, { useState, useEffect } from 'react';
import storage from './utils/storage';
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

  // Load data from storage on mount
  useEffect(() => {
    loadAllData();
  }, []);

  const loadAllData = async () => {
    setIsLoading(true);
    try {
      // Load users
      const userKeys = await storage.list('user:');
      const loadedUsers = [];
      for (const key of userKeys) {
        const user = await storage.get(key);
        if (user) loadedUsers.push(user);
      }
      
      // Load listings
      const listingKeys = await storage.list('listing:');
      const loadedListings = [];
      for (const key of listingKeys) {
        const listing = await storage.get(key);
        if (listing) loadedListings.push(listing);
      }
      
      // Load messages
      const messageKeys = await storage.list('message:');
      const loadedMessages = [];
      for (const key of messageKeys) {
        const message = await storage.get(key);
        if (message) loadedMessages.push(message);
      }
      
      // Load current user
      const currentUserId = await storage.get('currentUser');
      if (currentUserId) {
        const user = loadedUsers.find(u => u.id === currentUserId);
        if (user) {
          setCurrentUser(user);
          setCurrentView(user.type === 'admin' ? 'admin-dashboard' : 'dashboard');
        }
      }
      
      setUsers(loadedUsers);
      setListings(loadedListings);
      setMessages(loadedMessages);
    } catch (error) {
      console.error('Error loading data:', error);
    }
    setIsLoading(false);
  };

  const saveUser = async (user) => {
    await storage.set(`user:${user.id}`, user);
    setUsers(prev => {
      const filtered = prev.filter(u => u.id !== user.id);
      return [...filtered, user];
    });
  };

  const saveListing = async (listing) => {
    await storage.set(`listing:${listing.id}`, listing);
    setListings(prev => {
      const filtered = prev.filter(l => l.id !== listing.id);
      return [...filtered, listing];
    });
  };

  const saveMessage = async (message) => {
    await storage.set(`message:${message.id}`, message);
    setMessages(prev => [...prev, message]);
  };

  const handleRegister = async (formData) => {
    const newUser = {
      id: `user_${Date.now()}`,
      email: formData.email,
      password: formData.password,
      type: formData.type,
      status: 'pending',
      profile: formData.type === 'farmer' ? {
        fullName: '',
        phone: '',
        location: '',
        experience: '',
        farmingType: '',
        bio: '',
        references: ''
      } : {
        fullName: '',
        phone: '',
        location: '',
        bio: ''
      },
      createdAt: new Date().toISOString()
    };
    
    await saveUser(newUser);
    await storage.set('currentUser', newUser.id);
    setCurrentUser(newUser);
    setCurrentView('dashboard');
  };

  const handleLogin = async (email, password) => {
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
      await storage.set('currentUser', user.id);
      setCurrentUser(user);
      setCurrentView(user.type === 'admin' ? 'admin-dashboard' : 'dashboard');
      return true;
    }
    return false;
  };

  const handleLogout = async () => {
    await storage.set('currentUser', null);
    setCurrentUser(null);
    setCurrentView('landing');
  };

  const handleUpdateProfile = async (profileData) => {
    const updatedUser = { ...currentUser, profile: { ...currentUser.profile, ...profileData } };
    await saveUser(updatedUser);
    setCurrentUser(updatedUser);
  };

  const handleCreateListing = async (listingData) => {
    const newListing = {
      id: `listing_${Date.now()}`,
      ownerId: currentUser.id,
      ownerName: currentUser.profile.fullName,
      status: 'pending',
      ...listingData,
      createdAt: new Date().toISOString()
    };
    
    await saveListing(newListing);
    setCurrentView('dashboard');
  };

  const handleSendMessage = async (listingId, content) => {
    const listing = listings.find(l => l.id === listingId);
    const newMessage = {
      id: `msg_${Date.now()}`,
      listingId,
      fromId: currentUser.id,
      toId: listing.ownerId,
      fromName: currentUser.profile.fullName,
      content,
      timestamp: new Date().toISOString(),
      read: false
    };
    
    await saveMessage(newMessage);
  };

  const handleAdminAction = async (type, targetId, action) => {
    if (type === 'user') {
      const user = users.find(u => u.id === targetId);
      if (user) {
        user.status = action;
        await saveUser(user);
      }
    } else if (type === 'listing') {
      const listing = listings.find(l => l.id === targetId);
      if (listing) {
        listing.status = action;
        await saveListing(listing);
      }
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
            messageCount={messages.filter(m => m.toId === currentUser.id && !m.read).length}
            showMobile={showMobileMenu}
            onToggleMobile={() => setShowMobileMenu(!showMobileMenu)}
          />
          <main className="flex-1 p-4 md:p-8">
            <MobileHeader onToggleMenu={() => setShowMobileMenu(!showMobileMenu)} user={currentUser} />
            
            {currentView === 'dashboard' && (
              <Dashboard 
                user={currentUser} 
                listings={listings.filter(l => l.ownerId === currentUser.id)}
                messages={messages.filter(m => m.toId === currentUser.id || m.fromId === currentUser.id)}
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
                messages={messages.filter(m => m.toId === currentUser.id || m.fromId === currentUser.id)}
                currentUser={currentUser}
                listings={listings}
                users={users}
              />
            )}
            
            {currentView === 'my-listings' && currentUser.type === 'landowner' && (
              <MyListingsPage 
                listings={listings.filter(l => l.ownerId === currentUser.id)}
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

