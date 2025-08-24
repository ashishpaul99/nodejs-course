const http=require('http');
const path=require('path');
const fs=require('fs');
const port =3000;

const server=http.createServer((req,res)=>{

    let filePath=req.url==="/"? 'index.html':req.url;
    filePath=path.join(__dirname,filePath);

    const extension=path.extname(filePath).toLowerCase();
    
    let contentType;
    switch(extension){
        case '.js':contentType='application/javascript'; 
        break;

        case '.css':contentType='text/css';
        break;

        case '.json':contentType='application/json';
        break;

        case '.txt':contentType='text/plain';
        break;

        default:
            contentType='text/html';

    }
    
    fs.readFile(filePath,function(error,data){
        if(error){
            res.writeHead(404,{'content-Type':'text/plain'});
            res.write(`Error: File not found`);
        }else{
            res.writeHead(200,{'content-Type':contentType})
            res.write(data);
        }
        res.end();
    });

})

server.listen(port,(error)=>{
       console.log(`✅server is listening on port ${port}`);
})



