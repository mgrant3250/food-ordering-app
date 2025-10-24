const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const Order = require('./models/Order');
const User = require("./models/User");
const MenuItem = require('./models/MenuItem');
const authMiddleware = require("./middleware/authMiddleware")
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("Connected to MongoDB"))
.catch(err => console.error("MongoDB connection error:", err));

app.use('/images', express.static('public/images'));



app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: "Invalid email or password" });

    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(401).json({ message: "Invalid email or password" });

    const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: "1d" });

    res.json({ success: true, token, email });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error logging in" });
  }
});

app.post('/api/register', async (req, res) => {
  const { email, password } = req.body;

  try {
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: "Email already in use" });

    const newUser = new User({ email, password });
    await newUser.save();

    const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: "1d" });

    res.json({ success: true, token, email });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error registering user" });
  }
});

app.get('/api/menu', async (req, res) => {
  try {
    const items = await MenuItem.find(); 

    
    const grouped = items.reduce((acc, item) => {
      if (!acc[item.type + 's']) acc[item.type + 's'] = [];
      acc[item.type + 's'].push(item);
      return acc;
    }, {});

    res.json(grouped);
  } catch (err) {
    console.error("Error fetching menu:", err);
    res.status(500).json({ success: false, message: "Failed to load menu" });
  }
});


app.post('/api/order', authMiddleware, async (req, res) => {

  const email = req.user.email; 
  const cart = req.body.cart;
  try {
    if (!Array.isArray(cart) || cart.length === 0) {
      return res.status(400).json({ success: false, message: "Invalid order data" });
    }

    const total = cart.reduce((sum, item) => {
      return sum + (item.price * item.quantity);
    }, 0);


    const newOrder = new Order({ email, cart, total });
    await newOrder.save();
    res.json({ success: true, message: 'Order saved' });


  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Error saving order' });
  }
});


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});