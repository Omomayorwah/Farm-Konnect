import React from 'react';

const testimonials = [
  {
    quote: "Farm Konnect helped me find the perfect plot for my organic farming venture. The process was seamless and the landowner was a pleasure to work with.",
    author: "John Doe",
    title: "Organic Farmer",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    quote: "I had acres of unused land. Thanks to Farm Konnect, I now have a steady income from a reliable farmer. It's a win-win!",
    author: "Jane Smith",
    title: "Landowner",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    quote: "The platform is incredibly user-friendly. I listed my property and had inquiries within a week. Highly recommended!",
    author: "Samuel Green",
    title: "Landowner",
    avatar: "https://randomuser.me/api/portraits/men/56.jpg",
  },
];

const Testimonials = () => (
  <section className="py-20 bg-green-50">
    <div className="max-w-6xl mx-auto px-4">
      <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">What Our Users Say</h2>
      <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-8">
        {testimonials.map((testimonial, index) => (
          <div key={index} className="bg-white p-8 rounded-lg shadow-md">
            <p className="text-gray-600 mb-6 italic">"{testimonial.quote}"</p>
            <div className="flex items-center">
              <img src={testimonial.avatar} alt={testimonial.author} className="w-12 h-12 rounded-full mr-4" />
              <div>
                <p className="font-bold text-gray-800">{testimonial.author}</p>
                <p className="text-gray-500">{testimonial.title}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Testimonials;