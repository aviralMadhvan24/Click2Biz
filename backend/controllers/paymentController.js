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
import { sendMail } from '../utils/mailer.js'; // your mail util

export const verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_payment_id,
      razorpay_order_id,
      razorpay_signature,
      paymentId
    } = req.body;

    const generated_signature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest('hex');

    if (generated_signature !== razorpay_signature) {
      return res.status(400).json({ success: false, error: 'Invalid signature' });
    }

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

    // Mark purchase completed
    const purchaseRef = payment.purchase;
    const purchaseId = purchaseRef._id || purchaseRef;

    await Purchase.findByIdAndUpdate(purchaseId, { status: 'completed' });

    // 🎉 Send payment success email to client
    await sendMail({
      to: purchaseRef.clientEmail,
      subject: `Payment Successful — Click2Biz`,
      html: `
        <h3>Hi ${purchaseRef.clientName},</h3>
        <p>Your payment of ₹${(payment.amount/100).toLocaleString()} for your selected service bundle has been received successfully.</p>
        <p>We’ve started working on your services — you can track the progress from your <a href="https://click2biz.in/client-dashboard">dashboard</a>.</p>
        <br/>
        <p>Thank you for choosing Click2Biz 🚀</p>
      `
    });

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