// eg-1:
// const fs = require('fs');

// // creating directory with name new
// fs.mkdir("./new", (err) => {
//     if (err) throw err;
//     console.log("Directory created");
// });

// process.on("uncaughtException", (err) => {
//     console.log(`There was an uncaught error: ${err}`);
//     process.exit(1); // exit process with failure
// });


// eg-2:
// -> if dir already exists then do not create it.
// -> using existsSync method.
// -> fs.existsSync helps to check the existence of files/directories before delete, rename, or copy....

// const fs = require('fs');

// // If it does not exist create it
// if (!fs.existsSync("./new")) {
//    fs.mkdir("./new", (err) => {
//       if (err) throw err;
//       console.log("Directory created");
//    });
// }

// process.on("uncaughtException", (err) => {
//    console.log(`There was an uncaught error: ${err}`);
//    process.exit(1); // exit process with failure
// });


// eg-3:Remove an empty directory
// const fs = require('fs');

// // if it does exist create it
// if (fs.existsSync("./new")) {
//    fs.rmdir("./new", (err) => {
//       if (err) throw err;
//       console.log("Directory removed");
//    });
// }

// process.on("uncaughtException", (err) => {
//    console.log(`There was an uncaught error: ${err}`);
//    process.exit(1); // exit process with failure
// });

// eg-4:Remove a non-empty directory using fs.rm()
const fs=require("fs");
if(fs.existsSync("./new")){
    fs.rm("./new",{recursive:true,force:true},(err)=>{
        if(err) throw err;
        console.log("Directory removed");
    })
}

// fs.rmdir("./dir") → still works only for empty directories (but will eventually be removed).

// fs.rm("./dir", { recursive: true, force: true }) → the modern replacement that handles both empty and non-empty directories.



