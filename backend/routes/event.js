import express from 'express';
import { addEventController } from '../controllers/eventController.js';
import { requireSignIn, isVendor } from '../middlewares/authMiddleware.js';
import eventModel from '../models/eventModel.js'; // Ensure Event model is imported

const router = express.Router();

// Add a new event (Only Vendors can add events)
router.post('/add', requireSignIn, isVendor, addEventController);

// Fetch all events (For Users)
router.get('/', async (req, res) => {
  try {
    const events = await eventModel.find();
    res.json(events);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch events' });
  }
});

// Fetch vendor-specific events (For Vendor Dashboard)
router.get('/vendor', requireSignIn, isVendor, async (req, res) => {
  try {
    const vendorEvents = await eventModel.find({ vendorId: req.user._id });
    res.json(vendorEvents);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch vendor events' });
  }
});

export default router;
