const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  projName: {
    type: String
  },
  user: {
    type: String
  },
  type: {
    type: String
  }
}, { timestamps: true });

module.exports = mongoose.model('projects', projectSchema);
