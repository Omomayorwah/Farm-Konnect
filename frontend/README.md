# Farm Konnect

A platform connecting landowners with vetted farmers to monetize idle land or find farmland opportunities.

## Project Structure

```
farm-konnect/
├── public/
│   └── index.html          # HTML template
├── src/
│   ├── components/         # Reusable UI components
│   │   ├── MobileHeader.jsx
│   │   ├── QuickActionCard.jsx
│   │   ├── Sidebar.jsx
│   │   └── StatusBadge.jsx
│   ├── pages/              # Page components
│   │   ├── AdminDashboard.jsx
│   │   ├── CreateListingPage.jsx
│   │   ├── Dashboard.jsx
│   │   ├── LandingPage.jsx
│   │   ├── ListingDetailPage.jsx
│   │   ├── LoginPage.jsx
│   │   ├── MessagesPage.jsx
│   │   ├── MyListingsPage.jsx
│   │   ├── ProfilePage.jsx
│   │   ├── RegisterPage.jsx
│   │   └── SearchLandPage.jsx
│   ├── utils/              # Utility functions
│   │   └── storage.js      # Storage abstraction layer
│   ├── App.jsx             # Main application component
│   ├── index.js            # Application entry point
│   └── index.css           # Global styles with Tailwind
├── package.json
├── tailwind.config.js
├── postcss.config.js
└── README.md
```

## Features

- **User Management**: Registration and login for farmers and landowners
- **Land Listings**: Create, search, and manage land listings
- **Messaging**: Communication between farmers and landowners
- **Admin Dashboard**: User and listing approval system
- **Profile Management**: Complete profiles for farmers and landowners
- **Responsive Design**: Mobile-friendly interface

## Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

## Technologies

- React 18
- Tailwind CSS
- Lucide React (icons)
- Local storage API (via window.storage)

## User Types

- **Farmer**: Can search for land, view listings, and message landowners
- **Landowner**: Can create listings, manage properties, and communicate with farmers
- **Admin**: Can approve/reject users and listings

