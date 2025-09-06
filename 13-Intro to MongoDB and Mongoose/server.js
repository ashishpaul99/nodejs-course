// Load environment variables from .env
require('dotenv').config();

const express = require("express");
const path = require("path");
const app = express();
const cors = require('cors');
const port = process.env.PORT || 3500;
const corsOptions = require('./config/corsOption');
const { logger } = require("./middleware/logEvents");
const cookieParser=require('cookie-parser');

// import mongoose
const mongoose=require('mongoose');

// Import the database connection function
const connectDB = require('./config/dbConn');

// Call the function to connect to MongoDB
connectDB();


// Import credentials middleware
const credentials = require('./middleware/credentials');

// Import error handler middleware
const errorHandler = require('./middleware/errorHandler');

const verifyJWT=require('./middleware/verifyJWT');

// ------------------- Middleware ------------------- //

// Custom middleware for logging requests
app.use(logger);

// Use credentials middleware (handles Access-Control-Allow-Credentials)
app.use(credentials);

// Enable CORS with custom options
app.use(cors(corsOptions));

// Middleware to parse URL-encoded data (form submissions)
app.use(express.urlencoded({ extended: false }));

// Middleware to parse incoming JSON data
app.use(express.json());

// Middleware for cookies
app.use(cookieParser());

// Serve static files from the "public" folder (CSS, JS, images, etc.)
app.use(express.static(path.join(__dirname, 'public')));

// ------------------- Routes ------------------- //

// Root route
app.use('/', require('./routes/root'));

// Register route
app.use('/register', require('./routes/register'));

// auth route
app.use('/auth',require('./routes/auth'));

// Mount the refresh token route
// This endpoint is used to issue a new access token when the old one expires
app.use('/refresh', require('./routes/refresh'));

// Logout route  
//clear the refresh token and cookie  
app.use('/logout', require('./routes/logout'));


// Apply JWT verification middleware to all routes defined *after this line*
// Any route below will require a valid access token
app.use(verifyJWT);


// Employees API route
app.use('/employees', require('./routes/api/employees'));

// ------------------- 404 Handler ------------------- //
// Catch-all route handler for requests that don't match anything above
app.all(/.*/, (req, res) => {
  res.status(404);

  if (req.accepts('html')) {
    res.sendFile(path.join(__dirname, 'views', '404.html'));
  } else if (req.accepts('json')) {
    res.json({ error: "404 Not Found" });
  } else {
    res.type('txt').send("404 Not Found");
  }
});

// ------------------- Error Handler ------------------- //
app.use(errorHandler);

// ------------------- Start Server ------------------- //

// Run this only once when the MongoDB connection is open
mongoose.connection.once('open', () => {
  console.log('✅ Connected to MongoDB');

  // Start the Express server only after DB is ready
  app.listen(port, () => console.log(`🚀 Server running on port ${port}`));
});


