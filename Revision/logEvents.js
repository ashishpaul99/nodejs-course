const { format } = require('date-fns');
const { v4: uuid } = require('uuid');

const fs = require('fs');
const fsPromises = require('fs').promises;
const path = require('path');

const logEvents = async (message) => {
  try {
    const dateTime = format(new Date(), 'yyyy-MM-dd\tHH-mm-ss'); // use HH for 24-hr
    const logItem = `id:${uuid()}\tDateTime:${dateTime}\t${message}\n`; // string

    console.log(logItem); // just print, don’t assign

    const logsDir = path.join(__dirname, 'logs');

    // create logs dir if not exists
    if (!fs.existsSync(logsDir)) {
      await fsPromises.mkdir(logsDir);
    }

    // Append the log to eventLog.txt file
    await fsPromises.appendFile(
      path.join(logsDir, 'eventLog.txt'),
      logItem
    );

  } catch (err) {
    console.log(err);
  }
};

module.exports = logEvents;


