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

// Intializing Object
const myEmitter = new Emitter();

// definig the port for the web server.
// say what port it will be on.
const PORT = process.env.PORT || 3500;

// An async function to serve a file to the client
const serverFile = async (filePath, contentType, response) => {
    try {
        // ✅ Read the requested file asynchronously
        // Use 'utf8' encoding for text-based files (HTML, CSS, JS, JSON, etc.).
        // For images or other binary files, omit encoding so the raw buffer is returned.
        const rawData = await fsPromises.readFile(
            filePath,
            contentType.includes('image') ? null : 'utf8' // null → gives Buffer, 'utf8' → gives String
        );

        // If JSON, parse the raw data into JS object, otherwise keep as it is
        const data = contentType === 'application/json' ? JSON.parse(rawData) : rawData;

        // ✅ Send a successful response header with correct content type
        response.writeHead(200, { 'Content-Type': contentType });

        // ✅ Send the file data as the response body
        response.end(
            contentType === 'application/json' ? JSON.stringify(data) : data
        );

    } catch (err) {
        // ❌ If any error occurs (e.g., file not found, permission issues), log it
        console.log(err);

        // ✅ Set HTTP status code 500 (Internal Server Error)
        response.statusCode = 500;

        // ✅ End the response without sending data
        response.end();
    }
};

// creating minimal server
const server = http.createServer((req, res) => {
    console.log(req.url, req.method);

    // extension of request url
    const extension = path.extname(req.url);

    // define content type
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
        case '.jpg': // ✅ fixed missing dot
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

    // if req.url === '/' → load index.html
    // else if req.url ends with '/' → look for an index.html inside that subdirectory
    // else if contentType is 'text/html' → serve the requested .html file
    // else → serve the requested file (CSS, JS, image, etc.)
    let filePath =
        contentType === 'text/html' && req.url === "/" ? path.join(__dirname, 'views', 'index.html')
            : contentType === 'text/html' && req.url.slice(-1) === '/' ? path.join(__dirname, 'views', req.url, 'index.html')
                : contentType === 'text/html' ?
                    path.join(__dirname, 'views', req.url) : path.join(__dirname, req.url);

    // if there is no extension, it is probably a directory request (ending with '/')
    // if the request is like /new-page (without typing .html), this logic adds .html
    // this makes the .html extension not required in the browser
    // about → becomes about.html
    // contact → becomes contact.html
    if (!extension && req.url.slice(-1) !== '/') filePath += '.html';

    // checking file whether it exists or not before serving
    const fileExists = fs.existsSync(filePath);

    // if file exists then serve the file
    if (fileExists) {
        // serve the file
        serverFile(filePath, contentType, res);

    } else {
        // 404 or 301 redirect
        // path.parse() takes a file path string and breaks it into parts (returns an object).
        // Check the requested file's base name.
        // If it matches 'old-page.html', send a 301 redirect
        // and point the browser to '/new-page.html'.
        // path.parse(filePath).base is checking the actual filename (like "old-page.html").
        switch (path.parse(filePath).base) {
            case 'old-page.html':
                // redirect to new page
                res.writeHead(301, { location: '/new-page.html' });
                res.end();
                break;

            case 'www-page.html':
                res.writeHead(301, { location: '/' });
                res.end();
                break;

            default:
                // serve a 404 response
                serverFile(path.join(__dirname, 'views', '404.html'), 'text/html', res);
        }
    }
});

// listening to request
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
