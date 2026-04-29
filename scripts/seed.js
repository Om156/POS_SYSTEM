require('dotenv').config();
const mongoose = require('mongoose');
const Menu = require('../models/Menu');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected for Seeding');
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

const menuItems = [
  { name: 'Masala Chai', price: 20, category: 'Beverages' },
  { name: 'Samosa', price: 15, category: 'Snacks' },
  { name: 'Vada Pav', price: 25, category: 'Snacks' },
  { name: 'Filter Coffee', price: 30, category: 'Beverages' },
  { name: 'Paneer Pakora', price: 50, category: 'Snacks' },
];

const seedDatabase = async () => {
  await connectDB();
  
  try {
    await Menu.deleteMany();
    console.log('Old menu items cleared');

    await Menu.insertMany(menuItems);
    console.log('New menu items seeded successfully');

    process.exit(0);
  } catch (error) {
    console.error(`Error with seeding data: ${error}`);
    process.exit(1);
  }
};

seedDatabase();
