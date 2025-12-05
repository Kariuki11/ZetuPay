const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
const walletRoutes = require('./routes/wallet');
const cryptoRoutes = require('./routes/crypto');
const investRoutes = require('./routes/invest');

app.use('/api/wallet', walletRoutes);
app.use('/api/crypto', cryptoRoutes);
app.use('/api/invest', investRoutes);

app.get('/', (req, res) => {
  res.send('AfriFlow API Server is Running');
});

app.listen(PORT, () => {
  console.log(`AfriFlow Server running on port ${PORT}`);
});