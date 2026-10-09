
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');

dotenv.config();

const User = require('./model/user');
const Product = require('./model/products');

// connect to db
mongoose
  .connect(process.env.MONGO_URI || 'mongodb://localhost:27017/shopmow')
  .then(() => console.log('mongoDB connected for seeding'))
  .catch((err) => {
    console.error('mongoDB connection error:', err);
    process.exit(1);
  });

// dummy user created
const dummyUser = [
  {
    name: 'Admin user',
    email: 'admin@gmail.com',
    password: 'admin@123',
    role: 'admin',
    verified: true,
  },
  {
    name: 'Rajju',
    email: 'rajju@gmail.com',
    password: 'user@123',
    role: 'user',
    verified: true,
  },
  {
    name: 'anuragi',
    email: 'anuragi@gmail.com',
    password: 'user@123',
    role: 'user',
    verified: true,
  },
  {
    name: 'shyam',
    email: 'shyam@gmail.com',
    password: 'user@123',
    role: 'user',
    verified: true,
  },
  {
    name: ' raj',
    email: 'raj@gmail.com',
    password: 'user@123',
    role: 'user',
    verified: true,
  },
  {
    name: 'krishna',
    email: 'krishna@gmail.com',
    password: 'user@123',
    role: 'user',
    verified: true,
  },
];

const dummyProducts = [
  {
    name: 'Wireless Bluetooth Headphones',
    description: 'Over-ear headphones with noise cancellation and a long-lasting battery.',
    price: 2999,
    category: 'Electronics',
    stock: 25,
    imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e',
    rating: 4.5,
    numReviews: 120,
  },
  {
    name: 'Ergonomic Office Chair',
    description: 'Adjustable mesh chair with lumbar support for a comfortable workday.',
    price: 4999,
    category: 'Furniture',
    stock: 12,
    imageUrl: 'https://images.unsplash.com/photo-1580481077494-e3299acae537',
    rating: 2.5,
    numReviews: 110,
  },
  {
    name: 'Stainless Steel Water Bottle',
    description: 'Double-wall insulated bottle for keeping drinks cold or hot on the go.',
    price: 799,
    category: 'Accessories',
    stock: 50,
    imageUrl: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8',
    rating: 4.2,
    numReviews: 160,
  },
  {
    name: 'Mechanical Gaming Keyboard',
    description: 'Backlit mechanical keyboard with tactile switches for everyday gaming.',
    price: 2499,
    category: 'Electronics',
    stock: 30,
    imageUrl: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3',
    rating: 4.1,
    numReviews: 1200,
  },
  {
    name: 'Portable Bluetooth Speaker',
    description: 'Compact, water-resistant speaker with up to 12 hours of playback.',
    price: 1899,
    category: 'Electronics',
    stock: 18,
    imageUrl: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1',
    rating: 5.5,
    numReviews: 1120,
  },
  {
    name: 'Canvas Everyday Backpack',
    description: 'Durable backpack with a padded laptop sleeve and roomy main compartment.',
    price: 1599,
    category: 'Accessories',
    stock: 22,
    imageUrl: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62',
    rating: 3.5,
    numReviews: 20,
  },
];

// seed function
const seedDatabase = async () => {
  try {
    // Clear existing data
    await User.deleteMany({});
    await Product.deleteMany({});
    console.log('Cleared existing data');

    // hash password and insert users
    const userWithHashedPasswords = await Promise.all(
      dummyUser.map(async (user) => {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(user.password, salt);
        return {
          ...user,
          password: hashedPassword,
        };
      })
    );

    const createdUsers = await User.insertMany(userWithHashedPasswords);
    const createdProducts = await Product.insertMany(dummyProducts);

    console.log(`Seeded ${createdUsers.length} users and ${createdProducts.length} products`);
    console.log('\nDatabase seeded successfully!');
    console.log('\nLogin credentials:');
    console.log('Admin: admin@gmail.com / admin@123');
    console.log('User: rajju@gmail.com / user@123');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

// run seeder
seedDatabase();
