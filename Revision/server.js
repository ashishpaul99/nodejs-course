
const http=require('http');
const path=require('path');
const fs=require('fs');
const fsPromise=require('fs').promises;

const logEvents=require('./logEvents');
const EventEmitter=require('events');
class Emiiter extends EventEmitter{};


const myEmitter=new Emiiter();
const PORT= process.env.PORT || 3500;


const server=http.createServer((req,res)=>{
    console.log(req.url,req.method);

    const extension=path.extension(req.url);

    let contentType;
   






})