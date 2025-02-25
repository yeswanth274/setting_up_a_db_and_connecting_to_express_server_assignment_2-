const express = require('express');
const mongoose = require('./db'); // Import MongoDB connection
const User = require('./schema'); // Import User schema

const app = express();
const port = 3010;

app.use(express.json()); // Middleware to parse JSON requests

// ✅ Test API to check if server is running
app.get('/api/test', (req, res) => {
  res.json({ message: 'Test route is working!' });
});

// ✅ Create POST API to store user data
app.post('/api/users', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    // Validate input
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Create user
    const newUser = new User({ name, email, password });
    await newUser.save();

    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: 'Email already exists' });
    }
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});