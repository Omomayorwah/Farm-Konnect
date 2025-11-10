import React, { useState } from 'react';

const MessagesPage = ({ messages, currentUser, listings, users }) => {
  const [selectedConversation, setSelectedConversation] = useState(null);
  
  const conversations = {};
  messages.forEach(msg => {
    const otherUserId = msg.fromId === currentUser.id ? msg.toId : msg.fromId;
    const key = `${msg.listingId}-${otherUserId}`;
    if (!conversations[key]) {
      conversations[key] = {
        listingId: msg.listingId,
        otherUserId,
        messages: []
      };
    }
    conversations[key].messages.push(msg);
  });
  
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Messages</h1>
      
      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-1 bg-white rounded-xl shadow">
          <div className="p-4 border-b">
            <h3 className="font-bold text-gray-800">Conversations</h3>
          </div>
          <div className="divide-y">
            {Object.values(conversations).map((conv, idx) => {
              const listing = listings.find(l => l.id === conv.listingId);
              const otherUser = users.find(u => u.id === conv.otherUserId);
              const lastMsg = conv.messages[conv.messages.length - 1];
              
              return (
                <button
                  key={idx}
                  onClick={() => setSelectedConversation(conv)}
                  className="w-full p-4 hover:bg-gray-50 text-left"
                >
                  <p className="font-semibold text-gray-800">{otherUser?.profile.fullName || 'User'}</p>
                  <p className="text-sm text-gray-600 truncate">{listing?.title || 'Listing'}</p>
                  <p className="text-xs text-gray-500 truncate">{lastMsg.content}</p>
                </button>
              );
            })}
          </div>
          
          {Object.keys(conversations).length === 0 && (
            <div className="p-8 text-center text-gray-500">
              No messages yet
            </div>
          )}
        </div>
        
        <div className="md:col-span-2 bg-white rounded-xl shadow">
          {selectedConversation ? (
            <div className="h-96 flex flex-col">
              <div className="p-4 border-b">
                <p className="font-bold text-gray-800">
                  {listings.find(l => l.id === selectedConversation.listingId)?.title || 'Conversation'}
                </p>
              </div>
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {selectedConversation.messages.map(msg => (
                  <div key={msg.id} className={`flex ${msg.fromId === currentUser.id ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-xs p-3 rounded-lg ${
                      msg.fromId === currentUser.id ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-800'
                    }`}>
                      <p className="text-sm">{msg.content}</p>
                      <p className="text-xs mt-1 opacity-70">
                        {new Date(msg.timestamp).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="h-96 flex items-center justify-center text-gray-500">
              Select a conversation to view messages
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessagesPage;

