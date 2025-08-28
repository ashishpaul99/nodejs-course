// // 06-Express JS tutorial

// // eg-1: Basic Express Server
// const express=require('express');
// const app=express();
// const path=require("path");
// const port = process.env.PORT || 3500;

// app.get('/',(req,res)=>{
//     res.send("Hello World");
// });

// app.listen(port,()=>console.log(`Server is running on port ${port}`));

// // eg-2:
// const express=require('express');
// const app=express();
// const path=require("path");
// const port = process.env.PORT || 3500;

// app.get('/',(req,res)=>{
//     res.sendFile('./views/index.html',{root:__dirname});
// });

// app.listen(port,()=>console.log(`Server is running on port ${port}`));

// // Alternative
// const express=require('express');
// const app=express();
// const path=require("path");
// const port = process.env.PORT || 3500;

// app.get(/^\/$|\/index.html/,(req,res)=>{
//     res.sendFile(path.join(__dirname,'views','index.html'));
// });

// app.listen(port,()=>console.log(`Server is running on port ${port}`));

// // eg-3: accessing another page
// const express = require('express');
// const app = express();
// const path = require("path");
// const port = process.env.PORT || 3500;

// // Matches "/", "/index", or "/index.html"
// app.get(/^\/$|\/index(.html)?/, (req, res) => {
//     res.sendFile(path.join(__dirname, 'views', 'index.html'));
// });

// // Matches "/new-page" or "/new-page.html"
// app.get(/^\/new-page(.html)?/, (req, res) => {
//     res.sendFile(path.join(__dirname, 'views', 'new-page.html'));
// });

// app.listen(port, () => console.log(`Server is running on port ${port}`));

// // eg-4: redirecting
// // ->express handles this routes like water fall
// const express = require('express');
// const app = express();
// const path = require("path");
// const port = process.env.PORT || 3500;

// // Matches "/", "/index", or "/index.html"
// app.get(/^\/$|\/index(.html)?/, (req, res) => {
//     res.sendFile(path.join(__dirname, 'views', 'index.html'));
// });

// // Matches "/new-page" or "/new-page.html"
// app.get(/^\/new-page(.html)?$/, (req, res) => {
//     res.sendFile(path.join(__dirname, 'views', 'new-page.html'));
// });

// // Redirect /old-page(.html)? to /new-page.html
// // Default is 302 (temporary), but use 301 for permanent redirect
// app.get(/^\/old-page(.html)?$/, (req, res) => {
//     res.redirect(301, '/new-page.html');
// });

// app.listen(port, () => console.log(`Server is running on port ${port}`));

// // eg-5: Handle 404 - This middleware runs if no route is matched
// const express = require('express');
// const app = express();
// const path = require("path");
// const port = process.env.PORT || 3500;

// app.get(/^\/$|\/index(.html)?/, (req, res) => {
//     res.sendFile(path.join(__dirname, 'views', 'index.html'));
// });

// app.get(/^\/new-page(.html)?$/, (req, res) => {
//     res.sendFile(path.join(__dirname, 'views', 'new-page.html'));
// });

// app.get(/^\/old-page(.html)?$/, (req, res) => {
//     res.redirect(301, '/new-page.html');
// });

// // Handle 404 - This middleware runs if no route is matched
// // Sends custom 404.html file with status code 404
// app.use((req, res) => {
//     res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
// });

// app.listen(port, () => console.log(`Server is running on port ${port}`));

// // eg-6: Function chaining in Express
// const express = require('express');
// const app = express();
// const path = require("path");
// const port = process.env.PORT || 3500;

// // First handler logs the attempt, then passes control to the next handler
// // Second handler sends the actual response
// app.get(/^\/hello(.html)?$/,
//     (req, res, next) => {
//         console.log("attempting to load hello.html");
//         next();
//     },
//     (req, res) => {
//         res.send("Hello World");
//     }
// );

// app.listen(port, () => console.log(`Server is running on port ${port}`));

// // eg-7: Route handler chaining (middleware-like behavior)
const express = require('express');
const app = express();
const path = require("path");
const port = process.env.PORT || 3500;

// Middleware-like handlers
const one = (req, res, next) => {
    console.log("one");
    next(); // Pass control to the next function
};

const two = (req, res, next) => {
    console.log("two");
    next(); // Pass control to the next function
};

const three = (req, res) => {
    console.log("three");
    res.send("finished"); // Final response
};

// Route "/chain" or "/chain.html" executes handlers in sequence: one -> two -> three
app.get(/^\/chain(.html)?$/, [one, two, three]);

app.listen(port, () => console.log(`Server is running on port ${port}`));