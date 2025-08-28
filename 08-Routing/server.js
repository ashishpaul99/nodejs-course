
const express = require("express");
const path = require("path");
const app = express();
const {logger}=require("./middleware/logEvents");
const cors=require('cors');
const port = process.env.PORT || 3500;

// import error handler 
const errorHandler=require('./middleware/errorHandler');

// custom middleware - logger
app.use(logger);

// third-party middleware - cors
// list of web application domains that are allowed to access the backend server
const whitelist = [
  'https://www.yoursite.com',
  'http://127.0.0.1:5500',
  'http://localhost:3500',
  'https://www.google.com'
];

const corsOptions = {
  origin: (origin, callback) => {
    // if the domain is in the whitelist, then allow access
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      // null --> no error, true --> allow origin
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  optionsSuccessStatus: 200 // for successful OPTIONS pre-flight response
};
app.use(cors(corsOptions));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Serving static files for root path (e.g., /style.css, /script.js)
app.use(express.static(path.join(__dirname, 'public')));

// Serving static files specifically for /subdir (e.g., /subdir/style.css)
app.use('/subdir', express.static(path.join(__dirname, 'public')));

// Applying the router for root
app.use('/', require('./routes/root'));

// Applying the router for subdir
app.use('/subdir', require('./routes/subdir'));

// This route does not serve static files; it only handles API requests for employees
app.use('/employees', require('./routes/api/employees'));



// app.use((req, res) => {
//     res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
// });

// 404 handler
// use regx
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

app.use(errorHandler);
app.listen(port, () => console.log(`Server is running on port ${port}`));


