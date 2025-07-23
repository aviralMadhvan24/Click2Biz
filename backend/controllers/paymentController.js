import Razorpay from 'razorpay';
import crypto from 'crypto';
import Payment from '../models/Payment.model.js';
import Purchase from '../models/Purchase.model.js';
import 'dotenv/config';

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
});

// Create Razorpay Order
export const createRazorpayOrder = async (req, res) => {
  try {
    const { amount, currency = 'INR', purchaseId } = req.body;
    
    const options = {
      amount: amount * 100,
      currency,
      receipt: `order_${Date.now()}`
    };

    const order = await razorpay.orders.create(options);
    
    // Create payment record
    const payment = await Payment.create({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      purchase: purchaseId
    });

    res.json({
      id: order.id,
      amount: order.amount,
      currency: order.currency,
      paymentId: payment._id
    });
  } catch (error) {
    console.error('Razorpay order error:', error);
    res.status(500).json({ error: 'Failed to create order' });
  }
};

// Verify Payment
export const verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_payment_id,
      razorpay_order_id,
      razorpay_signature,
      paymentId
    } = req.body;
    
    // 1) Verify signature
    const generated_signature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest('hex');

    if (generated_signature !== razorpay_signature) {
      return res.status(400).json({ success: false, error: 'Invalid signature' });
    }

    // 2) Update Payment doc
    const payment = await Payment.findByIdAndUpdate(
      paymentId,
      {
        status: 'paid',
        razorpayPaymentId: razorpay_payment_id,
        razorpayOrderId: razorpay_order_id,
        razorpaySignature: razorpay_signature
      },
      { new: true }
    ).populate('purchase');

    if (!payment) {
      return res.status(404).json({ success: false, error: 'Payment record not found' });
    }

    // 3) Mark the associated Purchase as completed
    const purchaseRef = payment.purchase;
    const purchaseId = purchaseRef._id || purchaseRef;
    await Purchase.findByIdAndUpdate(purchaseId, { status: 'completed' });

    // 4) Respond back
    res.json({ success: true, payment });
  } catch (error) {
    console.error('Payment verification error:', error);
    res.status(500).json({ error: 'Payment verification failed' });
  }
};

// Get Payment Details
export const getPaymentDetails = async (req, res) => {
  try {
    const { paymentId } = req.params;
    const payment = await Payment.findById(paymentId);
    if (!payment) return res.status(404).json({ error: 'Payment not found' });
    res.json(payment);
  } catch (error) {
    console.error('Get payment error:', error);
    res.status(500).json({ error: 'Failed to get payment details' });
  }
};