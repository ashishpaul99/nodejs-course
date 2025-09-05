// Import mongoose
const mongoose = require('mongoose');

// Async function to connect to MongoDB
const connectDB = async () => {
  try {
    // Connect using the connection string stored in .env
    await mongoose.connect(process.env.DATABASE_URI, {
      useNewUrlParser: true,      // Parses MongoDB connection strings
      useUnifiedTopology: true    // Uses the new Server Discover and Monitoring engine
    });

    console.log("✅ MongoDB Connected Successfully");
  } catch (err) {
    console.error("❌ MongoDB Connection Error:", err.message);
    process.exit(1); // Exit process with failure
  }
};

// Export the function so it can be used in server.js
module.exports = connectDB;
