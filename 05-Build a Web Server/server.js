// // eg-1:
// // importing common core modules
// const http = require('http');
// const path = require('path');
// const fs = require('fs');
// const fsPromises = require('fs').promises;

// const logEvents = require("./logEvents");
// const EventEmitter = require('events');
// class Emitter extends EventEmitter {}

// // Intialing Object
// const myEmitter = new Emitter();

// // definig the port for the web server.
// // say what what port it will be on.
// const PORT = process.env.PORT || 3500;

// // creating minimal server
// const server = http.createServer((req, res) => {
//     console.log(req.url, req.method);

//     // build a path and then server the files 
//     let filePath;
   
//     // version-1
//     if (req.url === '/' || req.url === '/index.html') {
//         res.setHeader('Content-Type', 'text/html');
//         filePath = path.join(__dirname, 'views', 'index.html');
//         fs.readFile(filePath, 'utf8', (err, data) => {
//             res.end(data);
//         })
//     }
// })

// // listening to requrest
// server.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
// })


// eg-2:
// ->using switch statement
// const http = require('http');
// const path = require('path');
// const fs = require('fs');
// const fsPromises = require('fs').promises;

// const logEvents = require("./logEvents");
// const EventEmitter = require('events');
// class Emitter extends EventEmitter {}

// // Intialing Object
// const myEmitter = new Emitter();

// // definig the port for the web server.
// // say what what port it will be on.
// const PORT = process.env.PORT || 3500;

// // creating minimal server
// const server = http.createServer((req, res) => {
//     console.log(req.url, req.method);

//     // build a path and then server the files 
//     let filePath;

//     // another version - switch statement
//     switch (req.url) {
//         case '/':
//         case '/index.html':
//             res.setHeader('Content-Type', 'text/html');
//             filePath = path.join(__dirname, 'views', 'index.html');
//             fs.readFile(filePath, 'utf8', (err, data) => {
//                 res.end(data);
//             })
//             break;
//     }
// })

// // listening to requrest
// server.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
// })

// eg-3:
// ->// path.extname() returns the file extension (including the dot .) of the given path string.
// If the request is http://localhost:3500/index.html → it returns .html
// If the request is /styles.css → it returns .css
// If the request is / → it returns an empty string ''
// req.url -->req.url returns the path part of the URL that the client requested (everything after the domain and port).
// ->http://localhost:3500/ --> req.url = /
// ->http://localhost:3500/index.html-> req.url = /index.html

// res.end() is a method on the response object (res) that tells Node.js:
// 👉 “I’m done sending the response. Close it now.”

// 1. process.env.PORT
// process.env is where Node.js stores environment variables.
// PORT is usually set by the hosting provider (like Heroku, Vercel, AWS, Render).
// Example: On Heroku, your app might be assigned a random port like 50231.
// So if process.env.PORT exists, use it.

// 2. || 3500 (fallback / default value)
// If process.env.PORT is not defined (like when you’re running the app locally), then use 3500.
// || is the “OR” operator.
// So this means:
// 👉 Use the provided environment port, or if it doesn’t exist, fall back to 3500.

// res is the response object.
// image is not visible beacuse image would not use utf-8 encoding.


const http = require('http');
const path = require('path');
const fs = require('fs');
const fsPromises = require('fs').promises;

const logEvents = require("./logEvents");
const EventEmitter = require('events');
class Emitter extends EventEmitter {}

// ✅ Initialize custom EventEmitter
const myEmitter = new Emitter();

// ✅ Listen for "log" events and call logEvents
myEmitter.on('log', (msg, fileName) => logEvents(msg, fileName));

// ✅ Define server port
const PORT = process.env.PORT || 3500;

/**
 * Serve a file to the client
 * @param {string} filePath - Path of the requested file
 * @param {string} contentType - MIME type of the file
 * @param {http.ServerResponse} response - Server response object
 */
const serveFile = async (filePath, contentType, response) => {
  try {
    // ✅ Read the file
    const rawData = await fsPromises.readFile(
      filePath,
      contentType.includes('image') ? null : 'utf8'
    );

    // ✅ Parse JSON files, else return raw content
    const data = contentType === 'application/json' ? JSON.parse(rawData) : rawData;

    // ✅ Send response header
    response.writeHead(
      filePath.includes('404.html') ? 404 : 200,
      { 'Content-Type': contentType }
    );

    // ✅ Send response body
    response.end(contentType === 'application/json' ? JSON.stringify(data) : data);

  } catch (err) {
    console.error(err);
    myEmitter.emit('log', `${err.name}\t${err.message}`, 'errlog.txt');

    // ❌ Internal server error
    response.statusCode = 500;
    response.end();
  }
};

// ✅ Create HTTP server
const server = http.createServer((req, res) => {
  console.log(req.url, req.method);
  myEmitter.emit('log', `${req.url}\t${req.method}`, 'reqlog.txt');

  // ✅ Get file extension
  const extension = path.extname(req.url);

  // ✅ Determine content type
  let contentType;
  switch (extension) {
    case '.css':
      contentType = 'text/css';
      break;
    case '.js':
      contentType = 'text/javascript';
      break;
    case '.json':
      contentType = 'application/json';
      break;
    case '.jpg':
    case '.jpeg':
      contentType = 'image/jpeg';
      break;
    case '.png':
      contentType = 'image/png';
      break;
    case '.txt':
      contentType = 'text/plain';
      break;
    default:
      contentType = 'text/html';
  }

  // ✅ Build file path
  let filePath =
    contentType === 'text/html' && req.url === "/"
      ? path.join(__dirname, 'views', 'index.html')
      : contentType === 'text/html' && req.url.slice(-1) === '/'
        ? path.join(__dirname, 'views', req.url, 'index.html')
        : contentType === 'text/html'
          ? path.join(__dirname, 'views', req.url)
          : path.join(__dirname, req.url);

  // ✅ If no extension (like /about), add .html
  if (!extension && req.url.slice(-1) !== '/') filePath += '.html';

  // ✅ Check if file exists
  const fileExists = fs.existsSync(filePath);

  if (fileExists) {
    serveFile(filePath, contentType, res);
  } else {
    // ✅ Handle redirects or 404
    switch (path.parse(filePath).base) {
      case 'old-page.html':
        res.writeHead(301, { location: '/new-page.html' });
        res.end();
        break;
      case 'www-page.html':
        res.writeHead(301, { location: '/' });
        res.end();
        break;
      default:
        serveFile(path.join(__dirname, 'views', '404.html'), 'text/html', res);
    }
  }
});

// ✅ Start listening
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Note: Express.js makes this whole setup much simpler.
// But writing it with Node core modules gives a deep understanding of how a web server works.



