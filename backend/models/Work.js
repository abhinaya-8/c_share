const mongoose = require("mongoose");

const WorkSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },   
  jobType: { type: String, required: true },
  experience: { type: String, required: true }
});

module.exports = mongoose.model("Work", WorkSchema);
