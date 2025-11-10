# Farm Konnect Backend API

Complete Express.js + MongoDB backend for the Farm Konnect MVP platform.

## 🚀 Features

- **User Authentication** - JWT-based auth with bcrypt password hashing
- **Role-Based Access Control** - Farmers, Landowners, and Admins
- **Land Listings Management** - CRUD operations with image uploads
- **Messaging System** - Internal communication between users
- **Admin Dashboard** - User and listing verification
- **Transaction Tracking** - Lease agreement management
- **File Uploads** - Multer for property photos (up to 5MB)
- **Security** - CORS, input validation, rate limiting ready

## 📋 Prerequisites

- Node.js (v16 or higher)
- MongoDB (v5 or higher)
- npm or yarn

## 🔧 Installation

### 1. Clone and Install Dependencies

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install
```

### 2. Environment Setup

```bash
# Copy environment template
cp .env.example .env

# Edit .env file with your configuration
nano .env
```

**Required Environment Variables:**
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/farmkonnect
JWT_SECRET=your-super-secret-jwt-key-min-32-characters
FRONTEND_URL=http://localhost:3000
```

### 3. Start MongoDB

**Local MongoDB:**
```bash
mongod
```

**Or use MongoDB Atlas (Cloud):**
- Sign up at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
- Create a cluster
- Get connection string and add to `.env`

### 4. Seed Database (Optional but Recommended)

```bash
npm run seed
```

This creates:
- 1 Admin account
- 3 Farmer accounts (2 approved, 1 pending)
- 3 Landowner accounts (2 approved, 1 pending)
- 7 Sample listings (6 approved, 1 pending)

### 5. Start Server

**Development Mode (with auto-reload):**
```bash
npm run dev
```

**Production Mode:**
```bash
npm start
```

Server will run on `http://localhost:5000`

## 📁 Project Structure

```
backend/
├── config/
│   └── database.js          # MongoDB connection
├── models/
│   ├── User.js              # User model
│   ├── Listing.js           # Listing model
│   ├── Message.js           # Message model
│   └── Transaction.js       # Transaction model
├── routes/
│   ├── auth.js              # Authentication routes
│   ├── users.js             # User profile routes
│   ├── listings.js          # Listing CRUD routes
│   ├── messages.js          # Messaging routes
│   ├── admin.js             # Admin routes
│   └── transactions.js      # Transaction routes
├── middleware/
│   ├── auth.js              # JWT authentication middleware
│   └── upload.js            # Multer file upload configuration
├── uploads/                 # Uploaded images directory
├── server.js                # Main application file
├── seed.js                  # Database seeding script
├── package.json             # Dependencies and scripts
├── .env.example             # Environment template
└── README.md                # This file
```

## 🔐 API Endpoints

### Authentication

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/auth/register` | Register new user | No |
| POST | `/api/auth/login` | Login user | No |
| GET | `/api/auth/me` | Get current user | Yes |

### User Profile

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| PUT | `/api/users/profile` | Update profile | Yes |
| GET | `/api/users/:userId` | Get user by ID | Yes |

### Land Listings

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/listings` | Create listing | Yes (Landowner) |
| GET | `/api/listings` | Get all approved listings | Yes |
| GET | `/api/listings/:id` | Get listing by ID | Yes |
| GET | `/api/listings/my/all` | Get user's listings | Yes |
| PUT | `/api/listings/:id` | Update listing | Yes (Owner) |
| DELETE | `/api/listings/:id` | Delete listing | Yes (Owner) |

### Messaging

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/messages` | Send message | Yes |
| GET | `/api/messages/listing/:id` | Get listing messages | Yes |
| GET | `/api/messages/my/all` | Get all user messages | Yes |
| PUT | `/api/messages/:id/read` | Mark as read | Yes |

### Admin

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/admin/users` | Get all users | Yes (Admin) |
| PUT | `/api/admin/users/:id/status` | Update user status | Yes (Admin) |
| GET | `/api/admin/listings` | Get all listings | Yes (Admin) |
| PUT | `/api/admin/listings/:id/status` | Update listing status | Yes (Admin) |
| GET | `/api/admin/stats` | Get platform statistics | Yes (Admin) |

### Transactions

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/transactions` | Create transaction | Yes (Admin) |
| GET | `/api/transactions/:id` | Get transaction | Yes |

## 🧪 Testing API with Sample Accounts

### Admin Account
```
Email: admin@farmkonnect.com
Password: admin123
```

### Farmer Accounts
```
Email: john.farmer@example.com
Password: password123
Status: Approved

