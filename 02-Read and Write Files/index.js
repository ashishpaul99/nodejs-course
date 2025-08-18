// 2. Read and Write Files

// eg-1:
// const fs=require('fs');
// fs.readFile('./files/starter.txt',(err,data)=>{
//     if(err) throw err;
//     console.log(data.toString()); 
// })

// o/p:
// Hi, My name is Ashish

// alternative: Instead of toString() give encoding utf8 parameter.
// const fs=require('fs');
// fs.readFile('./files/starter.txt','utf8',(err,data)=>{
//     if(err) throw err;
//     console.log(data); //o/p:Hi, My name is Ashish
// })


// Example 2: Catching an uncaught error
// -> If we have uncaught errors, we can catch them using the 'process' object.
// 'process' is one of the global variables in Node.js — no need to import it, it's already available.
// We will cause an error by specifying a file that doesn't exist.

// Exit on uncaught errors
// const fs = require('fs');

// fs.readFile('./files/hello.txt', 'utf8', (err, data) => {
//     if (err) throw err; // This will trigger 'uncaughtException' if not caught
//     console.log(data); // Example output if file exists: Hi, My name is Ashish
// });

// process.on('uncaughtException', err => {
//     console.error(`There was an uncaught error: ${err}`);
//     process.exit(1); // Exit the process with a failure code
// });

// o/p:
// There was an uncaught error: Error: ENOENT: no such file or directory, open 'C:\Users\Ashishpaul\Desktop\Node Js\02-Read and Write Files\files\hello.txt'


// Example 3:
// -> When reading files (and in Node.js in general), most functions and methods are asynchronous.
// -> Node.js will execute asynchronous methods later, after finishing the remaining synchronous tasks.
// -> In this example, it prints "Hello..." first, then logs the contents of starter.txt.

// const fs = require('fs');

// fs.readFile('./files/starter.txt', 'utf8', (err, data) => {
//     if (err) throw err;
//     console.log(data);
// });

// console.log("Hello...");

// process.on('uncaughtException', err => {
//     console.error(`There was an uncaught error: ${err}`);
//     process.exit(1); // Exit the process with a failure code
// });

// Expected output:
// Hello...
// Hi, My name is Ashish


// eg-4:
// ->Instead of harging coding the file path there is another way to do it by using path module
// there can be problems when harcode the path.

// const fs=require('fs');
// const path=require('path');

// fs.readFile(path.join(__dirname,'files','starter.txt'),'utf8',(err,data)=>{
//       if(err) throw err;
//       console.log(data);
// })

// console.log("Hello...");

// process.on('uncaughtException', err=>{
//     console.error(`There was an uncaught error:${err}`)
//     process.exit(1);
// })

// o/p:
// Hello...
// Hi, My name is Ashish


// 2.  Writing file
// eg-5: 
// ->it create reply.txt in files folder.
// const fs=require('fs');
// const path=require('path');

// fs.writeFile(path.join(__dirname,'files','reply.txt'),'Nice to meet you',(err)=>{
//    if(err) throw err;
//    console.log('Write complete');
// })


// 3. Append file
// -> It will create a new file it doesn't exist.
// ->if file exist it will append changes
// ->it is used to add content in the file.

// eg-1:
// const fs=require('fs');
// const path=require('path');

// fs.appendFile(path.join(__dirname,'files','test.txt'),'Text changed',(err)=>{
//     if(err) throw err;
//     console.log('Append complete');
// })
// console.log("Hello...")

// // exit on uncaught errors
// process.on('uncaughtException', err=>{
//     console.error(`There was an uncaught error:${err}`)
//     process.exit(1);
// });


// eg-2: write, append and rename file

// ->append the content inside reply.txt in the call back function.
// ->fs.appendFile inside the fs.writeFile callback because both methods are asynchronous.
// fs.writeFile doesn’t block — it starts writing the file in the background.
// If you call fs.appendFile outside of the callback, it might run before writeFile finishes, causing:
// -> Missing data
// -> Errors if the file isn’t ready yet
// By placing appendFile inside the writeFile callback, you ensure:
// -> The file is fully written.
// -> Then the append happens.

// const fs=require('fs');
// const path=require('path');

// fs.writeFile(path.join(__dirname,'files','reply.txt'),'Nice to meet you',(err)=>{
//    if(err) throw err;
//    console.log('Write complete');

//    fs.appendFile(path.join(__dirname,'files','reply.txt'),'\n\n yes it is edited',(err)=>{
//     if(err) throw err;
//     console.log('Append complete');

//         fs.rename(path.join(__dirname,"files","reply.txt"),path.join(__dirname,"files","newReply.txt"),(err)=>{
//             if(err) throw err;
//             console.log('rename complete');
//         })

//    })
// })

// console.log("Hi, my name is Ashish");


// // exit on uncaught errors
// process.on('uncaughtException', err=>{
//     console.error(`There was an uncaught error:${err}`)
//     process.exit(1);
// });


// 4. fsPromises

// -> above code look like call back hell.
// -> it is avoided by using async and await in vanilla javascript.


// eg-1: 
// ->we dont need call back in this code because we are using await and catch error using catch block.

// importing file system promises
// eg-1: 
// -> We don't need a callback in this code because we are using await and catching errors with try...catch.

// importing file system promises
// const fsPromises = require("fs").promises;
// const path = require("path");

// // file operations
// const fileOps = async () => {
//   try {
//     // read file
//     const data = await fsPromises.readFile(
//       path.join(__dirname, "files", "starter.txt"),
//       "utf8"
//     );
//     console.log(data);

//     // creating file
//     await fsPromises.writeFile(
//       path.join(__dirname, "files", "promiseWrite.txt"),
//       data
//     );
//     console.log("Write completed");

//     // appending new content
//     await fsPromises.appendFile(
//       path.join(__dirname, "files", "promiseWrite.txt"),
//       "\n\nhey I am writing something new"
//     );
//     console.log("Append completed");

//     // rename file
//     await fsPromises.rename(
//       path.join(__dirname, "files", "promiseWrite.txt"),
//       path.join(__dirname, "files", "promiseComplete.txt")
//     );
//     console.log("Rename complete");

//     // read renamed file
//     const newData = await fsPromises.readFile(
//       path.join(__dirname, "files", "promiseComplete.txt"),
//       "utf8"
//     );
//     console.log(newData);

//     // delete file safely (if it exists)
//     const fileToDelete = path.join(__dirname, "files", "test.txt");
//     try {
//       await fsPromises.unlink(fileToDelete);
//       console.log("Unlinking completed");
//     } catch {
//       console.log("File 'test.txt' not found, skipping delete.");
//     }
//   } catch (err) {
//     console.error(err);
//   }
// };

// fileOps();

