const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const fs = require('fs');
const CARTS_FILE = './carts.json';

const app = express();

// Connect to database
connectDB().then(() => {
    console.log('MongoDB connected successfully');
}).catch(err => {
    console.error('MongoDB connection error:', err);
});

// Middleware
app.use(cors());
app.use(express.json());

// Temporary product database
const products = [
  {
    id: 'prod_001',
    name: 'Core T-Shirt',
    price: 29.99,
    description: 'Premium cotton crewneck',
    image: '/images/tshirt.jpg'
  },
  {
    id: 'prod_002',
    name: 'Core Hoodie',
    price: 59.99,
    description: 'Heavyweight zip-up hoodie',
    image: '/images/hoodie.jpg'
  }
];

let carts = new Map(); // UserID -> Cart

// Load carts from file
try {
  const data = fs.readFileSync(CARTS_FILE);
  carts = new Map(JSON.parse(data));
} catch (error) {
  console.log('No existing cart data');
}

// Save carts to file periodically
setInterval(() => {
  fs.writeFileSync(CARTS_FILE, JSON.stringify(Array.from(carts.entries())));
}, 30000);

// Core API Endpoints
app.get('/api/products', (req, res) => {
  res.json(products);
});

app.post('/api/cart', (req, res) => {
  try {
    const { productId } = req.body;
    
    // Validate product exists
    const product = products.find(p => p.id === productId);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    // Get or create user cart
    const userId = req.headers['x-user-id'] || 'guest';
    if (!carts.has(userId)) {
      carts.set(userId, { items: [], total: 0 });
    }

    // Update cart
    const userCart = carts.get(userId);
    const existingItem = userCart.items.find(item => item.productId === productId);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      userCart.items.push({
        productId,
        quantity: 1,
        price: product.price,
        addedAt: new Date()
      });
    }

    // Update totals
    userCart.total = userCart.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    res.json({
      success: true,
      cart: userCart
    });

  } catch (error) {
    console.error('Cart error:', error);
    res.status(500).json({ error: 'Failed to update cart' });
  }
});

app.post('/api/orders', (req, res) => {
  // Implement order logic here
});

// Payment Gateway Integration
const stripe = require('stripe')('sk_test_51P...');

// Payment Endpoints
app.post('/api/create-payment-intent', async (req, res) => {
  try {
    const { amount } = req.body;
    
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, // Convert to paise
      currency: 'inr',
      metadata: {
        userId: 'user_placeholder'
      }
    });

    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error('Payment error:', error);
    res.status(500).json({ error: 'Payment processing failed' });
  }
});

// Routes
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`)); 