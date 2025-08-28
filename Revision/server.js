const express=require("express");
const path=require("path");
const {logEvents, logger}=require("./middleware/logEvents");
const cors=require("cors");
const fs=require("fs");
const port=3000;

const app=express();
app.use(logger);

const whiteList=[
   "http://localhost:3000/",
   "https://www.google.com/"
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

const filePath=path.join(__dirname,"views")
app.get(/^\/$|\/index(.html)?/,(req,res)=>{
  res.sendFile(path.join(filePath,"index.html"));
})
app.get("/test-error", (req, res, next) => {
  try {
    throw new Error("This is a test error!");
  } catch (err) {
    next(err); // pass error to your error middleware
  }
});

app.use((err,req,res,next)=>{
   logEvents(`${err.name}:${err.message}`,'errLog.txt')
   console.log(err.stack);
   res.status(503).send(err.message);
})

app.listen(port,()=>{
  console.log(`listening on port ${port}`);
})
