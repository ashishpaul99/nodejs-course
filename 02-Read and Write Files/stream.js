// It's better not to read all the data at once from large files, 
// because it could consume too much memory. Instead, use streams.

// Example-1: Transfer data from one file to another
// Source: lorem.txt --> Destination: new-lorem.txt

const fs = require("fs");

// Create a readable stream
const rs = fs.createReadStream("./files/lorem.txt", { encoding: "utf8" });

// Create a writable stream
const ws = fs.createWriteStream("./files/new-lorem.txt");

// Method 1: Using 'data' event (manual way)
// rs.on("data", (chunk) => {
//   ws.write(chunk);
// });

// Method 2: Using 'pipe' (recommended)
// Piping automatically reads chunks from the readable stream
// and writes them to the writable stream efficiently.
rs.pipe(ws);


// alternative
// const fs = require("fs");
// const path = require("path");

// const rs = fs.createReadStream(path.join(__dirname, "files", "lorem.txt"), { encoding: "utf8" });
// const ws = fs.createWriteStream(path.join(__dirname, "files", "newStream.txt"));

// rs.pipe(ws);



