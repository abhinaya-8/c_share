const express = require("express");
const router = express.Router();
const Booking = require("../models/Booking");
const Work = require("../models/Work");

// Create a new booking
// ... (existing imports)

// Create a new booking
router.post("/book", async (req, res) => {
  try {
    const { workerId, customerName, customerEmail, customerPhone, customerAddress, jobType, bookingDate, bookingTime } = req.body;

    const worker = await Work.findById(workerId);
    if (!worker) {
      return res.status(404).json({ message: "Worker not found" });
    }

    const newBooking = new Booking({
      worker: workerId,
      workerName: worker.name,
      customerName,
      customerEmail,
      customerPhone,
      customerAddress,
      jobType,
      bookingDate,
      bookingTime,
    });

    await newBooking.save();
    res.status(201).json({ message: "Booking created successfully", booking: newBooking });
  } catch (err) {
    res.status(500).json({ error: "Server error: " + err.message });
  }
});

// ... (existing GET route)

module.exports = router;



