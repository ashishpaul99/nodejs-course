const http=require('http');
const path=require('path');
const fs=require('fs');
const fsPromises=require('fs').promises;

const logEvents=require("./logEvents");
const EventEmitter=require('events');
class Emitter extends EventEmitter{};

const myEmitter=new Emitter();
myEmitter.on('log',(msg)=>logEvents(msg));


const PORT=process.env.PORT || 3500;

const serveFile=async (filePath,contentType,response)=>{
    try{
        const rawData=await fsPromises.readFile(filePath,contentType.includes('image')?null:'utf8');
        const data=contentType==='application/json'?JSON.parse(rawData):rawData;

        response.writeHead(200,{'contentType':contentType});

        response.end(
            contentType==='application/json'?JSON.stringify(data) : data
        );

    }catch(err){
        console.log(err);
        response.statusCode=500;
        response.end();
    }

}

const server=http.createServer((req,res)=>{
    console.log(`${req.url,req.method}`);
    myEmitter.emit('log',`${req.url}\t${req.method}`,'reqlog.txt');

    const extension=path.extname(req.url);

    switch(extension){
        case '.css':
            contentType='text/css';
            break;
        case '.js':
            contentType='text/javascript';
            break;
        case '.json':
            contentType='text/json';
            break;
        case '.png':
            contentType='image/png';
            break;
        case '.jpg':
            constentType='image/jpeg';
            break;
        case '.txt':
            constentType='text/plain';
            break;
        default:
            contentType='text/html'
    }

    let filePath=contentType='text/html' && req.url==='/'? path.join(__dirname,'views','index.html'): contentType='text/html' && req.url.slice(-1)==='/'? path.join(__dirname,'views',req.url,'index.html'):contentType==='text/html'?path.join(__dirname,'views',req.url):path.join(__dirname,req.url);

    if(!extension && req.url.slice(-1)!=='/') filePath+='.html';
    
    const fileExists=fs.existsSync(filePath);

    if(fileExists){
        serveFile(filePath,contentType,res);
    }else{
         switch(path.parse(filePath).base){
            case 'old-page.html':
                res.writeHead(301,{location:'/new-page.html'});
                res.end();
                break;

            case 'www-page.html':
                res.writeHead(301,{location:'/'});
                res.end();
                break;
            default:
                // serve a 404 response
                serveFile(path.join(__dirname,'views','404.html'),'text/html',res);
         }
    }
});

// listening to request
server.listen(PORT,()=>{
    console.log(`server running on port ${PORT}`);
})



