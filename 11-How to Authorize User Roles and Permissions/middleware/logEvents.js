// logEvents.js
const { format } = require('date-fns');
const { v4: uuid } = require('uuid');
const fs = require('fs');
const fsPromises = require('fs').promises;
const path = require('path');

const logEvents = async (message, logName) => {
    const dateTime = format(new Date(), 'yyyy-MM-dd HH:mm:ss'); // formatted date & time
    const logItem = `Date: ${dateTime}\tID: ${uuid()}\tMessage: ${message}\n`;
    console.log(logItem);
    try {
        const logsDir = path.join(__dirname, '..', 'logs');
        // Create 'logs' directory if it doesn't exist
        if (!fs.existsSync(logsDir)) {
            await fsPromises.mkdir(logsDir);
        }
        // Append the log to the given log file (e.g., reqLog.txt)
        await fsPromises.appendFile(path.join(logsDir, logName), logItem);

    } catch (err) {
        console.error(err);
    }
};

const logger = (req, res, next) => {
   logEvents(`${req.method}\t${req.headers.origin}\t${req.url}`, 'reqLog.txt');
   console.log(`${req.method} ${req.path}`);
   next();
};

module.exports = { logger, logEvents };

