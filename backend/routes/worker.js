// routes/worker.js
const express = require("express");
const router = express.Router();
const Work = require("../models/Work");

// Save worker details
router.post("/details", async (req, res) => {
  try {
    const { name, email, jobType, experience } = req.body;
    const work = new Work({ name, email, jobType, experience });
    await work.save();
    res.status(201).json({ message: "Worker details saved", work });
  } catch (err) {
    res.status(500).json({ error: "Server error: " + err.message });
  }
});

// Get workers by jobType
router.get("/by-job/:jobType", async (req, res) => {
  try {
    const { jobType } = req.params;
    // Case-insensitive match
    const workers = await Work.find({ jobType: new RegExp(`^${jobType}$`, "i") });
    res.json(workers);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch workers" });
  }
});

module.exports = router;
