// logEvents.js
const { format } = require('date-fns');
const { v4: uuid } = require('uuid');
const fs = require('fs');
const fsPromises = require('fs').promises;
const path = require('path');

const logEvents = async (message) => {
    const dateTime = format(new Date(), 'yyyy-MM-dd HH:mm:ss'); // formatted date & time
    const logItem = `Date: ${dateTime}\tID: ${uuid()}\tMessage: ${message}\n`;
    console.log(logItem);
    try {
        const logsDir = path.join(__dirname, 'logs');

        // Create 'logs' directory if it doesn't exist
        if (!fs.existsSync(logsDir)) {
            await fsPromises.mkdir(logsDir);
        }

        // Append the log to eventLog.txt
        await fsPromises.appendFile(path.join(logsDir, 'eventLog.txt'), logItem);

    } catch (err) {
        console.error(err);
    }
};
module.exports = logEvents;
