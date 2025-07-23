// controllers/supportController.js
import SupportRequest from '../models/SupportRequest.model.js';
import Purchase from '../models/Purchase.model.js';
import { sendMail } from '../utils/mailer.js';
import { v2 as cloudinary } from 'cloudinary'
import multer from 'multer';
cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET 
});

const upload = multer({ storage: multer.memoryStorage() });

export const createSupportRequest = async (req, res) => {
  try {
    const { id: clientId, name: clientName, email: clientEmail } = req.user;
    const { purchaseId, message } = req.body;
   const purchase = await Purchase.findOne({ 
      _id: purchaseId, 
      clientId 
    });
      if (!purchase) {
      return res.status(404).json({ error: 'Purchase not found or unauthorized' });
    }
    // Handle file uploads
    const attachments = [];
    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        const result = await cloudinary.uploader.upload_stream(
          { resource_type: 'auto' },
          (error, result) => {
            if (error) throw error;
            return result;
          }
        ).end(file.buffer);
        
        attachments.push({
          url: result.secure_url,
          name: file.originalname
        });
      }
    }

    const supportRequest = await SupportRequest.create({
      clientId,
      purchaseId,
      message,
      responses: [{
        message,
        from: 'client'
      }]
    });

    // Send email notification
    await sendMail({
      to: process.env.SUPPORT_EMAIL || 'support@click2biz.in',
      subject: `New Support Request - Order #${purchaseId.toString().slice(-6)}`,
      html: `
        <h2>New Support Request</h2>
        <p><strong>Client:</strong> ${clientName} (${clientEmail})</p>
        <p><strong>Order:</strong> ${purchase.items.map(i => i.name).join(', ')}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
        <p>Please respond within 24 hours.</p>
      `
    });

    res.status(201).json(supportRequest);
  } catch (error) {
    console.error('Support request error:', error);
    res.status(500).json({ error: error.message });
  }
};

export const getSupportRequests = async (req, res) => {
  try {
    const { role, id } = req.user;
    let filter = {};

    if (role === 'client') {
      filter.clientId = id;
    }

    const requests = await SupportRequest.find(filter)
      .populate('purchaseId', 'items total status')
      .sort({ createdAt: -1 });

    res.json(requests);
  } catch (error) {
    console.error('Get support requests error:', error);
    res.status(500).json({ error: error.message });
  }
};

export const addSupportResponse = async (req, res) => {
  try {
    const { id } = req.params;
    const { message, from } = req.body;
    const { name } = req.user;

    const request = await SupportRequest.findByIdAndUpdate(
      id,
      {
        $push: {
          responses: {
            message,
            from: from || 'support'
          }
        },
        $set: {
          status: from === 'client' ? 'open' : 'in-progress'
        }
      },
      { new: true }
    );

    if (!request) {
      return res.status(404).json({ error: 'Support request not found' });
    }

    // Send email notification
    const recipientEmail = from === 'support' ? request.clientEmail : process.env.SUPPORT_EMAIL;
    await sendMail({
      to: recipientEmail,
      subject: `Update on your support request #${id.slice(-6)}`,
      html: `
        <h2>Support Request Update</h2>
        <p><strong>From:</strong> ${name}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `
    });

    res.json(request);
  } catch (error) {
    console.error('Add response error:', error);
    res.status(500).json({ error: error.message });
  }
};