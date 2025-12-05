const express = require('express');
const router = express.Router();

// Mock Data for Global Stocks
const stocks = [
    { id: 'AAPL', name: 'Apple Inc.', price: 175.50 },
    { id: 'TSLA', name: 'Tesla, Inc.', price: 240.30 },
    { id: 'AMZN', name: 'Amazon.com', price: 130.00 },
];

// GET Available Stocks
router.get('/market', (req, res) => {
    res.json(stocks);
});

// BUY Fractional Shares
router.post('/buy', async (req, res) => {
    const { userId, stockId, amountUSD } = req.body;
    
    // Logic: Check user balance -> Deduct Amount -> Add Stock to User Portfolio
    // This requires Firestore transactions to ensure data integrity
    
    res.json({ 
        success: true, 
        message: `Successfully purchased $${amountUSD} of ${stockId}`,
        fee: amountUSD * 0.01 // Simulating low 1% fee for African market
    });
});

module.exports = router;