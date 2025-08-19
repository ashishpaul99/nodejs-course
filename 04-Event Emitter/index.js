// index.js

const logEvents = require('./logEvents');
const EventEmitter = require('events');

// Create a custom emitter class
class MyEmitter extends EventEmitter {}

// Initialize emitter object
const myEmitter = new MyEmitter();

// Listen for 'log' events and call logEvents
myEmitter.on('log', (msg) => logEvents(msg));

// Emit a 'log' event after 2 seconds
setTimeout(() => {
    myEmitter.emit('log', 'Log event emitted!');
}, 2000);

// You can emit more events or pass more parameters as needed

