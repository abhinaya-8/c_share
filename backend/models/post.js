const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  title: String,
  description: String,
  skills: [String],
  price: Number, 
  type: { type: String, enum: ['work','hire'], default: 'work' },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  attachments: [String], 
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Post', PostSchema);
const upload = require('../middleware/upload');
router.post('/', auth, upload.array('attachments', 5), createPost);
