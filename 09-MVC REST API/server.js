const express = require("express");
const path = require("path");
const app = express();
const {logger}=require("./middleware/logEvents");
const cors=require('cors');
const port = process.env.PORT || 3500;
const corsOptions=require('./config/corsOption')

// import error handler 
const errorHandler=require('./middleware/errorHandler');

// import cors 

// custom middleware - logger
app.use(logger);

// cross origing resource sharing
app.use(cors(corsOptions))
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Serving static files for root path (e.g., /style.css, /script.js)
app.use(express.static(path.join(__dirname, 'public')));

// Applying the router for root
app.use('/', require('./routes/root'));

// Employees router
app.use('/employees',require('./routes/api/employees'))

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


