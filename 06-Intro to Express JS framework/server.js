// 06-Express JS tutorial

// eg-1: Basic Express Server
const express = require('express');
const app = express();
const path = require("path");
const port = process.env.PORT || 3500;

app.get('/', (req, res) => {
    res.send("Hello World");
});

app.listen(port, () => console.log(`Server is running on port ${port}`));

// eg-2:
const express2 = require('express');
const app2 = express2();
const path2 = require("path");
const port2 = process.env.PORT || 3500;

app2.get('/', (req, res) => {
    res.sendFile('./views/index.html', { root: __dirname });
});

app2.listen(port2, () => console.log(`Server is running on port ${port2}`));

// Alternative
const express3 = require('express');
const app3 = express3();
const path3 = require("path");
const port3 = process.env.PORT || 3500;

app3.get(/^\/$|\/index.html/, (req, res) => {
    res.sendFile(path3.join(__dirname, 'views', 'index.html'));
});

app3.listen(port3, () => console.log(`Server is running on port ${port3}`));

// eg-3: accessing another page
const express4 = require('express');
const app4 = express4();
const path4 = require("path");
const port4 = process.env.PORT || 3500;

// Matches "/", "/index", or "/index.html"
app4.get(/^\/$|\/index(.html)?/, (req, res) => {
    res.sendFile(path4.join(__dirname, 'views', 'index.html'));
});

// Matches "/new-page" or "/new-page.html"
app4.get(/^\/new-page(.html)?/, (req, res) => {
    res.sendFile(path4.join(__dirname, 'views', 'new-page.html'));
});

app4.listen(port4, () => console.log(`Server is running on port ${port4}`));

// eg-4: redirecting
// ->express handles this routes like water fall
const express5 = require('express');
const app5 = express5();
const path5 = require("path");
const port5 = process.env.PORT || 3500;

// Matches "/", "/index", or "/index.html"
app5.get(/^\/$|\/index(.html)?/, (req, res) => {
    res.sendFile(path5.join(__dirname, 'views', 'index.html'));
});

// Matches "/new-page" or "/new-page.html"
app5.get(/^\/new-page(.html)?$/, (req, res) => {
    res.sendFile(path5.join(__dirname, 'views', 'new-page.html'));
});

// Redirect /old-page(.html)? to /new-page.html
// Default is 302 (temporary), but use 301 for permanent redirect
app5.get(/^\/old-page(.html)?$/, (req, res) => {
    res.redirect(301, '/new-page.html');
});

app5.listen(port5, () => console.log(`Server is running on port ${port5}`));

// eg-5: Handle 404 - This middleware runs if no route is matched
const express6 = require('express');
const app6 = express6();
const path6 = require("path");
const port6 = process.env.PORT || 3500;

app6.get(/^\/$|\/index(.html)?/, (req, res) => {
    res.sendFile(path6.join(__dirname, 'views', 'index.html'));
});

app6.get(/^\/new-page(.html)?$/, (req, res) => {
    res.sendFile(path6.join(__dirname, 'views', 'new-page.html'));
});

app6.get(/^\/old-page(.html)?$/, (req, res) => {
    res.redirect(301, '/new-page.html');
});

// Handle 404 - This middleware runs if no route is matched
// Sends custom 404.html file with status code 404
app6.use((req, res) => {
    res.status(404).sendFile(path6.join(__dirname, 'views', '404.html'));
});

app6.listen(port6, () => console.log(`Server is running on port ${port6}`));

// eg-6: Function chaining in Express
const express7 = require('express');
const app7 = express7();
const path7 = require("path");
const port7 = process.env.PORT || 3500;

// First handler logs the attempt, then passes control to the next handler
// Second handler sends the actual response
app7.get(/^\/hello(.html)?$/,
    (req, res, next) => {
        console.log("attempting to load hello.html");
        next();
    },
    (req, res) => {
        res.send("Hello World");
    }
);

app7.listen(port7, () => console.log(`Server is running on port ${port7}`));

// eg-7: Route handler chaining (middleware-like behavior)
const express8 = require('express');
const app8 = express8();
const path8 = require("path");
const port8 = process.env.PORT || 3500;

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
app8.get(/^\/chain(.html)?$/, [one, two, three]);

app8.listen(port8, () => console.log(`Server is running on port ${port8}`));