Email: mary.farmer@example.com
Password: password123
Status: Approved

Email: james.farmer@example.com
Password: password123
Status: Pending
```

### Landowner Accounts
```
Email: chief.landowner@example.com
Password: password123
Status: Approved

Email: mrs.landowner@example.com
Password: password123
Status: Approved
```

## 📝 API Usage Examples

### Register a New User

```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "newfarmer@example.com",
    "password": "password123",
    "type": "farmer"
  }'
```

### Login

```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john.farmer@example.com",
    "password": "password123"
  }'
```

Response includes JWT token:
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": { ... }
}
```

### Get Listings (Authenticated)

```bash
curl -X GET http://localhost:5000/api/listings \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### Create Listing (Landowner)

```bash
curl -X POST http://localhost:5000/api/listings \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "50 Acre Farm in Ogun State",
    "landType": "arable",
    "acreage": 50,
    "city": "Abeokuta",
    "state": "Ogun",
    "features": ["Water Source", "Road Access"],
    "leaseDuration": 24,
    "rentPrice": 150000,
    "description": "Prime farmland with excellent access"
  }'
```

## 🔒 Security Features

- **Password Hashing** - bcrypt with salt rounds
- **JWT Authentication** - Secure token-based auth
- **CORS Protection** - Configured for frontend domain
- **Input Validation** - Mongoose schema validation
- **File Upload Limits** - 5MB max per image
- **Rate Limiting Ready** - Can be enabled in production

## 🚀 Deployment

### Deploy to Heroku

```bash
# Login to Heroku
heroku login

# Create app
heroku create farm-konnect-api

# Set environment variables
heroku config:set JWT_SECRET=your-production-secret
heroku config:set MONGODB_URI=your-mongodb-atlas-uri

# Deploy
git push heroku main
```

### Deploy to Railway/Render

1. Connect GitHub repository
2. Set environment variables in dashboard
3. Deploy automatically on git push

### MongoDB Atlas Setup (Production)

1. Go to [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Create free cluster
3. Whitelist all IPs: `0.0.0.0/0` (or specific IPs)
4. Create database user
5. Get connection string
6. Add to `.env` as `MONGODB_URI`

## 📊 Database Schema

### User
```javascript
{
  email: String (unique),
  password: String (hashed),
  type: String (farmer|landowner|admin),
  status: String (pending|approved|rejected),
  profile: {
    fullName: String,
    phone: String,
    location: String,
    bio: String,
    // Farmer-specific
    experience: String,
    farmingType: String,
    references: String
  }
}
```

### Listing
```javascript
{
  ownerId: ObjectId (ref: User),
  ownerName: String,
  title: String,
  landType: String (arable|pasture|orchard|mixed),
  acreage: Number,
  city: String,
  state: String,
  features: [String],
  leaseDuration: Number (months),
  rentPrice: Number,
  description: String,
  photos: [String],
  status: String (pending|approved|rejected|rented),
  views: Number
}
```

### Message
```javascript
{
  listingId: ObjectId (ref: Listing),
  fromId: ObjectId (ref: User),
  toId: ObjectId (ref: User),
  fromName: String,
  content: String,
  read: Boolean,
  timestamp: Date
}
```

### Transaction
```javascript
{
  listingId: ObjectId (ref: Listing),
  landowner: ObjectId (ref: User),
  farmer: ObjectId (ref: User),
  totalAmount: Number,
  platformFee: Number,
  status: String,
  paymentDetails: Object
}
```

## 🐛 Troubleshooting

### MongoDB Connection Issues

```bash
# Check if MongoDB is running
ps aux | grep mongod

# Start MongoDB
mongod

# Or use MongoDB Atlas connection string
```

### Port Already in Use

```bash
# Find process on port 5000
lsof -i :5000

# Kill process
kill -9 <PID>

# Or change PORT in .env
```

### CORS Errors

Update `FRONTEND_URL` in `.env` to match your frontend:
```env
FRONTEND_URL=http://localhost:3000
```

## 📞 Support

For issues or questions:
- Check the documentation above
- Review error logs in console
- Verify environment variables are set correctly

## 📄 License

ISC License - Free to use for Farm Konnect MVP

---

**Built with ❤️ for Farm Konnect MVP**

