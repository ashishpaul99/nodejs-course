const { format } = require("date-fns");
const { v4: uuid } = require("uuid");
const fs = require("fs");
const path = require("path");
const fsPromises = require("fs").promises;


const logEvents = async (message, logName) => {
  const dateTime = format(new Date(), "yyyy-MM-dd\tHH:mm:ss");
  const logItems = `uuid:${uuid()}\tDateTime:${dateTime}\tmessage:${message}\n`;

  console.log(logItems);

  const logsDir = path.join(__dirname, "..","logs");

  try {
    // Create logs directory if it doesn't exist
    if (!fs.existsSync(logsDir)) {
      await fsPromises.mkdir(logsDir, { recursive: true });
    }

    // Append log to file inside logs folder
    await fsPromises.appendFile(path.join(logsDir, logName), logItems);
  } catch (err) {
    console.error(err);
  }
};

const logger=(req,res,next)=>{
    logEvents(`${req.method}\t${req.headers.origin}\t${req.url}`,'reqLog.txt')
    console.log(`${req.method} ${req.path}`);
    next();
};

module.exports ={logger,logEvents};
