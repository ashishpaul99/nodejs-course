// const http=require('http');
// const port=3000;
// const fs=require("fs");
// const server=http.createServer((req,res)=>{
// //    res.write("Hello");
// //    res.end();
// // information is sent 
//       res.writeHead(200,{'content-type':'text/html'})
//       fs.readFile("index.html",(err,data)=>{
//           if(err){
//             res.writeHead(404);
//             res.write('Error:File not found')
//           }else{
//             res.write(data);
//           }
//           res.end();
//       })
// })

// server.listen(port,function(error){
//     if(error){
//         console.log(`something went wrong`,Error);
//     }else{
//         console.log(`server is listening on port${port}`);
//     }
// })

const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = 3000;

http.createServer((req, res) => {
  console.log(`${req.method} ${req.url}`);

  // Default to index.html if root
  let filePath = req.url === "/" ? "index.html" : req.url;
  filePath = path.join(__dirname, filePath);

  // Get file extension
  const ext = path.extname(filePath).toLowerCase();

  // Map extensions to MIME types
  const mimeTypes = {
    ".html": "text/html",
    ".css": "text/css",
    ".js": "text/javascript",
    ".json": "application/json",
    ".ts": "application/javascript", // serve TS as JS (for demo only)
    ".txt": "text/plain",
  };

  const contentType = mimeTypes[ext] || "application/octet-stream";

  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code === "ENOENT") {
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.end("404 Not Found");
      } else {
        res.writeHead(500);
        res.end("Server Error: " + err.code);
      }
    } else {
      res.writeHead(200, { "Content-Type": contentType });
      res.end(content, "utf-8");
    }
  });
}).listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
