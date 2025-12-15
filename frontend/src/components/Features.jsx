import React from 'react';
import { ShieldCheck, Users, MessageSquare, LayoutGrid } from 'lucide-react';

const features = [
  {
    icon: <ShieldCheck size={48} className="text-green-500" />,
    title: 'Vetted Professionals',
    description: 'All farmers and landowners are verified to ensure quality and reliability.',
  },
  {
    icon: <Users size={48} className="text-green-500" />,
    title: 'Community Connection',
    description: 'Join a network of agricultural professionals and enthusiasts.',
  },
  {
    icon: <MessageSquare size={48} className="text-green-500" />,
    title: 'Direct Messaging',
    description: 'Communicate directly and securely with potential partners.',
  },
  {
    icon: <LayoutGrid size={48} className="text-green-500" />,
    title: 'Easy Listing Management',
    description: 'Create and manage your land listings with our intuitive dashboard.',
  },
];

const Features = () => (
  <section className="py-20 bg-gray-50">
    <div className="max-w-6xl mx-auto px-4">
      <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">Why Choose Farm Konnect?</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map((feature, index) => (
          <div key={index} className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
            <div className="mb-4">{feature.icon}</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">{feature.title}</h3>
            <p className="text-gray-600">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Features;