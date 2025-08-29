const express=require("express");
const path=require("path");
const {logEvents, logger}=require("./middleware/logEvents");
const cors=require("cors");
const errorHandler = require("./middleware/errorHandler");
const port=3000;

const app=express();
app.use(logger);

const whiteList=[
   "http://localhost:3000",
   "https://www.google.com"
];

const corsOptions={
    origin:(origin,callback)=>{
      if(whiteList.indexOf(origin)!==-1 || !origin){
          callback(null,true);
      }else{
        callback(new Error("Not allowed by cors"));
      }
    },
    optionsSuccessStatus:200
}
app.use(cors(corsOptions));
app.use(express.json());  // for parsing application/json
app.use(express.urlencoded({ extended: false })); // for form data


app.use(express.static(path.join(__dirname,"public")))
app.use('/subdir',require('./routes/subdir'));
app.use('/',require("./routes/root"));
app.use('/employees',require('./routes/api/employees'));


app.use((req,res)=>{
  res.status(404).sendFile(path.join(__dirname,'views','404.html'))
})
app.use(errorHandler);

app.listen(port,()=>{
  console.log(`listening on port ${port}`);
})
