// CORS Configuration Middleware --> CORS Whitelist Setup`
//third-party middleware - cors
// list of web application domains that are allowed to access the backend server

const allowedOrigins=require('./allowedOrigins')

const corsOptions = {
  origin: (origin, callback) => {
    // if the domain is in the whitelist, then allow access
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      // null --> no error, true --> allow origin
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  optionsSuccessStatus: 200 // for successful OPTIONS pre-flight response
};
module.exports=corsOptions;

