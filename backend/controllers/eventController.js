import eventModel from "../models/eventModel.js";

// Add Event Controller (only for vendors)
export const addEventController = async (req, res) => {
  try {
    const { title, description, price, images } = req.body;

    // Validation checks
    if (!title || !description || !price || !images) {
      return res.status(400).json({ error: "All fields are required" });
    }
    // Create and save the event
    const event = new eventModel({
      title,
      description,
      price,
      images,
      vendorId: req.user._id, // Get the vendor ID from the JWT
    });
    await event.save();

    res.status(201).json({
      success: true,
      message: "Event created successfully",
      event,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error creating event",
      error: error.message, // Send the error message for better debugging
    });
  }
};
