
const express = require('express');
const connectDB = require('./db');
const cors = require('cors');
const path = require('path');

const app = express();

// Connect Database
connectDB();

// Init Middleware
app.use(express.json({ extended: false }));
app.use(cors());

// Define Routes
app.use('/api/users', require('./routes/users'));
app.use('/api/profiles', require('./routes/profiles'));
app.use('/api/jobs', require('./routes/jobs'));

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static(path.resolve(__dirname, '../../FAVORK/dist')));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../../FAVORK/dist', 'index.html'));
  });
} else {
  app.get('/', (req, res) => res.send('API Running'));
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));