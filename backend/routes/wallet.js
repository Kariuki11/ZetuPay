const express = require('express');
const router = express.Router();
const { db } = require('../config/firebase');

// Mock function to simulate M-Pesa/Mobile Money API call
const triggerMobileMoneyPayment = async (phoneNumber, amount) => {
    // In production, this connects to Daraja API (Safaricom) or MTN Momo API
    console.log(`Triggering STK Push to ${phoneNumber} for $${amount}`);
    return true; 
};

// DEPOSIT via Mobile Money
router.post('/deposit', async (req, res) => {
    const { userId, phoneNumber, amount, currency } = req.body;

    try {
        // 1. Trigger Payment Gateway
        const paymentSuccess = await triggerMobileMoneyPayment(phoneNumber, amount);

        if (paymentSuccess) {
            // 2. Update Firestore Wallet
            const userRef = db.collection('users').doc(userId);
            const doc = await userRef.get();
            
            let currentBalance = 0;
            if (doc.exists) currentBalance = doc.data().walletBalance || 0;

            const newBalance = currentBalance + parseFloat(amount); // Simplified currency conversion
            
            await userRef.set({ walletBalance: newBalance }, { merge: true });

            return res.status(200).json({ 
                success: true, 
                message: "Deposit successful. Wallet updated.", 
                newBalance 
            });
        }
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

module.exports = router;