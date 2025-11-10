require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');
const Listing = require('./models/Listing');
const connectDB = require('./config/database');

const seedData = async () => {
  try {
    await connectDB();

    // Clear existing data
    await User.deleteMany({});
    await Listing.deleteMany({});

    console.log('Cleared existing data...');

    // Create Admin
    const admin = await User.create({
      email: 'admin@farmkonnect.com',
      password: 'admin123',
      type: 'admin',
      status: 'approved',
      profile: {
        fullName: 'Admin User',
        phone: '+234-000-000-0000',
        location: 'Lagos, Nigeria',
        bio: 'Farm Konnect Administrator',
      },
    });
    console.log('Admin created:', admin.email);

    // Create Farmers
    const farmer1 = await User.create({
      email: 'john.farmer@example.com',
      password: 'password123',
      type: 'farmer',
      status: 'approved',
      profile: {
        fullName: 'John Farmer',
        phone: '+234-801-234-5678',
        location: 'Abeokuta, Ogun',
        experience: '10',
        farmingType: 'crops',
        bio: 'Experienced crop farmer with 10 years of experience',
        references: 'Previous landowner: +234-802-345-6789',
      },
    });

    const farmer2 = await User.create({
      email: 'mary.farmer@example.com',
      password: 'password123',
      type: 'farmer',
      status: 'approved',
      profile: {
        fullName: 'Mary Okafor',
        phone: '+234-803-456-7890',
        location: 'Ibadan, Oyo',
        experience: '5',
        farmingType: 'livestock',
        bio: 'Livestock specialist focusing on poultry and goats',
        references: 'Previous employer: +234-804-567-8901',
      },
    });

    const farmer3 = await User.create({
      email: 'james.farmer@example.com',
      password: 'password123',
      type: 'farmer',
      status: 'pending',
      profile: {
        fullName: 'James Adeyemi',
        phone: '+234-805-678-9012',
        location: 'Osogbo, Osun',
        experience: '3',
        farmingType: 'mixed',
        bio: 'New farmer looking for opportunities',
        references: '',
      },
    });

    console.log('Farmers created:', farmer1.email, farmer2.email, farmer3.email);

    // Create Landowners
    const landowner1 = await User.create({
      email: 'chief.landowner@example.com',
      password: 'password123',
      type: 'landowner',
      status: 'approved',
      profile: {
        fullName: 'Chief Adebayo',
        phone: '+234-806-789-0123',
        location: 'Lagos, Lagos',
        bio: 'Landowner with multiple properties',
      },
    });

    const landowner2 = await User.create({
      email: 'mrs.landowner@example.com',
      password: 'password123',
      type: 'landowner',
      status: 'approved',
      profile: {
        fullName: 'Mrs. Chukwu',
        phone: '+234-807-890-1234',
        location: 'Enugu, Enugu',
        bio: 'Family-owned farmland',
      },
    });

    const landowner3 = await User.create({
      email: 'new.landowner@example.com',
      password: 'password123',
      type: 'landowner',
      status: 'pending',
      profile: {
        fullName: 'New Landowner',
        phone: '+234-808-901-2345',
        location: 'Port Harcourt, Rivers',
        bio: 'Recently acquired land',
      },
    });

    console.log('Landowners created:', landowner1.email, landowner2.email, landowner3.email);

    // Create Listings
    const listing1 = await Listing.create({
      ownerId: landowner1._id,
      ownerName: landowner1.profile.fullName,
      title: '50 Acre Arable Farm in Ogun State',
      landType: 'arable',
      acreage: 50,
      city: 'Abeokuta',
      state: 'Ogun',
      features: ['Water Source', 'Road Access', 'Electricity'],
      leaseDuration: 24,
      rentPrice: 150000,
      description: 'Prime farmland with excellent access to water and electricity. Perfect for crop production.',
      status: 'approved',
    });

    const listing2 = await Listing.create({
      ownerId: landowner1._id,
      ownerName: landowner1.profile.fullName,
      title: '30 Acre Pasture Land in Lagos',
      landType: 'pasture',
      acreage: 30,
      city: 'Lagos',
      state: 'Lagos',
      features: ['Fencing', 'Water Source', 'Road Access'],
      leaseDuration: 36,
      rentPrice: 200000,
      description: 'Well-maintained pasture land with fencing and water access. Ideal for livestock.',
      status: 'approved',
    });

    const listing3 = await Listing.create({
      ownerId: landowner2._id,
      ownerName: landowner2.profile.fullName,
      title: '25 Acre Mixed Use Farm in Enugu',
      landType: 'mixed',
      acreage: 25,
      city: 'Enugu',
      state: 'Enugu',
      features: ['Water Source', 'Irrigation', 'Storage Buildings'],
      leaseDuration: 18,
      rentPrice: 120000,
      description: 'Versatile farmland suitable for both crops and livestock.',
      status: 'approved',
    });

    const listing4 = await Listing.create({
      ownerId: landowner2._id,
      ownerName: landowner2.profile.fullName,
      title: '40 Acre Orchard in Oyo State',
      landType: 'orchard',
      acreage: 40,
      city: 'Ibadan',
      state: 'Oyo',
      features: ['Water Source', 'Road Access', 'Electricity', 'Irrigation'],
      leaseDuration: 48,
      rentPrice: 180000,
      description: 'Mature orchard with established irrigation system.',
      status: 'approved',
    });

    const listing5 = await Listing.create({
      ownerId: landowner1._id,
      ownerName: landowner1.profile.fullName,
      title: '20 Acre Farm in Osun State',
      landType: 'arable',
      acreage: 20,
      city: 'Osogbo',
      state: 'Osun',
      features: ['Water Source', 'Road Access'],
      leaseDuration: 12,
      rentPrice: 100000,
      description: 'Smaller farm perfect for starting farmers.',
      status: 'approved',
    });

    const listing6 = await Listing.create({
      ownerId: landowner2._id,
      ownerName: landowner2.profile.fullName,
      title: '60 Acre Premium Farm',
      landType: 'arable',
      acreage: 60,
      city: 'Port Harcourt',
      state: 'Rivers',
      features: ['Water Source', 'Road Access', 'Electricity', 'Irrigation', 'Storage Buildings'],
      leaseDuration: 60,
      rentPrice: 250000,
      description: 'Large premium farmland with all modern amenities.',
      status: 'approved',
    });

    const listing7 = await Listing.create({
      ownerId: landowner3._id,
      ownerName: landowner3.profile.fullName,
      title: '35 Acre New Farm Listing',
      landType: 'mixed',
      acreage: 35,
      city: 'Uyo',
      state: 'Akwa Ibom',
      features: ['Water Source', 'Road Access'],
      leaseDuration: 24,
      rentPrice: 140000,
      description: 'Newly listed farmland awaiting approval.',
      status: 'pending',
    });

    console.log('Listings created:', listing1.title, listing2.title, listing3.title, listing4.title, listing5.title, listing6.title, listing7.title);

    console.log('\n✅ Seed data created successfully!');
    console.log('\nSample Accounts:');
    console.log('Admin: admin@farmkonnect.com / admin123');
    console.log('Farmer: john.farmer@example.com / password123');
    console.log('Landowner: chief.landowner@example.com / password123');

    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedData();

