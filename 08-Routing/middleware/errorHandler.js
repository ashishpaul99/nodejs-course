// custom error handler
// we can also tidy up the custom error by creating errorHandler in the middleware folder, 
// pasting the function logic, exporting it, and also calling the logEvents.js function 
// inside to log this error in errorLog.txt

const {logEvents}=require('./logEvents');
const errorHandler=(err,req,res,next)=>{
    logEvents(`${err.name}:${err.message}`,'errorLog.txt')
    console.log(err.stack);
    res.status(500).send(err.message);
};

module.exports= errorHandler;

