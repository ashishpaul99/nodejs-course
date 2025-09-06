const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define User Schema
const userSchema = new Schema({
  username: {
    type: String,
    required: true // must be provided
  },
  roles: {
    Admin: { type: Number },        // role ID for Admin
    Editor: { type: Number },       // role ID for Editor
    User: { 
      type: Number, 
      default: 2001 // default role if not specified
    }
  },
  password: {
    type: String,
    required: true // must be provided
  },
  refreshToken: {  // renamed from "refrenceToken"
    type: String   // optional, stored only when issued
  }
});

// Create and export the model (collection name: users)
module.exports = mongoose.model('User', userSchema);

