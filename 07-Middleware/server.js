// eg-1:
// const express = require("express");
// const path = require("path");
// const app = express();
// const {logger}=require("./middleware/logEvents");
// const port = process.env.PORT || 3500;

// // custom middleware logger
// // const logEvents=require('./middleware/logEvents')
// // app.use((req,res,next)=>{
// //     logEvents(`${req.method}\t${req.header.orgin}\t${req.url}`,'reqLog.txt');
// //     console.log(`${req.method} ${req.path}`);
// //     next();
// // });

// // alternative
// app.use(logger);

// // built in middlewares

// // Middleware to parse form data (application/x-www-form-urlencoded) into req.body
// app.use(express.urlencoded({ extended: false }));

// // built in middleware for json
// app.use(express.json());

// // serve static files
// app.use(express.static(path.join(__dirname,'/public')));

// app.get(/^\/$|\/index(.html)?/, (req, res) => {
//     res.sendFile(path.join(__dirname, 'views', 'index.html'));
// });

// app.get(/^\/new-page(.html)?$/, (req, res) => {
//     res.sendFile(path.join(__dirname, 'views', 'new-page.html'));
// });

// app.get(/^\/old-page(.html)?$/, (req, res) => {
//     res.redirect(301, '/new-page.html');
// });

// app.use((req, res) => {
//     res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
// });

// app.listen(port, () => console.log(`Server is running on port ${port}`));


// eg-2: cors
// const express = require("express");
// const path = require("path");
// const app = express();
// const {logger}=require("./middleware/logEvents");
// const cors=require('cors');
// const port = process.env.PORT || 3500;


// // custom middleware - logger
// app.use(logger);

// app.use(cors());

// // built in middlewares
// // Middleware to parse form data (application/x-www-form-urlencoded) into req.body
// app.use(express.urlencoded({ extended: false }));

// // built in middleware for json
// app.use(express.json());

// // serve static files
// app.use(express.static(path.join(__dirname,'/public')));

// app.get(/^\/$|\/index(.html)?/, (req, res) => {
//     res.sendFile(path.join(__dirname, 'views', 'index.html'));
// });

// app.get(/^\/new-page(.html)?$/, (req, res) => {
//     res.sendFile(path.join(__dirname, 'views', 'new-page.html'));
// });

// app.get(/^\/old-page(.html)?$/, (req, res) => {
//     res.redirect(301, '/new-page.html');
// });

// app.use((req, res) => {
//     res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
// });

// app.listen(port, () => console.log(`Server is running on port ${port}`));


// eg-3:🔒 CORS Configuration: Allow only specific frontend domains to access backend
// condition || !origin → useful for tools like Postman or same-origin requests where origin may be undefined.

// const express = require("express");
// const path = require("path");
// const app = express();
// const {logger}=require("./middleware/logEvents");
// const cors=require('cors');
// const port = process.env.PORT || 3500;


// // custom middleware - logger
// app.use(logger);

// // third-party middleware - cors
// // list of web application domains that are allowed to access the backend server
// const whitelist = [
//   'https://www.yoursite.com',
//   'http://127.0.0.1:5500',
//   'http://localhost:3500',
//   'https://www.google.com'
// ];

// const corsOptions = {
//   origin: (origin, callback) => {
//     // if the domain is in the whitelist, then allow access
//     if (whitelist.indexOf(origin) !== -1 || !origin) {
//       // null --> no error, true --> allow origin
//       callback(null, true);
//     } else {
//       callback(new Error("Not allowed by CORS"));
//     }
//   },
//   optionsSuccessStatus: 200 // for successful OPTIONS pre-flight response
// };
// app.use(cors(corsOptions));

// app.use(express.urlencoded({ extended: false }));
// app.use(express.json());
// app.use(express.static(path.join(__dirname,'/public')));

// app.get(/^\/$|\/index(.html)?/, (req, res) => {
//     res.sendFile(path.join(__dirname, 'views', 'index.html'));
// });

// app.get(/^\/new-page(.html)?$/, (req, res) => {
//     res.sendFile(path.join(__dirname, 'views', 'new-page.html'));
// });

// app.get(/^\/old-page(.html)?$/, (req, res) => {
//     res.redirect(301, '/new-page.html');
// });

// app.use((req, res) => {
//     res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
// });

// // custom error handling
// // 500 ->server error
// app.use((err,req,res,next)=>{
//     console.log(err.stack);
//     res.status(500).send(err.message)
// })

// app.listen(port, () => console.log(`Server is running on port ${port}`));

// alternative:
// We can also tidy up the custom error by creating an errorHandler.js file in the middleware folder, 
// then move the function logic there and export it.

// const express = require("express");
// const path = require("path");
// const app = express();
// const {logger}=require("./middleware/logEvents");
// const cors=require('cors');
// const port = process.env.PORT || 3500;

// // import error handler 
// const errorHandler=require('./middleware/errorHandler');

// // custom middleware - logger
// app.use(logger);

// // third-party middleware - cors
// // list of web application domains that are allowed to access the backend server
// const whitelist = [
//   'https://www.yoursite.com',
//   'http://127.0.0.1:5500',
//   'http://localhost:3500',
//   'https://www.google.com'
// ];

// const corsOptions = {
//   origin: (origin, callback) => {
//     // if the domain is in the whitelist, then allow access
//     if (whitelist.indexOf(origin) !== -1 || !origin) {
//       // null --> no error, true --> allow origin
//       callback(null, true);
//     } else {
//       callback(new Error("Not allowed by CORS"));
//     }
//   },
//   optionsSuccessStatus: 200 // for successful OPTIONS pre-flight response
// };
// app.use(cors(corsOptions));

// app.use(express.urlencoded({ extended: false }));
// app.use(express.json());
// app.use(express.static(path.join(__dirname,'/public')));

// app.get(/^\/$|\/index(.html)?/, (req, res) => {
//     res.sendFile(path.join(__dirname, 'views', 'index.html'));
// });

// app.get(/^\/new-page(.html)?$/, (req, res) => {
//     res.sendFile(path.join(__dirname, 'views', 'new-page.html'));
// });

// app.get(/^\/old-page(.html)?$/, (req, res) => {
//     res.redirect(301, '/new-page.html');
// });

// app.use((req, res) => {
//     res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
// });

// // we can also tidy up the custom error by creating errorHandler in the middleware folder, 
// // pasting the function logic, exporting it, and also calling the logEvents.js function 
// // inside to log this error

// app.use(errorHandler);

// app.listen(port, () => console.log(`Server is running on port ${port}`));

// eg-4:
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
app.use(express.static(path.join(__dirname,'/public')));

app.get(/^\/$|\/index(.html)?/, (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.get(/^\/new-page(.html)?$/, (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'new-page.html'));
});

app.get(/^\/old-page(.html)?$/, (req, res) => {
    res.redirect(301, '/new-page.html');
});

// app.use((req, res) => {
//     res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
// });

// app.all()
// In Express v5, using "*" or "/*" is deprecated for route matching.
// Use regex (/.*/) or app.use() instead for a 404 handler.
// app.all(/.*/, (req, res) => {
//   res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
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



// we can also tidy up the custom error by creating errorHandler in the middleware folder, 
// pasting the function logic, exporting it, and also calling the logEvents.js function 
// inside to log this error

app.use(errorHandler);

app.listen(port, () => console.log(`Server is running on port ${port}`));


